<template>
    <v-container fluid class="pa-6">
        <v-row>
            <v-col cols="12">
                <v-card class="mb-6">
                    <v-card-item>
                        <div class="d-flex align-center mb-4">
                            <v-avatar color="primary" class="mr-4">
                                <v-icon>mdi-help-circle</v-icon>
                            </v-avatar>
                            <v-card-title class="text-h4">Central de Suporte FabricaDoor</v-card-title>
                        </div>
                        <v-card-subtitle>
                            Bem-vindo à central de suporte do FabricaDoor, sua solução completa de controle de acesso
                            por RFID.
                        </v-card-subtitle>
                    </v-card-item>
                </v-card>

                <!-- Seção Sobre o Sistema -->
                <v-card class="mb-6">
                    <v-card-item>
                        <v-card-title class="text-h5 mb-4">Sobre o Sistema</v-card-title>
                        <v-card-text>
                            <p class="mb-4">
                                O FabricaDoor é uma solução integrada de controle de acesso que utiliza tecnologia RFID,
                                composta por três componentes principais:
                            </p>
                            <v-list>
                                <v-list-item>
                                    <template v-slot:prepend>
                                        <v-icon color="primary">mdi-chip</v-icon>
                                    </template>
                                    <v-list-item-title>Hardware (ESP32)</v-list-item-title>
                                    <v-list-item-subtitle>
                                        Leitor RFID RDM6300, relé, buzzer e LED para controle físico de acesso
                                    </v-list-item-subtitle>
                                </v-list-item>

                                <v-list-item>
                                    <template v-slot:prepend>
                                        <v-icon color="success">mdi-server</v-icon>
                                    </template>
                                    <v-list-item-title>Backend</v-list-item-title>
                                    <v-list-item-subtitle>
                                        Sistema de autenticação e gerenciamento de tags com APIs RESTful
                                    </v-list-item-subtitle>
                                </v-list-item>

                                <v-list-item>
                                    <template v-slot:prepend>
                                        <v-icon color="info">mdi-monitor-dashboard</v-icon>
                                    </template>
                                    <v-list-item-title>Dashboard Web</v-list-item-title>
                                    <v-list-item-subtitle>
                                        Interface de gerenciamento com atualizações em tempo real
                                    </v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-card-text>
                    </v-card-item>
                </v-card>

                <!-- Seção de FAQ -->
                <v-expansion-panels class="mb-6">
                    <v-card-title class="text-h5 mb-4">Perguntas Frequentes</v-card-title>

                    <v-expansion-panel>
                        <v-expansion-panel-title>Como funciona o sistema de controle de
                            acesso?</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            O sistema funciona da seguinte forma:
                            <ol>
                                <li>O usuário aproxima sua tag RFID do leitor</li>
                                <li>O hardware ESP32 lê o código da tag</li>
                                <li>O sistema verifica a autorização da tag</li>
                                <li>Se autorizado:
                                    <ul>
                                        <li>O LED verde acende</li>
                                        <li>O buzzer emite um som de confirmação</li>
                                        <li>A porta é desbloqueada</li>
                                    </ul>
                                </li>
                                <li>O acesso é registrado no sistema para auditoria</li>
                            </ol>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-title>Qual a diferença entre os modos CA e OP?</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <p><strong>CA (Controle de Acesso):</strong></p>
                            <ul class="mb-4">
                                <li>Modo padrão de operação</li>
                                <li>Requer autenticação via tag RFID</li>
                                <li>Registra todos os acessos no sistema</li>
                            </ul>
                            <p><strong>OP (Operação):</strong></p>
                            <ul>
                                <li>Modo de livre acesso</li>
                                <li>Não requer autenticação</li>
                                <li>Útil para manutenção ou situações especiais</li>
                            </ul>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-title>Como cadastrar e gerenciar tags RFID?</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            Para gerenciar tags RFID:
                            <ol>
                                <li>Acesse o Dashboard (requer privilégios de administrador)</li>
                                <li>Na seção "Gerenciar Tags", você pode:
                                    <ul>
                                        <li>Visualizar todas as tags cadastradas</li>
                                        <li>Verificar o status de cada tag (ativa/inativa)</li>
                                        <li>Atribuir tags a usuários</li>
                                        <li>Ativar ou desativar tags</li>
                                    </ul>
                                </li>
                                <li>Para atribuir uma tag:
                                    <ul>
                                        <li>Clique no botão "Atribuir"</li>
                                        <li>Selecione o usuário</li>
                                        <li>Confirme a atribuição</li>
                                    </ul>
                                </li>
                            </ol>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-title>Como verificar os logs de acesso?</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            Para consultar os logs:
                            <ol>
                                <li>No Dashboard, localize a seção "Logs de Acesso"</li>
                                <li>Os logs mostram:
                                    <ul>
                                        <li>Data e hora do acesso</li>
                                        <li>Identificação da tag utilizada</li>
                                        <li>Status do acesso (autorizado/negado)</li>
                                        <li>Nome do usuário</li>
                                    </ul>
                                </li>
                                <li>Use os filtros para encontrar registros específicos</li>
                                <li>Os logs são atualizados em tempo real via WebSocket</li>
                            </ol>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>

                <!-- Seção de Contato e Suporte -->
                <v-row>
                    <v-col cols="12" md="6">
                        <v-card>
                            <v-card-item>
                                <v-card-title class="text-h5 mb-4">Contato</v-card-title>
                                <v-list>
                                    <v-list-item>
                                        <template v-slot:prepend>
                                            <v-icon color="primary">mdi-email</v-icon>
                                        </template>
                                        <v-list-item-title>Email</v-list-item-title>
                                        <v-list-item-subtitle>suporte.fabricadoor@ifc.edu.br</v-list-item-subtitle>
                                    </v-list-item>

                                    <v-list-item>
                                        <template v-slot:prepend>
                                            <v-icon color="primary">mdi-phone</v-icon>
                                        </template>
                                        <v-list-item-title>Telefone</v-list-item-title>
                                        <v-list-item-subtitle>(47) 3803-7200</v-list-item-subtitle>
                                    </v-list-item>

                                    <v-list-item>
                                        <template v-slot:prepend>
                                            <v-icon color="primary">mdi-map-marker</v-icon>
                                        </template>
                                        <v-list-item-title>Localização</v-list-item-title>
                                        <v-list-item-subtitle>
                                            Fábrica de Software - IFC Campus Araquari<br>
                                            Rodovia BR 280 - Km 27<br>
                                            Araquari - SC
                                        </v-list-item-subtitle>
                                    </v-list-item>
                                </v-list>
                            </v-card-item>
                        </v-card>
                    </v-col>

                    <v-col cols="12" md="6">
                        <v-card height="100%">
                            <v-card-item>
                                <v-card-title class="text-h5 mb-4">Horário de Atendimento</v-card-title>
                                <v-list>
                                    <v-list-item>
                                        <template v-slot:prepend>
                                            <v-icon color="primary">mdi-clock</v-icon>
                                        </template>
                                        <v-list-item-title>Segunda a Sexta</v-list-item-title>
                                        <v-list-item-subtitle>08:00 - 17:00</v-list-item-subtitle>
                                    </v-list-item>

                                    <v-list-item>
                                        <template v-slot:prepend>
                                            <v-icon color="error">mdi-clock-off</v-icon>
                                        </template>
                                        <v-list-item-title>Sábados e Domingos</v-list-item-title>
                                        <v-list-item-subtitle>Fechado</v-list-item-subtitle>
                                    </v-list-item>
                                </v-list>

                                <v-alert type="info" class="mt-4">
                                    Em caso de emergência fora do horário de atendimento, entre em contato com a
                                    segurança do campus.
                                </v-alert>
                            </v-card-item>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
// Componente não necessita de lógica adicional por enquanto
</script>

<style scoped>
.v-expansion-panels {
    border-radius: 8px;
    overflow: hidden;
}

:deep(.v-expansion-panel-title) {
    font-size: 1.1rem;
    font-weight: 500;
}

:deep(.v-expansion-panel-text) {
    font-size: 1rem;
}

:deep(.v-list-item) {
    min-height: 64px;
}

ul,
ol {
    padding-left: 1.5rem;
}

ul li,
ol li {
    margin-bottom: 0.5rem;
}
</style>