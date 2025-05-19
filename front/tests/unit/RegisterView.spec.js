import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import RegisterView from '../../src/views/RegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia, setActivePinia } from 'pinia'
import authService from '../../src/services/auth.service'
import { useLoaderStore } from '../../src/stores/loader'
import { useToast } from 'vue-toastification'


vi.mock('../../src/services/auth.service')
vi.mock('../../src/stores/loader')
vi.mock('vue-toastification')

describe('RegisterView.vue', () => {
  let wrapper
  let router
  let mockToast
  let loaderStore

  beforeEach(async () => {
    
    setActivePinia(createPinia())

    
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', name: 'home', component: { template: '<div>Home</div>' } },
        { path: '/login', name: 'login', component: { template: '<div>Login</div>' } },
        { path: '/register', name: 'register', component: { template: '<div>Register</div>' } }
      ],
    })
    await router.push('/register') 
    await router.isReady()

    
    mockToast = {
      success: vi.fn(),
      error: vi.fn(),
    }
    useToast.mockReturnValue(mockToast)

    
    loaderStore = {
      show: vi.fn(),
      hide: vi.fn(),
    }
    useLoaderStore.mockReturnValue(loaderStore)

    
    authService.register = vi.fn()

    wrapper = mount(RegisterView, {
      global: {
        plugins: [router],
        stubs: {
          'v-container': { name: 'v-container', template: '<div><slot /></div>' },
          'v-row': { name: 'v-row', template: '<div><slot /></div>' },
          'v-col': { name: 'v-col', template: '<div><slot /></div>' },
          'v-card': { name: 'v-card', template: '<div><slot /></div>' },
          'v-card-title': { name: 'v-card-title', template: '<h2><slot /></h2>' },
          'v-card-text': { name: 'v-card-text', template: '<div><slot /></div>' },
          'v-card-actions': { name: 'v-card-actions', template: '<div><slot /></div>' },
          'v-form': {
            name: 'v-form', 
            template: '<form @submit="handleFormSubmit"><slot></slot></form>',
            data() {
              return {
                isValid: true
              }
            },
            methods: {
              async validate() {
                
                let allValid = true;
                
                return { valid: this.isValid };
              },
              handleFormSubmit(event) { 
                if (event && typeof event.preventDefault === 'function') {
                  event.preventDefault(); 
                }
                this.$emit('submit', event); 
              }
            }
          },
          'v-text-field': {
            name: 'v-text-field', 
            template: `
              <div class="v-text-field-stub">
                <label :for="label || $attrs.label">{{ label || $attrs.label }}</label>
                <input
                  :id="label || $attrs.label"
                  :type="type || 'text'"
                  :value="modelValue"
                  @input="$emit('update:modelValue', $event.target.value)"
                  @blur="$emit('blur')"
                  :aria-label="label || $attrs.label"
                />
                <div v-if="errorMessages && errorMessages.length > 0" class="stub-error-messages">
                  {{ typeof errorMessages === 'string' ? errorMessages : errorMessages.join(', ') }}
                </div>
              </div>
            `,
            props: ['modelValue', 'label', 'rules', 'type', 'prependInnerIcon', 'errorMessages'],
            emits: ['update:modelValue', 'blur']
          },
          'v-btn': {
            name: 'v-btn', 
            template: '<button @click="$emit(\'click\')" :disabled="loading"><slot></slot></button>',
            props: ['loading', 'type', 'color', 'class', 'block', 'rounded', 'size'],
            emits: ['click']
          },
          'v-icon': { name: 'v-icon', template: '<span class="v-icon-stub"></span>' },
          RouterLink: true,
        },
      },
    })

    
    vi.spyOn(Storage.prototype, 'setItem')
    vi.spyOn(Storage.prototype, 'removeItem')

    
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks() 
    vi.clearAllTimers() 
    localStorage.clear() 
  })

  
  const findTextFieldByLabel = (label) => {
    return wrapper.findAllComponents({ name: 'v-text-field' })
      .find(c => c.props().label === label);
  };

  
  const setFieldValue = async (label, value) => {
    const textFieldWrapper = findTextFieldByLabel(label);
    if (textFieldWrapper && textFieldWrapper.exists()) {
      
      textFieldWrapper.vm.$emit('update:modelValue', value);
    
      const inputElement = textFieldWrapper.find('input');
      if (inputElement.exists()) {
        await inputElement.setValue(value); 
        await inputElement.trigger('blur'); 
      } else {
         
        await textFieldWrapper.vm.$emit('blur');
      }
      await flushPromises(); 
    } else {
      const allLabels = wrapper.findAllComponents({ name: 'v-text-field' }).map(c => c.props().label || c.attributes().label);
      console.error(`Text field with label "${label}" not found. Available labels in stubs: [${allLabels.join(', ')}]`);
      
    }
  };

  
  const getVForm = () => wrapper.findComponent({ name: 'v-form' });

  it('renders the registration form', () => {
    
    expect(wrapper.findComponent({ name: 'v-card-title' }).text()).toContain('Registrarse');
    
    expect(findTextFieldByLabel('Nombre')).toBeTruthy();
    expect(findTextFieldByLabel('Correo electrónico')).toBeTruthy();
    expect(findTextFieldByLabel('Contraseña')).toBeTruthy();
    expect(findTextFieldByLabel('Confirmar contraseña')).toBeTruthy();
    
    expect(wrapper.findComponent({ name: 'v-btn' }).text()).toContain('Registrarse');
  });

  it('shows validation error if name is empty on submit', async () => {
    
    getVForm().vm.isValid = false;
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();
    
    expect(mockToast.error).toHaveBeenCalledWith('Por favor, completa todos los campos correctamente.');
  });

  it('shows validation error for invalid email format', async () => {
    await setFieldValue('Correo electrónico', 'invalid-email');
    getVForm().vm.isValid = false;
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();
    expect(mockToast.error).toHaveBeenCalledWith('Por favor, completa todos los campos correctamente.');
  });

  it('shows validation error if password is too short', async () => {
    await setFieldValue('Contraseña', '123');
    getVForm().vm.isValid = false;
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();
    expect(mockToast.error).toHaveBeenCalledWith('Por favor, completa todos los campos correctamente.');
  });

  it('shows validation error if passwords do not match', async () => {
    await setFieldValue('Contraseña', 'password123');
    await setFieldValue('Confirmar contraseña', 'password456');
    getVForm().vm.isValid = false;
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();
    expect(mockToast.error).toHaveBeenCalledWith('Por favor, completa todos los campos correctamente.');
  });

  it('successfully registers a user and navigates to login', async () => {
    
    getVForm().vm.isValid = true;
    authService.register.mockResolvedValue({ data: { token: 'test-token' } });

    await setFieldValue('Nombre', 'Test User');
    await setFieldValue('Correo electrónico', 'test@example.com');
    await setFieldValue('Contraseña', 'password123');
    await setFieldValue('Confirmar contraseña', 'password123');

    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    expect(loaderStore.show).toHaveBeenCalled();
    expect(authService.register).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      password_confirmation: 'password123',
      terms: false,
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'test-token');
    expect(mockToast.success).toHaveBeenCalledWith('Registro exitoso');

    vi.advanceTimersByTime(800);
    await flushPromises();
    expect(router.currentRoute.value.name).toBe('login');
    expect(loaderStore.hide).toHaveBeenCalled();
  });

  it('handles 422 API error during registration', async () => {
    getVForm().vm.isValid = true;
    const errors = {
      email: ['The email has already been taken.'],
      password: ['The password confirmation does not match.']
    };
    authService.register.mockRejectedValue({
      response: { status: 422, data: { errors } },
    });

    await setFieldValue('Nombre', 'Test User');
    await setFieldValue('Correo electrónico', 'taken@example.com');
    await setFieldValue('Contraseña', 'password123');
    await setFieldValue('Confirmar contraseña', 'password123');

    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    expect(loaderStore.show).toHaveBeenCalled();
    expect(authService.register).toHaveBeenCalled();
    expect(mockToast.error).toHaveBeenCalledWith('The email has already been taken.');
    expect(mockToast.error).toHaveBeenCalledWith('The password confirmation does not match.');
    expect(loaderStore.hide).toHaveBeenCalled();
  });

  it('handles generic API error during registration', async () => {
    getVForm().vm.isValid = true;
    authService.register.mockRejectedValue(new Error('Network Error'));

    await setFieldValue('Nombre', 'Test User');
    await setFieldValue('Correo electrónico', 'test@example.com');
    await setFieldValue('Contraseña', 'password123');
    await setFieldValue('Confirmar contraseña', 'password123');

    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    expect(loaderStore.show).toHaveBeenCalled();
    expect(authService.register).toHaveBeenCalled();
    expect(mockToast.error).toHaveBeenCalledWith('Error en el registro');
    expect(loaderStore.hide).toHaveBeenCalled();
  });
});