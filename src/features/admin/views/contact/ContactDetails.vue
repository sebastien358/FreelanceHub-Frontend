<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContactAdminStore } from '@/stores/admin/contactAdminStore.ts'
import type { ContactInterface } from '@/shared/interfaces'
const router = useRouter()
const route = useRoute()

const store = useContactAdminStore()
const contact = ref<ContactInterface | null>(null)

onMounted(async() => {
  const id = Number(route.params.id)
  if (id) {
    contact.value = await store.adminContactId(id)
  }
})

async function deleteContactId() {
  try {
    const id = Number(route.params.id)
    if (id) {
      const confirmDelete = confirm('Voulez-vous vraiment supprimer ce contact ?')
      if (!confirmDelete) return
      await store.deleteContactId(id)
      alert('Contact supprimé avec succès ✅')
      await router.push({ path: '/contact-list' })
      alert('Vou')
    }
  } catch(e) {
    console.error(e)
  }
}
</script>

<template>
  <div class="container-contact">
    <div class="contact-details" v-if="contact">
      <h2>{{ contact.name.charAt(0).toUpperCase() + contact.name.slice(1) }}</h2>
      <div class="meta">
        <div class="contact-email">
          <p>{{ contact.email }}</p>
          <span class="status" :class="{ unread: !contact.isRead }">
            {{ contact.isRead ? '✅ Lu' : '❌ Non lu' }}
          </span>
        </div>
      </div>
      <div class="message-body">
        <p>{{ contact.message }}</p>
      </div>
      <div class="actions">
        <button class="btn btn-reply">
          <a :href="`mailto:${contact.email}`">Répondre</a>
        </button>
        <button @click="deleteContactId()" class="btn btn-delete">Supprimer</button>
      </div>
    </div>
    <p v-else>Chargement du message...</p>
  </div>
</template>

<style scoped lang="scss">
.container-contact {
  display: flex;
  align-items: center;
  justify-content: center;
  .contact-details {
    max-width: 550px;
    width: 100%;
    margin: 3rem 20px;
    padding: 2rem 2.5rem;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    font-family: "Inter", sans-serif;
    @media (max-width: 900px) {
      margin: 2rem 15px;
    }
    h2 {
      color: black;
      font-size: 22px;
    }
    .meta {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      .contact-email {
        margin-top: 20px;
        color: #64748b;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
    .message-body {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 1.2rem;
      line-height: 1.6;
      p {
        color: black;
      }
    }
    .actions {
      display: flex;
      align-items: center;
      column-gap: 5px;
    }
  }
}
</style>
