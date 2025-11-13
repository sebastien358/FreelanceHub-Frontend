<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { useForm, useField } from 'vee-validate'
import  { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import gsap from 'gsap'
import { useContactStore } from '@/stores/contactStore.ts'
import AlertMessage from '@/templates/altert-message/AlertMessage.vue'

const formRef = ref(null)

onMounted(async () => {
  await nextTick()
  // Animation form
  gsap.from(formRef.value, {
    opacity: 0,
    scale: 0.9,
    duration: 0.8,
    ease: 'power3.out'
  })

  // Animation input
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

  // Animation textarea
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
      }
    })
  })

  // Animation textarea
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

  // Animation errors fields
  const errors = formRef.value.querySelectorAll('.error-field')
  errors.forEach((error) => {
    gsap.from(error, {
      opacity: 0,
      scale: 0,
      duration: 2,
      ease: 'power1.out'
    })
  })
})

// Intégrartion formulaire vee-validate

const contactStore = useContactStore()

const successMessage = ref<string>('')
const errorMessage = ref<string>('')

const MESSAGES = {
  ERROR_CONTACT: 'Erreur lors de l’envoi. Réessayez plus tard.',
  SUCCESS_CONTACT: 'Message envoyé avec succès ✅'
}

const schema = z.object({
  name: z
    .string({ message: 'Veuillez renseigner votre nom' })
    .min(2, { message: 'Le nom doit contenir au moins 2 caractères' })
    .max(70, { message: 'Le nom ne doit pas dépasser 70 caractères' }),
  email: z
    .string({ message: 'Veuillez renseigner votre adresse e-mail' })
    .email({ message: 'Adresse e-mail invalide' }),
  message: z
    .string({ message: 'Veuillez saisir votre message' })
    .min(10, { message: 'Votre message doit contenir au moins 10 caractères' })
    .max(1000, { message: 'Votre message est trop long (1000 caractères max)' }),
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema)
})

const { value: name, errorMessage: errorName } = useField('name')
const { value: email, errorMessage: errorEmail } = useField('email')
const { value: message, errorMessage: errorMessageContact } = useField('message')

const onSubmit = handleSubmit(async (dataContact, {resetForm}) => {
  try {
    const response = await contactStore.contactAdd(dataContact)
    if (!response) {
      return setErrorMessage(MESSAGES.ERROR_CONTACT)
    }
    setSuccessMessage(MESSAGES.SUCCESS_CONTACT, resetForm)
  } catch(e) {
    setErrorMessage(MESSAGES.ERROR_CONTACT)
    console.error(e)
  }
})

let reset = () => {}

function setSuccessMessage(message: string, resetForm: () => void) {
  errorMessage.value = ''
  successMessage.value = message
  reset = resetForm
}

function setErrorMessage(message: string) {
  successMessage.value = ''
  errorMessage.value = message
}

function closeFields() {
  successMessage.value = ''
  errorMessage.value = ''
}

function handleResetForm() {
  closeFields()
  reset()
}

const fields = [
  {for: 'name', type: 'text', value: name, name: 'name', placeholder: 'Nom complet', errorMessage: errorName},
  {for: 'email', type: 'text', value: email, name: 'email', placeholder: 'Email', errorMessage: errorEmail},
  {for: 'message', type: 'textarea', value: message, name: 'message', placeholder: 'Message', errorMessage: errorMessageContact}
]
</script>

<template>
  <div class="contact">
    <div ref="formRef" class="container-form">
      <h2>Contactez-moi</h2>
      <form @submit.prevent="onSubmit">
        <div v-for="(field, index) in fields" :key="index">
          <div class="d-flex flex-column form-group">
            <input v-model="field.value.value" v-if="field.type === 'text'" :type="field.type" :placeholder="field.placeholder" />
            <textarea v-else v-model="field.value.value" :name="field.name" :placeholder="field.placeholder" rows="8"></textarea>
            <span v-if="field.errorMessage" class="error-field">
              {{ field.errorMessage }}
            </span>
          </div>
        </div>
        <AlertMessage v-if="successMessage" :message="successMessage" type="success" to="" @close="handleResetForm" class="alert" />
        <AlertMessage v-if="errorMessage" :message="errorMessage" type="success" to="" @close="closeFields" class="alert" />
        <button class="btn btn-login" :disabled="isSubmitting">Envoyer</button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 20px;
  .container-form {
    width: 100%;
    max-width: 500px;
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
    .alert {
      margin: 10px 0 5px 0;
    }
    .btn {
      margin: 15px 0 0 0;
    }
  }
}
</style>
