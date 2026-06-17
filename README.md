# dois.du - Portfólio de Design Gráfico

Site institucional e portfólio premium para o estúdio de design gráfico **dois.du**, especializado em Identidade Visual, Social Media e Materiais Gráficos para Impressão.

---

## 🎨 Identidade Visual

- **Marca**: dois.du
- **Tipografia**: DM Sans
- **Paleta de cores**:
  - Verde Principal: `#29471E`
  - Verde Secundário: `#345A27`
  - Laranja Destaque: `#F46A2C`
  - Branco: `#FFFFFF`
  - Cinza Claro: `#F5F5F5`
  - Preto: `#111111`

---

## 🚀 Tecnologias Utilizadas

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Framer Motion** - Animações
- **Decap CMS** - Gerenciamento de conteúdo
- **React Icons** - Ícones
- **Vercel** - Deploy recomendado

---

## 📱 Páginas

1. **Home** - Hero, depoimentos e serviços
2. **Sobre** - História do designer e filosofia
3. **Portfólio** - Grid de projetos e casos de estudo
4. **Contato** - Formulário e redes sociais

---

## ⚙️ Instalação e Execução

### 1. Clone o repositório ou baixe os arquivos
### 2. Instale as dependências
```bash
npm install
```
### 3. Execute o servidor de desenvolvimento
```bash
npm run dev
```
### 4. Acesse no navegador
Abra [http://localhost:3000](http://localhost:3000)

---

## 📝 Guia do Decap CMS (Painel Admin)

### Configuração Inicial (para usar o CMS)
1. **Crie um repositório no GitHub** e faça o push do seu projeto
2. **Conecte o repositório na Vercel ou Netlify** para deploy
3. **Habilite o Git Gateway**:
   - **Vercel**: Vá para Settings → Git → Git Gateway
   - **Netlify**: Vá para Settings → Identity → Enable Identity, depois Settings → Identity → Services → Git Gateway

### Acessar o Painel Admin
1. Vá para o seu site e adicione `/admin` (ex: `https://seusite.com/admin`)
2. Faça login com sua conta do GitHub
3. Pronto! Você verá o painel de gerenciamento.

---

### 1. Gerenciar Projetos
1. No menu, clique em **"Projetos"**
2. Clique em **"New Projetos"** para adicionar um novo
3. Preencha os campos:
   - Título, Cliente, Categoria, Ano
   - Imagem de capa
   - Descrição, Sobre o cliente, Objetivo, Desafio, Solução
   - Logos, Paleta de cores, Tipografia
   - Serviços realizados (marque as opções)
   - Galeria (adicione múltiplas imagens)
4. Clique em **"Save"** para publicar!

---

### 2. Gerenciar Depoimentos
1. No menu, clique em **"Depoimentos"**
2. Clique em **"New Depoimentos"** para adicionar um novo
3. Preencha:
   - Nome do cliente
   - Empresa
   - Texto do depoimento
4. Clique em **"Save"**!

---

### O que acontece depois?
Quando você salva um item:
1. Arquivos Markdown são criados/editados na pasta `content/`
2. Commit automático no GitHub
3. Redeploy automático na Vercel/Netlify

---

## 🔧 Build para Produção
```bash
npm run build
npm start
```

---

## 📄 Licença
Projeto privado - dois.du © 2026

