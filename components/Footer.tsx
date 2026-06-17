import Link from 'next/link';
import { FaInstagram, FaBehance, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-light py-12">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <Link href="/" className="text-2xl font-bold text-green-primary">
            dois.du
          </Link>
          <p className="mt-4 text-gray-600">
            Transformando ideias em identidades memoráveis.
          </p>
          <div className="mt-8 flex justify-center gap-6">
            <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-green-primary transition-colors">
              <FaInstagram size={18} />
              <span>Instagram</span>
            </a>
            <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-green-primary transition-colors">
              <FaBehance size={18} />
              <span>Behance</span>
            </a>
            <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-green-primary transition-colors">
              <FaLinkedinIn size={18} />
              <span>LinkedIn</span>
            </a>
          </div>
          <p className="mt-8 text-sm text-gray-500">
            © 2026 dois.du. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
