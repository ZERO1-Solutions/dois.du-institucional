const ContactPageSchema = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contato - dois.du",
          description: "Entre em contato com o estúdio dois.du em Porto Alegre, RS. WhatsApp, e-mail e redes sociais.",
          url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://doisdu.com.br"}/contato`,
          mainEntity: {
            "@type": "Organization",
            name: "dois.du",
            telephone: "+5554996418178",
            email: "eduardo.doisdu@gmail.com"
          }
        })
      }}
    />
  );
};

export default ContactPageSchema;
