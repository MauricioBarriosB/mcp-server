export function ConfigSection() {
  return (
    <>
      <div className="section-label">§ 04 — Configuración por plataforma</div>
      <h2>claude_desktop_config.json</h2>

      <div className="json-grid">
        <div className="json-card">
          <div className="json-title">macOS / Linux <span>→ Ruta absoluta</span></div>
          <code style={{ display: 'block', whiteSpace: 'pre' }}>
{`{
  `}<span className="str">"mcpServers"</span>{`: {
    `}<span className="str">"mi-servidor"</span>{`: {
      `}<span className="str">"command"</span>{`: `}<span className="str">"node"</span>{`,
      `}<span className="str">"args"</span>{`: [
        `}<span className="str">"/Users/user/proyecto/dist/server.js"</span>{`
      ]
    }
  }
}`}
          </code>
        </div>
        <div className="json-card">
          <div className="json-title">Windows <span>→ Doble backslash</span></div>
          <code style={{ display: 'block', whiteSpace: 'pre' }}>
{`{
  `}<span className="str">"mcpServers"</span>{`: {
    `}<span className="str">"mi-servidor"</span>{`: {
      `}<span className="str">"command"</span>{`: `}<span className="str">"node"</span>{`,
      `}<span className="str">"args"</span>{`: [
        `}<span className="str">"C:\\\\Users\\\\user\\\\proyecto\\\\dist\\\\server.js"</span>{`
      ]
    }
  }
}`}
          </code>
        </div>
      </div>
    </>
  );
}
