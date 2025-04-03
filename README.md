# 🔥 Assistente de Priorização de Incidentes

Este é um aplicativo interativo e responsivo para **classificação de incidentes técnicos** com base na **Matriz de Incidentes**, inspirado nos princípios do livro *Site Reliability Engineering* da Google.

Desenvolvido com **Next.js, TailwindCSS, Framer Motion e shadcn/ui**, o app ajuda equipes de infraestrutura, desenvolvimento e operações a definirem a **prioridade objetiva de incidentes (P0 a P4)** com base em critérios técnicos e institucionais.

---

## 🧭 Funcionalidades

- ✅ Onboarding inicial com explicação do objetivo
- ✅ Coleta de dados do responsável (nome, cargo, email, app e infraestrutura)
- ✅ 6 perguntas baseadas nas dimensões da matriz:
  - Impacto Institucional
  - Impacto no Usuário Final
  - Impacto Regulatório
  - Escalabilidade da Falha
  - Recorrência
  - Facilidade de Correção
- ✅ Cálculo da prioridade com base em pontuação
- ✅ Resultado final com ícone e explicação
- ✅ Botão de envio direto via WhatsApp
- ✅ Design limpo, responsivo e elegante

---

## 📦 Tecnologias utilizadas

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

---

## 🚀 Como rodar localmente


# Clone o repositório
git clone https://github.com/seu-usuario/assistente-incidentes.git
cd assistente-incidentes

# Instale as dependências
npm install

# Rode o servidor local
npm run dev

Abra [http://localhost:3000](http://localhost:3000) no navegador para visualizar a aplicação.

---

## 🌐 Deploy no Vercel

Este projeto está pronto para deploy com um clique via [Vercel](https://vercel.com/):

1. Faça login na [Vercel](https://vercel.com)
2. Clique em **New Project**
3. Selecione este repositório (conecte ao GitHub, se necessário)
4. Clique em **Deploy** e aguarde o build automático

---