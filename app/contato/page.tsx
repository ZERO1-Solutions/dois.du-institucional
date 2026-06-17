'use client';

import { motion } from 'framer-motion';
import { FaWhatsapp, FaInstagram, FaFacebookF, FaLinkedinIn, FaBehance } from 'react-icons/fa';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Contato() {
  return (
    <main>
      <Header />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-black-primary mb-4">Contato</h1>
          <p className="text-xl text-gray-600 mb-12">Vamos transformar sua ideia em uma identidade forte e profissional.</p>
          
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-semibold text-green-primary mb-6">Entre em contato</h2>
              
              <a 
                href="https://wa.me/5511999999999" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-orange-accent text-white px-8 py-4 rounded-xl font-semibold hover:bg-orange-600 transition-colors mb-8"
              >
                <FaWhatsapp size={20} />
                <span>WhatsApp</span>
              </a>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-black-primary">Redes Sociais</h3>
                <div className="flex gap-4">
                  <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-green-primary transition-colors">
                    <FaInstagram size={18} />
                    <span>Instagram</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-green-primary transition-colors">
                    <FaFacebookF size={18} />
                    <span>Facebook</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-green-primary transition-colors">
                    <FaLinkedinIn size={18} />
                    <span>LinkedIn</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-green-primary transition-colors">
                    <FaBehance size={18} />
                    <span>Behance</span>
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Empresa</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Serviço desejado</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-primary focus:border-transparent">
                    <option>Identidade Visual</option>
                    <option>Social Media</option>
                    <option>Materiais Impressos</option>
                    <option>Orçamento</option>
                    <option>Outro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mensagem</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-primary focus:border-transparent"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-green-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-secondary transition-colors"
                >
                  Enviar mensagem
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
