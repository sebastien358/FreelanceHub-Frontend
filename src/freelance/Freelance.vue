<template>
  <!-- HERO -->
  <section id="accueil" class="hero section">
    <div class="container hero-inner">
      <div class="hero-left">
        <h1 ref="heroTitle" class="hero-title">Développeur<br />freelance</h1>
        <p class="hero-desc">Je crée des sites web sur mesure, efficaces et performants.</p>
        <button ref="ctaBtn" class="cta-btn">Voir mes projets</button>
      </div>
      <div class="hero-right">
        <!-- Remplace par ton image laptop -->
        <img src="/src/assets/images/freelance-1.jpg" alt="laptop" class="hero-mock" />
      </div>
    </div>
  </section>

  <!-- COMPETENCES -->
  <section class="section competences" aria-label="Compétences">
    <div class="container">
      <h2 class="section-title" ref="skillsTitle">Compétences</h2>
      <div class="skills-grid" ref="skillsGrid">
        <div class="skill-card" v-for="(s, i) in skills" :key="s.name" :data-index="i">
          <div class="skill-icon">
            <img :src="s.icon" :alt="s.name" />
          </div>
          <div class="skill-name">{{ s.name }}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- PROJETS -->
  <section id="projets" class="section projets">
    <div class="container">
      <h2 class="section-title" ref="projectsTitle">Projets</h2>
      <div class="projects-grid" ref="projectsGrid">
        <article class="project-card" v-for="(p, i) in projects" :key="p.title" :data-index="i">
          <div class="project-media">
            <img :src="p.image" :alt="p.title" />
          </div>
          <div class="project-footer">
            <h3>{{ p.title }}</h3>
            <p class="project-sub">{{ p.sub }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// refs
const heroTitle = ref(null)
const ctaBtn = ref(null)
const skillsTitle = ref(null)
const skillsGrid = ref(null)
const projectsTitle = ref(null)
const projectsGrid = ref(null)

// sample data — remplace les images par tes fichiers dans /src/assets/
const skills = [
  { name: 'Vue.js', icon: '/src/assets/images/vue-js.png' },
  { name: 'Symfony', icon: '/src/assets/images/php.png' },
  //{ name: 'Symfony', icon: '/src/assets/images/symfony.png' },
  { name: 'GSAP', icon: '/src/assets/images/gsap-white.svg'},
  { name: 'FileZilla', icon: '/src/assets/images/filezilla.png' },
]

const projects = [
  { title: 'Application de gestion', sub: 'Vue + Symfony', image: '/src/assets/images/freelance-2.png' },
  { title: 'E-commerce', sub: 'Frontend & API', image: '/src/assets/images/freelance-3.png'}
]


onMounted(() => {
  // HERO intro
  gsap.from(heroTitle.value, {
    opacity: 0,
    y: 80,
    duration: 1.1,
    ease: 'power3.out',
    delay: 0.15
  })
  gsap.from('.hero-desc', { opacity: 0, y: 40, duration: 0.9, delay: 0.35 })
  gsap.from('.hero-mock', { opacity: 0, x: 60, duration: 1.1, delay: 0.25, ease: 'power3.out' })

  // CTA entrance + hover handled with event listeners below
  gsap.from(ctaBtn.value, {
    opacity: 0,
    y: 40,
    duration: 0.9,
    delay: 0.6,
    ease: 'power3.out'
  })

  // CTA hover glow
  ctaBtn.value.addEventListener('mouseenter', () => {
    gsap.to(ctaBtn.value, { scale: 1.06, boxShadow: '0 15px 40px rgba(59,130,246,0.28)', duration: 0.25 })
  })
  ctaBtn.value.addEventListener('mouseleave', () => {
    gsap.to(ctaBtn.value, { scale: 1, boxShadow: '0 0 0 rgba(0,0,0,0)', duration: 0.25 })
  })

  // Skills title fade on scroll
  gsap.from(skillsTitle.value, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    scrollTrigger: {
      trigger: skillsTitle.value,
      start: 'top 75%'
    }
  })

  // Skills grid stagger reveal
  const icons = skillsGrid.value.querySelectorAll('.skill-icon')
  gsap.from(icons, {
    opacity: 0,
    y: 30,
    stagger: 0.12,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: skillsGrid.value,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  })

  // Projects title + cards reveal with slight upward motion + subtle parallax on images
  gsap.from(projectsTitle.value, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    scrollTrigger: {
      trigger: projectsTitle.value,
      start: 'top 75%'
    }
  })

  const projectCards = projectsGrid.value.querySelectorAll('.project-card')
  gsap.from(projectCards, {
    opacity: 0,
    y: 50,
    stagger: 0.12,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: projectsGrid.value,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  })

  // small parallax on project images when card scrolls
  projectCards.forEach(card => {
    const img = card.querySelector('img')
    gsap.to(img, {
      yPercent: 8,
      ease: 'none',
      scrollTrigger: {
        trigger: card,
        scrub: true,
        start: 'top bottom',
        end: 'bottom top'
      }
    })
  })
})
</script>

<style lang="scss" scoped>
/* Variables */
$bg: #070811;
$panel: #061025;
$neon: #4fb3ff;
$muted: #9aa7b6;
$glass: rgba(255, 255, 255, 0.03);

/* container */
.container {
  width: min(1200px, 92%);
  margin: 0 auto;
}

/* sections */
.section {
  padding: 80px 0;
}

/* HERO */
.hero-inner {
  display: grid;
  grid-template-columns: 1fr 540px;
  gap: 40px;
  align-items: center;
  padding-top: 48px;
  padding-bottom: 48px;
}

.hero-left {
  .hero-title {
    font-size: clamp(40px, 6vw, 72px);
    line-height: 0.98;
    color: #e6f2ff;
    margin: 0 0 20px;
    text-shadow: 0 6px 30px rgba(0, 0, 0, 0.6);
  }
  .hero-desc {
    color: $muted;
    margin-bottom: 28px;
    font-size: 1.05rem;
  }

  .cta-btn {
    background: linear-gradient(180deg, #1f6fe8, #216be2);
    color: white;
    padding: 14px 26px;
    border-radius: 12px;
    border: none;
    font-weight: 700;
    box-shadow: 0 10px 30px rgba(33, 107, 226, 0.14);
    cursor: pointer;
    transition:
      transform 0.18s ease,
      box-shadow 0.18s ease;
    &:active {
      transform: translateY(1px);
    }
  }
}

.hero-right {
  display: flex;
  align-items: center;
  justify-content: center;
  .hero-mock {
    width: 100%;
    max-width: 520px;
    border-radius: 12px;
    filter: drop-shadow(0 20px 50px rgba(0, 0, 0, 0.75));
    transform: translateZ(0);
    opacity: 0.98;
  }
}

/* Competences */
.section-title {
  font-size: 2.6rem;
  text-align: center;
  margin-bottom: 28px;
  color: $neon;
  text-shadow: 0 8px 40px rgba($neon, 0.06);
  opacity: 1;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
  margin-top: 10px;
  .skill-card {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
    border-radius: 14px;
    padding: 26px;
    min-height: 130px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.03);
    transition:
      transform 0.22s ease,
      box-shadow 0.22s ease;
    &:hover {
      transform: translateY(-8px);
      box-shadow:
        0 20px 40px rgba(0, 0, 0, 0.6),
        0 0 30px rgba($neon, 0.06);
    }
    .skill-icon img {
      width: 56px;
      height: 56px;
      object-fit: contain;
      filter: drop-shadow(0 6px 18px rgba(0, 0, 0, 0.5));
    }
    .skill-name {
      margin-top: 12px;
      color: #dcefff;
      font-weight: 600;
    }
  }
}

/* Projects */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px;
  margin-top: 20px;
}

.project-card {
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.03);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.02));
  .project-media {
    height: 170px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform-origin: center;
      transition: transform 0.4s ease;
    }
  }
  .project-footer {
    padding: 18px;
    text-align: center;
    h3 {
      margin: 0 0 6px;
      color: #e9f5ff;
    }
    .project-sub {
      color: $muted;
      font-size: 0.95rem;
      margin: 0;
    }
  }
  &:hover img {
    transform: scale(1.06);
  }
}

/* RESPONSIVE */
@media (max-width: 980px) {
  .hero-inner {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .hero-right {
    margin-top: 28px;
  }
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .projects-grid {
    grid-template-columns: 1fr;
  }
  .header-inner {
    padding: 14px 0;
  }
}
@media (max-width: 520px) {
  .hero-title {
    font-size: 36px;
  }
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
