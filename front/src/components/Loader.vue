<template>
  <v-overlay :model-value="loading" persistent class="d-flex align-center justify-center" z-index="9999">
    <v-progress-circular indeterminate color="primary" size="64" width="6" />
  </v-overlay>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useLoaderStore } from '../stores/loader'

const { loading } = storeToRefs(useLoaderStore())
</script>