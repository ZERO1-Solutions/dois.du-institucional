'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Sobre() {
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
                src="https://coreva-normal.trae.ai/api/ide/v1/text-to-image?prompt=Professional%20portrait%20of%20a%20male%20graphic%20designer%20named%20Eduardo%2C%20friendly%2C%20minimalist%20style&image_size=square" 
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
              <h2 className="text-2xl font-semibold text-green-primary mb-4">Quem é Eduardo?</h2>
              <p className="text-gray-600 mb-4">
                Sou o fundador do estúdio dois.du, apaixonado por design gráfico e por transformar ideias em realidade visual. Com anos de experiência no mercado, desenvolvi projetos para diversos clientes, sempre buscando qualidade e atenção aos detalhes.
              </p>
              <p className="text-gray-600 mb-4">
                A dois.du nasceu com a missão de criar identidades visuais fortes e memoráveis, que realmente representem a essência de cada marca.
              </p>
              <h3 className="text-xl font-semibold text-black-primary mt-8 mb-4">Nossa Filosofia</h3>
              <p className="text-gray-600">
                Criatividade aliada a estratégia, sempre focada nos resultados do cliente. Cada projeto é único e desenvolvido com muito cuidado e dedicação.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
