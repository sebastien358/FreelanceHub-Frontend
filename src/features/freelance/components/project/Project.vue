<script setup lang="ts">
import { ref, nextTick } from 'vue'
import gsap from 'gsap'

/*===================
  IMPORT DES IMAGES AVEC CHEMIN RELATIF CORRECT
===================*/

import mac1 from '/src/assets/images/freelance-1.jpg'
import mac2 from '/src/assets/images/freelance-2.png'

/*===================
  CONTENU PROJETS
===================*/

const projects = [
  {img: mac1, title: 'Projet 1', text: 'Maquette HTML/CSS responsive.'},
  {img: mac2, title: 'Projet 2', text: 'Maquette HTML/CSS responsive.'}
]

/*===================
  REFS POUR LA LIGHTBOX
===================*/

const lightboxImage = ref<string | null>(null)
const lightboxRef = ref<HTMLElement | null>(null)
const imageRef = ref<HTMLElement | null>(null)

/*===================
  ANIMATION OUVERTURE DE L'IMAGE
===================*/

async function openImage(src: string) {
  lightboxImage.value = src
  await nextTick()

  gsap.from(lightboxRef.value, {
    opacity: 0,
    duration: 0.5,
    ease: 'power1.out'
  })

  gsap.from(imageRef.value, {
    opacity: 0,
    duration: 0.5,
    ease: 'power1.out'
  })
}

/*===================
  ANIMATION CLOSE IMAGE
===================*/

async function closeImage() {
  await nextTick()

  const tl = gsap.timeline({
    onComplete: () => (lightboxImage.value = null)
  })

  tl.to(imageRef.value, {
    opacity: 0,
    duration: 0.5,
    ease: 'power1.out'
  })

  tl.to(lightboxRef.value, {
    opacity: 0,
    duration: 0.5,
    ease: 'power1.out'
  })
}
</script>

<template>
  <div class="projects-container">
    <div v-for="(project, index) in projects" :key="index" class="project-card">
      <img :src="project.img" alt="Projet 1" class="project-thumb" @click="openImage(project.img)" />
      <h3>{{ project.title }}</h3>
      <p>{{ project.text }}</p>
    </div>
  </div>
  <!-- LIGHTBOX : fermeture au clic sur le fond uniquement -->
  <div v-if="lightboxImage" class="lightbox" ref="lightboxRef" @click="closeImage()">
    <img :src="lightboxImage" ref="imageRef" class="lightbox-image" />
  </div>
</template>

<style scoped lang="scss">
.projects-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  padding: 2rem;
  margin: 100px auto 20px auto;
  .project-card {
    line-height: 35px;
    text-align: center;
    img {
      width: 100%;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s, box-shadow 0.3s;
      cursor: pointer;
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      }
    }
  }
}

/*===================
  LIGHTBOX
===================*/

.lightbox {
  position: fixed;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  inset: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
}

.lightbox-image {
  cursor: pointer;
  max-width: 70%;
  max-height: 70%;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}
</style>
