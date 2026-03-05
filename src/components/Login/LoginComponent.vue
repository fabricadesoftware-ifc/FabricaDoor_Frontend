<script setup>
import { reactive, ref } from 'vue'
import { LockOutline, LockOpenOutline } from '../icons'
import { useAuthStore } from '@/stores'
import AuthService from '@/services/auth'

const isHovered = ref(false)
const authStore = useAuthStore()
const showPassword = ref(false)
const loading = ref(false)
const valid = ref(true)

const dataUser = reactive({
  email: '',
  password: ''
})

// Esqueci minha senha
const forgotDialog = ref(false)
const forgotEmail = ref('')
const forgotLoading = ref(false)
const forgotStatus = ref(null) // null | 'success' | 'error'
const forgotError = ref('')
const forgotValid = ref(true)

const openForgotDialog = () => {
  forgotEmail.value = dataUser.email || ''
  forgotStatus.value = null
  forgotError.value = ''
  forgotDialog.value = true
}

const handleForgotPassword = async () => {
  if (!forgotValid.value) return
  forgotLoading.value = true
  forgotError.value = ''
  try {
    await AuthService.forgetPassword(forgotEmail.value)
    forgotStatus.value = 'success'
  } catch (error) {
    forgotStatus.value = 'error'
    forgotError.value =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      'Erro ao enviar e-mail de recuperação.'
  } finally {
    forgotLoading.value = false
  }
}

const handleMouseEnter = () => {
  isHovered.value = true
}

const handleMouseLeave = () => {
  isHovered.value = false
}

const emailRules = [
  (v) => !!v || 'E-mail é obrigatório',
  (v) => /.+@.+\..+/.test(v) || 'E-mail deve ser válido'
]

const passwordRules = [
  (v) => !!v || 'Senha é obrigatória',
  (v) => v.length >= 6 || 'Senha deve ter no mínimo 6 caracteres'
]

const handleLogin = async () => {
  if (!valid.value) return
  loading.value = true
  try {
    await authStore.login(dataUser)
  } finally {
    loading.value = false
  }
}

const handleKeydown = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleLogin()
  }
}
</script>

<template>
  <v-container fluid class="fill-height bg-surface-variant">
    <v-row align="center" justify="center">
      <v-col cols="11" sm="6" md="5" lg="3">
        <v-card class="mx-auto pa-5 rounded-xl" elevation="4" max-width="380">
          <div class="d-flex flex-column align-center mb-5">
            <div
              class="d-flex align-center"
              @mouseover="handleMouseEnter"
              @mouseleave="handleMouseLeave"
            >
              <component :is="isHovered ? LockOpenOutline : LockOutline" :size="36" />
              <h1 class="text-h5 font-weight-bold ml-2">FabricaDoor</h1>
            </div>
            <p class="text-body-2 text-medium-emphasis mt-1">
              Entre para gerenciar o sistema de acesso
            </p>
          </div>

          <v-form v-model="valid" @submit.prevent="handleLogin" @keydown="handleKeydown">
            <v-text-field
              v-model="dataUser.email"
              :rules="emailRules"
              label="E-mail"
              prepend-inner-icon="mdi-email"
              variant="outlined"
              density="comfortable"
              name="email"
              type="email"
              autocomplete="email"
              required
            ></v-text-field>

            <v-text-field
              v-model="dataUser.password"
              :rules="passwordRules"
              :type="showPassword ? 'text' : 'password'"
              label="Senha"
              prepend-inner-icon="mdi-lock"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              variant="outlined"
              density="comfortable"
              name="password"
              autocomplete="current-password"
              required
              @click:append-inner="showPassword = !showPassword"
            ></v-text-field>

            <v-btn
              block
              color="primary"
              type="submit"
              :loading="loading"
              :disabled="!valid"
              class="mt-3"
            >
              Entrar
            </v-btn>

            <div class="text-center mt-3">
              <v-btn
                variant="text"
                color="primary"
                size="small"
                class="text-none"
                @click="openForgotDialog"
              >
                Esqueci minha senha
              </v-btn>
            </div>
          </v-form>
        </v-card>

        <!-- Dialog Esqueci Minha Senha -->
        <v-dialog v-model="forgotDialog" max-width="420" persistent>
          <v-card class="pa-5 rounded-xl">
            <div class="d-flex align-center mb-4">
              <v-icon icon="mdi-lock-reset" size="28" color="primary" class="mr-2" />
              <v-card-title class="text-h6 pa-0">Recuperar Senha</v-card-title>
              <v-spacer />
              <v-btn icon variant="text" size="small" @click="forgotDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>

            <!-- Sucesso -->
            <div v-if="forgotStatus === 'success'">
              <v-alert type="success" variant="tonal" class="mb-4">
                E-mail de recuperação enviado! Verifique sua caixa de entrada.
              </v-alert>
              <v-btn block color="primary" @click="forgotDialog = false" class="text-none">
                Fechar
              </v-btn>
            </div>

            <!-- Formulário -->
            <div v-else>
              <p class="text-body-2 text-medium-emphasis mb-4">
                Informe seu e-mail e enviaremos um link para redefinir sua senha.
              </p>

              <v-alert
                v-if="forgotStatus === 'error'"
                type="error"
                variant="tonal"
                density="compact"
                class="mb-4"
                closable
                @click:close="forgotStatus = null"
              >
                {{ forgotError }}
              </v-alert>

              <v-form v-model="forgotValid" @submit.prevent="handleForgotPassword">
                <v-text-field
                  v-model="forgotEmail"
                  :rules="emailRules"
                  label="E-mail"
                  prepend-inner-icon="mdi-email"
                  variant="outlined"
                  density="comfortable"
                  type="email"
                  autocomplete="email"
                  required
                />

                <v-btn
                  block
                  color="primary"
                  type="submit"
                  :loading="forgotLoading"
                  :disabled="!forgotValid || !forgotEmail"
                  class="mt-2 text-none"
                >
                  Enviar link de recuperação
                </v-btn>
              </v-form>
            </div>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
