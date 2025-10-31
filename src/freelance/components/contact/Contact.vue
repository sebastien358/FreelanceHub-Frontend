<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import gsap from 'gsap'

const formRef = ref(null)

const fields = [
  {for: 'name', label: 'Nom complet', type: 'text', value: '', name: 'name', errorForm: ''},
  {for: 'tel', label: 'Téléphone', type: 'tel', value: '', name: 'tel', errorForm: ''},
  {for: 'email', label: 'Email', type: 'text', value: '', name: 'email', errorForm: ''},
  {for: 'message', label: 'Message', type: 'textarea', value: '', name: 'message', errorForm: ''}
]

onMounted(async () => {
  await nextTick()

  gsap.from(formRef.value, {
    opacity: 0,
    scale: 0.9,
    duration: 0.8,
    ease: 'power3.out'
  })

  const inputs = formRef.value.querySelectorAll('input')
  inputs.forEach((input) => {
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

  const textarea = formRef.value.querySelector('textarea')
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
      },
    })
  })

  textarea.addEventListener('blur', () => {
    gsap.to(textarea, {
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(79, 179, 255, 0.3)',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
      color: '#eaf3ff',
      duration: 0.3,
      color: '#e9f5ff',
      duration: 0.3,
      ease: 'power1.inOut'
    })
  })
})
</script>

<template>
  <div class="contact">
    <div ref="formRef" class="container-form">
      <h2>Me contacter</h2>
      <div v-for="(field, index) in fields" :key="index">
        <div class="d-flex flex-column form-group">
          <label :for="field.for">{{ field.label }}</label>
          <input v-if="field.type === 'text'" :type="field.type" />
          <input v-else-if="field.type === 'tel'" />
          <textarea v-else :name="field.name" rows="7"></textarea>
        </div>
      </div>
      <button class="btn btn-login">Soumettre</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 20px;
  .container-form {
    width: 100%;
    max-width: 550px;
    padding: 30px 25px 20px 25px;
    .form-group label {
      font-size: 13px;
    }
    .btn-login {
      margin-top: 25px;
      padding: 12px 18px;
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
