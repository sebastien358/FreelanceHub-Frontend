<script setup lang="ts">
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <div class="brand">Sébastien Petit</div>
      <nav class="nav">
        <a href="#accueil">Accueil</a>
        <a href="#projets">Projets</a>
        <a href="#">Contact</a>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">

.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(6px);
  background: linear-gradient(180deg, rgba(5,7,11,0.55), rgba(5,7,11,0.2));
  border-bottom: 1px solid rgba(255,255,255,0.02);
  .container {
    width: min(1200px, 92%);
    margin: 0 auto;
  }
  .header-inner {
    display:flex;
    align-items:center;
    justify-content: space-between;
    padding: 20px 0;
  }
  .brand {
    font-weight: 600;
    color: #fff;
  }
  .nav a {
    color: lighten(#9aa7b6, 10%);
    margin-left: 22px;
    text-decoration: none;
    transition: color .2s;
    &:hover{
      color: #4fb3ff;
    }
  }
}
</style>
