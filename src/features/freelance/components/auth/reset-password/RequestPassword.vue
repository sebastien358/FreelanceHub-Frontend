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

// GSPA - ANIMATIONS

// Animation form login
onMounted(() => {

  function animationFormLogin() {
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
  }


})

// Intégrartion formulaire vee-validate

const authStore = useAuthStore()

const successMessage = ref<string>('')
const errorMessage = ref<string>('')

const MESSAGES = {
  SUCCESS_REQUEST_PASSWORD: 'Un lien de réinitialisation vous a été envoyé par email 📩',
  ERROR_REQUEST_PASSWORD: 'Une erreur est survenue. Veuillez réessayer plus tard.',
  INVALID_CREDENTIAL: 'Aucun compte n\'existe avec cet email'
}

const schema = z.object({
  email: z
    .string({ message: 'Veuillez renseigner votre adresse e-mail.' })
    .email({ message: 'L’adresse e-mail saisie n’est pas valide.' }),
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema),
})

const { value: email, errorMessage: errorEmail } = useField('email')

const onSubmit = handleSubmit(async (dataEmail, {resetForm}) => {
  try {
    const emailCheck = await authStore.verifyEmail(dataEmail.email)
    if (!emailCheck.exists) {
      return setErrorMessage(MESSAGES.INVALID_CREDENTIAL)
    }
    const response = await authStore.requestPassword(dataEmail)
    if (!response) {
      return setErrorMessage(MESSAGES.ERROR_REQUEST_PASSWORD)
    }
    setSuccessMessage(MESSAGES.SUCCESS_REQUEST_PASSWORD, resetForm)
  } catch (e) {
    setErrorMessage(MESSAGES.ERROR_REQUEST_PASSWORD)
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
  {for: 'email', label: 'Email', type: 'text', value: email, name: 'email', placeholder: 'Entrer votre email', errorMessage: errorEmail},
]
</script>

<template>
  <section class="login">
    <div ref="formRef" class="container-form">
      <h2>Réinitialiser le mot de passe</h2>
      <form @submit.prevent="onSubmit">
        <div v-for="(field, index) in fields" :key="index">
          <div class="d-flex flex-column form-group">
            <input
              v-model="field.value.value"
              :type="field.type"
              :name="field.name"
              :placeholder="field.placeholder"
            />
            <span v-if="field.errorMessage" class="error-field">
              {{ field.errorMessage }}
            </span>
          </div>
        </div>
        <p class="reset-instruction" v-if="!errorEmail && !successMessage && !errorMessage">
          Vous recevrez un lien pour réinitialiser votre mot de passe.
        </p>
        <AlertMessage
          v-if="successMessage"
          :message="successMessage"
          type="success"
          to=""
          @close="handleResetForm"
          class="alert"
        />
        <AlertMessage
          v-if="errorMessage"
          :message="errorMessage"
          type="error"
          to=""
          @close="closeFields"
          class="alert"
        />
        <button ref="btnLogin" class="btn btn-reset-password" :disabled="isSubmitting">
          Envoyer le lien
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
    width: 100%;
    max-width: 550px;
    padding: 25px 20px 20px 20px;
    h2 {
      color: #7dc9ff;
      margin-bottom: 15px;
      font-size: 21px;
      @media (max-width: 576px) {
        font-size: 18px;
      }
    }
    .form-group {
      margin: 0;
      .error-field {
        color: var(--form-text);
        margin: 5px 0 15px 4px;
      }
    }
    .reset-instruction {
      color: #a8a8a8;
      font-size: 12px;
      text-align: start;
      margin: -15px 15px 15px 4px;
      font-style: italic;
      @media (max-width: 576px) {
        font-size: 10px;
      }
    }
    .alert {
      margin: -10px 0 15px;
    }
    .btn {
      margin: 0;

    }
  }
}
</style>
