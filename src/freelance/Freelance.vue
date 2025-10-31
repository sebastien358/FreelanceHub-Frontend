<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
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
const serviceTitle = ref(null)
const serviceList = ref(null)
const testimonialsTitle = ref(null)
const testimonialsGrid = ref(null)
const refForm = ref(null)

// sample data — remplace les images par tes fichiers dans /src/assets/
const skills = [
  { name: 'Vue.js', icon: '/src/assets/images/vue-js.png' },
  { name: 'Symfony', icon: '/src/assets/images/php.png' },
  { name: 'GSAP', icon: '/src/assets/images/gsap-white.svg'},
  { name: 'FileZilla', icon: '/src/assets/images/filezilla.png' },
]

const projects = [
  { title: 'Application de gestion', sub: 'Vue + Symfony', image: '/src/assets/images/freelance-2.png' },
  { title: 'E-commerce', sub: 'Frontend & API', image: '/src/assets/images/freelance-3.png'}
]

const testimonials = [
  {
    text: "Super collaboration ! Travail rapide, clair et efficace. Le site est fluide et très pro.",
    name: "Julie M.",
    role: "Graphiste freelance",
    avatar: "/src/assets/images/julie.jpg"
  },
  {
    text: "Une excellente expérience, le site livré est moderne et parfaitement optimisé.",
    name: "Thomas R.",
    role: "Entrepreneur",
    avatar: "/src/assets/images/thomas.jpg"
  },
  {
    text: "Communication fluide, idées pertinentes, et surtout une vraie maîtrise du front-end.",
    name: "Amélie K.",
    role: "Chef de projet digital",
    avatar: "/src/assets/images/amelie.jpg"
  }
]

onMounted(async () => {
  await nextTick()
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
    gsap.to(ctaBtn.value, { scale: 1.06, boxShadow: '0 0 20px #3B82F6, 0 0 40px #3B82F6', duration: 0.25 })
  })
  ctaBtn.value.addEventListener('mouseleave', () => {
    gsap.to(ctaBtn.value, { scale: 1, boxShadow: '0 0 30px #3B82F6', duration: 0.25 })
  })

  // SERVICE
  gsap.from(serviceTitle.value, {
    opacity: 0,
    y: 60,
    delay: 0.5,
    duration: 0.9,
    ease: 'power2.out',
  })

  // SERVICE
  const cards = serviceList.value.querySelectorAll('.service-card')
  cards.forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      scale: 0.85,
      y: 0,
      duration: 0.6,
      delay: i * 0.20,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: serviceList.value,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })
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


// COMPÉTENCES
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
        toggleActions: 'play none none reverse'
      }
    })
  })

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

  // Témoignages - animation d'apparition
  gsap.from(testimonialsTitle.value, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    scrollTrigger: {
      trigger: testimonialsTitle.value,
      start: 'top 75%'
    }
  })

  const testimonialCards = testimonialsGrid.value.querySelectorAll('.testimonial-card')
  testimonialCards.forEach((testimonialCard) => {
    gsap.from(testimonialCard, {
      opacity: 0,
      y: 0,
      scale: 0.8,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: testimonialsGrid.value,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })
  })

  // FORM TESTAMONIAL

  gsap.from(refForm.value, {
    opacity: 0,
    scale: 0.4,
    duration: 1,
    ease: 'power3.out',
    y: 150,
    scrollTrigger: {
      trigger: refForm.value,
      start: 'top: 80%',
      toggleActions: 'play none none reverse'
    }

  })

  // INPUT FORM TESTAMONIAL

  const inputs = refForm.value.querySelectorAll('input')
  inputs.forEach((input) => {
    input.addEventListener('focus', () => {
      gsap.to(input, {
        borderColor: '#4fb3ff',
        boxShadow: '0 0 10px rgba(79,179,255,0.4)',
        duration: 0.3,
        repeat: 1,
        yoyo: true,
        ease: 'power1.inOut',
      })
    })
  })

  const textarea = refForm.value.querySelector('textarea')
  textarea.addEventListener('focus', () => {
    gsap.to(textarea, {
      borderColor: '#4fb3ff',
      boxShadow: '0 0 10px rgba(79,179,255,0.4)',
      duration: 0.3,
      repeat: 1,
      yoyo: true,
      ease: 'power1.inOut',
      onComplete: () => {
        gsap.to(textarea, {
          borderColor: '#4fb3ff',
          boxShadow: '0 0 10px rgba(79,179,255,0.4)',
          background: '#ecf0f1',
          color: 'black',
          duration: 0.6,
          ease: 'power1.inOut',
          delay: 0.3
        })
      }
    })
  })

  textarea.addEventListener('blur', () => {
    gsap.to(textarea, {
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(79, 179, 255, 0.3)',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
      color: '#eaf3ff',
      duration: 0.3,
      color: '#333',
      duration: 0.3,
      ease: 'power1.inOut'
    })
  })

  // A PROPOS
  gsap.from('.about-title', {
    opacity: 0,
    x: -80,
    duration: 1,
    ease: 'power3.out',
    delay: 0.2,
    scrollTrigger: {
      trigger: '.about',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  })

  gsap.from('.about-text-1', {
    opacity: 0,
    x: 70,
    duration: 1,
    ease: 'power3.out',
    delay: 0.2,
    scrollTrigger: {
      trigger: '.about',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  })

  gsap.from('.about-text-2', {
    opacity: 0,
    x: -70,
    duration: 1,
    ease: 'power3.out',
    delay: 0.2,
    scrollTrigger: {
      trigger: '.about',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  })
})
</script>

<template>
  <!-- HERO -->
  <section id="accueil" class="hero section">
    <div class="container hero-inner">
      <div class="hero-left">
        <h1 ref="heroTitle" class="hero-title">Développeur<br />freelance</h1>
        <p class="hero-desc">Je crée des sites web sur mesure, efficaces et performants.</p>
        <button ref="ctaBtn" class="cta-btn">Me contacter</button>
      </div>
      <div class="hero-right">
        <!-- Remplace par ton image laptop -->
        <img src="/src/assets/images/freelance-1.jpg" alt="laptop" class="hero-mock" />
      </div>
    </div>
  </section>

  <!-- Services -->
  <section id="services" class="services">
    <h2 ref="serviceTitle">Services</h2>
    <div class="service-list" ref="serviceList">
      <div class="service-card">
        <h3>Création de sites web</h3>
        <p>Sites vitrines, portfolios ou landing pages performantes et modernes.</p>
      </div>
      <div class="service-card">
        <h3>Applications sur mesure</h3>
        <p>Applications web dynamiques avec Vue.js et Symfony.</p>
      </div>
      <div class="service-card">
        <h3>Optimisation & SEO</h3>
        <p>Amélioration des performances, du référencement et de l’expérience utilisateur.</p>
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
  <section id="projects" class="section projects">
    <div class="container">
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
    </div>
  </section>

  <!-- TÉMOIGNAGES -->
  <section id="testimonials" class="section testimonials">
    <div class="container">
      <h2 class="section-title" ref="testimonialsTitle">Témoignages</h2>
      <div class="testimonials-grid" ref="testimonialsGrid">
        <article class="testimonial-card" v-for="(t, i) in testimonials" :key="i" :data-index="i">
          <p class="testimonial-text">"{{ t.text }}"</p>
          <div class="testimonial-author">
            <img :src="t.avatar" alt="avatar" class="testimonial-avatar" />
            <div>
              <h4 class="author-name">{{ t.name }}</h4>
              <p class="author-role">{{ t.role }}</p>
            </div>
          </div>
        </article>
      </div>
      <form ref="refForm">
        <div class="container-form">
          <h3>Laissez votre avis</h3>
          <div class="d-flex flex-column form-group">
            <input type="text" id="nom" placeholder="Votre nom" />
          </div>
          <div class="d-flex flex-column form-group">
            <input type="text" id="profession" placeholder="Votre profession" />
          </div>
          <div class="d-flex flex-column form-group">
            <textarea id="message" placeholder="Votre témoignage..." rows="6"></textarea>
          </div>
          <button type="submit" class="btn-testimonial">Envoyer</button>
        </div>
      </form>
    </div>
  </section>

  <!-- À PROPOS -->
  <section id="about" class="section about">
    <h2 class="about-title">À propos</h2>
    <p class="about-text-1">
      Développeur web passionné, je conçois des sites et applications modernes alliant performance,
      fluidité et esthétique. Spécialisé dans l’écosystème Vue.js et Symfony, j’accorde une
      attention particulière à l’expérience utilisateur et à la qualité du code.
    </p>
    <p class="about-text-2">
      Mon objectif : proposer à chaque client une solution sur mesure, rapide et élégante, tout en
      continuant à innover à travers des interfaces animées et dynamiques grâce à GSAP.
    </p>
  </section>
</template>



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

/* SERVICES */
.services {
  max-width: 1100px;
  margin: 100px auto;
  padding: 60px 40px;
  background: rgba(255, 255, 255, 0.04);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  h2 {
    color: #3b82f6;
    font-size: 2.4rem;
    text-align: center;
    margin-bottom: 50px;
  }

  .service-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 40px;
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

    &:hover {
      transform: translateY(-10px) scale(1.03);
      background: rgba(255, 255, 255, 0.12);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.55);
    }
  }
}

/* Competences */
.section-title {
  font-size: 1.6rem;
  text-align: center;
  margin-bottom: 30px;
  color: #7dc9ff;
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
.projects {
  .section-title {
    margin-bottom: 60px;
  }
}
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
      margin: 0 0 6px 0;
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

/* Témoignages */
.testimonials {
  background: rgba(255, 255, 255, 0.04);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  .section-title {
    text-align: center;
    font-size: 2.4rem;
    color: #4fb3ff;
    margin-bottom: 50px;
  }
  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }

  }
  .container-form {
    width: min(100%, 750px);
    margin: 40px auto 0 auto;
    padding: 25px 20px 15px 20px;
    h3 {
      margin-bottom: 22px;
    }
   .form-group {
     margin: 15px 0;
   }
    .btn-testimonial {
      margin: 0;
      font-size: 12px;
    }
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

// About
.about {
  max-width: 800px;
  margin: 40px auto;
  text-align: center;
  padding: 0 20px;
  .about-title {
    color: #3b82f6;
    font-size: 2rem;
    margin-bottom: 20px;
  }
  .about-text-1,
  .about-text-2 {
    color: #ccc;
    line-height: 27px;
    font-size: 1rem;
    margin-bottom: 15px;
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
