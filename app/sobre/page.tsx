'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import data from '@/content/data.json';

export default function Sobre() {
  const { about } = data;
  
  return (
    <main>
      <Header />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-black-primary mb-12">Sobre</h1>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="aspect-square bg-gray-light rounded-3xl overflow-hidden"
            >
              <img 
                src="https://placehold.co/600x600/345A27/FFFFFF?text=Eduardo" 
                alt="Eduardo"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold text-green-primary mb-4">{about.title}</h2>
              <p className="text-gray-600 mb-4">{about.description1}</p>
              <p className="text-gray-600 mb-4">{about.description2}</p>
              <h3 className="text-xl font-semibold text-black-primary mt-8 mb-4">{about.philosophy}</h3>
              <p className="text-gray-600">{about.philosophyText}</p>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
