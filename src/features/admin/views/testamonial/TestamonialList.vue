<script setup lang="ts">
import { useTestimonialAdminStore } from '@/stores/admin/testimonialAdminStore.ts'
import { computed, onMounted, ref } from 'vue'
import InputSearch from '@/templates/input-search/InputSearch.vue'

const store = useTestimonialAdminStore()

const testimonials = computed(() => store.testamonial)

async function testimonialLoad() {
  try {
    await store.getTestimonialList()
  } catch(e) {
    console.error(e)
  }
}

onMounted(async () => {
  try {
    await testimonialLoad()
  } catch(e) {
    console.error(e)
  }
})

// Input search

const placeholderTestimonial = ref('Rechercher par nom...')

async function inputSearchTerm(term: string) {
  try {
    await store.searchTestimonial(term)
  } catch(e) {
    console.error(e)
  }
}
</script>

<template>
  <div class="contact-admin">
    <div class="container">
      <InputSearch
        :placeholderText="placeholderTestimonial"
        @input-search-term="inputSearchTerm"
      />
      <div class="grid-container">
        <router-link
          :to="{name: 'testimonialId', params: {id: testimonial.id}}"
          v-for="testimonial in testimonials" :key="testimonial.id"
          class="grid-item"
        >
          <h3>{{ testimonial.name.charAt(0).toUpperCase() + testimonial.name.slice(1) }}</h3>
          <p>{{ testimonial.job }}</p>
          <p>{{ testimonial.message.substring(0, 25) }}</p>
          <span class="isRead">{{ testimonial.isRead ? '✅ Lu' : '❌ Non lu' }}</span>
        </router-link>
      </div>
      <div class="load-contact">
        <button
          v-if="!store.isEndReached && store.testamonial.length > 0"
          @click="store.lazyLoadTestimonial"
          class="load-btn"
        >
          Charger plus
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: min(1200px, 92%);
  margin: 0 auto;
  @media (max-width: 900px) {
    width: 100%;
  }
  input {
    max-width: 320px;
  }
  .load-contact {
    display: flex;
    align-items: center;
    justify-content: center;
    .btn {
      margin-top: 20px;
    }
  }
}

.contact-admin {
  padding: 10px 20px 20px 20px;
  @media (max-width: 992px) {
    padding: 10px;
  }
  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    .grid-item {
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 0.5rem;
      line-height: 23px;
      padding: 1rem;
      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
      cursor: pointer;
      &:hover {
        transform: scale(1.05);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      }
      h3 {
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #555;
      }
      p {
        margin-bottom: 0.5rem;
        color: #555;
      }
      .isRead {
        font-size: 13px;
        font-weight: 500;
        color: #888;
      }
    }
  }
  .load-btn {
    margin-top: 15px;
    padding: 0.5rem 1rem;
    background-color: #0077ff;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover {
      background-color: #005fcc;
    }
  }
}
</style>
