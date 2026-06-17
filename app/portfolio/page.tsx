'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const projects = [
  {
    id: 1,
    title: 'Loja Moderna',
    category: 'Identidade Visual',
    year: 2024,
    description: 'Criação completa da identidade visual para uma loja de moda.',
    image: 'https://coreva-normal.trae.ai/api/ide/v1/text-to-image?prompt=Brand%20identity%20design%20for%20a%20modern%20clothing%20store%2C%20minimalist%20style&image_size=square'
  },
  {
    id: 2,
    title: 'Café Doce',
    category: 'Social Media',
    year: 2024,
    description: 'Planejamento e design de conteúdo para redes sociais de uma cafeteria.',
    image: 'https://coreva-normal.trae.ai/api/ide/v1/text-to-image?prompt=Social%20media%20design%20for%20a%20coffee%20shop%2C%20warm%20colors%2C%20minimalist&image_size=square'
  },
  {
    id: 3,
    title: 'Studio Beauty',
    category: 'Materiais Impressos',
    year: 2023,
    description: 'Flyers, cartões e catálogos para um salão de beleza.',
    image: 'https://coreva-normal.trae.ai/api/ide/v1/text-to-image?prompt=Print%20materials%20for%20beauty%20salon%2C%20elegant%20design&image_size=square'
  },
  {
    id: 4,
    title: 'Tech Solutions',
    category: 'Identidade Visual',
    year: 2023,
    description: 'Redesign completo da marca para uma startup de tecnologia.',
    image: 'https://coreva-normal.trae.ai/api/ide/v1/text-to-image?prompt=Tech%20company%20brand%20identity%2C%20modern%20minimalist&image_size=square'
  },
  {
    id: 5,
    title: 'Pet Shop Happy',
    category: 'Social Media',
    year: 2024,
    description: 'Campanha de social media para pet shop.',
    image: 'https://coreva-normal.trae.ai/api/ide/v1/text-to-image?prompt=Pet%20shop%20social%20media%20design%2C%20colorful%20and%20friendly&image_size=square'
  },
  {
    id: 6,
    title: 'Restaurante Sabores',
    category: 'Identidade Visual',
    year: 2023,
    description: 'Identidade visual completa para restaurante.',
    image: 'https://coreva-normal.trae.ai/api/ide/v1/text-to-image?prompt=Restaurant%20brand%20identity%2C%20elegant%20food%20design&image_size=square'
  }
];

export default function Portfolio() {
  return (
    <main>
      <Header />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-black-primary mb-12">Portfólio</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Link href={`/portfolio/${project.id}`}>
                  <div className="aspect-square bg-gray-light rounded-2xl overflow-hidden mb-4">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-black-primary group-hover:text-green-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {project.category} • {project.year}
                  </p>
                  <p className="text-gray-600 mt-2">{project.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
