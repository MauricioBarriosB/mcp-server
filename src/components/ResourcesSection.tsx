export function ResourcesSection() {
  return (
    <>
      <div className="section-label">§ 10 — Resources (Recursos)</div>
      <h2>Exponiendo Datos a Claude</h2>

      <p style={{ color: 'var(--muted)', fontFamily: "'Space Mono', monospace", fontSize: '0.85rem', marginBottom: '24px' }}>
        Los Resources permiten que tu servidor exponga datos que Claude puede leer. A diferencia de las Tools, los Resources son pasivos — Claude solicita leerlos cuando necesita contexto.
      </p>

      <div className="arch-grid">
        <div className="arch-cell highlight">
          <div className="arch-badge badge-green">TOOLS</div>
          <h3>Acciones</h3>
          <p>Claude las invoca para HACER algo: crear, modificar, enviar, calcular. Tienen efectos secundarios.</p>
        </div>
        <div className="arch-cell highlight2">
          <div className="arch-badge badge-purple">RESOURCES</div>
          <h3>Datos</h3>
          <p>Claude los lee para OBTENER información: archivos, configuración, estado actual. Son solo lectura.</p>
        </div>
      </div>

      <h3 style={{ marginTop: '32px', marginBottom: '16px', fontFamily: "'Space Mono', monospace", color: 'var(--accent)' }}>
        Resource Estático (URI fija)
      </h3>
      <div className="code-block">
        <code>
{``}<span className="cm">// Exponer un archivo de configuración</span>{`
server.`}<span className="fn">resource</span>{`(
  `}<span className="str">"config://app/settings"</span>{`,  `}<span className="cm">// URI único del recurso</span>{`
  `}<span className="str">"Configuración de la aplicación"</span>{`,  `}<span className="cm">// Descripción legible</span>{`
  `}<span className="kw">async</span>{` () => {
    `}<span className="kw">const</span>{` config = `}<span className="kw">await</span>{` fs.`}<span className="fn">readFile</span>{`(`}<span className="str">"./config.json"</span>{`, `}<span className="str">"utf-8"</span>{`);

    `}<span className="kw">return</span>{` {
      contents: [{
        uri: `}<span className="str">"config://app/settings"</span>{`,
        mimeType: `}<span className="str">"application/json"</span>{`,
        text: config
      }]
    };
  }
);

`}<span className="cm">// Exponer el estado actual del sistema</span>{`
server.`}<span className="fn">resource</span>{`(
  `}<span className="str">"status://sistema"</span>{`,
  `}<span className="str">"Estado actual del servidor y servicios conectados"</span>{`,
  `}<span className="kw">async</span>{` () => {
    `}<span className="kw">const</span>{` status = {
      uptime: process.`}<span className="fn">uptime</span>{`(),
      memoria: process.`}<span className="fn">memoryUsage</span>{`(),
      version: `}<span className="str">"1.0.0"</span>{`,
      servicios: {
        database: `}<span className="kw">await</span>{` checkDB(),
        cache: `}<span className="kw">await</span>{` checkRedis(),
        api: `}<span className="kw">await</span>{` checkAPI()
      }
    };

    `}<span className="kw">return</span>{` {
      contents: [{
        uri: `}<span className="str">"status://sistema"</span>{`,
        mimeType: `}<span className="str">"application/json"</span>{`,
        text: JSON.`}<span className="fn">stringify</span>{`(status, `}<span className="kw">null</span>{`, 2)
      }]
    };
  }
);`}
        </code>
      </div>

      <h3 style={{ marginTop: '32px', marginBottom: '16px', fontFamily: "'Space Mono', monospace", color: 'var(--accent2)' }}>
        Resource Template (URI dinámica)
      </h3>
      <div className="code-block">
        <code>
{``}<span className="cm">// Template que acepta parámetros en la URI</span>{`
server.`}<span className="fn">resource</span>{`(
  `}<span className="str">"usuario://{'{'}</span>{`id`}<span className="str">{'}'}/perfil"</span>{`,  `}<span className="cm">// {'{'}</span>{`id`}<span className="cm">{'}'} es un parámetro dinámico</span>{`
  `}<span className="str">"Perfil completo de un usuario por su ID"</span>{`,
  `}<span className="kw">async</span>{` (uri) => {
    `}<span className="cm">// Extraer el ID de la URI</span>{`
    `}<span className="kw">const</span>{` match = uri.`}<span className="fn">match</span>{`(/usuario:\\/\\/(.+)\\/perfil/);
    `}<span className="kw">const</span>{` userId = match?.[1];

    `}<span className="kw">if</span>{` (!userId) {
      `}<span className="kw">throw new</span>{` `}<span className="fn">Error</span>{`(`}<span className="str">"ID de usuario inválido"</span>{`);
    }

    `}<span className="kw">const</span>{` usuario = `}<span className="kw">await</span>{` db.usuarios.`}<span className="fn">findById</span>{`(userId);

    `}<span className="kw">return</span>{` {
      contents: [{
        uri: uri,
        mimeType: `}<span className="str">"application/json"</span>{`,
        text: JSON.`}<span className="fn">stringify</span>{`(usuario, `}<span className="kw">null</span>{`, 2)
      }]
    };
  }
);

`}<span className="cm">// Resource para archivos del proyecto</span>{`
server.`}<span className="fn">resource</span>{`(
  `}<span className="str">"file://{'{'}</span>{`path`}<span className="str">{'}'}"</span>{`,
  `}<span className="str">"Contenido de cualquier archivo del proyecto"</span>{`,
  `}<span className="kw">async</span>{` (uri) => {
    `}<span className="kw">const</span>{` filePath = uri.`}<span className="fn">replace</span>{`(`}<span className="str">"file://"</span>{`, `}<span className="str">""</span>{`);

    `}<span className="cm">// Validar que el path esté dentro del proyecto</span>{`
    `}<span className="kw">const</span>{` absolutePath = path.`}<span className="fn">resolve</span>{`(PROJECT_ROOT, filePath);
    `}<span className="kw">if</span>{` (!absolutePath.`}<span className="fn">startsWith</span>{`(PROJECT_ROOT)) {
      `}<span className="kw">throw new</span>{` `}<span className="fn">Error</span>{`(`}<span className="str">"Acceso denegado: fuera del proyecto"</span>{`);
    }

    `}<span className="kw">const</span>{` content = `}<span className="kw">await</span>{` fs.`}<span className="fn">readFile</span>{`(absolutePath, `}<span className="str">"utf-8"</span>{`);
    `}<span className="kw">const</span>{` mimeType = getMimeType(filePath);

    `}<span className="kw">return</span>{` {
      contents: [{
        uri: uri,
        mimeType,
        text: content
      }]
    };
  }
);`}
        </code>
      </div>

      <h3 style={{ marginTop: '32px', marginBottom: '16px', fontFamily: "'Space Mono', monospace", color: 'var(--accent3)' }}>
        Listando Resources Disponibles
      </h3>
      <div className="code-block">
        <code>
{``}<span className="cm">// Claude puede pedir la lista de recursos disponibles</span>{`
`}<span className="cm">// El SDK maneja esto automáticamente, pero puedes personalizar:</span>{`

server.`}<span className="fn">resource</span>{`(
  `}<span className="str">"proyecto://archivos"</span>{`,
  `}<span className="str">"Lista de archivos editables en el proyecto"</span>{`,
  `}<span className="kw">async</span>{` () => {
    `}<span className="kw">const</span>{` archivos = `}<span className="kw">await</span>{` glob(`}<span className="str">"src/**/*.{'{'}</span>{`ts,tsx,js,jsx`}<span className="str">{'}'}"</span>{`);

    `}<span className="kw">return</span>{` {
      contents: [{
        uri: `}<span className="str">"proyecto://archivos"</span>{`,
        mimeType: `}<span className="str">"application/json"</span>{`,
        text: JSON.`}<span className="fn">stringify</span>{`({
          total: archivos.length,
          archivos: archivos.`}<span className="fn">map</span>{`(f => ({
            path: f,
            uri: \`file://\${f}\`
          }))
        }, `}<span className="kw">null</span>{`, 2)
      }]
    };
  }
);`}
        </code>
      </div>

      <div className="callout" style={{ marginTop: '24px' }}>
        <p>🔒 <strong>Seguridad:</strong> Siempre valida los paths de archivos para evitar directory traversal attacks. Nunca expongas archivos fuera del directorio permitido del proyecto.</p>
      </div>
    </>
  );
}
