<script lang="ts" setup>
import gsap from 'gsap'
import { onMounted, ref, nextTick } from 'vue'

const serviceGrid = ref(null)
const serviceAdvantage = ref(null)

const mainServices = [
  {
    title: '🖥 Site vitrine (1 à 4 pages)',
    description:
      'Présentation d’entreprise ou de service avec design responsive et animations légères.',
    price: '400 € – 800 €',
  },
  {
    title: '⚙ Site dynamique (Vue.js / Symfony)',
    description:
      'Gestion de contenu, formulaires interactifs, filtrage dynamique, sécurité, base de données.',
    price: '900 € – 1 500 €',
  },
  {
    title: '🛒 Site e-commerce',
    description:
      'Intégration Stripe, panier, produits, paiement sécurisé, espace client, gestion des commandes.',
    price: '1 200 € – 2 000 €',
  },
  {
    title: '🔧 Maintenance / Refonte',
    description:
      'Optimisation du code, SEO, correction de bugs, amélioration de la vitesse et du design.',
    price: '200 € – 600 €',
  },
  {
    title: '📈 SEO / Référencement naturel',
    description:
      'Optimisation des balises, structure sémantique, performances et accessibilité pour un meilleur positionnement sur Google.',
    price: '250 €',
  },
  {
    title: '📱 Optimisation mobile / Responsive',
    description:
      'Ajustement du design et des interactions pour un rendu parfait sur tous les écrans (mobile, tablette, desktop).',
    price: '180 €',
  },
]

const extraServices = [
  {
    title: 'Pagination dynamique',
    description: 'Navigation fluide entre les pages ou listes d’articles.',
    price: '180 €',
  },
  {
    title: 'Lazy Load (chargement progressif)',
    description: 'Optimise les performances en chargeant le contenu à la demande.',
    price: '200 €',
  },
  {
    title: 'Filtration / Recherche avancée',
    description: 'Filtres dynamiques par catégorie, prix, mot-clé, tags, etc.',
    price: '300 €',
  },
  {
    title: 'Authentification / Sécurité complète',
    description: 'Login, rôles utilisateurs, reset password, tokens JWT, sécurisation des routes.',
    price: '650 €',
  },
  {
    title: 'Animations (Vue.js / GSAP)',
    description: 'Effets visuels, transitions fluides, apparition au scroll, parallaxe, etc.',
    price: '250 €',
  },
  {
    title: 'Mise en ligne / Hébergement',
    description: 'Configuration serveur, transfert FTP, DNS, domaine, SSL, tests.',
    price: '220 €',
  },
]

onMounted(async () => {
  await nextTick()

  // Animation des cartes
  const cards = serviceGrid.value?.querySelectorAll('.service-card')
  if (cards) {
    gsap.from(cards, { opacity: 0, stagger: 0.1 })
  }

  const elemCards = serviceAdvantage.value?.querySelectorAll('.service-card')
  if (elemCards) {
    gsap.from(elemCards, { opacity: 0, stagger: 0.1, delay: 0.6 })
  }

  // Animation du titre lettre par lettre
  const title = document.getElementById('animated-title')
  if (!title) return

  const text = title.textContent || ''
  title.textContent = ''



  text.split('').forEach((char, i) => {
    const span = document.createElement('span')
    span.textContent = char
    span.style.animationDelay = `${i * 0.05}s`
    title.appendChild(span)
  })

})
</script>

<template>
  <section class="services">
    <div class="container">
      <h1>Mes Services</h1>
      <p class="intro">
        Des prestations modernes, performantes et adaptées à vos besoins — du site vitrine à
        l’application complète.
      </p>

      <div class="services-grid" ref="serviceGrid">
        <div class="service-card" v-for="(service, i) in mainServices" :key="i">
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
          <p class="price">
            <span class="icon-money">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12 2a10 10 0 100 20 10 10 0 000-20zm.5 15v1h-1v-1a3 3 0 01-3-3h1a2 2 0 002 2v-3a3 3 0 01-.5-5.9V6h1v1.1a3 3 0 01.5 5.9v3a2 2 0 002-2h1a3 3 0 01-3 3z"
                />
              </svg>
            </span>
            {{ service.price }}
          </p>
        </div>
      </div>

      <h2 class="title-prestation">💻 Détail des prestations</h2>

      <div class="services-grid" ref="serviceAdvantage">
        <div class="service-card" v-for="(extra, i) in extraServices" :key="i">
          <h3>{{ extra.title }}</h3>
          <p>{{ extra.description }}</p>
          <p class="price">
            <span class="icon-money">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12 2a10 10 0 100 20 10 10 0 000-20zm.5 15v1h-1v-1a3 3 0 01-3-3h1a2 2 0 002 2v-3a3 3 0 01-.5-5.9V6h1v1.1a3 3 0 01.5 5.9v3a2 2 0 002-2h1a3 3 0 01-3 3z"
                />
              </svg>
            </span>
            {{ extra.price }}
          </p>
        </div>
      </div>

      <section class="extra-services">
        <h3>Services complémentaires</h3>
        <p class="extra-note">
          Des options supplémentaires pour affiner votre projet avant le développement.
        </p>

        <div class="extra-item">
          <h4 id="animated-title">🎨 Maquette & Design personnalisé</h4>
          <p>Création d’une maquette sur mesure avant développement.</p>
          <span class="price">à partir de 150 €</span>
        </div>
      </section>

      <div class="daily-rate">
        <h2>📅 Tarif journalier</h2>
        <p>
          Entre <strong>350 €</strong> et <strong>500 €</strong> / jour selon la complexité du
          projet et le niveau d’intégration souhaité.
        </p>
        <p class="note">
          🧾 Tous les projets incluent un suivi complet, des sauvegardes et une documentation
          claire.
        </p>
      </div>
      <div class="cta-container">
        <router-link to="/contact" class="cta-button"> Demander un devis </router-link>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
#animated-title span {
  display: inline-block;
  opacity: 0;
  transform: translateY(10px);
  animation: letterFade 0.4s forwards ease-out;
}

@keyframes letterFade {
  from {

    opacity:0; transform:
    translateY(10px); }
  to   {
    opacity:1; transform: translateY(0);
  }
}
</style>

<style scoped lang="scss">
@keyframes letterFade {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.extra-services {
  margin-top: 4rem;
  text-align: center;
  h3 {
    font-size: 1.7rem;
    font-weight: 600;
    color: #f5f5f5;
    margin: 70px 0 12px 0;
    letter-spacing: 0.5px;
   }
  .extra-note {
    color: #9aa7b6;
    font-size: 0.95rem;
    margin-bottom: 20px;
    opacity: 0.85;
  }
  .extra-item {
    display: inline-block;
    border-radius: 1rem;
    padding: 1.5rem 0;
    color: #cdd4e0;
    font-size: 0.95rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.06);
    transition: all 0.3s ease;
    &:hover {
      transform: translateY(-3px);
      background: rgba(255, 255, 255, 0.08);
    }
    #animated-title {
      font-size: 1.2rem;
      font-weight: 600;
      color: #9ec8ff;
      display: inline-block;
    }
    .price {
      display: block;
      margin-top: 0.5rem;
      font-weight: 600;
      color: white;
    }
  }
}

.services {
  padding: 5rem 1rem;
  background: #0c0c0c;
  color: #fff;
  .container {
    max-width: 1100px;
    margin: 0 auto;
    text-align: center;
    h2 {
      color: #e5e5e5;
      font-weight: 600;
      margin: 70px 0 40px 0;
      font-size: 1.7rem;
    }
  }
  h1 {
    margin-bottom: 1rem;
    font-size: 2.3rem;
    font-weight: 700;
    color: #e5e5e5;
  }
  .intro {
    color: #bbb;
    font-size: 1.1rem;
    margin-bottom: 3rem;
  }
  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }
}
.service-card {
  position: relative;
  background: #141414;
  border-radius: 1.25rem;
  padding: 2rem;
  color: #fff;
  overflow: hidden;
  transition:
    transform 0.4s ease,
    box-shadow 0.4s ease;
  border: 1px solid rgba(79, 179, 255, 0.15);
  z-index: 0;
  &:hover {
    transform: translateY(-8px) scale(1.015);
    box-shadow: 0 8px 25px rgba(79, 179, 255, 0.25);
  }

  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: conic-gradient(
      from 0deg,
      rgba(79, 179, 255, 0.9),
      rgba(79, 179, 255, 0) 10%,
      rgba(79, 179, 255, 0.9) 20%,
      rgba(79, 179, 255, 0) 30%,
      rgba(79, 179, 255, 0.9) 40%,
      rgba(79, 179, 255, 0) 50%,
      rgba(79, 179, 255, 0.9) 60%,
      rgba(79, 179, 255, 0) 70%,
      rgba(79, 179, 255, 0.9) 80%,
      rgba(79, 179, 255, 0) 100%
    );
    border-radius: inherit;
    z-index: 1;
    filter: blur(3px);
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    animation: papillonRotate 4s linear infinite;
  }
  &:hover::before {
    opacity: 1;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 1px;
    background: #141414;
    border-radius: inherit;
    z-index: 2;
  }
  h3,
  p,
  .price {
    position: relative;
    z-index: 3;
  }

  h3 {
    color: #4fb3ff;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  p {
    line-height: 1.6;
    color: #ccc;
  }

  .price {
    color: #4fb3ff;
    font-weight: 700;
    margin-top: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    .icon-money {
      width: 18px;
      height: 18px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      svg {
        width: 100%;
        height: 100%;
        fill: #4fb3ff;
        transition:
          transform 0.3s ease,
          filter 0.3s ease;
        filter: drop-shadow(0 0 4px rgba(79, 179, 255, 0.5));
      }
    }
    &:hover .icon-money svg {
      transform: scale(1.15);
      filter: drop-shadow(0 0 8px rgba(79, 179, 255, 0.8));
    }
  }
}
.daily-rate {
  margin-top: 3rem;
  text-align: center;
  p {
    color: #ccc;
  }
  strong {
    color: #4fb3ff;
  }
  .note {
    margin-top: 1rem;
    font-size: 0.95rem;
  }
}
.cta-container {
  margin-top: 3rem;
  text-align: center;
  .cta-button {
    display: inline-block;
    padding: 0.9rem 1.8rem;
    border-radius: 0.75rem;
    background: linear-gradient(90deg, #4fb3ff, #0096ff);
    color: #fff;
    font-weight: 600;
    text-decoration: none;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 0 15px rgba(79, 179, 255, 0.6);
    }
  }
}

@keyframes papillonRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
