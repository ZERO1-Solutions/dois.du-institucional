'use client';

import { useState, useEffect } from 'react';

type Project = {
  id: number;
  title: string;
  category: string;
  year: number;
  description: string;
  image: string;
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

type Data = {
  projects: Project[];
  testimonials: Testimonial[];
  [key: string]: any;
};

export default function CrudAdmin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'projects' | 'testimonials'>('home');

  // Check if logged in on load
  useEffect(() => {
    const checkAuth = () => {
      const hasSession = document.cookie.includes('admin_session=true');
      setIsLoggedIn(hasSession);
      if (hasSession) loadData();
    };
    checkAuth();
  }, []);

  const loadData = async () => {
    const res = await fetch('/api/data');
    const data = await res.json();
    setData(data);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const result = await res.json();
    if (result.success) {
      setIsLoggedIn(true);
      loadData();
    } else {
      setMessage('Credenciais inválidas!');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    document.cookie = 'admin_session=; Max-Age=0; path=/';
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
          {['home', 'about', 'projects', 'testimonials'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'bg-green-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {message && (
        <div className={`container mx-auto px-6 py-4 mt-4 ${
          message.includes('sucesso') ? 'bg-green-100 text-green-primary' : 'bg-red-100 text-red-600'
        } rounded-xl`}>
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
              <h3 className="text-lg font-semibold text-black-primary">Serviços</h3>
              {data.services.map((service: any, index: number) => (
                <div key={index} className="p-4 border border-gray-200 rounded-xl space-y-3">
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
            {Object.entries(data.about).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                {typeof value === 'string' && value.length > 100 ? (
                  <textarea
                    value={value}
                    onChange={(e) => setData({ ...data, about: { ...data.about, [key]: e.target.value } })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-primary"
                    rows={4}
                  />
                ) : (
                  <input
                    type="text"
                    value={value as string}
                    onChange={(e) => setData({ ...data, about: { ...data.about, [key]: e.target.value } })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-primary"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-black-primary">Projetos</h2>
              <button
                onClick={() => {
                  const newId = Math.max(0, ...data.projects.map((p: any) => p.id)) + 1;
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
                        image: '',
                        client: '',
                        objective: '',
                        challenge: '',
                        solution: ''
                      }
                    ]
                  });
                }}
                className="bg-green-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-secondary transition-colors"
              >
                + Adicionar Projeto
              </button>
            </div>

            {data.projects.map((project: Project, index: number) => (
              <div key={project.id} className="p-4 border border-gray-200 rounded-xl space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-black-primary">{project.title}</h3>
                  <button
                    onClick={() => {
                      setData({
                        ...data,
                        projects: data.projects.filter((_: any, i: number) => i !== index)
                      });
                    }}
                    className="text-red-500 hover:text-red-700 text-sm font-semibold"
                  >
                    Excluir
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(project).map(([key, value]) => key !== 'id' && (
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
                      { name: 'Novo Cliente', company: 'Empresa', text: '' }
                    ]
                  });
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
                        testimonials: data.testimonials.filter((_: any, i: number) => i !== index)
                      });
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
      </div>
    </div>
  );
}