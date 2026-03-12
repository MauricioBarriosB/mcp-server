export function ArchitectureSection() {
  return (
    <>
      <div className="section-label">§ 03 — Implementación mínima</div>
      <h2>Anatomía del Servidor</h2>

      <div className="arch-grid">
        <div className="arch-cell highlight">
          <div className="arch-badge badge-green">INSTANCIA</div>
          <h3>McpServer</h3>
          <p>Objeto central que gestiona el ciclo de vida y registra todas las herramientas disponibles.</p>
        </div>
        <div className="arch-cell highlight2">
          <div className="arch-badge badge-purple">TRANSPORTE</div>
          <h3>StdioServerTransport</h3>
          <p>Conecta el servidor al canal STDIN/STDOUT para recibir y enviar mensajes de Claude.</p>
        </div>
        <div className="arch-cell highlight3">
          <div className="arch-badge badge-red">VALIDACIÓN</div>
          <h3>Zod Schema</h3>
          <p>Define y valida los parámetros de cada herramienta. Claude usa las descripciones para decidir cuándo llamarla.</p>
        </div>
        <div className="arch-cell highlight">
          <div className="arch-badge badge-green">HANDLER</div>
          <h3>{'async ({ params }) => {}'}</h3>
          <p>Función asíncrona que procesa la llamada y devuelve un array de content blocks.</p>
        </div>
      </div>

      <div className="code-block">
        <code>
{`// mi-primer-server.ts
`}<span className="kw">import</span>{` { McpServer } `}<span className="kw">from</span>{` `}<span className="str">"@modelcontextprotocol/sdk/server/mcp.js"</span>{`;
`}<span className="kw">import</span>{` { StdioServerTransport } `}<span className="kw">from</span>{` `}<span className="str">"@modelcontextprotocol/sdk/server/stdio.js"</span>{`;
`}<span className="kw">import</span>{` { z } `}<span className="kw">from</span>{` `}<span className="str">"zod"</span>{`;

`}<span className="cm">// 1. Crear instancia</span>{`
`}<span className="kw">const</span>{` `}<span className="var">server</span>{` = `}<span className="kw">new</span>{` `}<span className="fn">McpServer</span>{`({
  name: `}<span className="str">"Mi Primer Servidor"</span>{`,
  version: `}<span className="str">"1.0.0"</span>{`
});

`}<span className="cm">// 2. Registrar herramienta con descripción clara</span>{`
`}<span className="var">server</span>{`.`}<span className="fn">tool</span>{`(
  `}<span className="str">"saludar"</span>{`,
  { nombre: z.`}<span className="fn">string</span>{`().`}<span className="fn">describe</span>{`(`}<span className="str">"El nombre completo de la persona a saludar"</span>{`) },
  `}<span className="kw">async</span>{` ({ nombre }) => ({
    content: [{ type: `}<span className="str">"text"</span>{`, text: \`¡Hola \${nombre}! Encantado de saludarte.\` }]
  })
);

`}<span className="cm">// 3. Conectar transporte STDIO — punto clave</span>{`
`}<span className="kw">const</span>{` `}<span className="var">transport</span>{` = `}<span className="kw">new</span>{` `}<span className="fn">StdioServerTransport</span>{`();
`}<span className="kw">await</span>{` `}<span className="var">server</span>{`.`}<span className="fn">connect</span>{`(`}<span className="var">transport</span>{`);`}
        </code>
      </div>
    </>
  );
}
