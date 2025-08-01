import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Code, Smartphone, Globe, ChevronDown } from 'lucide-react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
      });
      if (currentSection) setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills = {
    languages: [
      { name: 'HTML5', level: 93 },
      { name: 'CSS3', level: 85 },
      { name: 'JavaScript', level: 80 },
      { name: 'TypeScript', level: 75 }
    ],
    frameworks: [
      { name: 'Tailwind CSS', level: 90 },
      { name: 'React', level: 78 },
      { name: 'React Native', level: 65 },
      { name: 'Node.js', level: 70 }
    ]
  };

  const projects = [
    {
      id: 1,
      title: 'Yamine Web',
      description: 'Plataforma web desenvolvida para gerenciamento de tarefas e projetos. Implementei autenticação, dashboard interativo e sistema de notificações em tempo real.',
      tags: ['React', 'React Router', 'Tailwindcss', 'JavaScript'],
      image: '/api/placeholder/400/250',
      github: 'https://github.com/usuario/yamine-web',
      demo: 'https://yamine-web.vercel.app',
      challenges: 'Otimização de performance e implementação de real-time updates'
    },
    {
      id: 2,
      title: 'E-commerce Mobile',
      description: 'Aplicativo mobile completo para e-commerce com carrinho de compras, sistema de pagamento integrado e acompanhamento de pedidos.',
      tags: ['React Native', 'TypeScript', 'Redux', 'API REST'],
      image: '/api/placeholder/400/250',
      github: 'https://github.com/usuario/ecommerce-app',
      demo: 'https://play.google.com/store/apps/details?id=com.app',
      challenges: 'Integração com múltiplos métodos de pagamento e otimização para diferentes dispositivos'
    },
    {
      id: 3,
      title: 'Dashboard Analytics',
      description: 'Dashboard responsivo para análise de dados com gráficos interativos, filtros avançados e exportação de relatórios.',
      tags: ['React', 'Chart.js', 'Node.js', 'MongoDB'],
      image: '/api/placeholder/400/250',
      github: 'https://github.com/usuario/analytics-dashboard',
      demo: 'https://analytics-dashboard.vercel.app',
      challenges: 'Processamento de grandes volumes de dados e criação de visualizações dinâmicas'
    }
  ];

  const SkillBar = ({ skill, delay }) => (
    <div className="mb-4" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex justify-between mb-2">
        <span className="text-gray-300 font-medium">{skill.name}</span>
        <span className="text-red-400 font-bold">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
        <div 
          className="h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${skill.level}%` }}
        />
      </div>
    </div>
  );

  const ProjectCard = ({ project, index }) => (
    <div className="bg-gray-900 rounded-xl overflow-hidden border border-red-500/20 hover:border-red-500/50 transition-all duration-300 group">
      <div className="relative overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <div className="text-6xl text-red-500/20">
            {index === 0 ? <Globe /> : index === 1 ? <Smartphone /> : <Code />}
          </div>
        </div>
        <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
        <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>
        
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">Principais desafios:</p>
          <p className="text-sm text-gray-400 italic">{project.challenges}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, idx) => (
            <span key={idx} className="px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-full border border-red-500/30">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3">
          <a 
            href={project.github} 
            className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group"
          >
            <Github size={18} />
            <span>Código</span>
          </a>
          <a 
            href={project.demo} 
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group"
          >
            <ExternalLink size={18} />
            <span>Demo</span>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-950/90 backdrop-blur-md border-b border-red-500/20 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="font-bold text-xl">+Ald</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize hover:text-red-400 transition-colors duration-200 ${
                    activeSection === item ? 'text-red-400' : 'text-gray-300'
                  }`}
                >
                  {item === 'home' ? 'Início' : item === 'about' ? 'Sobre' : item === 'skills' ? 'Habilidades' : item === 'projects' ? 'Projetos' : 'Contato'}
                </button>
              ))}
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-red-500/20">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left py-2 px-4 hover:bg-gray-800 transition-colors duration-200 capitalize"
                >
                  {item === 'home' ? 'Início' : item === 'about' ? 'Sobre' : item === 'skills' ? 'Habilidades' : item === 'projects' ? 'Projetos' : 'Contato'}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-gray-950 to-gray-950" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="w-32 h-32 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-red-500/20">
              <span className="text-white font-bold text-4xl">A</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              +Ald Developer
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed">
              Desenvolvendo <span className="text-red-400 font-semibold">sites</span> e <span className="text-red-400 font-semibold">aplicativos</span> há mais de 4 meses!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg shadow-red-500/25"
              >
                Ver Projetos
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border border-red-500 text-red-400 hover:bg-red-500 hover:text-white rounded-lg font-semibold transition-all duration-200"
              >
                Entre em Contato
              </button>
            </div>
            <div className="mt-16 animate-bounce">
              <ChevronDown size={32} className="mx-auto text-red-400" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Sobre Mim</h2>
            <div className="text-lg text-gray-400 leading-relaxed space-y-6">
              <p>
                Sou um desenvolvedor apaixonado por tecnologia e inovação, focado em criar experiências digitais 
                excepcionais. Com mais de 4 meses de experiência em desenvolvimento web e mobile, 
                tenho me dedicado a aprender e aplicar as melhores práticas do mercado.
              </p>
              <p>
                Minha jornada começou com HTML e CSS, evoluindo rapidamente para JavaScript, React e React Native. 
                Gosto de enfrentar desafios complexos e transformar ideias em soluções funcionais e elegantes.
              </p>
              <p>
                Atualmente, estou estudando técnicas avançadas de otimização e explorando novas tecnologias 
                para continuar crescendo como desenvolvedor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Hard Skills</h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="bg-gray-900/50 p-8 rounded-xl border border-red-500/20">
              <h3 className="text-2xl font-bold mb-8 text-red-400 flex items-center gap-3">
                <Code size={28} />
                LINGUAGENS
              </h3>
              {skills.languages.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} delay={index * 100} />
              ))}
            </div>
            
            <div className="bg-gray-900/50 p-8 rounded-xl border border-red-500/20">
              <h3 className="text-2xl font-bold mb-8 text-red-400 flex items-center gap-3">
                <Globe size={28} />
                FRAMEWORKS
              </h3>
              {skills.frameworks.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} delay={index * 100 + 400} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Projetos</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Contato / E-mail</h2>
            
            <div className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Seu nome..."
                  className="w-full px-4 py-4 bg-gray-900 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none transition-colors duration-200 text-white placeholder-gray-500"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  placeholder="Seu email..."
                  className="w-full px-4 py-4 bg-gray-900 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none transition-colors duration-200 text-white placeholder-gray-500"
                />
              </div>
              
              <div>
                <textarea
                  placeholder="Sua mensagem..."
                  rows={6}
                  className="w-full px-4 py-4 bg-gray-900 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none transition-colors duration-200 text-white placeholder-gray-500 resize-none"
                />
              </div>
              
              <button
                onClick={() => alert('Funcionalidade de envio será implementada!')}
                className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Mail size={20} />
                Enviar
              </button>
            </div>
            
            {/* Social Links */}
            <div className="flex justify-center gap-6 mt-12">
              <a href="#" className="p-3 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors duration-200">
                <Github size={24} />
              </a>
              <a href="#" className="p-3 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors duration-200">
                <Linkedin size={24} />
              </a>
              <a href="#" className="p-3 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors duration-200">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-950 border-t border-red-500/20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 +Ald Developer. Desenvolvido com ❤️ usando React e Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;