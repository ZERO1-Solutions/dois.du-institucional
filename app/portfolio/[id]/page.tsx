'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Project = {
  id: number;
  title: string;
  category: string;
  year: number;
  description: string;
  coverImage: string;
  galleryImages: string[];
  client: string;
  objective: string;
  challenge: string;
  solution: string;
};

type Data = {
  projects: Project[];
};

export default function Projeto() {
  const params = useParams();
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalImage, setModalImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data');
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <main>
        <Header />
        <section className="pt-28 md:pt-32 pb-16 md:pb-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-500">Carregando...</p>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const project = data?.projects.find(p => p.id === Number(params.id));

  if (!project) {
    return (
      <main>
        <Header />
        <section className="pt-28 md:pt-32 pb-16 md:pb-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-3xl md:text-4xl font-bold text-black-primary">Projeto não encontrado</h1>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Header />
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-black-primary">{project.title}</h1>
            <p className="text-base md:text-lg text-gray-600 mt-2">{project.category} • {project.year}</p>
            <div className="mt-6 md:mt-8 aspect-video bg-gray-light rounded-2xl overflow-hidden border border-gray-200 flex items-center justify-center">
              <img 
                src={project.coverImage} 
                alt={project.title}
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>

          <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-light p-6 rounded-2xl border border-gray-200"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-green-primary mb-3 md:mb-4">Sobre o Cliente</h2>
              <p className="text-gray-600">{project.client}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-light p-6 rounded-2xl border border-gray-200"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-green-primary mb-3 md:mb-4">Objetivo</h2>
              <p className="text-gray-600">{project.objective}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gray-light p-6 rounded-2xl border border-gray-200"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-green-primary mb-3 md:mb-4">Desafio</h2>
              <p className="text-gray-600">{project.challenge}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-light p-6 rounded-2xl border border-gray-200"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-green-primary mb-3 md:mb-4">Solução Criativa</h2>
              <p className="text-gray-600">{project.solution}</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 md:mt-12"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-black-primary mb-3 md:mb-4">Galeria</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {project.galleryImages.map((img, index) => (
                <div 
                  key={index} 
                  className="aspect-square bg-gray-light rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity border border-gray-200 flex items-center justify-center"
                  onClick={() => setModalImage(img)}
                >
                  <img 
                    src={img} 
                    alt={`Galeria ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      {modalImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setModalImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
            onClick={() => setModalImage(null)}
          >
            ×
          </button>
          <img 
            src={modalImage} 
            alt="Full size"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
    </main>
  );
}
