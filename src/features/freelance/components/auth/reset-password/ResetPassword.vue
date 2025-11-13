<script setup lang="ts">
import AlertMessage from '@/templates/altert-message/AlertMessage.vue'
import { useAuthStore } from '@/stores/authStore.ts'
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { onMounted, ref } from 'vue'
import * as z from 'zod'
import gsap from 'gsap'
import { useRoute } from 'vue-router'

const formRef = ref(null)
const btnLogin = ref(null)

// GSPA - ANIMATIONS

// Animation form login
onMounted(() => {
  gsap.from(formRef.value, {
    opacity: 0,
    scale: 0.7,
    duration: 0.8,
    ease: 'back.out(1.7)',
  })

  // Animation inputs login
  const inputs = formRef.value.querySelectorAll('input')
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

  // Animation error fields
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

const authStore = useAuthStore()

// Récupération du token dans l'url
const route = useRoute()

const token = ref<string>('')

if (route.params.token) {
  token.value = route.params.token
}

const successMessage = ref<string>('')
const errorMessage = ref<string>('')

const MESSAGES = {
  SUCCESS_RESET: 'Le mot de passe a bien été modifié 👋',
  ERROR_RESET: 'Une erreur est survenue lors de la modification du mot de passe. Veuillez réessayer.',
  INVALID_CREDENTIALS: 'Identifiants invalides. Vérifiez votre email ou votre mot de passe.',
  ERROR_EMAIL: 'Aucun compte n\'existe avec cet email',
}

const schema = z.object({
  email: z
    .string({ message: 'Veuillez renseigner votre adresse e-mail.' })
    .email({ message: 'L’adresse e-mail saisie n’est pas valide.' }),
  password: z
    .string({ message: 'Veuillez saisir un mot de passe.' })
    .min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères.' })
    .max(64, { message: 'Le mot de passe ne doit pas dépasser 64 caractères.' }),
  confirmPassword: z
    .string({ message: 'Veuillez confirmer votre mot de passe.' })
    .min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères.' })
    .max(64, { message: 'Le mot de passe ne doit pas dépasser 64 caractères.' })
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'], // indique quel champ est concerné
    message: 'Les mots de passe ne correspondent pas.'
});

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema),
})

const { value: email, errorMessage: errorEmail } = useField('email')
const { value: password, errorMessage: errorPassword} = useField('password')
const { value: confirmPassword, errorMessage: errorConfirmPassword} = useField('confirmPassword')

const onSubmit = handleSubmit(async (dataResetPassword, {resetForm}) => {
  try {
    const emailCheck = await authStore.verifyEmail(dataResetPassword.email)
    if (!emailCheck.exists) {
      return setErrorMessage(MESSAGES.ERROR_EMAIL)
    }
    const response = await authStore.resetPassword(dataResetPassword, token.value)
    if (!response) {
      return setErrorMessage(MESSAGES.SUCCESS_RESET)
    }
    setSuccessMessage(MESSAGES.SUCCESS_RESET, resetForm)
  } catch (e) {
    setErrorMessage(MESSAGES.ERROR_RESET)
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
  {for: 'Adresse e-mail', type: 'text', value: email, name: 'Adresse e-mail', placeholder: 'Adresse e-mail', errorMessage: errorEmail},
  {for: 'Nouveau mot de passe', type: 'password', value: password, name: 'Nouveau mot de passe', placeholder: 'Nouveau mot de passe', errorMessage: errorPassword},
  {for: 'Confirmez le nouveau mot de passe', type: 'password', value: confirmPassword, name: 'Confirmez le nouveau mot de passe', placeholder: 'Confirmez le nouveau mot de passe', errorMessage: errorConfirmPassword},
]
</script>

<template>
  <section class="login">
    <div ref="formRef" class="container-form">
      <h2>Modifier le mot de passe</h2>
      <form @submit.prevent="onSubmit">
        <div v-for="(field, index) in fields" :key="index">
          <div class="d-flex flex-column form-group">
            <input v-if="field.type === 'text'" v-model="field.value.value" :type="field.type" :name="field.name" :placeholder="field.placeholder" />
            <input v-else v-model="field.value.value" :type="field.type" :name="field.name" :placeholder="field.placeholder" />
            <span v-if="field.errorMessage" class="error-field">
              {{ field.errorMessage }}
            </span>
          </div>
        </div>
        <AlertMessage v-if="successMessage" :message="successMessage" type="success" to="" @close="handleResetForm" class="alert" />
        <AlertMessage v-if="errorMessage" :message="errorMessage" type="error" to="" @close="closeFields" class="alert" />
        <button ref="btnLogin" class="btn btn-login" :disabled="isSubmitting">Réinitialiser le mot de passe</button>
      </form>
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
    width: 100%;
    max-width: 650px;
    padding: 25px 20px 20px 20px;
    h2 {
      color: #7dc9ff;
      margin-bottom: 25px;
      font-size: 23px;
    }
    .form-group {
      margin: 0;
      .error-field {
        color: var(--form-text);
        font-size: 12px;
        margin: 5px 0 15px 4px;
      }
    }
    p {
      color: #a8a8a8;
      font-size: 12px;
      text-align: start;
      margin: -15px 15px 15px 4px;
      font-style: italic;
    }
    .alert {
      margin: -7px 0 16px 0;
    }
    .btn {
      margin-top: 0;
    }
  }
}
</style>

