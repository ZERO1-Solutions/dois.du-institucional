import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "dois.du - Estúdio de Design Gráfico",
  description: "Transformando ideias em identidades memoráveis. Especializado em Identidade Visual, Social Media e Materiais Gráficos para Impressão.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-white text-black-primary">
        {children}
      </body>
    </html>
  );
}
