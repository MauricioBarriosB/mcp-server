export function StdioSection() {
  return (
    <>
      <div className="section-label">§ 02 — Arquitectura de transporte</div>
      <h2>Comunicación por STDIO</h2>
      <p style={{ color: 'var(--muted)', fontFamily: "'Space Mono', monospace", fontSize: '0.83rem', marginBottom: '24px' }}>
        A diferencia de un servidor HTTP, el MCP server es un proceso hijo que se comunica por entrada/salida estándar. Sin puertos, sin CORS, sin lifecycle manual.
      </p>

      <div className="stdio-box">
        <div className="stdio-entity left">
          <div className="entity-icon">🖥️</div>
          <div className="entity-name">Claude Desktop</div>
          <div className="entity-sub">Orquestador / Host<br />Inicia el proceso hijo</div>
        </div>
        <div className="stdio-mid">
          <div className="arrow-down">STDIN<br />→</div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: 'var(--muted)', textAlign: 'center' }}>JSON-RPC</div>
          <div className="arrow-down">←<br />STDOUT</div>
        </div>
        <div className="stdio-entity right">
          <div className="entity-icon">⚡</div>
          <div className="entity-name">Tu Servidor MCP</div>
          <div className="entity-sub">Proceso hijo<br />StdioServerTransport</div>
        </div>
      </div>

      <div className="callout">
        <p>⚠️ <strong>Punto clave:</strong> Claude Desktop actúa como el "orquestador" completo. No necesitas mantener el proceso vivo, manejar reconexiones, ni preocuparte por puertos. Claude hace todo eso por ti.</p>
      </div>
    </>
  );
}
