'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import data from '@/content/data.json';

export default function Projeto() {
  const params = useParams();
  const project = data.projects.find(p => p.id === Number(params.id));

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
