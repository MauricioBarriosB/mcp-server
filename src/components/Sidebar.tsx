import { useState, useEffect } from 'react';

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
];

export function Sidebar() {
  const [activeId, setActiveId] = useState<string>('');

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
        <span>MCP v1.0</span>
      </div>
    </aside>
  );
}
