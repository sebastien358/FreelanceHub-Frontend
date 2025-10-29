<script setup lang="ts">
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <span>© Sébastien Petit</span>
      <span>sebastien.p0027@gmail.com</span>
    </div>
  </footer>
</template>

<style scoped lang="scss">
$muted: #9aa7b6;

/* footer */
.site-footer {
  border-top: 1px solid rgba(255,255,255,0.02);
  padding: 28px 0;
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
  }
}
</style>
