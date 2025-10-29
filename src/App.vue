<template>
  <div class="site">
    <Header />
    <main>
      <Freelance />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Freelance from '@/freelance/Freelance.vue'
import Header from '@/templates/header/Header.vue'
import Footer from '@/templates/footer/Footer.vue'
</script>

<style lang="scss" scoped>
$bg: #070811;

.site {
  background: linear-gradient(180deg, darken($bg, 2%), $bg 60%);
  color: #e8f0ff;
  min-height: 100vh;
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
