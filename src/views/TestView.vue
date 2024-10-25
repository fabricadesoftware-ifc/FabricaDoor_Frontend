<template>
  <div>
    <h1>Logs Recebidos</h1>
    <button @click="update()">Update</button>
    <button @click="liveMode()">Live Mode</button>
    <ul>
      <li v-for="log in logs" :key="log.id">{{ log.date }} - {{ log.message }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue';
import { io } from 'socket.io-client';
import axios from 'axios';

const logs = ref([]);

const socket = io('http://localhost:8087'); 

const handleLogs = (data) => {
  console.log('Novos logs recebidos:', data);
  logs.value = data.data; 
};

async function liveMode(){
    socket.on('logs', handleLogs);
}

async function update(){
  try{
    const response = await axios.get('http://localhost:8087/api/logs/')
    logs.value = response.data.data;
  }
  catch(error){
    console.error('Erro ao buscar logs:', error);
  } 
}

onBeforeUnmount(() => {
  socket.off('logs', handleLogs);
  socket.disconnect();
});
</script>

<style scoped>
h1 {
  color: #333;
}
</style>
