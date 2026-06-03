# Plataforma EAD - Personal Knowledge Dashboard

Uma plataforma de ensino a distância (EAD) moderna, desenvolvida para oferecer uma experiência de aprendizado fluida para estudantes e uma gestão eficiente para administradores. O projeto utiliza tecnologias de ponta para garantir performance, escalabilidade e uma interface intuitiva.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

- **[React](https://reactjs.org/)** - Biblioteca principal para a interface.
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática para maior segurança e produtividade.
- **[Vite](https://vitejs.dev/)** - Build tool ultra-rápida para desenvolvimento frontend.
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utilitário para estilização moderna e responsiva.
- **[Zustand](https://github.com/pmndrs/zustand)** - Gerenciamento de estado leve e eficiente.
- **[Lucide React](https://lucide.dev/)** - Conjunto de ícones bonitos e consistentes.

## 📋 Funcionalidades

### Área do Aluno
- **Dashboard Personalizado:** Visualização do progresso nos cursos.
- **Catálogo de Cursos:** Listagem de cursos disponíveis.
- **Ambiente de Aula:** Interface otimizada para assistir vídeos e acessar módulos.

### Área do Administrador
- **Gestão de Alunos:** Controle total sobre os usuários da plataforma.
- **Gestão de Conteúdo:** Criação e edição de cursos, módulos e lições.
- **Métricas:** Dashboard com dados sobre o engajamento e progresso geral.

## 📁 Estrutura do Projeto

```text
src/
├── assets/      # Ativos estáticos (imagens, svgs)
├── components/  # Componentes reutilizáveis (Layouts, UI)
├── hooks/       # Hooks customizados (ex: useTheme)
├── lib/         # Utilitários e configurações de bibliotecas
├── pages/       # Páginas da aplicação (Admin e Student)
├── store/       # Gerenciamento de estado com Zustand
├── styles/      # Arquivos de estilo e configurações Tailwind
└── types/       # Definições de interfaces TypeScript
```

## 🛠️ Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou pnpm

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/charlesdesplanches18-ops/projeto-ead-plataforma.git
   ```

2. Entre na pasta do projeto:
   ```bash
   cd projeto-ead-plataforma
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

### Desenvolvimento

Para rodar o projeto em modo de desenvolvimento:
```bash
npm run dev
```
O projeto estará disponível em `http://localhost:5173`.

### Build para Produção

Para gerar a versão final do projeto:
```bash
npm run build
```
Os arquivos otimizados serão gerados na pasta `dist/`.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
Desenvolvido com ❤️ para uma experiência educacional superior.
