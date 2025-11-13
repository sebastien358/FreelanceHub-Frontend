<template>
  <div class="app-content" :class="{'no-header-footer': route.meta.hideFooter}">
    <Header v-if="!route.meta.hideHeader" class="header" />
    <main class="views">
      <RouterView v-slot="{ Component }">
        <Component :is="Component" v-if="Component" />
      </RouterView>
    </main>
    <Footer v-if="!route.meta.hideFooter" class="footer" />
  </div>
</template>

<script setup lang="ts">
import Header from '@/templates/header/Header.vue'
import Footer from '@/templates/footer/Footer.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style lang="scss" scoped>
$bg: #070811;

.app-content {
  display: grid;
  grid-template-areas: 'header' 'views' 'footer';
  grid-template-rows: 60px 1fr auto;
  min-height: 100vh;
  font-family:
    Inter,
    system-ui,
    -apple-system,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .header {
    grid-area: header;
  }
  .views {
    grid-area: views;
  }
  .footer {
    grid-area: footer;
  }
  &.no-header-footer {
    grid-template-areas: 'views';
    grid-template-rows: 1fr;
  }
}
</style>
