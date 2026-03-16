import { useState, useEffect } from 'react';

const THEME_KEY = 'mcp-guide-theme';

function getInitialTheme(): 'dark' | 'light' {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  return 'dark';
}

const sections = [
  { id: 'flujo', label: '01. Flujo de Ejecución', icon: '🔄' },
  { id: 'stdio', label: '02. Arquitectura STDIO', icon: '📡' },
  { id: 'anatomia', label: '03. Anatomía del Servidor', icon: '🔧' },
  { id: 'config', label: '04. Configuración', icon: '⚙️' },
  { id: 'protocolo', label: '05. Protocolo JSON-RPC', icon: '📨' },
  { id: 'errores', label: '06. Depuración', icon: '🐛' },
  { id: 'comparativa', label: '07. Comparativa', icon: '⚖️' },
  { id: 'setup', label: '08. Setup del Proyecto', icon: '📦' },
  { id: 'tools-avanzadas', label: '09. Tools Avanzadas', icon: '🛠️' },
  { id: 'resources', label: '10. Resources', icon: '📁' },
  { id: 'prompts', label: '11. Prompts', icon: '💬' },
  { id: 'ejemplos', label: '12. Ejemplos Reales', icon: '🌍' },
  { id: 'practicas', label: '13. Mejores Prácticas', icon: '✅' },
  { id: 'patrones', label: '14. Patrones Avanzados', icon: '🧩' },
  { id: 'sdk', label: '15. SDK MCP', icon: '📚' },
];

export function Sidebar() {
  const [activeId, setActiveId] = useState<string>('');
  const [theme, setTheme] = useState<'dark' | 'light'>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-title">Guía MCP</span>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>
      <nav className="sidebar-nav">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`sidebar-link ${activeId === section.id ? 'active' : ''}`}
          >
            <span className="sidebar-icon">{section.icon}</span>
            <span className="sidebar-label">{section.label}</span>
          </a>
        ))}
      </nav>
      <div className="sidebar-footer">
        <span>MCP v1.11</span>
      </div>
    </aside>
  );
}
