<script setup lang="ts">
import { ref } from 'vue'

const term = ref<string>('')

defineProps<{
  placeholderText: string
}>()

const emit = defineEmits<{
  (e: 'inputSearchTerm'): void
}>()

function inputSearchTerm() {
  emit('inputSearchTerm', term.value)
}
</script>

<template>
  <div class="input-search">
    <input
      v-model="term"
      @input="inputSearchTerm()"
      type="text"
      :placeholder="placeholderText"
      class="search"
    />
  </div>
</template>

<style scoped lang="scss">
.input-search {
  display: flex;
  align-items: center;
  justify-content: center;
  .search {
    width: min(100%, 370px);
    padding: 0.5rem 1rem;
    margin-bottom: 30px;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    font-size: 1rem;
  }
}
</style>
