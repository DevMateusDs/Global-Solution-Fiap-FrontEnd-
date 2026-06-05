# Controle de Missão Espacial - Mobile (Front-end) 🚀

Este repositório contém o aplicativo mobile da Solução Integrada para Controle de Missão Espacial, desenvolvido como avaliação (Global Solution) para a disciplina de Advanced Programming And Mobile Dev.

## 📋 Descrição do Projeto
O aplicativo foi construído utilizando **React Native com TypeScript** para atuar como o painel de controle operacional da missão espacial. Ele consome nossa API RESTful (desenvolvida em Java com Spring Boot) para gerenciar dados críticos em tempo real.

O app demonstra a integração completa entre front-end e back-end, realizando requisições HTTP (GET, POST, PUT e DELETE) para um banco de dados H2.

## 📱 Funcionalidades
O aplicativo atende a todos os requisitos propostos, possuindo telas navegáveis e interface funcional para:
* **Dashboard Interativo:** Visualização em abas das informações salvas, incluindo o status da missão, leituras dos módulos computacionais, registros operacionais e alertas críticos.
* **Cadastro de Sensores:** Formulário para envio de novos sensores ao backend via requisição POST.
* **Registro de Eventos:** Tela dedicada para reportar eventos operacionais e status dos sistemas monitorados.
* **Emissão de Alertas:** Interface para cadastrar novos alertas com níveis de gravidade.
* **Gestão de Dados:** Capacidade de atualizar e remover registros diretamente pelo aplicativo.

## 🛠️ Tecnologias Utilizadas
* **React Native** (com Expo)
* **TypeScript** (Tipagem forte espelhando os modelos do backend)
* **React Navigation** (Navegação em Pilha/Stack)
* **Axios** (Integração e requisições de API)

## 🚀 Como Executar o Projeto

1. **Pré-requisitos:** Certifique-se de que o backend (Spring Boot) esteja em execução localmente na porta `8080`.
2. Instale as dependências do projeto:
   npm install

3. Inicie o aplicativo (recomendado testar em ambiente web):
   npx expo start --web


---

## 👥 Integrantes da Equipe
* **Mateus de Souza Santos** - RM: 559118
* **Arthur Bergamaço Alves** - RM: 556207
* **Leonardo Medeiros da Silva** - RM: 559220

---