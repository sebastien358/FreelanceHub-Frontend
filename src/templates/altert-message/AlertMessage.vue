<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
  message: string
  type: string
  to: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

let timeout

function alertMessage() {
  if (props.type === 'success') {
    timeout = setTimeout(() => {
      router.push({ path: `${props.to}` })
      emit('close')
    }, 2000)
  } else {
    timeout = setTimeout(() => {
      emit('close')
    }, 2000)
  }
}

onMounted(() => {
  alertMessage()
})

onUnmounted(() => {
  clearTimeout(timeout)
})
</script>

<template>
  <div class="alert-message">
    <span v-if="props.message" :class="props.type === 'success' ? 'success' : 'error'">
      {{ message }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.alert-message {
  .success {
    text-align: center;
    font-size: 13px;
    color: var(--form-text);
  }
  .error {
    text-align: center;
    font-size: 13px;
    color: var(--form-text);
  }
}
</style>
