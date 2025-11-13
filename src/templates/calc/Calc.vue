<script setup lang="ts">
defineProps<{
  isOpen?: boolean
  background?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <Teleport v-if="isOpen" to="body">
    <div @click="emit('close')" class="calc" :class="{ background }"></div>
  </Teleport>
</template>

<style scoped lang="scss">
.calc {
  z-index: 50;
  background: rgba(0, 0, 0, 0.62);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.background {
  background: transparent;
}
</style>
