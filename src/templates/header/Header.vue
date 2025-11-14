<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue'
import gsap from 'gsap'
import Calc from '@/templates/calc/Calc.vue'

const isOpen = ref(false)
const menuRef = ref(null)

function toggleMenu() {
  isOpen.value = !isOpen.value
}

onMounted(async () => {
  await nextTick()
  watch(isOpen, async (newVal) => {
    if (menuRef.value && newVal) {
      gsap.to(menuRef.value, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power3.in',
      })
    } else {
      gsap.to(menuRef.value, {
        opacity: 0,
        y: 40,
        x: 12,
        duration: 0.3,
        ease: 'power3.in',
      })
    }
  })
})
</script>

<template>
 <header class="site-header">
    <div class="header-inner">
      <div class="brand">
        <p>Sébastien Petit</p>
      </div>
      <ul class="header-link">
        <li><router-link to="/freelance">Accueil</router-link></li>
        <li><router-link to="/service">Services</router-link></li>
        <li><router-link to="project">Projets</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
      </ul>
      <div class="menu-tablet">
        <Calc :isOpen="isOpen" @close="isOpen = false" :background="true" />
        <font-awesome-icon @click="toggleMenu()" icon="fa-solid fa-bars" />
        <ul class="menu-tablet__link" ref="menuRef">
          <li><router-link to="/freelance">Accueil</router-link></li>
          <li><router-link to="/service">Services</router-link></li>
          <li><router-link to="project">Projets</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.site-header {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  z-index: 100;
  position: sticky;
  top: 0;
  backdrop-filter: blur(6px);
  background: linear-gradient(180deg, rgba(5, 7, 11, 0.55), rgba(5, 7, 11, 0.2));
  padding: 0 20px;
  @media (max-width: 991.98px) {
    width: 100%;
    padding: 0 20px;
  }
  @media (max-width: 575.98px) {
    width: 100%;
    padding: 0 10px 0 13px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  }
  .header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    @media (max-width: 575.98px) {
      border-bottom: none;
    }
  }
  .brand {
    white-space: nowrap;
    font-weight: 600;
    color: #fff;
  }
  .header-link {
    display: flex;
    align-items: center;
    column-gap: 14px;
    @media (max-width: 991.98px) {
      display: none;
    }
    a.router-link-active {
      color: #4fb3ff;
    }
    a {
      color: #bbb;
      text-decoration: none;
      transition: 0.3s;
      &:hover {
        color: #4fb3ff;
      }
    }
  }
}

.menu-tablet {
  position: relative;
  @media (min-width: 991.98px) {
    display: none;
  }
  .fa-bars {
    font-size: 24px;
    color: white;
    cursor: pointer;
    transition: transform 0.3s ease;
    @media (max-width: 575.98px) {
      font-size: 22px;
    }
    &:hover {
      transform: scale(1.1);
    }
  }
  &__link {
    position: absolute;
    top: 46px;
    right: 11px;
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    padding: 20px 30px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    opacity: 0;
    transform: translateY(40px);
    a {
      color: white;
      font-weight: 500;
      transition: color 0.3s ease;
      &:hover {
        color: #00c8ff;
      }
      &.router-link-active {
        color: #00c8ff;
      }
    }
  }
}
</style>
