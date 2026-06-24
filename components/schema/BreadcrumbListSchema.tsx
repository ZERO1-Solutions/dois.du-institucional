type BreadcrumbItem = {
  name: string;
  item: string;
};

interface BreadcrumbListSchemaProps {
  items: BreadcrumbItem[];
}

const BreadcrumbListSchema = ({ items }: BreadcrumbListSchemaProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://doisdu.com.br";

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.item.startsWith("http") ? item.item : `${baseUrl}${item.item}`
          }))
        })
      }}
    />
  );
};

export default BreadcrumbListSchema;
