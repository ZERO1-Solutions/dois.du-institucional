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
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-black-primary mb-8 md:mb-12">Sobre</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="aspect-aspect-[4/5] bg-gray-light rounded-2xl md:rounded-3xl overflow-hidden max-w-sm md:max-w-full mx-auto order-1"
            >
              <img 
                src="/images/Site/foto_eduardo.png" 
                alt="Eduardo"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-2"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-orange-accent mb-3 md:mb-4">{about.title}</h2>
              <p className="text-gray-600 mb-3 md:mb-4">{about.description1}</p>
              <p className="text-gray-600 mb-3 md:mb-4">{about.description2}</p>
              <h3 className="text-lg md:text-xl font-semibold text-green-primary mt-6 md:mt-8 mb-3 md:mb-4">{about.philosophy}</h3>
              <p className="text-gray-600">{about.philosophyText}</p>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
