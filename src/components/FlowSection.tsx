const steps = [
  { num: '01', icon: '🖋️', title: 'Escribir', desc: 'Código TypeScript con McpServer y herramientas declaradas con Zod' },
  { num: '02', icon: '⚙️', title: 'Compilar', desc: 'npx tsc → dist/server.js listo para ejecutar' },
  { num: '03', icon: '📁', title: 'Configurar', desc: 'claude_desktop_config.json con ruta absoluta al binario' },
  { num: '04', icon: '🚀', title: 'Iniciar', desc: 'Claude Desktop lanza el proceso hijo al arrancar' },
  { num: '05', icon: '📞', title: 'Llamar', desc: 'Claude envía tools/call vía STDIN con argumentos JSON-RPC' },
  { num: '06', icon: '✅', title: 'Responder', desc: 'Servidor devuelve resultado por STDOUT → Claude lo muestra' },
];

export function FlowSection() {
  return (
    <div className="flow-section">
      <div className="section-label">§ 01 — Flujo de ejecución</div>
      <h2>Los 6 Momentos del Ciclo de Vida</h2>

      <div className="flow-diagram">
        {steps.map((step) => (
          <div className="flow-step" key={step.num}>
            <div className="step-num">{step.num}</div>
            <span className="step-icon">{step.icon}</span>
            <div className="step-title">{step.title}</div>
            <div className="step-desc">{step.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
