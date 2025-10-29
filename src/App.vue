<template>
  <div class="site">
    <Header />
    <main>
      <Freelance />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Freelance from '@/freelance/Freelance.vue'
import Header from '@/templates/header/Header.vue'
import Footer from '@/templates/footer/Footer.vue'
</script>

<style lang="scss" scoped>
/* Variables */
$bg: #070811;
$panel: #061025;
$neon: #4fb3ff;
$muted: #9aa7b6;
$glass: rgba(255,255,255,0.03);

* { box-sizing: border-box; }

.site {
  background: linear-gradient(180deg, darken($bg, 2%), $bg 60%);
  color: #e8f0ff;
  min-height: 100vh;
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

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
    text-shadow: 0 6px 30px rgba(0,0,0,0.6);
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
    box-shadow: 0 10px 30px rgba(33,107,226,0.14);
    cursor: pointer;
    transition: transform 0.18s ease, box-shadow .18s ease;
    &:active{ transform: translateY(1px); }
  }
}

.hero-right {
  display:flex;
  align-items:center;
  justify-content:center;
  .hero-mock {
    width: 100%;
    max-width: 520px;
    border-radius: 12px;
    filter: drop-shadow(0 20px 50px rgba(0,0,0,0.75));
    transform: translateZ(0);
    opacity: .98;
  }
}

/* Competences */
.section-title {
  font-size: 2.6rem;
  text-align: center;
  margin-bottom: 28px;
  color: $neon;
  text-shadow: 0 8px 40px rgba($neon, 0.06);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
  margin-top: 10px;
  .skill-card {
    background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
    border-radius: 14px;
    padding: 26px;
    min-height: 130px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    border: 1px solid rgba(255,255,255,0.03);
    transition: transform .22s ease, box-shadow .22s ease;
    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.6), 0 0 30px rgba($neon, 0.06);
    }
    .skill-icon img { width: 56px; height:56px; object-fit:contain; filter: drop-shadow(0 6px 18px rgba(0,0,0,0.5)); }
    .skill-name { margin-top: 12px; color: #dcefff; font-weight:600 }
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
  border: 1px solid rgba(255,255,255,0.03);
  background: linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.02));
  .project-media {
    height: 170px;
    overflow: hidden;
    img { width:100%; height:100%; object-fit:cover; transform-origin:center; transition: transform .4s ease; }
  }
  .project-footer {
    padding: 18px;
    h3 { margin: 0 0 6px; color: #e9f5ff; }
    .project-sub { color: $muted; font-size: .95rem; margin:0;}
  }
  &:hover img { transform: scale(1.06); }
}

/* RESPONSIVE */
@media (max-width: 980px) {
  .hero-inner { grid-template-columns: 1fr; text-align: center; }
  .hero-right { margin-top: 28px; }
  .skills-grid { grid-template-columns: repeat(2, 1fr); }
  .projects-grid { grid-template-columns: 1fr; }
  .header-inner { padding: 14px 0; }
}
@media (max-width: 520px) {
  .hero-title { font-size: 36px; }
  .skills-grid { grid-template-columns: 1fr; }
}
</style>
