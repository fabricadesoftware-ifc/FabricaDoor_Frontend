<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { HoverButton, FooterComp, HeaderComp } from '@/components/';
import { io } from 'socket.io-client'
import axios from 'axios'

const logs = ref([])
const on = ref(false)

const socket = io('http://localhost:8087', { autoConnect: false }) // Não conectar automaticamente

const handleLogs = (data) => {
  console.log('Novos logs recebidos:', data)
  logs.value.reverse().push(data.data)
  logs.value.reverse()
}

async function liveMode() {
  if (on.value) {
    socket.off('logs', handleLogs)
    socket.disconnect() // Desconectar socket ao sair do modo ao vivo
    on.value = false
  } else {
    socket.connect() // Conectar somente quando necessário
    socket.on('logs', handleLogs)
    on.value = true
  }
}

async function update() {
  try {
    const response = await axios.get('http://localhost:8087/api/logs/')
    logs.value = response.data.data.reverse() // Reverter apenas no momento de carregar
  } catch (error) {
    console.error('Erro ao buscar logs:', error)
  }
}

onBeforeUnmount(() => {
  socket.off('logs', handleLogs)
  socket.disconnect()
})
</script>

<template>
  <HeaderComp />
  <main>
    <h1>Logs Recebidos</h1>
    <div class="button">
      <HoverButton :text="'Update'" @click="update()"></HoverButton>
      <HoverButton :text="'Live Mode'" @click="liveMode()"></HoverButton>
      <div class="activate-point" :style="{ backgroundColor: on ? 'green' : 'red' }"></div>
    </div>
    <ul class="logs">
      <li v-for="log in logs" :key="log.id" class="log">{{ log.date }} - {{ log.message }}</li>
    </ul>
  </main>
  <FooterComp />
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #00ff00;
  font-family: 'Courier New', Courier, monospace;
  min-height: 80vh;
  padding: 2rem;
}

ul, li {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.logs {
  margin-top: 2rem;
  width: 100%;
  max-width: 600px;
  max-height: 55vh;
  padding: 1rem;
  overflow-y: auto;
  background-color: #2e2e2e;
  border: 1px solid #444;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.log {
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  color: #f3f3f3;
  border-left: 3px solid #f8f8f8;
  background-color: #1e1e1e;
  white-space: pre-wrap;
}

.log::before {
  content: '> ';
  color: #00ff00;
}

.activate-point {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
</style>
