interface ServiceSchemaProps {
  name: string;
  description: string;
  serviceType?: string;
  areaServed?: string[];
}

const ServiceSchema = ({ 
  name, 
  description, 
  serviceType = "DesignGrfico", 
  areaServed = ["Porto Alegre", "Regio Metropolitana de Porto Alegre", "Rio Grande do Sul"]
}: ServiceSchemaProps) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          provider: {
            "@type": "Organization",
            name: "dois.du"
          },
          name,
          description,
          serviceType,
          areaServed
        })
      }}
    />
  );
};

export default ServiceSchema;
