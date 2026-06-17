'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import data from '@/content/data.json';

export default function Home() {
  const { home, testimonials, services } = data;
  
  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-black-primary leading-tight">
                {home.title}
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                {home.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button className="bg-green-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-secondary transition-colors">
                  Conheça meu trabalho
                </button>
                <button className="border-2 border-orange-accent text-orange-accent px-8 py-4 rounded-xl font-semibold hover:bg-orange-accent hover:text-white transition-colors">
                  Solicitar orçamento
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square bg-gray-light rounded-3xl overflow-hidden">
                <img 
                  src="https://placehold.co/600x600/29471E/FFFFFF?text=Designer" 
                  alt="Designer"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-light">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-black-primary mb-12">
            Depoimentos
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm"
              >
                <p className="text-gray-600 mb-6">"{testimonial.text}"</p>
                <p className="font-semibold text-black-primary">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.company}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-black-primary mb-12">
            Nossos Serviços
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-100 p-8 rounded-2xl hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold text-green-primary mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
