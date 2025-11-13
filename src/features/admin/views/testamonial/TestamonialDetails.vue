<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, onMounted, reactive } from 'vue'
import { useTestimonialAdminStore } from '@/stores/admin/testimonialAdminStore.ts'

const store = useTestimonialAdminStore()

const route = useRoute()

const state = reactive({
  id: 0,
  name: '',
  job: '',
  message: '',
  isPublished: false,
})

onMounted(async () => {
  try {
    const id = Number(route.params.id)
    if (id) {
      const data = await store.getTestimonialId(id)
      Object.assign(state, data)
    }
  } catch (e) {
    console.error(e)
  }
})

async function togglePublished(id: number) {
  try {
    const response = await store.toggleTestimonial(id)
    if (response) {
      return state.isPublished = response.isPublished
    }
  } catch(e) {
    console.error(e)
  }
}

const isPublished = computed(() => state.isPublished ? 'Voir' : 'Cacher')
</script>

<template>
  <div class="container-testimonial" v-if="state">
    <div class="testimonial-details">
      <div class="meta">
        <div class="testimonial-title">
          <h2>{{ state.name.charAt(0).toUpperCase() + state.name.slice(1) }}</h2>
        </div>
        <div class="testimonial-job">
          <p>{{ state.job }}</p>
          <p>{{ state.isRead ? '✅ Lu' : '❌ Non lu' }}</p>
        </div>
      </div>
      <div class="message-body">
        <p>{{ state.message }}</p>
      </div>
      <div class="actions">
        <button class="btn btn-delete">Supprimer</button>
        <button
          @click="togglePublished(state.id)"
          :class="state.isPublished ? 'see' : 'hide'"
          class="btn btn-published"
        >
          {{ isPublished }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container-testimonial {
  display: flex;
  align-items: center;
  justify-content: center;
  .testimonial-details{
    max-width: 550px;
    width: 100%;
    margin: 3rem 20px;
    padding: 2rem 2.5rem;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    color: #333;
    font-family: 'Inter', sans-serif;
    @media (max-width: 900px) {
      margin: 2rem 15px;
    }
    .meta {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      .testimonial-title h2 {
        font-size: 22px;
      }
      .testimonial-job {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        .job {
          color: #64748b;
        }
      }
    }
    .message-body {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 1.2rem;
      line-height: 1.6;
    }
    .actions {
      display: flex;
      align-items: center;
      column-gap: 5px;
      .see {
        background: green;
        color: white;
      }
      .hide {
        color: white;
        background: black;
      }
    }
  }
}
</style>
