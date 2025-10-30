<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import gsap from 'gsap'

onMounted(async () => {
  await nextTick()

  gsap.from('.container-form', {
    opacity: 0,
    scale: 0.6,
    duration: 0.8,
    ease: 'back.out(1.7)'
  })
})

const fields = [
  {for: 'email', label: 'Email', type: 'text', value: '', name: 'email', errorForm: ''},
  {for: 'password', label: 'Mot de passe', type: 'password', value: '', name: 'password', errorForm: ''}
]
</script>

<template>
  <section class="d-flex align-items-center justify-content-center login">
    <div class="container-form">
      <h2>Login</h2>
      <form>
        <div v-for="(field, index) in fields" :key="index">
          <div class="d-flex flex-column form-group">
            <label :for="field.for">{{ field.label }}</label>
            <input />
          </div>
        </div>
      </form>
      <button class="btn btn-login">Se connecter</button>
    </div>
  </section>
</template>

<style scoped lang="scss">

$form-border: rgba(79, 179, 255, 0.4);
$form-focus: #4fb3ff;
$form-bg: rgba(255, 255, 255, 0.04);
$form-text: #e9f5ff;

.login {
  width: max(1200px);
  margin: 0 auto;
  height: 100%;
  .container-form {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(79, 179, 255, 0.3);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(12px);
    border-radius: 12px;
    padding: 40px 30px;
    width: min(100%, 420px);
    color: #eaf3ff;
    text-align: center;
    h2 {
      color: #e9f5ff;
      text-shadow: 0 0 12px rgba(79, 179, 255, 0.3);
      margin-bottom: 24px;
    }
    .form-group {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      label {
        margin-bottom: 6px;
        color: #bcd0e4;
        font-size: 0.95rem;
      }
    }
    input, textarea {
      background: $form-bg;
      border: 2px solid $form-border;
      border-radius: 10px;
      padding: 12px 16px;
      color: $form-text;
      transition: all 0.25s ease;
      width: 100%;
      &:focus {
        outline: none;
        border-color: $form-focus;
        box-shadow: 0 0 12px rgba(79, 179, 255, 0.4);
      }
    }
    .btn-login {
      margin-top: 25px;
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 10px;
      color: white;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.25s ease;
      box-shadow: 0 6px 20px rgba(33, 107, 226, 0.25);
      background: linear-gradient(180deg, #1f6fe8, #216be2);
      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 14px 30px rgba(33, 107, 226, 0.4);
      }
    }
  }
}
</style>
