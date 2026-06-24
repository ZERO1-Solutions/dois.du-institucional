const WebsiteSchema = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "dois.du",
          url: process.env.NEXT_PUBLIC_SITE_URL || "https://doisdu.com.br",
          potentialAction: {
            "@type": "SearchAction",
            target: `${process.env.NEXT_PUBLIC_SITE_URL || "https://doisdu.com.br"}/blog?search={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        })
      }}
    />
  );
};

export default WebsiteSchema;
