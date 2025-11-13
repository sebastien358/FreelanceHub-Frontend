<template>
  <div class="contact-admin">
    <div class="container">
      <InputSearch :placeholderText="placeholderContact" @input-search-term="inputSearchTerm" />
      <div class="grid-container">
        <router-link
          :to="{ name: 'contactId', params: { id: msg.id } }"
          v-for="msg in contacts"
          :key="msg.id"
          class="grid-item"
        >
          <h3>{{ msg.name.charAt(0).toUpperCase() + msg.name.slice(1) }}</h3>
          <p>{{ msg.email }}</p>
          <p>{{ msg.message.substring(0, 25) }}</p>
          <small class="isRead">{{ msg.isRead ? '✅ Lu' : '❌ Non lu' }}</small>
        </router-link>
      </div>
      <div class="load-contact">
        <button
          v-if="!store.isEndReached && store.contact.length > 0"
          @click="loadContact()"
          class="load-btn"
        >
          Charger plus
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useContactAdminStore } from '@/stores/admin/contactAdminStore.ts'
import InputSearch from '@/templates/input-search/InputSearch.vue'
const store = useContactAdminStore()
const contacts = computed(() => store.contact)

// Récupération de las liste des contacts

async function contactAdminLoad() {
  try {
    await store.adminContactList()
  } catch (e) {
    console.error(e)
  }
}

onMounted(async () => {
  try {
    await contactAdminLoad()
  } catch (e) {
    console.error(e)
  }
})

// Search Term

const placeholderContact = ref('Rechercher par nom ou email...')

async function inputSearchTerm(term: string) {
  try {
    await store.searchContact(term)
  } catch (e) {
    console.error(e)
  }
}

// Contact load

async function loadContact() {
  try {
    await store.loadContacts()
  } catch (e) {
    console.error(e)
  }
}
</script>

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
      line-height: 23px;
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 0.5rem;
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
      small {
        color: #888;
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
