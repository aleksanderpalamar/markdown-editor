# Markdown Editor

Um editor de Markdown moderno com preview em tempo real, construído com Next.js 15 e Prisma.

## Funcionalidades

- ✨ Editor com preview em tempo real
- 📝 Suporte completo à sintaxe Markdown
- 💾 Salvamento automático
- 🌓 Tema claro/escuro
- 📱 Interface responsiva
- 🔄 Atualização em tempo real
- 📂 Gerenciamento de documentos

## Tecnologias

Este projeto utiliza as seguintes tecnologias:

- [Next.js 15](https://nextjs.org/) - Framework React com App Router
- [Prisma](https://www.prisma.io/) - ORM para banco de dados
- [SQLite](https://www.sqlite.org/) - Banco de dados
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [shadcn/ui](https://ui.shadcn.com/) - Componentes de UI reutilizáveis
- [Lucide Icons](https://lucide.dev/) - Biblioteca de ícones
- [date-fns](https://date-fns.org/) - Utilitários para manipulação de datas

## Começando

### Pré-requisitos

- Node.js 18+ 
- npm, pnpm, ou yarn

### Instalação

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto e adicione:

```
DATABASE_URL="file:./dev.db"
```

4. Execute as migrações do banco de dados:

```bash
npx prisma db push
```

5. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Estrutura do Projeto

- `/app` - Rotas e páginas da aplicação (App Router)
- `/components` - Componentes React reutilizáveis
- `/lib` - Utilitários e configurações
- `/prisma` - Schema e configurações do banco de dados
- `/public` - Arquivos estáticos
- `/providers` - Providers React (ex: tema)

## Contribua

Se você gostaria de contribuir para este projeto, sinta-se a vontade para abrir uma issue ou um pull request.

## Licenca

Este projeto está licenciado sob a licenca MIT. Leia o arquivo `LICENSE` para mais detalhes.
