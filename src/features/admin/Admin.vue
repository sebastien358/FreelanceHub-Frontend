<script setup lang="ts">
import Sidebar from '@/features/admin/components/Sidebar.vue'
</script>

<template>
  <div class="admin-layout">
    <!-- Menu latéral -->
    <Sidebar />
    <!-- Contenu principal -->
    <main class="admin-content">
      <router-view v-slot="{ Component, route }">
        <Component :is="Component" :key="route.fullPath" v-if="Component" />
      </router-view>
    </main>
  </div>
</template>

<style scoped lang="scss">
.admin-layout {
  display: flex;
  background: #0f0f0f;
  color: white;
  font-family: 'Inter', sans-serif;
  .admin-content {
    flex: 1;          // prend tout l'espace restant
    padding: 2rem;
    background: #141414;
    border-left: 1px solid rgba(255,255,255,0.05);
    overflow-y: auto;
    height: calc(100vh);
    h1, h2 {
      color: #4caf50;
      margin-bottom: 1rem;
    }
    .section {
      background: #1c1c1c;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
    }
  }
}

/* ===========================
   Responsive pour mobile
=========================== */

@media (max-width: 900px) {
  .admin-layout {
    flex-direction: column;
  }
}
</style>
