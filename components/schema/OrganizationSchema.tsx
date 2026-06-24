const OrganizationSchema = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "dois.du",
          url: process.env.NEXT_PUBLIC_SITE_URL || "https://doisdu.com.br",
          logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://doisdu.com.br"}/images/Site/logo-doisdu.png`,
          sameAs: [
            "https://www.instagram.com/dois.du/",
            "https://www.facebook.com/2dois.du",
            "https://www.linkedin.com/in/eduardo-luiz-gobbi/",
            "https://www.behance.net/eduardogobbi"
          ]
        })
      }}
    />
  );
};

export default OrganizationSchema;
