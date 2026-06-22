'use client';

import { motion } from 'framer-motion';
import { FaWhatsapp, FaInstagram, FaFacebookF, FaLinkedinIn, FaBehance, FaEnvelope } from 'react-icons/fa';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Contato() {
  const whatsappMessage = encodeURIComponent('Olá, Eduardo! Vim pelo site da dois.du e gostaria de solicitar um orçamento. Podemos conversar?');
  const whatsappUrl = `https://wa.me/5554996418178?text=${whatsappMessage}`;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'Identidade Visual',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          service: 'Identidade Visual',
          message: '',
        });
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Ocorreu um erro ao enviar a mensagem.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage('Ocorreu um erro de conexão.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <Header />
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-black-primary mb-3 md:mb-4">Contato</h1>
          <p className="text-base md:text-xl text-gray-600 mb-8 md:mb-12">Vamos transformar sua ideia em uma identidade forte e profissional.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-orange-accent mb-4 md:mb-6">Entre em contato</h2>
              
              <a 
                href={whatsappUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-orange-accent text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:bg-orange-600 transition-colors mb-4 w-full sm:w-auto"
              >
                <FaWhatsapp size={18} />
                <span>WhatsApp</span>
              </a>

              <a 
                href="mailto:eduardo.doisdu@gmail.com"
                className="inline-flex items-center justify-center gap-3 bg-green-primary text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:bg-green-secondary transition-colors mb-6 md:mb-8 w-full sm:w-auto"
              >
                <FaEnvelope size={18} />
                <span>Enviar E-mail</span>
              </a>

              <div className="space-y-4">
                <h3 className="text-base md:text-lg font-semibold text-black-primary">Redes Sociais</h3>
                <div className="flex flex-wrap gap-3 md:gap-4">
                  <a href="https://www.instagram.com/dois.du/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-orange-accent transition-colors text-sm">
                    <FaInstagram size={18} />
                    <span>Instagram</span>
                  </a>
                  <a href="https://www.facebook.com/2dois.du" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-orange-accent transition-colors text-sm">
                    <FaFacebookF size={18} />
                    <span>Facebook</span>
                  </a>
                  <a href="https://www.linkedin.com/in/eduardo-luiz-gobbi/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-orange-accent transition-colors text-sm">
                    <FaLinkedinIn size={18} />
                    <span>LinkedIn</span>
                  </a>
                  <a href="https://www.behance.net/eduardogobbi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-orange-accent transition-colors text-sm">
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
              className="order-1 md:order-2"
            >
              <form onSubmit={handleSubmit} className="bg-gray-light p-6 md:p-8 rounded-2xl space-y-4 md:space-y-6 border border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-primary focus:border-transparent bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-primary focus:border-transparent bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Empresa</label>
                  <input 
                    type="text" 
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-primary focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Serviço desejado</label>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-primary focus:border-transparent bg-white"
                  >
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
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-primary focus:border-transparent bg-white"
                    required
                  ></textarea>
                </div>
                
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-100 text-green-primary rounded-xl border border-green-200">
                    Mensagem enviada com sucesso!
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-100 text-red-600 rounded-xl border border-red-200">
                    {errorMessage}
                  </div>
                )}
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-primary text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:bg-green-secondary transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
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
