# FabricaDoor - Frontend

Frontend do sistema **FabricaDoor**, desenvolvido pelo grupo **Fábrica de Software - Instituto Federal Catarinense (IFC)**. Este sistema tem como objetivo fornecer uma interface moderna e funcional para o controle de acessos e funcionalidades administrativas.

---

## 🚀 Tecnologias Utilizadas

- **[Vue.js 3](https://vuejs.org/)** – Framework JavaScript progressivo
- **[Vite](https://vitejs.dev/)** – Ferramenta de build e bundler de alta performance
- **[Pinia](https://pinia.vuejs.org/)** – Store management moderna para Vue 3
- **[Axios](https://axios-http.com/)** – Cliente HTTP para requisições à API
- **[ESLint](https://eslint.org/)** – Análise estática de código JavaScript
- **[Prettier](https://prettier.io/)** – Ferramenta de formatação de código
  
---

## 📁 Estrutura do Projeto

```
FabricaDoor_Frontend/
├── public/                 # Arquivos públicos, como index.html
├── src/                    # Código-fonte da aplicação
│   ├── assets/             # Imagens, ícones e arquivos estáticos
│   ├── components/         # Componentes Vue reutilizáveis
│   ├── views/              # Páginas principais
│   ├── router/             # Configuração das rotas
│   ├── store/              # Armazenamento de estado com Pinia
│   ├── services/           # Serviços para requisições HTTP (Axios)
│   └── App.vue             # Componente raiz
├── .eslintrc.cjs           # Configurações do ESLint
├── .prettierrc.json        # Configurações do Prettier
├── jsconfig.json           # Suporte ao VS Code para resolver caminhos
├── vite.config.js          # Configurações do Vite
├── package.json            # Dependências e scripts do projeto
└── README.md               # Este arquivo
```

---

## 🔧 Instalação e Execução

### 📌 Pré-requisitos

- Node.js ≥ 16.x
- npm ≥ 8.x

### 📥 Instalação

```bash
# Clone o repositório
git clone https://github.com/fabricadesoftware-ifc/FabricaDoor_Frontend.git

# Acesse a pasta do projeto
cd FabricaDoor_Frontend

# Instale as dependências
npm install
```

### ▶️ Executar em modo desenvolvimento

```bash
npm run dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

### 📦 Gerar build para produção

```bash
npm run build
```

### ✅ Verificar erros de código

```bash
npm run lint
```

---

## 📚 Funcionalidades esperadas

- 🔐 Login e autenticação de usuários
- 👤 Gestão de perfis de usuários
- 🚪 Controle de acessos
- 📊 Visualização de dashboards e relatórios
- ⚙️ Configurações administrativas

> **Nota:** As funcionalidades específicas podem variar conforme integração com o backend.

---

## 📦 Dependências principais

```json
"dependencies": {
  "vue": "^3.x",
  "pinia": "^2.x",
  "axios": "^1.x",
  "vue-router": "^4.x"
}
```

---

## 🧑‍💻 Contribuindo

Sinta-se à vontade para contribuir com o projeto!

### 📌 Como contribuir

1. Fork o projeto
2. Crie uma nova branch (`git checkout -b feature/minha-feature`)
3. Faça seus commits (`git commit -m 'Adiciona nova funcionalidade'`)
4. Envie para o repositório remoto (`git push origin feature/minha-feature`)
5. Abra um Pull Request

---

## 👨‍🏫 Equipe / Agradecimentos

Projeto desenvolvido no âmbito da disciplina de Fábrica de Software do Instituto Federal Catarinense (IFC) por discentes do curso de Sistemas de Informação.

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📌 Observações

- O projeto está em desenvolvimento ativo.
- A estrutura pode ser reorganizada à medida que novas funcionalidades forem implementadas.
- A pasta `/src/services/` é ideal para abstrações de consumo da API.
- Requisições podem depender de um backend em execução, possivelmente hospedado em outro repositório como `FabricaDoor_Backend`.

---
