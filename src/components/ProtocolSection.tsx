const timelineItems = [
  {
    dot: '',
    label: 'INICIO — Handshake',
    labelClass: '',
    title: 'El servidor se presenta',
    desc: 'Al conectarse, el servidor envía su lista de herramientas con nombre, descripción e inputSchema. Claude almacena esta información en el contexto.',
  },
  {
    dot: 'purple',
    label: 'USUARIO — Prompt',
    labelClass: 'purple',
    title: 'Tú escribes en Claude Desktop',
    desc: '"Hola, quiero saludar a Juan" → Claude recibe el mensaje y evalúa qué herramientas disponibles pueden resolver la petición.',
  },
  {
    dot: '',
    label: 'CLAUDE — Decisión',
    labelClass: '',
    title: 'Selección de herramienta',
    desc: 'Claude razona: "Tengo una herramienta \'saludar\' que encaja. Voy a usarla con nombre=\'Juan\'." La calidad de .describe() influye directamente en esta decisión.',
  },
  {
    dot: 'purple',
    label: 'PROTOCOLO — Llamada',
    labelClass: 'purple',
    title: 'tools/call vía STDIN',
    desc: 'Claude envía: { "jsonrpc": "2.0", "method": "tools/call", "params": { "name": "saludar", "arguments": { "nombre": "Juan" } } }',
  },
  {
    dot: 'red',
    label: 'SERVIDOR — Procesamiento',
    labelClass: 'red',
    title: 'Tu handler se ejecuta',
    desc: 'async ({ nombre }) recibe "Juan", construye la respuesta y devuelve content: [{ type: "text", text: "¡Hola Juan!" }]',
  },
  {
    dot: '',
    label: 'RESULTADO — Respuesta',
    labelClass: '',
    title: 'Claude muestra el resultado',
    desc: 'Claude recibe el content block por STDOUT, lo integra en su respuesta y muestra el indicador visual "Usando herramienta: saludar" en la interfaz.',
  },
];

export function ProtocolSection() {
  return (
    <div className="protocol-section">
      <div className="section-label">§ 05 — Protocolo JSON-RPC</div>
      <h2>Intercambio de Mensajes</h2>

      <div className="protocol-timeline">
        {timelineItems.map((item, index) => (
          <div className="proto-item" key={index}>
            <div className={`proto-dot ${item.dot}`}></div>
            <div className={`proto-label ${item.labelClass}`}>{item.label}</div>
            <div className="proto-title">{item.title}</div>
            <div className="proto-desc">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
