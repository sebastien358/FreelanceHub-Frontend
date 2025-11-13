<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore.ts'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

function isLogged() {
  return authStore.isLogged
}

function roleAdmin() {
  return authStore.roleAdmin()
}

function logout() {
  authStore.logout()
  router.push({ path: '/freelance' })
}
</script>

<template>
 <footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-left">
        <span>© Sébastien Petit</span>
        <span class="separator">-</span>
        <div v-if="!isLogged()">
          <router-link to="/login" class="link-footer">
            Login
          </router-link>
        </div>
        <div v-else>
          <div class="footer-admin-link">
            <router-link @click="logout()" to="" class="link-footer">
              Logout
            </router-link>
            <router-link v-if="roleAdmin()" to="/admin" class="link-footer">
              Admin
            </router-link>
          </div>
        </div>
      </div>
      <div class="footer-right">
        <span>sebastien.p0027@gmail.com</span>
        <span class="separator">-</span>
        <a href="tel:+33780468148">07 80 46 81 48</a>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
/* footer */
.site-footer {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background: #070811;
  color: var(--muted);
  font-size: 0.95rem;
  .container {
    padding: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    border-bottom: none;
    @media (max-width: 991px) {
      padding: 1rem 10px;
    }
  }
  .footer-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 991px) {
      flex-direction: column;
      gap: 12px;
    }
    a {
      color: var(--muted);
      text-decoration: none;
      opacity: 0.8;
      transition: opacity 0.2s ease;
      &:hover {
        opacity: 1;
      }
    }
    .footer-left {
      .footer-admin-link {
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }
    .footer-left .link-footer {
      @media (max-width: 991px) {
        font-size: 10px;
      }
    }
    .footer-left,
    .footer-right {
      display: flex;
      align-items: center;
      gap: 10px;
      @media (max-width: 991px) {
        flex-direction: column;
        gap: 5px;
      }
    }
    .separator {
      opacity: 0.6;
      margin: 0 5px;
      @media (max-width: 991px) {
        display: none;
      }
    }
  }
}
</style>
