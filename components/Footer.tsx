import Link from 'next/link';
import Zero1Partner from './Zero1Partner';
import { FaInstagram, FaBehance, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
<footer className="bg-green-primary py-8 md:py-12">
  <div className="container mx-auto px-4 md:px-6">
    <div className="flex flex-col lg:flex-row justify-between items-start gap-10">

      {/* Área do cliente */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">

        {/* Marca */}
        <div>
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold text-white"
          >
            dois.du
          </Link>

          <p className="mt-4 text-green-100 text-sm">
            Transformando ideias em identidades memoráveis.
          </p>
        </div>

        {/* Redes */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Redes Sociais
          </h3>

          <div className="flex flex-col gap-3">
            <a
              href="https://www.instagram.com/dois.du/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-100 hover:text-orange-accent transition-colors"
            >
              <FaInstagram size={16} />
              Instagram
            </a>

            <a
              href="https://www.behance.net/eduardogobbi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-100 hover:text-orange-accent transition-colors"
            >
              <FaBehance size={16} />
              Behance
            </a>

            <a
              href="https://www.linkedin.com/in/eduardo-luiz-gobbi/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-100 hover:text-orange-accent transition-colors"
            >
              <FaLinkedinIn size={16} />
              LinkedIn
            </a>
          </div>
        </div>

        {/* Direitos */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Informações
          </h3>

          <p className="text-green-200 text-sm">
            © 2026 dois.du
          </p>

          <p className="text-green-200 text-sm mt-2">
            Todos os direitos reservados.
          </p>
        </div>

      </div>

      {/* Zero1 isolada na direita */}
      <div className="flex justify-end lg:min-w-[280px]">
        <Zero1Partner isDark={true} />
      </div>

    </div>
  </div>
</footer>
  );
};

export default Footer;
