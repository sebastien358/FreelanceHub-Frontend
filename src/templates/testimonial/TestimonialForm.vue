<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useTestimonialStore } from '@/stores/testimonialStore.ts'
import AlertMessage from '@/templates/altert-message/AlertMessage.vue'
import * as z from 'zod'
import gsap from 'gsap'

const refForm = ref(null)

/* ===========================
  ANIMATIONS GSAP
=========================== */

onMounted(async () => {
  await nextTick()

  /* ===========================
    FORM
  =========================== */



  /* ===========================
    INPUT TESTIMONIAL
  =========================== */

  const inputs = refForm.value.querySelectorAll('input')
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
    TEXTAREA TESTIMONIAL
  =========================== */

  const textarea = refForm.value.querySelector('textarea')
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

  /* ===========================
    ANIMATION ERRORS FIELDS
  =========================== */

  const errors = refForm.value.querySelectorAll('.error-field')
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
  INTEGRATION FORMULAIRE VEE-VALIDATE
=========================== */

const testimonialStore = useTestimonialStore()

const successMessage = ref<string>('')
const errorMessage = ref<string>('')

const schema = z.object({
  name: z
    .string({ required_error: 'Veuillez saisir votre nom' })
    .min(3, { message: 'Le nom doit contenir au moins 3 caractères' })
    .max(100, { message: 'Le nom est trop long (50 caractères maximum)' }),
  job: z
    .string({ required_error: 'Veuillez indiquer votre poste ou profession' })
    .min(3, { message: 'Le poste doit contenir au moins 3 caractères' })
    .max(50, { message: 'Le poste est trop long (50 caractères maximum)' }),
  message: z
    .string({ required_error: 'Veuillez saisir votre témoignage' })
    .min(20, { message: 'Votre témoignage doit contenir au moins 10 caractères' })
    .max(200, { message: 'Votre témoignage est trop long (200 caractères maximum)' }),
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema),
})

const { value: name, errorMessage: errorName } = useField('name')
const { value: job, errorMessage: errorJob } = useField('job')
const { value: message, errorMessage: errorTestimonial } = useField('message')

/* ===========================
  GESTION D'IMAGE
=========================== */

const image = ref('')

function uploadFile(file: File) {
  image.value = file
}

const onSubmit = handleSubmit(async (dataTestimonial, {resetForm}) => {
  try {
    dataTestimonial.image = image.value
    const response = await testimonialStore.testimonialAdd(dataTestimonial)
    if (!response) {return setErrorMessage('Votre témoignage n\'a pas pu être envoyé')}
    setSuccessMessage('Votre témoignage a bien été envoyé', resetForm)
  } catch (e) {
    setErrorMessage('Votre témoignage n\'a pas pu être envoyé')
    console.error(e)
  }
})

/* ===========================
  GESTION DES IMAGES FORMULAIRE
=========================== */

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

/* ===========================
  CONTENU DU FORMULAIRE
=========================== */

const fields = [
  {for: 'name', type: 'text', value: name, name: 'name', placeholder: 'Votre nom', errorMessage: errorName},
  {for: 'profession', type: 'text', value: job, name: 'profession', placeholder: 'Votre profession', errorMessage: errorJob},
  {for: 'image', type: 'file', value: '', name: 'image', placeholder: '', errorMessage: ''},
  {for: 'message', type: 'textarea', value: message, name: 'message', placeholder: 'Votre témoignage...', errorMessage: errorTestimonial}
]
</script>

<template>
  <div class="container-form" ref="refForm">
    <form @submit.prevent="onSubmit">
      <h3>Laissez votre avis</h3>
      <div v-for="(field, index) in fields" :key="index">
        <div class="form-group">
          <input v-if="field.type === 'text'" v-model="field.value.value" :type="field.type" :placeholder="field.placeholder" />
          <div v-else-if="field.type === 'file'" class="field-file">
            <input :type="field.type" :name="field.name" @change="uploadFile($event.target.files[0])" />
            <span class="hint">L’image est facultative</span>
          </div>
          <textarea v-else v-model="field.value.value" rows="5" :name="field.name" :placeholder="field.placeholder"></textarea>
          <span v-if="field.errorMessage" class="error-field">{{ field.errorMessage }}</span>
        </div>
      </div>
      <AlertMessage v-if="successMessage" :message="successMessage" type="success" to="" @close="handleResetForm()" class="alert" />
      <AlertMessage v-if="errorMessage" :message="errorMessage" type="error" to="" @close="closeFields()" class="alert" />
      <button class="btn btn-testimonial" :disabled="isSubmitting">Envoyer</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.container-form {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(79, 179, 255, 0.3);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  text-align: center;
  width: 100%;
  max-width: 450px;
  margin: 60px auto 0 auto;
  padding: 25px 20px 15px 20px;
  @media (max-width: 575.98px) {
    margin: 35px auto 0 auto;
  }
  h3 {
    margin-bottom: 22px;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 15px;
    .field-file {
      width: 100%;
      text-align: left;
      .hint {
        font-size: 10px;
        color: var(--muted);
        margin-left: 4px;
        font-style: italic;
      }
    }
    input[type="file"] {
      width: 100%;
      background: var(--form-bg);
      border: 1px solid var(--form-border);
      padding: 10px;
      font-size: 12px;
      color: gray;
      @media (max-width: 575.98px) {
        font-size: 10px;
      }
    }
    input[type="file"]::file-selector-button {
      background: var(--form-bg);
      border: 2px solid var(--form-border);
      color: gray;
      padding: 5px 8px;
      border-radius: 3px;
      font-size: 12px;
      cursor: pointer;
      @media (max-width: 575.98px) {
        font-size: 10px;
      }
    }
  }
  .alert-message {
    margin: 6px 0 13px 0;
  }
  .btn-testimonial {
    font-size: 12px;
    margin-top: 10px;
  }
}
</style>
