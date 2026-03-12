export function RealWorldExamplesSection() {
  return (
    <>
      <div className="section-label">§ 12 — Ejemplos del Mundo Real</div>
      <h2>Implementaciones Prácticas</h2>

      <p style={{ color: 'var(--muted)', fontFamily: "'Space Mono', monospace", fontSize: '0.85rem', marginBottom: '32px' }}>
        Ejemplos completos y funcionales para casos de uso comunes en producción.
      </p>

      <h3 style={{ marginTop: '32px', marginBottom: '16px', fontFamily: "'Space Mono', monospace", color: 'var(--accent)' }}>
        🗄️ Servidor MCP para Base de Datos
      </h3>
      <div className="code-block">
        <code>
{``}<span className="kw">import</span>{` { McpServer } `}<span className="kw">from</span>{` `}<span className="str">"@modelcontextprotocol/sdk/server/mcp.js"</span>{`;
`}<span className="kw">import</span>{` { StdioServerTransport } `}<span className="kw">from</span>{` `}<span className="str">"@modelcontextprotocol/sdk/server/stdio.js"</span>{`;
`}<span className="kw">import</span>{` { z } `}<span className="kw">from</span>{` `}<span className="str">"zod"</span>{`;
`}<span className="kw">import</span>{` pg `}<span className="kw">from</span>{` `}<span className="str">"pg"</span>{`;

`}<span className="kw">const</span>{` pool = `}<span className="kw">new</span>{` pg.`}<span className="fn">Pool</span>{`({
  connectionString: process.env.DATABASE_URL
});

`}<span className="kw">const</span>{` server = `}<span className="kw">new</span>{` `}<span className="fn">McpServer</span>{`({
  name: `}<span className="str">"postgres-mcp"</span>{`,
  version: `}<span className="str">"1.0.0"</span>{`
});

`}<span className="cm">// Herramienta para ejecutar queries SELECT (solo lectura)</span>{`
server.`}<span className="fn">tool</span>{`(
  `}<span className="str">"query"</span>{`,
  {
    sql: z.`}<span className="fn">string</span>{`()
      .`}<span className="fn">describe</span>{`(`}<span className="str">"Query SQL SELECT para ejecutar. Solo lectura."</span>{`),
    params: z.`}<span className="fn">array</span>{`(z.`}<span className="fn">union</span>{`([z.`}<span className="fn">string</span>{`(), z.`}<span className="fn">number</span>{`(), z.`}<span className="fn">null</span>{`()]))
      .`}<span className="fn">optional</span>{`()
      .`}<span className="fn">default</span>{`([])
      .`}<span className="fn">describe</span>{`(`}<span className="str">"Parámetros para prepared statement ($1, $2...)"</span>{`)
  },
  `}<span className="kw">async</span>{` ({ sql, params }) => {
    `}<span className="cm">// Validar que sea solo SELECT</span>{`
    `}<span className="kw">const</span>{` normalized = sql.`}<span className="fn">trim</span>{`().`}<span className="fn">toUpperCase</span>{`();
    `}<span className="kw">if</span>{` (!normalized.`}<span className="fn">startsWith</span>{`(`}<span className="str">"SELECT"</span>{`)) {
      `}<span className="kw">return</span>{` {
        content: [{
          type: `}<span className="str">"text"</span>{`,
          text: `}<span className="str">"❌ Error: Solo se permiten queries SELECT"</span>{`
        }],
        isError: `}<span className="kw">true</span>{`
      };
    }

    `}<span className="kw">try</span>{` {
      `}<span className="kw">const</span>{` result = `}<span className="kw">await</span>{` pool.`}<span className="fn">query</span>{`(sql, params);

      `}<span className="kw">return</span>{` {
        content: [{
          type: `}<span className="str">"text"</span>{`,
          text: JSON.`}<span className="fn">stringify</span>{`({
            rowCount: result.rowCount,
            rows: result.rows
          }, `}<span className="kw">null</span>{`, 2)
        }]
      };
    } `}<span className="kw">catch</span>{` (error) {
      `}<span className="kw">return</span>{` {
        content: [{
          type: `}<span className="str">"text"</span>{`,
          text: \`❌ Error SQL: \${error.message}\`
        }],
        isError: `}<span className="kw">true</span>{`
      };
    }
  }
);

`}<span className="cm">// Resource para listar tablas</span>{`
server.`}<span className="fn">resource</span>{`(
  `}<span className="str">"db://schema/tables"</span>{`,
  `}<span className="str">"Lista de todas las tablas en la base de datos"</span>{`,
  `}<span className="kw">async</span>{` () => {
    `}<span className="kw">const</span>{` result = `}<span className="kw">await</span>{` pool.`}<span className="fn">query</span>{`(\`
      SELECT table_name, column_name, data_type
      FROM information_schema.columns
      WHERE table_schema = 'public'
      ORDER BY table_name, ordinal_position
    \`);

    `}<span className="kw">return</span>{` {
      contents: [{
        uri: `}<span className="str">"db://schema/tables"</span>{`,
        mimeType: `}<span className="str">"application/json"</span>{`,
        text: JSON.`}<span className="fn">stringify</span>{`(result.rows, `}<span className="kw">null</span>{`, 2)
      }]
    };
  }
);`}
        </code>
      </div>

      <h3 style={{ marginTop: '40px', marginBottom: '16px', fontFamily: "'Space Mono', monospace", color: 'var(--accent2)' }}>
        📁 Servidor MCP para Sistema de Archivos
      </h3>
      <div className="code-block">
        <code>
{``}<span className="kw">import</span>{` fs `}<span className="kw">from</span>{` `}<span className="str">"fs/promises"</span>{`;
`}<span className="kw">import</span>{` path `}<span className="kw">from</span>{` `}<span className="str">"path"</span>{`;
`}<span className="kw">import</span>{` { glob } `}<span className="kw">from</span>{` `}<span className="str">"glob"</span>{`;

`}<span className="kw">const</span>{` ALLOWED_DIR = process.env.PROJECT_DIR || process.`}<span className="fn">cwd</span>{`();

`}<span className="cm">// Utilidad para validar paths</span>{`
`}<span className="kw">function</span>{` `}<span className="fn">validatePath</span>{`(filePath: `}<span className="type">string</span>{`): `}<span className="type">string</span>{` {
  `}<span className="kw">const</span>{` absolute = path.`}<span className="fn">resolve</span>{`(ALLOWED_DIR, filePath);
  `}<span className="kw">if</span>{` (!absolute.`}<span className="fn">startsWith</span>{`(ALLOWED_DIR)) {
    `}<span className="kw">throw new</span>{` `}<span className="fn">Error</span>{`(`}<span className="str">"Acceso denegado: path fuera del directorio permitido"</span>{`);
  }
  `}<span className="kw">return</span>{` absolute;
}

server.`}<span className="fn">tool</span>{`(
  `}<span className="str">"leer-archivo"</span>{`,
  {
    path: z.`}<span className="fn">string</span>{`().`}<span className="fn">describe</span>{`(`}<span className="str">"Ruta relativa al archivo"</span>{`),
    encoding: z.`}<span className="fn">enum</span>{`([`}<span className="str">"utf-8"</span>{`, `}<span className="str">"base64"</span>{`]).`}<span className="fn">default</span>{`(`}<span className="str">"utf-8"</span>{`)
  },
  `}<span className="kw">async</span>{` ({ path: filePath, encoding }) => {
    `}<span className="kw">const</span>{` absolutePath = `}<span className="fn">validatePath</span>{`(filePath);
    `}<span className="kw">const</span>{` content = `}<span className="kw">await</span>{` fs.`}<span className="fn">readFile</span>{`(absolutePath, encoding);

    `}<span className="kw">return</span>{` {
      content: [{ type: `}<span className="str">"text"</span>{`, text: content }]
    };
  }
);

server.`}<span className="fn">tool</span>{`(
  `}<span className="str">"escribir-archivo"</span>{`,
  {
    path: z.`}<span className="fn">string</span>{`().`}<span className="fn">describe</span>{`(`}<span className="str">"Ruta donde crear/modificar el archivo"</span>{`),
    content: z.`}<span className="fn">string</span>{`().`}<span className="fn">describe</span>{`(`}<span className="str">"Contenido a escribir"</span>{`),
    crear_directorios: z.`}<span className="fn">boolean</span>{`().`}<span className="fn">default</span>{`(`}<span className="kw">true</span>{`)
  },
  `}<span className="kw">async</span>{` ({ path: filePath, content, crear_directorios }) => {
    `}<span className="kw">const</span>{` absolutePath = `}<span className="fn">validatePath</span>{`(filePath);

    `}<span className="kw">if</span>{` (crear_directorios) {
      `}<span className="kw">await</span>{` fs.`}<span className="fn">mkdir</span>{`(path.`}<span className="fn">dirname</span>{`(absolutePath), { recursive: `}<span className="kw">true</span>{` });
    }

    `}<span className="kw">await</span>{` fs.`}<span className="fn">writeFile</span>{`(absolutePath, content, `}<span className="str">"utf-8"</span>{`);

    `}<span className="kw">return</span>{` {
      content: [{ type: `}<span className="str">"text"</span>{`, text: \`✅ Archivo escrito: \${filePath}\` }]
    };
  }
);

server.`}<span className="fn">tool</span>{`(
  `}<span className="str">"buscar-archivos"</span>{`,
  {
    pattern: z.`}<span className="fn">string</span>{`().`}<span className="fn">describe</span>{`(`}<span className="str">"Patrón glob (ej: **/*.ts, src/**/*.tsx)"</span>{`),
    ignorar: z.`}<span className="fn">array</span>{`(z.`}<span className="fn">string</span>{`()).`}<span className="fn">default</span>{`([`}<span className="str">"node_modules"</span>{`, `}<span className="str">"dist"</span>{`, `}<span className="str">".git"</span>{`])
  },
  `}<span className="kw">async</span>{` ({ pattern, ignorar }) => {
    `}<span className="kw">const</span>{` files = `}<span className="kw">await</span>{` `}<span className="fn">glob</span>{`(pattern, {
      cwd: ALLOWED_DIR,
      ignore: ignorar
    });

    `}<span className="kw">return</span>{` {
      content: [{
        type: `}<span className="str">"text"</span>{`,
        text: JSON.`}<span className="fn">stringify</span>{`({ total: files.length, files }, `}<span className="kw">null</span>{`, 2)
      }]
    };
  }
);`}
        </code>
      </div>

      <h3 style={{ marginTop: '40px', marginBottom: '16px', fontFamily: "'Space Mono', monospace", color: 'var(--accent3)' }}>
        🌐 Servidor MCP para API REST
      </h3>
      <div className="code-block">
        <code>
{``}<span className="kw">const</span>{` API_BASE = process.env.API_URL || `}<span className="str">"https://api.ejemplo.com"</span>{`;
`}<span className="kw">const</span>{` API_KEY = process.env.API_KEY;

`}<span className="kw">async function</span>{` `}<span className="fn">apiRequest</span>{`(endpoint: `}<span className="type">string</span>{`, options: RequestInit = {}) {
  `}<span className="kw">const</span>{` response = `}<span className="kw">await</span>{` `}<span className="fn">fetch</span>{`(\`\${API_BASE}\${endpoint}\`, {
    ...options,
    headers: {
      `}<span className="str">"Content-Type"</span>{`: `}<span className="str">"application/json"</span>{`,
      `}<span className="str">"Authorization"</span>{`: \`Bearer \${API_KEY}\`,
      ...options.headers
    }
  });

  `}<span className="kw">if</span>{` (!response.ok) {
    `}<span className="kw">throw new</span>{` `}<span className="fn">Error</span>{`(\`API Error: \${response.status} \${response.statusText}\`);
  }

  `}<span className="kw">return</span>{` response.`}<span className="fn">json</span>{`();
}

server.`}<span className="fn">tool</span>{`(
  `}<span className="str">"api-get"</span>{`,
  {
    endpoint: z.`}<span className="fn">string</span>{`().`}<span className="fn">describe</span>{`(`}<span className="str">"Endpoint de la API (ej: /users/123)"</span>{`),
    query_params: z.`}<span className="fn">record</span>{`(z.`}<span className="fn">string</span>{`()).`}<span className="fn">optional</span>{`()
  },
  `}<span className="kw">async</span>{` ({ endpoint, query_params }) => {
    `}<span className="kw">let</span>{` url = endpoint;
    `}<span className="kw">if</span>{` (query_params) {
      `}<span className="kw">const</span>{` params = `}<span className="kw">new</span>{` `}<span className="fn">URLSearchParams</span>{`(query_params);
      url += \`?\${params}\`;
    }

    `}<span className="kw">const</span>{` data = `}<span className="kw">await</span>{` `}<span className="fn">apiRequest</span>{`(url);

    `}<span className="kw">return</span>{` {
      content: [{
        type: `}<span className="str">"text"</span>{`,
        text: JSON.`}<span className="fn">stringify</span>{`(data, `}<span className="kw">null</span>{`, 2)
      }]
    };
  }
);

server.`}<span className="fn">tool</span>{`(
  `}<span className="str">"api-post"</span>{`,
  {
    endpoint: z.`}<span className="fn">string</span>{`(),
    body: z.`}<span className="fn">record</span>{`(z.`}<span className="fn">unknown</span>{`()).`}<span className="fn">describe</span>{`(`}<span className="str">"Cuerpo de la petición como objeto JSON"</span>{`)
  },
  `}<span className="kw">async</span>{` ({ endpoint, body }) => {
    `}<span className="kw">const</span>{` data = `}<span className="kw">await</span>{` `}<span className="fn">apiRequest</span>{`(endpoint, {
      method: `}<span className="str">"POST"</span>{`,
      body: JSON.`}<span className="fn">stringify</span>{`(body)
    });

    `}<span className="kw">return</span>{` {
      content: [{
        type: `}<span className="str">"text"</span>{`,
        text: JSON.`}<span className="fn">stringify</span>{`(data, `}<span className="kw">null</span>{`, 2)
      }]
    };
  }
);`}
        </code>
      </div>
    </>
  );
}
