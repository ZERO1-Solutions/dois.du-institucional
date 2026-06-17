'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
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
                Transformando ideias em identidades memoráveis.
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Estúdio de design gráfico especializado em Identidade Visual, Social Media e Materiais Gráficos para Impressão.
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
                  src="https://coreva-normal.trae.ai/api/ide/v1/text-to-image?prompt=Professional%20portrait%20of%20a%20graphic%20designer%2C%20elegant%2C%20minimalist%20style&image_size=square" 
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
            {[
              { name: 'Ana Silva', company: 'Loja Moderna', text: 'Trabalho incrível! A identidade visual ficou exatamente como imaginávamos.' },
              { name: 'Carlos Costa', company: 'Café Doce', text: 'Profissionalismo e criatividade em cada detalhe. Recomendo muito!' },
              { name: 'Maria Souza', company: 'Studio Beauty', text: 'Resultado superou nossas expectativas. Parabéns pelo trabalho!' }
            ].map((testimonial, index) => (
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
            {[
              { title: 'Identidade Visual', description: 'Criação de marca, redesign e manual de marca completo.' },
              { title: 'Social Media', description: 'Planejamento visual, design para redes sociais e campanhas.' },
              { title: 'Materiais Impressos', description: 'Cartões, catálogos, flyers, banners e muito mais.' }
            ].map((service, index) => (
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
