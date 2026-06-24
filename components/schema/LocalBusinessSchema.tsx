const LocalBusinessSchema = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "dois.du",
          description: "Estúdio de design gráfico especializado em Identidade Visual, Social Media e Materiais Gráficos para Impressão em Porto Alegre, RS.",
          url: process.env.NEXT_PUBLIC_SITE_URL || "https://doisdu.com.br",
          telephone: "+5554996418178",
          email: "eduardo.doisdu@gmail.com",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Porto Alegre",
            addressRegion: "RS",
            addressCountry: "BR"
          },
          areaServed: [
            "Porto Alegre",
            "Região Metropolitana de Porto Alegre",
            "Rio Grande do Sul"
          ],
          priceRange: "$$"
        })
      }}
    />
  );
};

export default LocalBusinessSchema;
