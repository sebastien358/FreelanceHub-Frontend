<script setup lang="ts">
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <div class="brand">Sébastien Petit</div>
      <ul class="d-flex align-items-center header-link">
        <li><router-link to="/freelance">Accueil</router-link></li>
        <li><router-link to="/services">Services</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
        <li><router-link to="/login">Connexion</router-link></li>
      </ul>
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
  padding: 0 55px 0 40px;
  @media (max-width: 900px) {
    padding: 0 20px;
  }
  .container {
    margin: 0 auto;
    max-width: 1200px;

  }
  .header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
  }
  .brand {
    font-weight: 600;
    color: #fff;
  }
  .header-link a {
    color: lighten(#9aa7b6, 10%);
    margin-left: 22px;
    text-decoration: none;
    transition: color .2s;
    &:hover{
      color: #4fb3ff;
    }
  }
  .header-link {
    a.router-link-active {
      color: #4fb3ff;
    }
  }
}
</style>
