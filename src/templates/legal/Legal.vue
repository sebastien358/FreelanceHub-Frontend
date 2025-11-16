<script setup lang="ts">
import gsap from 'gsap'
import { onMounted, ref } from 'vue'

const legal = ref<HTMLElement | null>(null)

onMounted(async () => {
  function animationLegal() {
    gsap.from(legal.value, {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      ease: 'power2.out'
    })
  }

  animationLegal()
})
</script>

<template>
  <div class="container" ref="legal">
    <section class="legal-page">
      <h1>Mentions légales</h1>
      <p><strong>Nom :</strong> Sébastien Petit</p>
      <p><strong>Statut :</strong> Entrepreneur individuel (EI)</p>
      <p><strong>SIRET :</strong> null</p>
      <p><strong>TVA intracommunautaire :</strong> null</p>
      <p><strong>Contact :</strong> sebastien.p0027@gmail.fr</p>
      <p><em>Le site sera mis à jour avec les informations légales complètes après enregistrement SIRET.</em>
      </p>
    </section>
  </div>

</template>

<style scoped lang="scss">
.container {
  padding: 0 20px;
  @media (max-width: 576px) {
    padding: 0 10px;
  }
}
.legal-page {
  padding: 2rem 2rem;
  width: 100%;
  max-width: 700px;
  margin: 6rem auto;
  border-radius: 12px;
  background: #ffffff;
  color: #111;
  font-family: 'Inter', sans-serif;
  line-height: 1.8;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  h1 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #1a3e6d;
    font-weight: 600;
    border-bottom: 2px solid #e8f0ff;
  }
  p {
    margin-bottom: 1rem;
    color: #333;
  }
  em {
    display: block;
    margin-top: 2rem;
    font-size: 0.9rem;
    color: #666;
    font-style: normal;
  }
}
</style>
