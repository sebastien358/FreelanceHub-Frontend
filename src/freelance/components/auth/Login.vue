<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

const formRef = ref(null)
const btnLogin = ref(null)

onMounted(() => {
  // Apparition du formulaire
  gsap.from(formRef.value, {
    opacity: 0,
    scale: 0.7,
    duration: 0.8,
    ease: 'power3.out'
  })

  // Sélection des inputs
  const inputs = formRef.value.querySelectorAll('input')
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      gsap.to(input, {
        borderColor: '#4fb3ff',
        boxShadow: '0 0 10px rgba(79,179,255,0.4)',
        duration: 0.3,
        repeat: 1,
        yoyo: true,
        ease: 'power1.inOut'
      })
    })
  })
})

const fields = [
  {for: 'email', label: 'Email', type: 'text', value: '', name: 'email', errorForm: ''},
  {for: 'password', label: 'Mot de passe', type: 'password', value: '', name: 'password', errorForm: ''}
]
</script>

<template>
  <section class="login">
    <div ref="formRef" class="container-form">
      <h2>Login</h2>
      <form>
        <div v-for="(field, index) in fields" :key="index">
          <div class="d-flex flex-column form-group">
            <label :for="field.for">{{ field.label }}</label>
            <input />
          </div>
        </div>
      </form>
      <button ref="btnLogin" class="btn btn-login">Se connecter</button>
    </div>
  </section>
</template>

<style scoped lang="scss">
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 20px;
  @media (max-width: 900px) {
    padding: 0 15px;
  }
  .container-form {
    h2 {
      color: #7dc9ff;
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
</style>
