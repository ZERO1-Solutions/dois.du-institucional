-- Script para criar todas as tabelas necessárias no Supabase
-- Execute este SQL no Editor SQL do seu projeto no Supabase (https://supabase.com/dashboard/project/SEU-PROJECT-ID/sql/new)

-- 1. Tabela site_settings (configurações do site)
CREATE TABLE IF NOT EXISTS site_settings (
    id INT PRIMARY KEY DEFAULT 1,
    site_name TEXT DEFAULT 'dois.du',
    site_description TEXT DEFAULT 'Estúdio de design gráfico especializado em Identidade Visual, Social Media e Materiais Gráficos para Impressão',
    contact_email TEXT DEFAULT 'eduardo.doisdu@gmail.com',
    whatsapp_number TEXT DEFAULT '5554996418178',
    instagram_link TEXT DEFAULT 'https://www.instagram.com/dois.du/',
    facebook_link TEXT DEFAULT 'https://www.facebook.com/2dois.du',
    linkedin_link TEXT DEFAULT 'https://www.linkedin.com/in/eduardo-luiz-gobbi/',
    behance_link TEXT DEFAULT 'https://www.behance.net/eduardogobbi'
);

-- Inserir dados iniciais em site_settings
INSERT INTO site_settings (id, site_name, site_description, contact_email, whatsapp_number, instagram_link, facebook_link, linkedin_link, behance_link)
VALUES (1, 'dois.du', 'Estúdio de design gráfico especializado em Identidade Visual, Social Media e Materiais Gráficos para Impressão', 'eduardo.doisdu@gmail.com', '5554996418178', 'https://www.instagram.com/dois.du/', 'https://www.facebook.com/2dois.du', 'https://www.linkedin.com/in/eduardo-luiz-gobbi/', 'https://www.behance.net/eduardogobbi')
ON CONFLICT (id) DO NOTHING;

-- 2. Tabela home_content (conteúdo da página inicial)
CREATE TABLE IF NOT EXISTS home_content (
    id INT PRIMARY KEY DEFAULT 1,
    title TEXT DEFAULT 'Transformando ideias em identidades memoráveis.',
    description TEXT DEFAULT 'Estúdio de design gráfico especializado em Identidade Visual, Social Media e Materiais Gráficos para Impressão.'
);

-- Inserir dados iniciais em home_content
INSERT INTO home_content (id, title, description)
VALUES (1, 'Transformando ideias em identidades memoráveis.', 'Estúdio de design gráfico especializado em Identidade Visual, Social Media e Materiais Gráficos para Impressão.')
ON CONFLICT (id) DO NOTHING;

-- 3. Tabela services (serviços oferecidos)
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    title TEXT,
    description TEXT,
    sort_order INT
);

-- Inserir dados iniciais em services
INSERT INTO services (title, description, sort_order)
VALUES 
    ('Identidade Visual', 'Criação de marca, redesign e manual de marca completo.', 0),
    ('Social Media', 'Planejamento visual, design para redes sociais e campanhas.', 1),
    ('Materiais Impressos', 'Cartões, catálogos, flyers, banners e muito mais.', 2)
ON CONFLICT DO NOTHING;

-- 4. Tabela testimonials (depoimentos de clientes)
CREATE TABLE IF NOT EXISTS testimonials (
    id SERIAL PRIMARY KEY,
    name TEXT,
    company TEXT,
    text TEXT,
    sort_order INT
);

-- Inserir dados iniciais em testimonials
INSERT INTO testimonials (name, company, text, sort_order)
VALUES 
    ('Ana Silva', 'Loja Moderna', 'Trabalho incrível! A identidade visual ficou exatamente como imaginávamos.', 0),
    ('Carlos Costa', 'Café Doce', 'Profissionalismo e criatividade em cada detalhe. Recomendo muito!', 1),
    ('Maria Souza', 'Studio Beauty', 'Resultado superou nossas expectativas. Parabéns pelo trabalho!', 2)
ON CONFLICT DO NOTHING;

-- 5. Tabela projects (projetos do portfólio)
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title TEXT,
    category TEXT,
    year INT,
    description TEXT,
    cover_image TEXT,
    client TEXT,
    objective TEXT,
    challenge TEXT,
    solution TEXT,
    sort_order INT
);

-- 6. Tabela project_gallery (galeria de imagens dos projetos)
CREATE TABLE IF NOT EXISTS project_gallery (
    id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(id) ON DELETE CASCADE,
    image_url TEXT,
    sort_order INT
);

-- 7. Tabela about_content (conteúdo da página sobre)
CREATE TABLE IF NOT EXISTS about_content (
    id INT PRIMARY KEY DEFAULT 1,
    title TEXT DEFAULT 'Quem é Eduardo?',
    description1 TEXT DEFAULT 'Sou o fundador do estúdio dois.du, apaixonado por design gráfico e por transformar ideias em realidade visual. Com anos de experiência no mercado, desenvolvi projetos para diversos clientes, sempre buscando qualidade e atenção aos detalhes.',
    description2 TEXT DEFAULT 'A dois.du nasceu com a missão de criar identidades visuais fortes e memoráveis, que realmente representem a essência de cada marca.',
    philosophy TEXT DEFAULT 'Nossa Filosofia',
    philosophy_text TEXT DEFAULT 'Criatividade aliada a estratégia, sempre focada nos resultados do cliente. Cada projeto é único e desenvolvido com muito cuidado e dedicação.'
);

-- Inserir dados iniciais em about_content
INSERT INTO about_content (id, title, description1, description2, philosophy, philosophy_text)
VALUES (1, 'Quem é Eduardo?', 'Sou o fundador do estúdio dois.du, apaixonado por design gráfico e por transformar ideias em realidade visual. Com anos de experiência no mercado, desenvolvi projetos para diversos clientes, sempre buscando qualidade e atenção aos detalhes.', 'A dois.du nasceu com a missão de criar identidades visuais fortes e memoráveis, que realmente representem a essência de cada marca.', 'Nossa Filosofia', 'Criatividade aliada a estratégia, sempre focada nos resultados do cliente. Cada projeto é único e desenvolvido com muito cuidado e dedicação.')
ON CONFLICT (id) DO NOTHING;

-- 8. Tabela contact_messages (mensagens do formulário de contato)
CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    service TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Criar bucket para armazenamento de imagens (se não existir)
-- Vá para Storage > Buckets > New Bucket no painel do Supabase e crie um bucket chamado "portfolio-images"
-- Configure o bucket como público (para que as imagens sejam acessíveis)

-- Habilitar Row Level Security (RLS) para o bucket
-- Vá para Storage > Buckets > portfolio-images > Policies
-- Adicione uma política para permitir leitura pública:
-- Policy name: Allow public read access
-- For: SELECT
-- To: public
-- Using: true
--
-- Adicione uma política para permitir uploads autenticados:
-- Policy name: Allow authenticated uploads
-- For: INSERT
-- To: authenticated
-- Using: true
--
-- Adicione uma política para permitir exclusões autenticadas:
-- Policy name: Allow authenticated deletes
-- For: DELETE
-- To: authenticated
-- Using: true
