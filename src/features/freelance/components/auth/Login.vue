<script setup lang="ts">
import AlertMessage from '@/templates/altert-message/AlertMessage.vue'
import { useAuthStore } from '@/stores/authStore.ts'
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { onMounted, ref } from 'vue'
import * as z from 'zod'
import gsap from 'gsap'

const formRef = ref(null)
const btnLogin = ref(null)

/* ===========================
  ANIMATIONS GSAP
=========================== */

onMounted(() => {
  gsap.from(formRef.value, {
    opacity: 0,
    scale: 0.7,
    duration: 0.8,
    ease: 'back.out(1.7)',
  })

  /* ===========================
    Animations inputs form
  =========================== */

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

  /* ===========================
    Animations errors fields
  =========================== */

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

/* ===========================
  INTEGRATION FORM LOGIN
=========================== */

const authStore = useAuthStore()

const successMessage = ref<string>('')
const errorMessage = ref<string>('')

const MESSAGES = {
  SUCCESS_LOGIN: 'Connexion réussie ! Bienvenue 👋',
  ERROR_LOGIN: 'Une erreur est survenue. Veuillez réessayer.',
  ERROR_EMAIL: 'Aucun compte n\'existe avec cet email',
  INVALID_CREDENTIAL: 'Identifiants invalides. Vérifiez votre email ou votre mot de passe.'
}

const schema = z.object({
  email: z
    .string({ message: 'Veuillez renseigner votre adresse e-mail.' })
    .email({ message: 'L’adresse e-mail saisie n’est pas valide.' }),
  password: z
    .string({ message: 'Veuillez saisir un mot de passe.' })
    .min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères.' })
    .max(64, { message: 'Le mot de passe ne doit pas dépasser 64 caractères.' }),
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema),
})

const { value: email, errorMessage: errorEmail } = useField('email')
const { value: password, errorMessage: errorPassword } = useField('password')

const onSubmit = handleSubmit(async (dataLogin, {resetForm}) => {
  try {
    const emailCheck = await authStore.verifyEmail(dataLogin.email)
    if (!emailCheck.exists) {
      return setErrorMessage(MESSAGES.ERROR_EMAIL)
    }
    const responseLogin = await authStore.login(dataLogin)
    if (!responseLogin) {
      return setErrorMessage(MESSAGES.INVALID_CREDENTIAL)
    }
    setSuccessMessage(MESSAGES.SUCCESS_LOGIN, resetForm)
  } catch (e) {
    console.error(e)
    setErrorMessage(MESSAGES.ERROR_LOGIN)
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
  {for: 'email', type: 'text', value: email, name: 'email', placeholder: 'Email', errorMessage: errorEmail},
  {for: 'password', type: 'password', value: password, name: 'password', placeholder: 'Mot de passe', errorMessage: errorPassword},
]
</script>

<template>
  <section class="login">
    <div ref="formRef" class="container-form">
      <h2>Login</h2>
      <form @submit.prevent="onSubmit">
        <div v-for="(field, index) in fields" :key="index">
          <div class="d-flex flex-column form-group">
            <input v-model="field.value.value" :type="field.type" :name="field.name" :placeholder="field.placeholder" />
            <span v-if="field.errorMessage" class="error-field">
              {{ field.errorMessage }}
            </span>
          </div>
        </div>
        <div class="forgotten-password">
          <router-link to="/request-password">Mot de passe oublié</router-link>
        </div>
        <AlertMessage v-if="successMessage" :message="successMessage" type="success" to="/admin" @close="handleResetForm" class="alert" />
        <AlertMessage v-if="errorMessage" :message="errorMessage" type="error" to="" @close="closeFields" class="alert" />
        <button ref="btnLogin" class="btn btn-login" :disabled="isSubmitting">
          <span v-if="!isSubmitting">Se connecter</span>
          <span v-else>Connexion...</span>
        </button>
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
    h2 {
      font-size: 27px;
      color: #7dc9ff;
      @media (max-width: 576px) {
        font-size: 24px;
      }
    }
    .forgotten-password {
      display: flex;
      justify-content: flex-end;
    }
    .forgotten-password a {
      font-size: 11px;
      color: var(--form-text);
      font-style: italic;
      opacity: 0.9;
      transition: opacity 125ms ease;
      @media (max-width: 576px) {
        font-size: 9px;
      }
      &:hover {
        opacity: 1;
      }
    }
    .alert {
      margin-top: 12px;
    }
  }
}
</style>
