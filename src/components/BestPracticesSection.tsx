export function BestPracticesSection() {
  return (
    <>
      <div className="section-label">§ 13 — Mejores Prácticas</div>
      <h2>Guía de Buenas Prácticas</h2>

      <h3 style={{ marginTop: '32px', marginBottom: '16px', fontFamily: "'Space Mono', monospace", color: 'var(--accent)' }}>
        ✍️ Escribiendo Descripciones Efectivas
      </h3>

      <div className="arch-grid">
        <div className="arch-cell" style={{ background: 'rgba(255,107,107,0.05)' }}>
          <div className="arch-badge badge-red">❌ MAL</div>
          <h3 style={{ color: 'var(--accent3)' }}>Descripciones Vagas</h3>
          <div className="code-block" style={{ margin: '12px 0' }}>
            <code>
{`query: z.string()
  .describe("La query")

user_id: z.string()
  .describe("ID del usuario")

action: z.string()
  .describe("Acción a realizar")`}
            </code>
          </div>
        </div>
        <div className="arch-cell" style={{ background: 'rgba(0,229,160,0.05)' }}>
          <div className="arch-badge badge-green">✅ BIEN</div>
          <h3 style={{ color: 'var(--accent)' }}>Descripciones Específicas</h3>
          <div className="code-block" style={{ margin: '12px 0' }}>
            <code>
{`query: z.string()
  .describe("SQL SELECT query. Ejemplo: 'SELECT * FROM users WHERE active = true'")

user_id: z.string().uuid()
  .describe("UUID del usuario. Obtener con la herramienta 'buscar-usuarios'")

action: z.enum(["crear", "editar", "eliminar"])
  .describe("Acción a ejecutar sobre el recurso")`}
            </code>
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: '40px', marginBottom: '16px', fontFamily: "'Space Mono', monospace", color: 'var(--accent2)' }}>
        🛡️ Manejo Robusto de Errores
      </h3>
      <div className="code-block">
        <code>
{`server.`}<span className="fn">tool</span>{`(
  `}<span className="str">"operacion-critica"</span>{`,
  { /* params */ },
  `}<span className="kw">async</span>{` (params) => {
    `}<span className="kw">try</span>{` {
      `}<span className="cm">// Validación adicional de negocio</span>{`
      `}<span className="kw">if</span>{` (!await tienePermisos(params.usuario)) {
        `}<span className="kw">return</span>{` {
          content: [{
            type: `}<span className="str">"text"</span>{`,
            text: `}<span className="str">"⛔ Error: Permisos insuficientes para esta operación"</span>{`
          }],
          isError: `}<span className="kw">true</span>{`
        };
      }

      `}<span className="kw">const</span>{` resultado = `}<span className="kw">await</span>{` ejecutarOperacion(params);

      `}<span className="kw">return</span>{` {
        content: [{
          type: `}<span className="str">"text"</span>{`,
          text: \`✅ Operación completada: \${JSON.stringify(resultado)}\`
        }]
      };

    } `}<span className="kw">catch</span>{` (error) {
      `}<span className="cm">// Log interno para debugging</span>{`
      console.`}<span className="fn">error</span>{`(`}<span className="str">"[operacion-critica]"</span>{`, error);

      `}<span className="cm">// Respuesta amigable para Claude</span>{`
      `}<span className="kw">if</span>{` (error `}<span className="kw">instanceof</span>{` ValidationError) {
        `}<span className="kw">return</span>{` {
          content: [{
            type: `}<span className="str">"text"</span>{`,
            text: \`❌ Error de validación: \${error.message}\\n\\nSugerencia: Verifica los parámetros proporcionados.\`
          }],
          isError: `}<span className="kw">true</span>{`
        };
      }

      `}<span className="kw">if</span>{` (error `}<span className="kw">instanceof</span>{` NetworkError) {
        `}<span className="kw">return</span>{` {
          content: [{
            type: `}<span className="str">"text"</span>{`,
            text: `}<span className="str">"🌐 Error de conexión. Intenta de nuevo en unos segundos."</span>{`
          }],
          isError: `}<span className="kw">true</span>{`
        };
      }

      `}<span className="cm">// Error genérico - no exponer detalles internos</span>{`
      `}<span className="kw">return</span>{` {
        content: [{
          type: `}<span className="str">"text"</span>{`,
          text: `}<span className="str">"❌ Error interno del servidor. Contacta al administrador."</span>{`
        }],
        isError: `}<span className="kw">true</span>{`
      };
    }
  }
);`}
        </code>
      </div>

      <h3 style={{ marginTop: '40px', marginBottom: '16px', fontFamily: "'Space Mono', monospace", color: 'var(--accent3)' }}>
        🔒 Seguridad
      </h3>

      <table style={{ marginTop: '16px' }}>
        <thead>
          <tr>
            <th>Práctica</th>
            <th>Descripción</th>
            <th>Ejemplo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Validar Paths</strong></td>
            <td>Prevenir directory traversal</td>
            <td><code>path.resolve() + startsWith()</code></td>
          </tr>
          <tr>
            <td><strong>Sanitizar SQL</strong></td>
            <td>Usar prepared statements</td>
            <td><code>query($1, $2) con params</code></td>
          </tr>
          <tr>
            <td><strong>Limitar Operaciones</strong></td>
            <td>Solo lectura por defecto</td>
            <td><code>Solo SELECT, no DELETE/DROP</code></td>
          </tr>
          <tr>
            <td><strong>Variables de Entorno</strong></td>
            <td>No hardcodear secretos</td>
            <td><code>process.env.API_KEY</code></td>
          </tr>
          <tr>
            <td><strong>Rate Limiting</strong></td>
            <td>Limitar llamadas por tiempo</td>
            <td><code>Max 10 llamadas/minuto</code></td>
          </tr>
          <tr>
            <td><strong>Timeouts</strong></td>
            <td>Evitar operaciones infinitas</td>
            <td><code>AbortController con timeout</code></td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ marginTop: '40px', marginBottom: '16px', fontFamily: "'Space Mono', monospace", color: 'var(--accent)' }}>
        📊 Logging y Observabilidad
      </h3>
      <div className="code-block">
        <code>
{``}<span className="cm">// Crear un logger que no interfiera con STDIO</span>{`
`}<span className="kw">import</span>{` fs `}<span className="kw">from</span>{` `}<span className="str">"fs"</span>{`;

`}<span className="kw">const</span>{` logStream = fs.`}<span className="fn">createWriteStream</span>{`(`}<span className="str">"./mcp-server.log"</span>{`, { flags: `}<span className="str">"a"</span>{` });

`}<span className="kw">const</span>{` logger = {
  `}<span className="fn">info</span>{`: (msg: `}<span className="type">string</span>{`, data?: `}<span className="type">object</span>{`) => {
    `}<span className="kw">const</span>{` entry = \`[\${`}<span className="kw">new</span>{` `}<span className="fn">Date</span>{`().toISOString()}] INFO: \${msg} \${data ? JSON.stringify(data) : `}<span className="str">""</span>{`}\\n\`;
    logStream.`}<span className="fn">write</span>{`(entry);
  },
  `}<span className="fn">error</span>{`: (msg: `}<span className="type">string</span>{`, error?: `}<span className="type">Error</span>{`) => {
    `}<span className="kw">const</span>{` entry = \`[\${`}<span className="kw">new</span>{` `}<span className="fn">Date</span>{`().toISOString()}] ERROR: \${msg} \${error?.stack || `}<span className="str">""</span>{`}\\n\`;
    logStream.`}<span className="fn">write</span>{`(entry);
  },
  `}<span className="fn">tool</span>{`: (name: `}<span className="type">string</span>{`, params: `}<span className="type">object</span>{`, duration: `}<span className="type">number</span>{`) => {
    `}<span className="kw">const</span>{` entry = \`[\${`}<span className="kw">new</span>{` `}<span className="fn">Date</span>{`().toISOString()}] TOOL: \${name} (\${duration}ms) \${JSON.stringify(params)}\\n\`;
    logStream.`}<span className="fn">write</span>{`(entry);
  }
};

`}<span className="cm">// ⚠️ IMPORTANTE: No usar console.log() - interfiere con STDIO</span>{`
`}<span className="cm">// ✅ Usar el logger que escribe a archivo</span>{`

server.`}<span className="fn">tool</span>{`(`}<span className="str">"ejemplo"</span>{`, { /* ... */ }, `}<span className="kw">async</span>{` (params) => {
  `}<span className="kw">const</span>{` start = Date.`}<span className="fn">now</span>{`();
  logger.`}<span className="fn">info</span>{`(`}<span className="str">"Iniciando operación"</span>{`, params);

  `}<span className="kw">try</span>{` {
    `}<span className="kw">const</span>{` result = `}<span className="kw">await</span>{` operacion(params);
    logger.`}<span className="fn">tool</span>{`(`}<span className="str">"ejemplo"</span>{`, params, Date.`}<span className="fn">now</span>{`() - start);
    `}<span className="kw">return</span>{` { content: [{ type: `}<span className="str">"text"</span>{`, text: result }] };
  } `}<span className="kw">catch</span>{` (error) {
    logger.`}<span className="fn">error</span>{`(`}<span className="str">"Operación fallida"</span>{`, error);
    `}<span className="kw">throw</span>{` error;
  }
});`}
        </code>
      </div>

      <div className="callout" style={{ marginTop: '24px' }}>
        <p>⚠️ <strong>Regla de oro:</strong> Nunca uses <code>console.log()</code> en un servidor MCP - contamina el canal STDIO y rompe la comunicación con Claude. Siempre escribe logs a un archivo.</p>
      </div>
    </>
  );
}
