<template>
  <div class="app-content">
    <Header class="header" />
    <main class="views">
      <RouterView v-slot="{Component}">
        <template v-if="Component">
          <Component :is="Component" />
        </template>
      </RouterView>
    </main>
    <Footer class="footer" />
  </div>
</template>

<script setup lang="ts">
import Header from '@/templates/header/Header.vue'
import Footer from '@/templates/footer/Footer.vue'
</script>

<style lang="scss" scoped>
$bg: #070811;

.app-content {
  display: grid;
  grid-template-areas: 'header' 'views' 'footer';
  height: 100%;
  grid-template-rows: 60px auto 35px;
  background: linear-gradient(180deg, lighten($bg, 2%), $bg 60%);
  color: #e8f0ff;
  min-height: 100vh;
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
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
}
</style>
