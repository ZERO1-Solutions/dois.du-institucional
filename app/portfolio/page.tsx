'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
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

export default function Portfolio() {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);

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
            <h1 className="text-3xl md:text-4xl font-bold text-black-primary mb-8 md:mb-12">Portfólio</h1>
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-500">Carregando...</p>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const { projects } = data || { projects: [] };

  return (
    <main>
      <Header />
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-black-primary mb-8 md:mb-12">Portfólio</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                  <div className="aspect-square bg-gray-light rounded-2xl overflow-hidden mb-3 md:mb-4 border border-gray-200 flex items-center justify-center">
                    <motion.img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-contain"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-gray-200">
                    <h3 className="text-lg md:text-xl font-semibold text-black-primary group-hover:text-green-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {project.category} • {project.year}
                    </p>
                    <p className="text-gray-600 mt-2 text-sm">{project.description}</p>
                  </div>
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
