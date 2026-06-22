'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import data from '@/content/data.json';

export default function Home() {
  const { home, testimonials, services } = data;
  const whatsappMessage = encodeURIComponent('Olá, Eduardo! Vim pelo site da dois.du e gostaria de solicitar um orçamento. Podemos conversar?');
  const whatsappUrl = `https://wa.me/5554996418178?text=${whatsappMessage}`;
  
  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 bg-green-primary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1"
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {home.title}
              </h1>
              <p className="mt-4 md:mt-6 text-base md:text-lg text-green-100">
                {home.description}
              </p>
              <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4">
                <Link href="/portfolio" className="bg-orange-accent text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:bg-orange-600 transition-colors w-full sm:w-auto text-center">
                  Conheça meu trabalho
                </Link>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:bg-white hover:text-green-primary transition-colors w-full sm:w-auto text-center">
                  Solicitar orçamento
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative order-1 md:order-2"
            >
              <div className="aspect-[4/5] bg-white rounded-2xl md:rounded-3xl overflow-hidden max-w-sm md:max-w-full mx-auto">
                <img 
                  src="/images/Site/foto_eduardo.png" 
                  alt="Eduardo - Designer"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-black-primary mb-8 md:mb-12">
            Nossos Serviços
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 p-6 md:p-8 rounded-2xl hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg md:text-xl font-semibold text-green-primary mb-3 md:mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 bg-gray-light">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-black-primary mb-8 md:mb-12">
            Depoimentos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200"
              >
                <p className="text-gray-600 mb-4 md:mb-6">"{testimonial.text}"</p>
                <p className="font-semibold text-black-primary">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.company}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
