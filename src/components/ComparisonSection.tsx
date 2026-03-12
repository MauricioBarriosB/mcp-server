export function ComparisonSection() {
  return (
    <>
      <div className="section-label">§ 07 — Comparativa</div>
      <h2>MCP Server vs Servidor Web Tradicional</h2>

      <div className="arch-grid" style={{ marginTop: '24px' }}>
        <div className="arch-cell" style={{ background: 'rgba(255,107,107,0.05)' }}>
          <div className="arch-badge badge-red">Servidor Web</div>
          <h3 style={{ color: 'var(--accent3)' }}>HTTP / REST</h3>
          <p>
            • Escucha en un puerto TCP<br />
            • Requiere CORS configurado<br />
            • Se mantiene vivo manualmente<br />
            • Múltiples clientes simultáneos<br />
            • Stateless por defecto
          </p>
        </div>
        <div className="arch-cell" style={{ background: 'rgba(0,229,160,0.05)' }}>
          <div className="arch-badge badge-green">Servidor MCP</div>
          <h3 style={{ color: 'var(--accent)' }}>STDIO / JSON-RPC</h3>
          <p>
            • Comunicación por STDIN/STDOUT<br />
            • Sin CORS, sin puertos<br />
            • Claude Desktop lo gestiona<br />
            • 1:1 con Claude Desktop<br />
            • Stateful dentro de la sesión
          </p>
        </div>
      </div>
    </>
  );
}
