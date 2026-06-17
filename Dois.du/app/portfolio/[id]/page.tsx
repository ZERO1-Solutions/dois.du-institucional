'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const projects = [
  {
    id: 1,
    title: 'Loja Moderna',
    category: 'Identidade Visual',
    year: 2024,
    description: 'Criação completa da identidade visual para uma loja de moda.',
    image: 'https://coreva-normal.trae.ai/api/ide/v1/text-to-image?prompt=Brand%20identity%20design%20for%20a%20modern%20clothing%20store%2C%20minimalist%20style&image_size=square',
    client: 'Loja Moderna',
    objective: 'Criar uma identidade visual moderna e atraente para uma loja de roupas.',
    challenge: 'Diferenciar a marca em um mercado competitivo.',
    solution: 'Desenvolver uma identidade visual clean e elegante, com foco na tipografia e cores neutras.'
  },
  {
    id: 2,
    title: 'Café Doce',
    category: 'Social Media',
    year: 2024,
    description: 'Planejamento e design de conteúdo para redes sociais de uma cafeteria.',
    image: 'https://coreva-normal.trae.ai/api/ide/v1/text-to-image?prompt=Social%20media%20design%20for%20a%20coffee%20shop%2C%20warm%20colors%2C%20minimalist&image_size=square',
    client: 'Café Doce',
    objective: 'Aumentar o engajamento nas redes sociais.',
    challenge: 'Criar conteúdo visualmente atraente e alinhado com a identidade da marca.',
    solution: 'Desenvolver um calendário de postagens com design consistente e convidativo.'
  },
  {
    id: 3,
    title: 'Studio Beauty',
    category: 'Materiais Impressos',
    year: 2023,
    description: 'Flyers, cartões e catálogos para um salão de beleza.',
    image: 'https://coreva-normal.trae.ai/api/ide/v1/text-to-image?prompt=Print%20materials%20for%20beauty%20salon%2C%20elegant%20design&image_size=square',
    client: 'Studio Beauty',
    objective: 'Criar materiais impressos profissionais.',
    challenge: 'Manter a elegância e sofisticação da marca em todos os materiais.',
    solution: 'Design minimalista com acabamentos premium.'
  }
];

export default function Projeto() {
  const params = useParams();
  const project = projects.find(p => p.id === Number(params.id));

  if (!project) {
    return <div>Projeto não encontrado</div>;
  }

  return (
    <main>
      <Header />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-black-primary">{project.title}</h1>
            <p className="text-lg text-gray-500 mt-2">{project.category} • {project.year}</p>
            <div className="mt-8 aspect-video bg-gray-light rounded-2xl overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <div className="mt-12 grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-semibold text-green-primary mb-4">Sobre o Cliente</h2>
              <p className="text-gray-600">{project.client}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold text-green-primary mb-4">Objetivo</h2>
              <p className="text-gray-600">{project.objective}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl font-semibold text-green-primary mb-4">Desafio</h2>
              <p className="text-gray-600">{project.challenge}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-semibold text-green-primary mb-4">Solução Criativa</h2>
              <p className="text-gray-600">{project.solution}</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-semibold text-green-primary mb-4">Galeria</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1,2,3,4,5,6].map((i) => (
                <div key={i} className="aspect-square bg-gray-light rounded-xl overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={`Galeria ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
