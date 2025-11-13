<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useRouter } from 'vue-router'
import TestimonialForm from '@/templates/testimonial/TestimonialForm.vue'

const router = useRouter()

gsap.registerPlugin(ScrollTrigger)

// refs
const heroTitle = ref(null)
const ctaBtn = ref(null)
const skillsTitle = ref(null)
const skillsGrid = ref(null)
const projectsTitle = ref(null)
const projectsGrid = ref(null)
const serviceTitle = ref(null)
const serviceList = ref(null)
const testimonialsTitle = ref(null)
const testimonialsGrid = ref(null)

/* ===========================
  sample data — remplace les images par tes fichiers dans /src/assets/
=========================== */

import vueIcon from '@/assets/images/vue-js.png'
import symfonyIcon from '@/assets/images/php.png'
import gsapIcon from '@/assets/images/gsap-white.svg'
import filezillaIcon from '@/assets/images/filezilla.png'

/* ===========================
  Skills
=========================== */

const skills = [
  { name: 'Vue.js', icon: vueIcon },
  { name: 'Symfony', icon: symfonyIcon },
  { name: 'GSAP', icon: gsapIcon },
  { name: 'FileZilla', icon: filezillaIcon },
]

import freelance2 from '@/assets/images/freelance-2.png'
import freelance3 from '@/assets/images/freelance-3.png'

const projects = [
  { title: 'Application de gestion', sub: 'Vue + Symfony', image: freelance2 },
  { title: 'E-commerce', sub: 'Frontend & API', image: freelance3 },
]

const services = [
  {
    title: 'Création de sites web',
    txt: 'Sites vitrines, portfolios ou landing pages performantes et modernes.',
  },
  { title: 'Applications sur mesure', txt: 'Applications web dynamiques avec Vue.js et Symfony.' },
  {
    title: 'Optimisation & SEO',
    txt: 'Amélioration des performances, du référencement et de l’expérience utilisateur.',
  },
]

/* ===========================
  Testimonials
=========================== */

import { useTestimonialStore } from '@/stores/testimonialStore.ts'
import amelieAvatar from '@/assets/images/amelie.jpg'
import thomasAvatar from '@/assets/images/thomas.jpg'
import julieAvatar from '@/assets/images/julie.jpg'

const testimonialStore = useTestimonialStore()

/* ===========================
  Afficher les avis de puis la base de données
  const firstThreePublished = computed(() => testimonialStore.firstThreePublished)
=========================== */

onMounted(async () => {
  try {
    await testimonialStore.getTestimonialList()
  } catch (e) {
    console.error(e)
  }
})

const testimonials = [
  {
    message:
      'Super collaboration ! Travail rapide, clair et efficace. Le site est fluide et très pro.',
    name: 'Julie M.',
    job: 'Graphiste freelance',
    avatar: julieAvatar,
  },
  {
    message: 'Une excellente expérience, le site livré est moderne et parfaitement optimisé.',
    name: 'Thomas R.',
    job: 'Entrepreneur',
    avatar: thomasAvatar,
  },
  {
    message: 'Communication fluide, idées pertinentes, et surtout une vraie maîtrise du front-end.',
    name: 'Amélie K.',
    job: 'Chef de projet digital',
    avatar: amelieAvatar,
  },
]

/* ===========================
    ANIMATIONS GSPA
=========================== */

onMounted(async () => {
  await nextTick()

  /* ===========================
    HERO
  =========================== */

  gsap.from(heroTitle.value, {
    opacity: 0,
    y: 80,
    duration: 1.1,
    ease: 'power3.out',
    delay: 0.15,
  })

  gsap.from('.hero-desc', { opacity: 0, y: 40, duration: 0.9, delay: 0.35 })
  gsap.from('.hero-mock', { opacity: 0, x: 60, duration: 1.1, delay: 0.25, ease: 'power3.out' })

  gsap.from(ctaBtn.value, {
    opacity: 0,
    y: 40,
    duration: 0.9,
    delay: 0.6,
    ease: 'power3.out',
  })

  /* ===========================
    HERO
  =========================== */

  ctaBtn.value.addEventListener('mouseenter', () => {
    gsap.to(ctaBtn.value, {
      scale: 1.06,
      boxShadow: '0 0 20px #3B82F6, 0 0 40px #3B82F6',
      duration: 0.25,
    })
  })
  ctaBtn.value.addEventListener('mouseleave', () => {
    gsap.to(ctaBtn.value, { scale: 1, boxShadow: '0 0 30px #3B82F6', duration: 0.25 })
  })

  /* ===========================
    SERVICES
  =========================== */

  gsap.from(serviceTitle.value, {
    opacity: 0,
    y: 60,
    delay: 0.5,
    duration: 0.9,
    ease: 'power2.out',
  })

  /* ===========================
   SERVICES
  =========================== */

  const cards = document.querySelectorAll('.service-card')

  cards.forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      scale: 0.85,
      y: 0,
      duration: 0.6,
      delay: i * 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })
  })

  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        duration: 0.3,
        y: -10,
        scale: 1.03,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.55)',
        ease: 'power2.out',
      })
    })

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        duration: 0.3,
        y: 0,
        scale: 1,
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.35)',
        ease: 'power2.inOut',
      })
    })
  })

  /* ===========================
    SKILLS
  =========================== */

  function initGsapLogoSkill() {
    const icons = skillsGrid.value.querySelectorAll('.skill-icon')
    if (window.innerWidth > 576) {
      gsap.from(skillsTitle.value, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: skillsTitle.value,
          start: 'top 75%',
        },
      })

      gsap.from(icons, {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        //delay: 0.25,
        scrollTrigger: {
          trigger: skillsGrid.value,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      })
    } else {
      gsap.from(skillsTitle.value, {
        opacity: 0,
        y: 60,
        duration: 0.8,
        scrollTrigger: {
          trigger: skillsTitle.value,
          start: 'top 75%',
        },
      })

      gsap.from(icons, {
        opacity: 0,
        y: 60,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: skillsGrid.value,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    }
  }

  initGsapLogoSkill()

  /* ===========================
    PROJECTS
  =========================== */

  function initGsapProject() {

    if (window.innerWidth > 576) {
      gsap.from(projectsTitle.value, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        scrollTrigger: {
          trigger: projectsTitle.value,
          start: 'top 75%',
        }
      })

      const projectCards = projectsGrid.value.querySelectorAll('.project-card')
      projectCards.forEach((projectCard, i) => {
        gsap.from(projectCard, {
          opacity: 0,
          y: 50,
          duration: 0.9,
          ease: 'power3.out',
          delay: i * 0.3,
          scrollTrigger: {
            trigger: projectsGrid.value,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
      })

      projectCards.forEach((card) => {
        const img = card.querySelector('img')
        gsap.to(img, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            scrub: true,
            start: 'top bottom',
            end: 'bottom top',
          },
        })
      })
    } else {
      gsap.from(projectsTitle.value, {
        opacity: 0,
        y: 60,
        duration: 0.8,
        scrollTrigger: {
          trigger: projectsTitle.value,
          start: 'top 75%',
        }
      })

      const projectCards = projectsGrid.value.querySelectorAll('.project-card')
      projectCards.forEach((projectCard, i) => {
        gsap.from(projectCard, {
          opacity: 0,
          y: 60,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: projectsGrid.value,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          delay: i * 0.3
        })
      })

      projectCards.forEach((card) => {
        const img = card.querySelector('img')
        gsap.to(img, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            scrub: true,
            start: 'top bottom',
            end: 'bottom top',
          },
        })
      })
    }
  }

  initGsapProject()

  /* ===========================
    TESTIMONIALS
  =========================== */

  function initAnimationsTestimonial() {
    if (window.innerWidth > 576) {
      gsap.from(testimonialsTitle.value, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        scrollTrigger: {
          trigger: testimonialsTitle.value,
          start: 'top 75%',
        },
      })

      const testimonialCards = testimonialsGrid.value.querySelectorAll('.testimonial-card')
      testimonialCards.forEach((testimonialCard) => {
        gsap.from(testimonialCard, {
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: testimonialsGrid.value,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        })
      })
    } else {
      gsap.from(testimonialsTitle.value, {
        opacity: 0,
        y: 60,
        duration: 0.9,
        scrollTrigger: {
          trigger: testimonialsTitle.value,
          start: 'top 75%',
        },
      })

      const testimonialCards = testimonialsGrid.value.querySelectorAll('.testimonial-card')
      testimonialCards.forEach((testimonialCard, i) => {
        gsap.from(testimonialCard, {
          opacity: 0,
          y: 60,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: testimonialsGrid.value,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          delay: i * 0.3
        })
      })
    }
  }

  initAnimationsTestimonial()

  /* ===========================
    ABOUT
  =========================== */

  function initGsapAbout() {
    if (window.innerWidth > 576) {
      gsap.from('.about-title', {
        opacity: 0,
        x: -80,
        duration: 1,
        ease: 'power3.out',
        delay: 0.15,
        scrollTrigger: {
          trigger: '.about',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from('.about-text-1', {
        opacity: 0,
        x: 70,
        duration: 1,
        ease: 'power3.out',
        delay: 0.15,
        scrollTrigger: {
          trigger: '.about',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from('.about-text-2', {
        opacity: 0,
        x: -70,
        duration: 1,
        ease: 'power3.out',
        delay: 0.15,
        scrollTrigger: {
          trigger: '.about',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    } else {
      gsap.from('.about-title', {
        opacity: 0,
        x: -40,
        duration: 1,
        ease: 'power3.out',
        delay: 0.15,
        scrollTrigger: {
          trigger: '.about',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from('.about-text-1', {
        opacity: 0,
        x: 30,
        duration: 1,
        ease: 'power3.out',
        delay: 0.15,
        scrollTrigger: {
          trigger: '.about',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from('.about-text-2', {
        opacity: 0,
        x: -30,
        duration: 1,
        ease: 'power3.out',
        delay: 0.15,
        scrollTrigger: {
          trigger: '.about',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    }
  }

  initGsapAbout()
})

function redirectToContact() {
  router.push({ path: '/contact' })
}
</script>

<template>
  <div class="container">
    <!-- HERO -->
    <section id="accueil" class="hero section">
      <div class="hero-inner">
        <div class="hero-left">
          <h1 ref="heroTitle" class="hero-title">Développeur web<br />freelance</h1>
          <p class="hero-desc">Je crée des sites modernes et efficaces, adaptés à vos besoins.</p>
          <button @click="redirectToContact()" ref="ctaBtn" class="cta-btn">
            <router-link to="/contact" class="hero-link-contact"> Me contacter </router-link>
          </button>
        </div>
        <div class="hero-right">
          <img src="/src/assets/images/freelance-1.jpg" alt="laptop" class="hero-mock" />
        </div>
      </div>
    </section>

    <!-- SERVICES -->
    <section id="services" class="section services">
      <h2 ref="serviceTitle">Services</h2>
      <div class="service-list" ref="serviceList">
        <div class="service-card" v-for="(service, index) in services" :key="index">
          <h3>{{ service.title }}</h3>
          <p>{{ service.txt }}</p>
        </div>
      </div>
    </section>

    <!-- COMPÉTENCES -->
    <section class="section competences" aria-label="Compétences">
      <h2 class="section-title" ref="skillsTitle">Compétences</h2>
      <div class="skills-grid" ref="skillsGrid">
        <div class="skill-card" v-for="(s, i) in skills" :key="s.name" :data-index="i">
          <div class="skill-icon">
            <img :src="s.icon" :alt="s.name" />
          </div>
          <div class="skill-name">{{ s.name }}</div>
        </div>
      </div>
    </section>

    <!-- PROJECTS -->
    <section id="projects" class="section projects">
      <h2 class="section-title" ref="projectsTitle">Projets</h2>
      <div class="projects-grid" ref="projectsGrid">
        <article class="project-card" v-for="(p, i) in projects" :key="p.title" :data-index="i">
          <div class="project-media">
            <img :src="p.image" :alt="p.title" />
          </div>
          <div class="project-footer">
            <h3 class="project-title">{{ p.title }}</h3>
            <p class="project-sub">{{ p.sub }}</p>
          </div>
        </article>
      </div>
    </section>

    <!-- TESTIMONIALS -->
    <section id="testimonials" class="section testimonials">
      <h2 class="section-title" ref="testimonialsTitle">Témoignages</h2>
      <div class="testimonials-grid" ref="testimonialsGrid">
        <article class="testimonial-card" v-for="(t, i) in testimonials" :key="i" :data-index="i">
          <p class="testimonial-text">"{{ t.message }}"</p>
          <div class="testimonial-author">
            <img :src="t.avatar" alt="avatar" class="testimonial-avatar" />
            <div>
              <h4 class="author-name">{{ t.name }}</h4>
              <p class="author-role">{{ t.job }}</p>
            </div>
          </div>
        </article>
      </div>
      <div class="testimonial-form">
        <TestimonialForm />
      </div>
    </section>

    <!-- ABOUT -->
    <section id="about" class="section about">
      <h2 class="about-title">À propos</h2>
      <p class="about-text-1">
        Développeur web passionné, je conçois des sites et applications modernes alliant
        performance, fluidité et esthétique. Spécialisé dans l’écosystème Vue.js et Symfony,
        j’accorde une attention particulière à l’expérience utilisateur et à la qualité du code.
      </p>
      <p class="about-text-2">
        Mon objectif : proposer à chaque client une solution sur mesure, rapide et élégante, tout en
        continuant à innover à travers des interfaces animées et dynamiques grâce à GSAP.
      </p>
    </section>
  </div>
</template>

<style scoped lang="scss">
/* ===========================
  `CONTAINER`
=========================== */

.container {
  padding: 0 20px;
  overflow-x: hidden;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* ===========================
   SECTION
=========================== */

.section {
  padding: 80px 0;
  @media (max-width: 575.98px) {
    padding: 40px 0;
  }
}

/* ===========================
  HERO
=========================== */

.hero-inner {
  display: grid;
  grid-template-columns: 1fr 540px;
  gap: 40px;
  align-items: center;
  padding-top: 48px;
  padding-bottom: 48px;
  @media (max-width: 575.98px) {
    padding-top: 20px;
    padding-bottom: 0;
  }
}
.hero-left {
  width: 100%;
  .hero-mock {
    width: 100%;
    height: auto;
  }
  .hero-title {
    font-size: clamp(33px, 6vw, 72px);
    color: #e6f2ff;
    margin: 0 0 20px 0;
    text-shadow: 0 6px 30px rgba(0, 0, 0, 0.6);

    @media (max-width: 575.98px) {
      line-height: 40px;
    }
  }
  .hero-desc {
    color: var(--muted);
    margin-bottom: 28px;
    font-size: 1.05rem;
    margin-top: 25px;
    @media (max-width: 575.98px) {
      font-size: 14ox;
      text-align: center;
      line-height: 24px;
    }
  }
  .cta-btn {
    background: linear-gradient(180deg, #1f6fe8, #216be2);
    padding: 14px 26px;
    border-radius: 12px;
    border: none;
    box-shadow: 0 10px 30px rgba(33, 107, 226, 0.14);
    cursor: pointer;
    transition:
      transform 0.18s ease,
      box-shadow 0.18s ease;
    &:active {
      transform: translateY(1px);
    }
    .hero-link-contact {
      font-weight: 700;
      color: white;
    }
  }
}

.hero-right {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .hero-mock {
    width: 100%;
    border-radius: 12px;
    filter: drop-shadow(0 20px 50px rgba(0, 0, 0, 0.75));
    transform: translateZ(0);
    opacity: 0.98;
  }
}

/* ===========================
   SERVICE
=========================== */

.services {
  margin: 100px auto;
  background: rgba(255, 255, 255, 0.04);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  border-radius: 14px;
  padding: 30px 0;
  h2 {
    color: #3b82f6;
    font-size: clamp(25px, 7vw, 37px);
    text-align: center;
    margin-bottom: 50px;
    @media (max-width: 575.98px) {
      margin-bottom: 30px;
    }
  }
  .service-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 40px;
    @media (max-width: 575.98px) {
      gap: 20px;
    }
  }
  .service-card {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 12px;
    padding: 35px 25px;
    width: 300px;
    text-align: center;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
    transform: translateY(0px) scale(1);
    h3 {
      margin: 10px 0 15px;
      color: #60a5fa;
      font-size: 1.3rem;
    }
    p {
      color: #d4d4d4;
      line-height: 1.6;
      font-size: 0.95rem;
    }
  }
}

/* ===========================
   COMPÉTENCE
=========================== */

.competences {
  margin-bottom: 100px;
  @media (max-width: 575.98px) {
    margin-bottom: 60px;
  }
}

.section-title {
  font-size: 1.6rem;
  text-align: center;
  margin-bottom: 50px;
  color: #7dc9ff;
  text-shadow: 0 8px 40px rgba(var(--neon), 0.06);
  opacity: 1;
  @media (max-width: 575.98px) {
    margin-bottom: 35px;
  }
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
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
        0 0 30px rgba(var(--neon), 0.06);
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

/* ===========================
   PROJECTS
=========================== */

.projects {
  margin-bottom: 70px;
  @media (max-width: 575.98px) {
    margin-bottom: 90px;
  }
  .section-title {
    margin-bottom: 60px;
    @media (max-width: 575.98px) {
      margin-bottom: 35px;
    }
  }
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px;
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
      margin: 0 0 6px 0;
      color: #e9f5ff;
    }
    .project-sub {
      color: var(--muted);
      font-size: 0.95rem;
      margin: 0;
    }
    &:hover img {
      transform: scale(1.06);
    }
  }
}

/* ===========================
   TESTIMONIALS
=========================== */

.testimonials {
  background: rgba(255, 255, 255, 0.04);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  border-radius: 14px;
  .section-title {
    text-align: center;
    color: #4fb3ff;
    font-size: 1.7rem;
    @media (max-width: 575.98px) {
      margin-bottom: 35px;
    }
  }
  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    margin: 0 20px;
    @media (max-width: 991.98px) {
      grid-template-columns: 1fr;
    }
    @media (max-width: 575.98px) {
      gap: 20px;
    }
  }
  .testimonial-form {
    margin: 0 20px;
  }
  .testimonial-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 14px;
    padding: 30px 24px;
    backdrop-filter: blur(8px);
    transition: all 0.3s ease;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
    }
    .testimonial-text {
      color: #dbeaff;
      font-size: 1rem;
      line-height: 1.6;
      font-style: italic;
      margin-bottom: 20px;
    }
    .testimonial-author {
      display: flex;
      align-items: center;
      gap: 14px;
      .testimonial-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
      }
      .author-name {
        color: #fff;
        font-weight: 600;
        margin: 0;
      }
      .author-role {
        color: #9aa7b6;
        font-size: 0.9rem;
        margin: 0;
      }
    }
  }
}

/* ===========================
   ABOUT
=========================== */

.about {
  margin: 70px auto 100px auto;
  @media (max-width: 991.98px) {
    margin: 60px auto 50px auto;
  }
  @media (max-width: 575.98px) {
    margin: 50px auto 30px auto;
  }
  text-align: center;
  .about-title {
    color: #3b82f6;
    font-size: clamp(20px, 6vw, 30px);
    margin-bottom: 25px;
  }
  .about-text-1,
  .about-text-2 {
    color: #ccc;
    line-height: 27px;
    font-size: 1rem;
    margin-bottom: 15px;
  }
}

/* ===========================
   RESPONSIVE
=========================== */

@media (max-width: 991.98px) {
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

@media (max-width: 575.98px) {
  .hero-title {
    font-size: 36px;
  }
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
