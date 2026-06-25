'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Project = {
  id: number;
  title: string;
  category: string;
  year: number;
  description: string;
  coverImage: string;
  galleryImages: string[];
  client: string;
  objective: string;
  challenge: string;
  solution: string;
};

type Testimonial = {
  name: string;
  company: string;
  text: string;
};

type Service = {
  title: string;
  description: string;
};

type SiteSettings = {
  name: string;
  description: string;
  contactEmail: string;
  whatsappNumber: string;
  instagramLink: string;
  facebookLink: string;
  linkedinLink: string;
  behanceLink: string;
};

type HomeContent = {
  title: string;
  description: string;
};

type AboutContent = {
  title: string;
  description1: string;
  description2: string;
  philosophy: string;
  philosophyText: string;
};

type Data = {
  site: SiteSettings;
  home: HomeContent;
  about: AboutContent;
  projects: Project[];
  testimonials: Testimonial[];
  services: Service[];
};

export default function CrudAdmin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'projects' | 'testimonials' | 'settings'>('home');
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({});
  const [expandedProjects, setExpandedProjects] = useState<{ [key: number]: boolean }>({});
  const [authChecked, setAuthChecked] = useState(false);

  // Check if logged in on load
  useEffect(() => {
    console.log('Checking auth...');
    const hasSession = document.cookie.includes('admin_token');
    console.log('Has session:', hasSession);
    setIsLoggedIn(hasSession);
    setAuthChecked(true);
    if (hasSession) {
      loadData();
    }
  }, []);

  const loadData = async () => {
    try {
      console.log('Loading data...');
      const res = await fetch('/api/data');
      console.log('Response:', res);
      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();
      console.log('Data:', data);
      setData(data);
    } catch (error) {
      console.error('Error loading data:', error);
      setMessage('Erro ao carregar dados');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    console.log('Logging in...');
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const result = await res.json();
    console.log('Login result:', result);
    if (result.success) {
      setIsLoggedIn(true);
      loadData();
    } else {
      setMessage('Credenciais inválidas!');
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'DELETE'
    });
    setIsLoggedIn(false);
  };

  const handleSave = async () => {
    if (!data) return;
    setLoading(true);
    setMessage('');

    const res = await fetch('/api/data', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    if (result.success) {
      setMessage('Dados salvos com sucesso!');
    } else {
      setMessage('Erro ao salvar dados.');
    }
    setLoading(false);
  };

  console.log('Auth checked:', authChecked, 'isLoggedIn:', isLoggedIn);

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-gray-light flex items-center justify-center">
        <p className="text-gray-600">Carregando...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-light flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-md">
          <h1 className="text-2xl font-bold text-green-primary mb-6 text-center">Admin - Dois.du</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Usuário</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-primary"
                required
              />
            </div>
            {message && <p className={`text-sm ${message.includes('sucesso') ? 'text-green-primary' : 'text-red-500'}`}>{message}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-primary text-white py-3 rounded-xl font-semibold hover:bg-green-secondary transition-colors disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!data) return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;

  return (
    <div className="min-h-screen bg-gray-light">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-green-primary">Admin - Dois.du</h1>
          <div className="flex gap-4 items-center">
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-orange-accent text-white px-6 py-2 rounded-xl font-semibold hover:opacity-90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </button>
            <button
              onClick={handleLogout}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
        <div className="flex gap-2 px-6 pb-2 border-b border-gray-200 overflow-x-auto">
          {[
            { key: 'home', label: 'Home' },
            { key: 'about', label: 'Sobre' },
            { key: 'projects', label: 'Projetos' },
            { key: 'testimonials', label: 'Depoimentos' },
            { key: 'settings', label: 'Configurações' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${activeTab === tab.key
                ? 'bg-green-primary text-white'
                : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Floating Notifications */}
      {message && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-lg transition-all duration-300 ${message.includes('sucesso') ? 'bg-green-primary text-white' : 'bg-red-500 text-white'
          }`}>
          {message}
        </div>
      )}

      <div className="container mx-auto px-6 py-8">
        {/* Home Tab */}
        {activeTab === 'home' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-black-primary">Home</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Título Principal</label>
              <input
                type="text"
                value={data.home.title}
                onChange={(e) => setData({ ...data, home: { ...data.home, title: e.target.value } })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descrição Principal</label>
              <textarea
                value={data.home.description}
                onChange={(e) => setData({ ...data, home: { ...data.home, description: e.target.value } })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-primary"
                rows={4}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-black-primary">Serviços</h3>
                <button
                  onClick={() => {
                    setData({
                      ...data,
                      services: [
                        ...data.services,
                        { title: "Novo Serviço", description: "" }
                      ]
                    });
                    setMessage('Serviço adicionado com sucesso!');
                  }}
                  className="bg-green-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-secondary transition-colors"
                >
                  + Adicionar Serviço
                </button>
              </div>
              {data.services.map((service: Service, index: number) => (
                <div key={index} className="p-4 border border-gray-200 rounded-xl space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Serviço {index + 1}</span>
                    <button
                      onClick={() => {
                        setData({
                          ...data,
                          services: data.services.filter((_: Service, i: number) => i !== index)
                        });
                      }}
                      className="text-red-500 hover:text-red-700 text-sm font-semibold"
                    >
                      Excluir
                    </button>
                  </div>
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => {
                      const newServices = [...data.services];
                      newServices[index] = { ...service, title: e.target.value };
                      setData({ ...data, services: newServices });
                    }}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-primary"
                    placeholder="Título do Serviço"
                  />
                  <textarea
                    value={service.description}
                    onChange={(e) => {
                      const newServices = [...data.services];
                      newServices[index] = { ...service, description: e.target.value };
                      setData({ ...data, services: newServices });
                    }}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-primary"
                    rows={2}
                    placeholder="Descrição do Serviço"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-black-primary">Sobre</h2>
            {Object.entries(data.about).map(([key, value]) => {
              const typedKey = key as keyof AboutContent;
              const typedValue = value as string;
              return (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  {typedValue.length > 100 ? (
                    <textarea
                      value={typedValue}
                      onChange={(e) => setData({ ...data, about: { ...data.about, [typedKey]: e.target.value } })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-primary"
                      rows={4}
                    />
                  ) : (
                    <input
                      type="text"
                      value={typedValue}
                      onChange={(e) => setData({ ...data, about: { ...data.about, [typedKey]: e.target.value } })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-primary"
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-black-primary">Projetos</h2>
              <button
                onClick={() => {
                  const newId = Math.max(0, ...data.projects.map((p: Project) => p.id)) + 1;
                  setData({
                    ...data,
                    projects: [
                      ...data.projects,
                      {
                        id: newId,
                        title: 'Novo Projeto',
                        category: 'Identidade Visual',
                        year: new Date().getFullYear(),
                        description: '',
                        coverImage: '',
                        galleryImages: [],
                        client: '',
                        objective: '',
                        challenge: '',
                        solution: ''
                      }
                    ]
                  });
                  setMessage('Projeto adicionado com sucesso!');
                }}
                className="bg-green-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-secondary transition-colors"
              >
                + Adicionar Projeto
              </button>
            </div>

            {data.projects.map((project: Project, index: number) => (
              <div key={project.id} className="border border-gray-200 rounded-xl overflow-hidden">
                <div
                  className="p-4 flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                  onClick={() => {
                    setExpandedProjects(prev => ({
                      ...prev,
                      [index]: !prev[index]
                    }));
                  }}
                >
                  <h3 className="text-lg font-semibold text-black-primary">{project.title}</h3>
                  <div className="flex items-center gap-4">
                    <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setData({
                        ...data,
                        projects: data.projects.filter((_: Project, i: number) => i !== index)
                      });
                      setMessage('Projeto excluído com sucesso!');
                    }}
                    className="text-red-500 hover:text-red-700 text-sm font-semibold"
                  >
                    Excluir
                  </button>
                    <span className="text-xl">
                      {expandedProjects[index] ? '▼' : '▶'}
                    </span>
                  </div>
                </div>
                {expandedProjects[index] && (
                  <div className="p-4 space-y-4 border-t border-gray-200">
                    <div className="grid md:grid-cols-2 gap-4">
                      {Object.entries(project).map(([key, value]) => key !== 'id' && key !== 'coverImage' && key !== 'galleryImages' && (
                        <div key={key}>
                          <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </label>
                          {key === 'description' || key === 'objective' || key === 'challenge' || key === 'solution' ? (
                            <textarea
                              value={value as string}
                              onChange={(e) => {
                                const newProjects = [...data.projects];
                                newProjects[index] = { ...newProjects[index], [key]: e.target.value };
                                setData({ ...data, projects: newProjects });
                              }}
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-primary"
                              rows={2}
                            />
                          ) : key === 'year' ? (
                            <input
                              type="number"
                              value={value as number}
                              onChange={(e) => {
                                const newProjects = [...data.projects];
                                newProjects[index] = { ...newProjects[index], [key]: parseInt(e.target.value) };
                                setData({ ...data, projects: newProjects });
                              }}
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-primary"
                            />
                          ) : (
                            <input
                              type="text"
                              value={value as string}
                              onChange={(e) => {
                                const newProjects = [...data.projects];
                                newProjects[index] = { ...newProjects[index], [key]: e.target.value };
                                setData({ ...data, projects: newProjects });
                              }}
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-primary"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    {/* Cover Image Upload */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Imagem de Capa</label>
                      <div className="flex gap-3 items-center">
                        <input
                          type="file"
                          accept="image/*"
                          disabled={uploading[`cover-${index}`]}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const key = `cover-${index}`;
                            setUploading(prev => ({ ...prev, [key]: true }));
                            setMessage('');
                            try {
                              const fileName = `${Date.now()}-${file.name}`;
                              const { data: uploadData, error } = await supabase.storage
                                .from('portfolio-images')
                                .upload(fileName, file);
                              if (error || !uploadData) {
                                throw error || new Error('Failed to upload');
                              }

                              const { data: { publicUrl } } = supabase.storage
                                .from('portfolio-images')
                                .getPublicUrl(uploadData.path);
                              const newProjects = [...data.projects];
                              newProjects[index] = { ...newProjects[index], coverImage: publicUrl };
                              setData({ ...data, projects: newProjects });
                              setMessage('Imagem de capa carregada com sucesso!');
                            } catch (err) {
                              console.error('Error uploading file:', err);
                              setMessage('Erro ao carregar imagem de capa!');
                            } finally {
                              setUploading(prev => ({ ...prev, [key]: false }));
                            }
                          }}
                          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none disabled:opacity-50"
                        />
                        {uploading[`cover-${index}`] && <span className="text-sm text-gray-500">Carregando...</span>}
                      </div>
                      {project.coverImage && (
                        <img src={project.coverImage} alt="Cover" className="w-32 h-32 object-cover rounded-lg mt-2" />
                      )}
                    </div>
                    {/* Gallery Images Upload */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Imagens da Galeria</label>
                      <div className="flex gap-3 items-center">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          disabled={uploading[`gallery-${index}`]}
                          onChange={async (e) => {
                            const files = Array.from(e.target.files || []);
                            if (!files.length) return;
                            const key = `gallery-${index}`;
                            setUploading(prev => ({ ...prev, [key]: true }));
                            setMessage('');
                            try {
                              const newGalleryImages: string[] = [...project.galleryImages];
                              for (const file of files) {
                                const fileName = `${Date.now()}-${file.name}`;
                                const { data: uploadData, error } = await supabase.storage
                                  .from('portfolio-images')
                                  .upload(fileName, file);
                                if (error || !uploadData) {
                                  throw error || new Error('Failed to upload');
                                }

                                const { data: { publicUrl } } = supabase.storage
                                  .from('portfolio-images')
                                  .getPublicUrl(uploadData.path);
                                newGalleryImages.push(publicUrl);
                              }
                              const newProjects = [...data.projects];
                              newProjects[index] = { ...newProjects[index], galleryImages: newGalleryImages };
                              setData({ ...data, projects: newProjects });
                              setMessage(`${files.length} imagem(ns) carregada(s) com sucesso!`);
                            } catch (err) {
                              console.error('Error uploading files:', err);
                              setMessage('Erro ao carregar imagens da galeria!');
                            } finally {
                              setUploading(prev => ({ ...prev, [key]: false }));
                            }
                          }}
                          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none disabled:opacity-50"
                        />
                        {uploading[`gallery-${index}`] && <span className="text-sm text-gray-500">Carregando...</span>}
                      </div>
                      <div className="grid grid-cols-4 gap-2 mt-2">
                        {project.galleryImages.map((img, imgIndex) => (
                          <div key={imgIndex} className="relative">
                            <img src={img} alt={`Galeria ${imgIndex + 1}`} className="w-full aspect-square object-cover rounded-lg" />
                            <button
                              onClick={() => {
                                const newProjects = [...data.projects];
                                newProjects[index].galleryImages = newProjects[index].galleryImages.filter((_: string, i: number) => i !== imgIndex);
                                setData({ ...data, projects: newProjects });
                                setMessage('Imagem da galeria removida com sucesso!');
                              }}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-black-primary">Depoimentos</h2>
              <button
                  onClick={() => {
                    setData({
                      ...data,
                      testimonials: [
                        ...data.testimonials,
                        { name: "Novo Cliente", company: "Empresa", text: "" }
                      ]
                    });
                    setMessage('Depoimento adicionado com sucesso!');
                  }}
                  className="bg-green-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-secondary transition-colors"
                >
                  + Adicionar Depoimento
                </button>
            </div>

            {data.testimonials.map((testimonial: Testimonial, index: number) => (
              <div key={index} className="p-4 border border-gray-200 rounded-xl space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-black-primary">{testimonial.name}</h3>
                  <button
                    onClick={() => {
                      setData({
                        ...data,
                        testimonials: data.testimonials.filter((_: Testimonial, i: number) => i !== index)
                      });
                      setMessage('Depoimento excluído com sucesso!');
                    }}
                    className="text-red-500 hover:text-red-700 text-sm font-semibold"
                  >
                    Excluir
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                    <input
                      type="text"
                      value={testimonial.name}
                      onChange={(e) => {
                        const newTestimonials = [...data.testimonials];
                        newTestimonials[index] = { ...newTestimonials[index], name: e.target.value };
                        setData({ ...data, testimonials: newTestimonials });
                      }}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Empresa</label>
                    <input
                      type="text"
                      value={testimonial.company}
                      onChange={(e) => {
                        const newTestimonials = [...data.testimonials];
                        newTestimonials[index] = { ...newTestimonials[index], company: e.target.value };
                        setData({ ...data, testimonials: newTestimonials });
                      }}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Depoimento</label>
                  <textarea
                    value={testimonial.text}
                    onChange={(e) => {
                      const newTestimonials = [...data.testimonials];
                      newTestimonials[index] = { ...newTestimonials[index], text: e.target.value };
                      setData({ ...data, testimonials: newTestimonials });
                    }}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-primary"
                    rows={3}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-black-primary">Configurações do Site</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Site</label>
                <input
                  type="text"
                  value={data?.site?.name || ''}
                  onChange={(e) => setData({ ...data, site: { ...data.site, name: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrição do Site</label>
                <input
                  type="text"
                  value={data?.site?.description || ''}
                  onChange={(e) => setData({ ...data, site: { ...data.site, description: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email de Contato</label>
                <input
                  type="email"
                  value={data?.site?.contactEmail || ''}
                  onChange={(e) => setData({ ...data, site: { ...data.site, contactEmail: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Número do WhatsApp</label>
                <input
                  type="text"
                  value={data?.site?.whatsappNumber || ''}
                  onChange={(e) => setData({ ...data, site: { ...data.site, whatsappNumber: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Link do Instagram</label>
                <input
                  type="url"
                  value={data?.site?.instagramLink || ''}
                  onChange={(e) => setData({ ...data, site: { ...data.site, instagramLink: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Link do Facebook</label>
                <input
                  type="url"
                  value={data?.site?.facebookLink || ''}
                  onChange={(e) => setData({ ...data, site: { ...data.site, facebookLink: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Link do LinkedIn</label>
                <input
                  type="url"
                  value={data?.site?.linkedinLink || ''}
                  onChange={(e) => setData({ ...data, site: { ...data.site, linkedinLink: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Link do Behance</label>
                <input
                  type="url"
                  value={data?.site?.behanceLink || ''}
                  onChange={(e) => setData({ ...data, site: { ...data.site, behanceLink: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-primary"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
