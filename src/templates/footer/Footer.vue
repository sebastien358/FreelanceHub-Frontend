<script setup lang="ts">
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-left">
        <span>© Sébastien Petit</span>
        <span class="separator">-</span>
        <router-link to="/login">Login</router-link>
      </div>

      <span>sebastien.p0027@gmail.com</span>
    </div>
  </footer>
</template>

<style scoped lang="scss">
$muted: #9aa7b6;

/* footer */
.site-footer {
  border-top: 1px solid rgba(255,255,255,0.02);
  .container {
    width: min(1200px, 92%);
    margin: 0 auto;
  }
  .footer-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: $muted;
    font-size: .95rem;
    .footer-left {
      .separator {
        opacity: 0.6;
        transition: all 120ms ease;
        margin: 0 5px;
      }
    }
    a {
      color: $muted;
      opacity: 0.3;
      transition: all 120ms ease;
      &:hover {
        opacity: initial;
        color: $muted;
      }
    }
  }
}
</style>
