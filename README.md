# Associação Beneficente Beija-Flor da Massaranduba 🌸

Este é o repositório do portal institucional e administrativo da **Associação Beija-Flor da Massaranduba**, uma organização sem fins lucrativos que promove o desenvolvimento comunitário e apoia a educação infantil e oficinas para adolescentes na comunidade de Massaranduba, Salvador - BA.

O portal foi desenvolvido utilizando tecnologias de ponta para oferecer uma experiência moderna, rica em detalhes visuais, com animações fluidas e recursos avançados de acessibilidade para toda a comunidade.

---

## 🚀 Sumário
1. [Principais Funcionalidades](#-principais-funcionalidades)
2. [Acessibilidade Digital](#-acessibilidade-digital)
3. [Credenciais de Administração (Seed)](#-credenciais-de-administração-seed)
4. [Tecnologias Utilizadas](#-tecnologias-utilizadas)
5. [Estrutura do Banco de Dados (Modelos Prisma)](#-estrutura-do-banco-de-dados-modelos-prisma)
6. [Instalação e Execução](#-instalação-e-execução)
7. [Arquitetura e Padrões do Projeto](#-arquitetura-e-padrões-do-projeto)
8. [Estrutura de Arquivos](#-estrutura-de-arquivos)

---

## 🎨 Principais Funcionalidades

### 🌟 Portal Público
*   **Apresentação Institucional:** Seção Hero dinâmica, linha do tempo histórica, história inspiradora ("Fábula do Beija-Flor"), grade de serviços prestados e impacto quantificado com contadores animados.
*   **Mural de Avisos:** Espaço comunitário com avisos ativos divididos por categorias (Geral, Evento, Reunião). O portal conta com um sistema de **Popup em Destaque** na página inicial para comunicados urgentes.
*   **Blog / Notícias:** Blog completo com categorias e páginas de detalhes para manter a comunidade informada sobre as ações da Associação.
*   **Mural de Perguntas Frequentes (FAQ):** Sanador de dúvidas interativo em estilo sanfona (accordion).
*   **Galeria Integrada de Redes Sociais:** Vitrine com posts simulados do Instagram e Facebook que mostram engajamento real (curtidas e comentários).
*   **Portal da Transparência:** Prestação de contas pública. Contém:
    *   Filtro mensal e anual de movimentações.
    *   Gráficos interativos de receitas versus despesas.
    *   Tabela detalhada de lançamentos categorizados.
    *   **Meta de Arrecadação Mensal:** Barra de progresso visual comparando o valor arrecadado contra a meta do mês corrente.
    *   **Gerador de QR Code PIX:** Facilitação de doações via PIX copiável ou leitura de QR Code.

### 🔐 Painel Administrativo (`/admin`)
*   **Dashboard Executivo:** Painel de controle restrito protegido por autenticação JWT (cookies HTTPOnly). Exibe métricas consolidadas de caixa, contagem de voluntários pendentes e últimos lançamentos.
*   **Gerenciador Financeiro:** Controle total de lançamentos de receitas e despesas com categorização e valores.
*   **Gerenciador de Avisos:** Criação, exclusão e controle de visibilidade dos avisos. Permite definir qual aviso aparecerá como popup de alerta na página inicial (com remoção automática de destaques anteriores).
*   **Gerenciador do Blog:** Cadastro, edição e exclusão de posts com suporte a publicação imediata ou modo rascunho.
*   **Gerenciador do FAQ:** Cadastro e edição de perguntas frequentes com ordenação customizável.
*   **Gerenciador da Galeria:** Publicação de cards de redes sociais para a galeria do portal.
*   **Banco de Candidatos a Voluntários:** Gestão dos candidatos que preencheram o formulário público do site. O administrador pode visualizar mensagens de intenção, contato e alterar o status (`PENDING`, `CONTACTED`, `ARCHIVED`).

---

## ♿ Acessibilidade Digital

O portal Beija-Flor foi concebido respeitando as boas práticas de inclusão na web, contendo:
1.  **Barra de Acessibilidade Flutuante (`AccessibilityToolbar`):**
    *   **Aumento e Diminuição de Fonte:** Ajuste dinâmico do tamanho base da fonte da aplicação (`root html`) de 90% a 120%.
    *   **Alto Contraste:** Alternador dinâmico de cores de contraste elevado para pessoas com baixa visão, aplicando a classe CSS `.high-contrast` de forma global.
2.  **VLibras:** Integração oficial com o widget do Governo Federal para tradução automática do conteúdo textual do site para a Língua Brasileira de Sinais (LIBRAS).

---

## 🔑 Credenciais de Administração (Seed)

Após rodar o script de semeadura do banco de dados, você poderá acessar o Painel Administrativo (`/admin`) através da página de login (`/login`) utilizando as credenciais:

*   **Usuário:** `admin`
*   **Senha:** `adminbeijaflor`

---

## 🛠 Tecnologias Utilizadas

*   **Framework Principal:** [Next.js 16.2.7](https://nextjs.org/) (App Router, Turbopack habilitado)
*   **Interface e Lógica:** [React 19.2.4](https://react.dev/)
*   **Estilização:** [Tailwind CSS v4.3.0](https://tailwindcss.com/) & Vanilla CSS
*   **Banco de Dados & ORM:** [Prisma ORM v5.22.0](https://www.prisma.io/) com banco de dados **PostgreSQL**
*   **Validações de Formulário:** [Zod v4.4.3](https://zod.dev/)
*   **Criptografia & Autenticação:** [Bcryptjs v3.0.3](https://github.com/dcodeIO/bcrypt.js/) e [Jose v6.2.3](https://github.com/panva/jose) (para geração de tokens JWT seguros de 2h de expiração)
*   **Animações:** [Framer Motion v12.40.0](https://www.framer.com/motion/)
*   **Ícones:** [Lucide React v1.17.0](https://lucide.dev/)

---

## 🗄 Estrutura do Banco de Dados (Modelos Prisma)

O arquivo [schema.prisma](file:///c:/Users/Ramon%20DevTec/Desktop/Projetos/BeijaFlor/prisma/schema.prisma) define os seguintes modelos relacionais:

### `User`
Armazena os usuários administradores do sistema.
*   `id` (UUID, Chave Primária)
*   `username` (Texto único, ex: "admin")
*   `passwordHash` (Hash Bcrypt da senha)

### `Transaction`
Registro de movimentações financeiras para o portal de transparência.
*   `id` (UUID, Chave Primária)
*   `description` (Descrição do lançamento, ex: "Compra de Alimentos")
*   `amount` (Valor em Float)
*   `type` (Enum: `INCOME` para Receitas, `EXPENSE` para Despesas)
*   `category` (Categoria do lançamento)
*   `date` (Data da movimentação)

### `Notice`
Mural de avisos para a comunidade.
*   `id` (UUID, Chave Primária)
*   `title` (Título do aviso)
*   `content` (Corpo de texto explicativo)
*   `category` (Enum: `GENERAL`, `EVENT`, `MEETING`)
*   `date` (Data de agendamento/exibição)
*   `active` (Booleano indicando se o aviso está visível)
*   `showPopup` (Booleano indicando se o aviso é o destaque popup do dia)

### `GalleryPost`
Cards representativos de postagens nas redes sociais da associação.
*   `id` (UUID, Chave Primária)
*   `image` (URL ou caminho da imagem)
*   `text` (Texto da publicação)
*   `link` (Link para o post original, opcional)
*   `platform` (Plataforma, ex: "instagram" ou "facebook")
*   `likes` / `comments` (Contagem de engajamento)

### `BlogPost`
Artigos publicados na seção de notícias do blog.
*   `id` (UUID, Chave Primária)
*   `title` (Título da matéria)
*   `excerpt` (Resumo breve)
*   `content` (Conteúdo do artigo em texto/HTML)
*   `image` (URL ou caminho da imagem de capa)
*   `category` (Categoria, ex: "Creche", "Campanhas")
*   `published` (Booleano para controle de rascunhos)
*   `date` (Data de publicação)

### `FaqItem`
Seção de perguntas frequentes.
*   `id` (UUID, Chave Primária)
*   `question` / `answer` (Estrutura de pergunta e resposta)
*   `order` (Número inteiro de ordenação na tela)
*   `active` (Controle de exibição)

### `FinancialGoal`
Meta financeira de arrecadação do mês corrente.
*   `id` (UUID, Chave Primária)
*   `month` / `year` (Mês e Ano de referência)
*   `target` (Valor objetivo da meta em Float)
*   `current` (Valor atual já arrecadado no mês)

### `VolunteerCandidate`
Formulários de candidaturas para trabalho voluntário.
*   `id` (UUID, Chave Primária)
*   `name` / `email` / `phone` (Dados do interessado)
*   `area` (Área de interesse, ex: "pedagogia", "cozinha", "artes")
*   `message` (Mensagem de apresentação, opcional)
*   `status` (Texto indicando status: `PENDING`, `CONTACTED`, `ARCHIVED`)

---

## 💻 Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente:

### 1. Pré-requisitos
*   Node.js (v18 ou superior recomendado)
*   Banco de dados PostgreSQL rodando localmente ou na nuvem (Supabase, Neon, Docker, etc.)

### 2. Configurando o Ambiente
Crie um arquivo `.env` na raiz do projeto (copiando as chaves de exemplo se houver) e configure suas variáveis de conexão:
```env
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/NOME_DO_BANCO?schema=public"
JWT_SECRET="sua-chave-secreta-jwt-com-mais-de-32-caracteres"
```

### 3. Instalando as Dependências
No terminal, na raiz do projeto, instale os pacotes:
```bash
npm install
```

### 4. Configurando o Banco de Dados (Prisma)
Rode as migrações para criar as tabelas no seu banco PostgreSQL:
```bash
npx prisma migrate dev --name init
```

Popule o banco de dados com os dados de exemplo (incluindo a criação do usuário administrador `admin`):
```bash
npx prisma db seed
```

### 5. Executando o Servidor de Desenvolvimento
Inicie o servidor local com suporte Turbopack:
```bash
npm run dev
```
O projeto estará disponível no endereço: **[http://localhost:3000](http://localhost:3000)**.

---

## 🏗 Arquitetura e Padrões do Projeto

*   **Server Actions (`src/lib/actions.ts`):** Toda a lógica de inserção, exclusão e edição dos dados é gerenciada por meio de Server Actions do Next.js. Elas contam com a validação rigorosa dos dados utilizando o Zod (`src/lib/validations.ts`) antes de interagir com o Prisma Client.
*   **Proteção de Rotas:** Feita diretamente no layout das rotas administrativas (`src/app/admin/layout.tsx`). A função `getAdminSession` verifica o cookie encriptado assinado pelo JWT. Se ausente ou inválido, redireciona o usuário imediatamente para a rota de `/login`.
*   **Componentes de Cliente vs. Servidor:**
    *   As páginas principais (`src/app/page.tsx`, `src/app/transparencia/page.tsx`, etc.) são **Server Components**, carregando os dados diretamente do banco de dados no servidor e passando para componentes clientes que necessitam de interatividade.
    *   Componentes interativos (como painéis administrativos, formulários e o gerador de PIX) possuem a diretiva `"use client"` para manipular estados e reações do usuário.

---

## 📁 Estrutura de Arquivos

Aqui está uma visão simplificada da organização estrutural do projeto:

```text
├── prisma/
│   ├── schema.prisma   # Definições de tabelas do banco de dados
│   └── seed.ts         # Script para popular dados e administrador padrão
├── src/
│   ├── app/
│   │   ├── admin/      # Páginas de gerenciamento e dashboard restrito
│   │   ├── avisos/     # Visualização pública de comunicados
│   │   ├── blog/       # Blog público
│   │   ├── login/      # Página de login do administrador
│   │   ├── transparencia/ # Portal de transparência financeira
│   │   ├── globals.css # Folha de estilos globais (configuração do Tailwind v4)
│   │   ├── layout.tsx  # Layout base da aplicação com topo, rodapé e Libras
│   │   └── page.tsx    # Landing page institucional
│   ├── components/     # Componentes compartilhados e componentes administrativos
│   └── lib/
│       ├── actions.ts  # Next.js Server Actions para mutação de dados
│       ├── auth.ts     # Utilitários de encriptação de sessão JWT
│       ├── db.ts       # Singleton de conexão do Prisma Client
│       └── validations.ts # Schemas de validação Zod para todos os formulários
├── package.json
└── tsconfig.json
```

---

*Desenvolvido com carinho para a Associação Beija-Flor da Massaranduba.* 🌸
