<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useContactAdminStore } from '@/stores/admin/contactAdminStore.ts'

const store = useContactAdminStore()

// Détection de la route actuelle
const route = useRoute()

// Liens du menu admin
const adminLinks = [
  { name: 'Accueil', path: '/freelance' },
  { name: 'Contacts', path: '/contact-list' },
  { name: 'Témoignages', path: '/testimonial-list' },
]

// Permet d’ajouter une classe active sur le lien en cours
const isActive = (path: string) => route.path === path

async function resetContacts() {
  try {
    await store.resetContact()
  } catch (e) {
    console.error(e)
  }
}

const showButton = computed(() => {
  return route.name === 'contact-list' || route.name === 'testimonial-list'
})
</script>

<template>
  <div class="admin-sidebar">
    <div class="admin-sidebar_container">
      <h2>Admin</h2>
      <div class="admin-sidebar_container_nav">
        <router-link
          v-for="link in adminLinks"
          :key="link.path"
          :to="link.path"
          :class="{ active: isActive(link.path) }"
        >
          {{ link.name }}
        </router-link>
      </div>
    </div>
    <div v-if="showButton" class="reset-contact">
      <p> <span>5</span></p>
      <button @click="resetContacts()" class="btn btn-reset">Réinitialiser</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* Sidebar */
.admin-sidebar {
  width: 230px;
  background: #1c1c1c;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-right: 1px solid #333;
  padding: 25px 15px 10px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  transition: all 0.3s ease;
  &_container {
    h2 {
      margin-bottom: 1.5rem;
      font-size: 1.2rem;
      color: #4caf50;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    &_nav {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      a {
        color: #aaa;
        text-decoration: none;
        padding: 0.6rem 0.8rem;
        border-radius: 6px;
        transition: all 0.25s ease;
        font-size: 0.95rem;
        &:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.05);
          transform: translateX(2px);
        }
        &.active {
          background: rgba(76, 175, 80, 0.2);
          color: #fff;
          font-weight: 600;
        }
      }
    }
  }
}

.reset-contact {
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  p {
    font-size: 14px;
    margin: 0;
    color: var(--muted);
  }
  span {
    color: var(--muted);
    font-weight: bold;
    font-size: 14px;
  }
}

/* Responsive pour mobile */
@media (max-width: 900px) {
  .admin-sidebar {
    flex-direction: row;
    align-items: center;
    width: 100%;
    overflow-x: auto;
    border-bottom: 1px solid #333;
    padding: 25px 25px 25px 15px;
    &_container {
      display: flex;
      align-items: center;
      h2 {
        display: none;
      }
    }
    &_container_nav {
      align-items: center;
      flex-direction: row;
      column-gap: 12px;
    }
    .reset-contact {
      display: initial;
      p, span {
        display: none;
      }
      .btn {
        margin: 0;
        min-width: initial;
        padding: 9px 8px
      }
    }
  }
}
</style>
