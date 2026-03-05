<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { LockOutline } from '@/components/icons'
import AuthService from '@/services/auth'

const route = useRoute()
const router = useRouter()

const token = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirm = ref(false)
const loading = ref(false)
const valid = ref(true)
const status = ref(null) // null | 'success' | 'error' | 'no-token'
const errorMessage = ref('')

onMounted(() => {
  token.value = route.query.token || ''
  if (!token.value) {
    status.value = 'no-token'
  }
})

const passwordRules = [
  (v) => !!v || 'Senha é obrigatória',
  (v) => v.length >= 6 || 'Senha deve ter no mínimo 6 caracteres'
]

const confirmRules = [
  (v) => !!v || 'Confirmação é obrigatória',
  (v) => v === newPassword.value || 'As senhas não coincidem'
]

const handleReset = async () => {
  if (!valid.value) return
  loading.value = true
  errorMessage.value = ''

  try {
    await AuthService.resetPassword({
      token: token.value,
      newPassword: newPassword.value
    })
    status.value = 'success'
  } catch (error) {
    status.value = 'error'
    errorMessage.value =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      'Erro ao redefinir senha. O link pode ter expirado.'
  } finally {
    loading.value = false
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <v-container fluid class="fill-height bg-surface-variant">
    <v-row align="center" justify="center">
      <v-col cols="11" sm="6" md="5" lg="3">
        <!-- Token inválido / ausente -->
        <v-card
          v-if="status === 'no-token'"
          class="mx-auto pa-5 rounded-xl"
          elevation="4"
          max-width="420"
        >
          <div class="d-flex flex-column align-center mb-4">
            <v-icon icon="mdi-link-off" size="48" color="error" class="mb-3" />
            <h2 class="text-h6 font-weight-bold">Link inválido</h2>
            <p class="text-body-2 text-medium-emphasis mt-2 text-center">
              O link de redefinição de senha é inválido ou está incompleto. Solicite um novo link.
            </p>
          </div>
          <v-btn block color="primary" @click="goToLogin" class="mt-2"> Ir para Login </v-btn>
        </v-card>

        <!-- Sucesso -->
        <v-card
          v-else-if="status === 'success'"
          class="mx-auto pa-5 rounded-xl"
          elevation="4"
          max-width="420"
        >
          <div class="d-flex flex-column align-center mb-4">
            <v-icon icon="mdi-check-circle" size="48" color="success" class="mb-3" />
            <h2 class="text-h6 font-weight-bold">Senha redefinida!</h2>
            <p class="text-body-2 text-medium-emphasis mt-2 text-center">
              Sua senha foi alterada com sucesso. Agora você pode fazer login com a nova senha.
            </p>
          </div>
          <v-btn block color="primary" @click="goToLogin" class="mt-2"> Ir para Login </v-btn>
        </v-card>

        <!-- Formulário -->
        <v-card v-else class="mx-auto pa-5 rounded-xl" elevation="4" max-width="420">
          <div class="d-flex flex-column align-center mb-5">
            <div class="d-flex align-center">
              <LockOutline :size="36" />
              <h1 class="text-h5 font-weight-bold ml-2">FabricaDoor</h1>
            </div>
            <p class="text-body-2 text-medium-emphasis mt-1">Defina sua nova senha</p>
          </div>

          <v-alert
            v-if="status === 'error'"
            type="error"
            variant="tonal"
            density="compact"
            class="mb-4"
            closable
            @click:close="status = null"
          >
            {{ errorMessage }}
          </v-alert>

          <v-form v-model="valid" @submit.prevent="handleReset">
            <v-text-field
              v-model="newPassword"
              :rules="passwordRules"
              :type="showPassword ? 'text' : 'password'"
              label="Nova senha"
              prepend-inner-icon="mdi-lock"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              variant="outlined"
              density="comfortable"
              autocomplete="new-password"
              required
              @click:append-inner="showPassword = !showPassword"
            />

            <v-text-field
              v-model="confirmPassword"
              :rules="confirmRules"
              :type="showConfirm ? 'text' : 'password'"
              label="Confirmar nova senha"
              prepend-inner-icon="mdi-lock-check"
              :append-inner-icon="showConfirm ? 'mdi-eye-off' : 'mdi-eye'"
              variant="outlined"
              density="comfortable"
              autocomplete="new-password"
              required
              @click:append-inner="showConfirm = !showConfirm"
            />

            <v-btn
              block
              color="primary"
              type="submit"
              :loading="loading"
              :disabled="!valid || !newPassword || !confirmPassword"
              class="mt-3"
            >
              Redefinir Senha
            </v-btn>

            <v-btn block variant="text" color="primary" class="mt-2" @click="goToLogin">
              Voltar para Login
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
