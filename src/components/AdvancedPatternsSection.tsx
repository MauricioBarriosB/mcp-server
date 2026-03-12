export function AdvancedPatternsSection() {
  return (
    <>
      <div className="section-label">§ 14 — Patrones Avanzados</div>
      <h2>Técnicas Avanzadas de Implementación</h2>

      <h3 style={{ marginTop: '32px', marginBottom: '16px', fontFamily: "'Space Mono', monospace", color: 'var(--accent)' }}>
        🔄 Manejo de Estado y Contexto
      </h3>
      <div className="code-block">
        <code>
{``}<span className="cm">// Mantener estado entre llamadas durante una sesión</span>{`
`}<span className="kw">class</span>{` `}<span className="fn">SessionState</span>{` {
  `}<span className="kw">private</span>{` conversationHistory: `}<span className="type">Array</span>{`<{ tool: `}<span className="type">string</span>{`; result: `}<span className="type">any</span>{` }> = [];
  `}<span className="kw">private</span>{` cache = `}<span className="kw">new</span>{` `}<span className="fn">Map</span>{`<`}<span className="type">string</span>{`, { data: `}<span className="type">any</span>{`; expires: `}<span className="type">number</span>{` }>();

  `}<span className="fn">addToHistory</span>{`(tool: `}<span className="type">string</span>{`, result: `}<span className="type">any</span>{`) {
    `}<span className="kw">this</span>{`.conversationHistory.`}<span className="fn">push</span>{`({ tool, result });
    `}<span className="cm">// Mantener solo las últimas 50 llamadas</span>{`
    `}<span className="kw">if</span>{` (`}<span className="kw">this</span>{`.conversationHistory.length > 50) {
      `}<span className="kw">this</span>{`.conversationHistory.`}<span className="fn">shift</span>{`();
    }
  }

  `}<span className="fn">getHistory</span>{`() {
    `}<span className="kw">return</span>{` `}<span className="kw">this</span>{`.conversationHistory;
  }

  `}<span className="fn">setCache</span>{`(key: `}<span className="type">string</span>{`, data: `}<span className="type">any</span>{`, ttlMs: `}<span className="type">number</span>{` = 60000) {
    `}<span className="kw">this</span>{`.cache.`}<span className="fn">set</span>{`(key, {
      data,
      expires: Date.`}<span className="fn">now</span>{`() + ttlMs
    });
  }

  `}<span className="fn">getCache</span>{`(key: `}<span className="type">string</span>{`): `}<span className="type">any</span>{` | `}<span className="kw">null</span>{` {
    `}<span className="kw">const</span>{` entry = `}<span className="kw">this</span>{`.cache.`}<span className="fn">get</span>{`(key);
    `}<span className="kw">if</span>{` (!entry) `}<span className="kw">return null</span>{`;
    `}<span className="kw">if</span>{` (Date.`}<span className="fn">now</span>{`() > entry.expires) {
      `}<span className="kw">this</span>{`.cache.`}<span className="fn">delete</span>{`(key);
      `}<span className="kw">return null</span>{`;
    }
    `}<span className="kw">return</span>{` entry.data;
  }
}

`}<span className="kw">const</span>{` session = `}<span className="kw">new</span>{` `}<span className="fn">SessionState</span>{`();

`}<span className="cm">// Usar el estado en herramientas</span>{`
server.`}<span className="fn">tool</span>{`(
  `}<span className="str">"buscar-con-cache"</span>{`,
  { query: z.`}<span className="fn">string</span>{`() },
  `}<span className="kw">async</span>{` ({ query }) => {
    `}<span className="kw">const</span>{` cacheKey = \`search:\${query}\`;
    `}<span className="kw">const</span>{` cached = session.`}<span className="fn">getCache</span>{`(cacheKey);

    `}<span className="kw">if</span>{` (cached) {
      `}<span className="kw">return</span>{` {
        content: [{
          type: `}<span className="str">"text"</span>{`,
          text: \`[Cache hit] \${JSON.stringify(cached)}\`
        }]
      };
    }

    `}<span className="kw">const</span>{` result = `}<span className="kw">await</span>{` buscarEnAPI(query);
    session.`}<span className="fn">setCache</span>{`(cacheKey, result, 300000); `}<span className="cm">// 5 min cache</span>{`
    session.`}<span className="fn">addToHistory</span>{`(`}<span className="str">"buscar-con-cache"</span>{`, result);

    `}<span className="kw">return</span>{` {
      content: [{ type: `}<span className="str">"text"</span>{`, text: JSON.`}<span className="fn">stringify</span>{`(result) }]
    };
  }
);`}
        </code>
      </div>

      <h3 style={{ marginTop: '40px', marginBottom: '16px', fontFamily: "'Space Mono', monospace", color: 'var(--accent2)' }}>
        ⏱️ Timeouts y Cancelación
      </h3>
      <div className="code-block">
        <code>
{``}<span className="cm">// Función helper para operaciones con timeout</span>{`
`}<span className="kw">async function</span>{` `}<span className="fn">withTimeout</span>{`<T>(
  promise: `}<span className="type">Promise</span>{`<T>,
  timeoutMs: `}<span className="type">number</span>{`,
  errorMessage: `}<span className="type">string</span>{` = `}<span className="str">"Operación timeout"</span>{`
): `}<span className="type">Promise</span>{`<T> {
  `}<span className="kw">const</span>{` controller = `}<span className="kw">new</span>{` `}<span className="fn">AbortController</span>{`();

  `}<span className="kw">const</span>{` timeoutId = `}<span className="fn">setTimeout</span>{`(() => {
    controller.`}<span className="fn">abort</span>{`();
  }, timeoutMs);

  `}<span className="kw">try</span>{` {
    `}<span className="kw">const</span>{` result = `}<span className="kw">await</span>{` `}<span className="fn">Promise</span>{`.`}<span className="fn">race</span>{`([
      promise,
      `}<span className="kw">new</span>{` `}<span className="fn">Promise</span>{`<`}<span className="kw">never</span>{`>((_, reject) => {
        controller.signal.`}<span className="fn">addEventListener</span>{`(`}<span className="str">"abort"</span>{`, () => {
          `}<span className="fn">reject</span>{`(`}<span className="kw">new</span>{` `}<span className="fn">Error</span>{`(errorMessage));
        });
      })
    ]);
    `}<span className="kw">return</span>{` result;
  } `}<span className="kw">finally</span>{` {
    `}<span className="fn">clearTimeout</span>{`(timeoutId);
  }
}

server.`}<span className="fn">tool</span>{`(
  `}<span className="str">"operacion-larga"</span>{`,
  {
    url: z.`}<span className="fn">string</span>{`().`}<span className="fn">url</span>{`(),
    timeout_seconds: z.`}<span className="fn">number</span>{`().`}<span className="fn">min</span>{`(1).`}<span className="fn">max</span>{`(60).`}<span className="fn">default</span>{`(30)
  },
  `}<span className="kw">async</span>{` ({ url, timeout_seconds }) => {
    `}<span className="kw">try</span>{` {
      `}<span className="kw">const</span>{` result = `}<span className="kw">await</span>{` `}<span className="fn">withTimeout</span>{`(
        `}<span className="fn">fetch</span>{`(url).`}<span className="fn">then</span>{`(r => r.`}<span className="fn">json</span>{`()),
        timeout_seconds * 1000,
        \`La petición a \${url} excedió el timeout de \${timeout_seconds}s\`
      );

      `}<span className="kw">return</span>{` {
        content: [{ type: `}<span className="str">"text"</span>{`, text: JSON.`}<span className="fn">stringify</span>{`(result) }]
      };
    } `}<span className="kw">catch</span>{` (error) {
      `}<span className="kw">return</span>{` {
        content: [{
          type: `}<span className="str">"text"</span>{`,
          text: \`⏱️ \${error.message}\`
        }],
        isError: `}<span className="kw">true</span>{`
      };
    }
  }
);`}
        </code>
      </div>

      <h3 style={{ marginTop: '40px', marginBottom: '16px', fontFamily: "'Space Mono', monospace", color: 'var(--accent3)' }}>
        🔗 Herramientas que se Complementan
      </h3>
      <div className="code-block">
        <code>
{``}<span className="cm">// Patrón: Herramientas que trabajan juntas</span>{`

`}<span className="cm">// 1. Listar recursos disponibles</span>{`
server.`}<span className="fn">tool</span>{`(
  `}<span className="str">"listar-proyectos"</span>{`,
  { estado: z.`}<span className="fn">enum</span>{`([`}<span className="str">"activo"</span>{`, `}<span className="str">"archivado"</span>{`, `}<span className="str">"todos"</span>{`]).`}<span className="fn">default</span>{`(`}<span className="str">"activo"</span>{`) },
  `}<span className="kw">async</span>{` ({ estado }) => {
    `}<span className="kw">const</span>{` proyectos = `}<span className="kw">await</span>{` db.proyectos.`}<span className="fn">findAll</span>{`({ estado });

    `}<span className="kw">return</span>{` {
      content: [{
        type: `}<span className="str">"text"</span>{`,
        text: \`Proyectos encontrados: \${proyectos.length}\\n\\n\` +
          proyectos.`}<span className="fn">map</span>{`(p =>
            \`• **\${p.nombre}** (ID: \${p.id})\\n  Estado: \${p.estado} | Tareas: \${p.tareas_count}\`
          ).`}<span className="fn">join</span>{`(`}<span className="str">"\\n"</span>{`) +
          \`\\n\\n💡 Usa 'ver-proyecto' con el ID para ver detalles.\`
      }]
    };
  }
);

`}<span className="cm">// 2. Ver detalle de un recurso específico</span>{`
server.`}<span className="fn">tool</span>{`(
  `}<span className="str">"ver-proyecto"</span>{`,
  {
    proyecto_id: z.`}<span className="fn">string</span>{`().`}<span className="fn">uuid</span>{`()
      .`}<span className="fn">describe</span>{`(`}<span className="str">"UUID del proyecto. Obtener con 'listar-proyectos'"</span>{`)
  },
  `}<span className="kw">async</span>{` ({ proyecto_id }) => {
    `}<span className="kw">const</span>{` proyecto = `}<span className="kw">await</span>{` db.proyectos.`}<span className="fn">findById</span>{`(proyecto_id);

    `}<span className="kw">if</span>{` (!proyecto) {
      `}<span className="kw">return</span>{` {
        content: [{
          type: `}<span className="str">"text"</span>{`,
          text: \`❌ Proyecto no encontrado. Usa 'listar-proyectos' para ver IDs válidos.\`
        }],
        isError: `}<span className="kw">true</span>{`
      };
    }

    `}<span className="kw">return</span>{` {
      content: [{
        type: `}<span className="str">"text"</span>{`,
        text: JSON.`}<span className="fn">stringify</span>{`(proyecto, `}<span className="kw">null</span>{`, 2) +
          \`\\n\\n💡 Acciones disponibles:\\n\` +
          \`• 'editar-proyecto' para modificar\\n\` +
          \`• 'listar-tareas' con este proyecto_id para ver tareas\`
      }]
    };
  }
);

`}<span className="cm">// 3. Modificar el recurso</span>{`
server.`}<span className="fn">tool</span>{`(
  `}<span className="str">"editar-proyecto"</span>{`,
  {
    proyecto_id: z.`}<span className="fn">string</span>{`().`}<span className="fn">uuid</span>{`(),
    nombre: z.`}<span className="fn">string</span>{`().`}<span className="fn">optional</span>{`(),
    descripcion: z.`}<span className="fn">string</span>{`().`}<span className="fn">optional</span>{`(),
    estado: z.`}<span className="fn">enum</span>{`([`}<span className="str">"activo"</span>{`, `}<span className="str">"archivado"</span>{`]).`}<span className="fn">optional</span>{`()
  },
  `}<span className="kw">async</span>{` ({ proyecto_id, ...updates }) => {
    `}<span className="cm">// Filtrar campos undefined</span>{`
    `}<span className="kw">const</span>{` cambios = Object.`}<span className="fn">fromEntries</span>{`(
      Object.`}<span className="fn">entries</span>{`(updates).`}<span className="fn">filter</span>{`(([_, v]) => v !== `}<span className="kw">undefined</span>{`)
    );

    `}<span className="kw">if</span>{` (Object.`}<span className="fn">keys</span>{`(cambios).length === 0) {
      `}<span className="kw">return</span>{` {
        content: [{
          type: `}<span className="str">"text"</span>{`,
          text: `}<span className="str">"⚠️ No se proporcionaron cambios"</span>{`
        }]
      };
    }

    `}<span className="kw">const</span>{` updated = `}<span className="kw">await</span>{` db.proyectos.`}<span className="fn">update</span>{`(proyecto_id, cambios);

    `}<span className="kw">return</span>{` {
      content: [{
        type: `}<span className="str">"text"</span>{`,
        text: \`✅ Proyecto actualizado:\\n\${JSON.stringify(updated, null, 2)}\`
      }]
    };
  }
);`}
        </code>
      </div>

      <h3 style={{ marginTop: '40px', marginBottom: '16px', fontFamily: "'Space Mono', monospace", color: 'var(--accent)' }}>
        📦 Modularización del Servidor
      </h3>
      <div className="code-block">
        <code>
{``}<span className="cm">// src/tools/database.ts</span>{`
`}<span className="kw">import type</span>{` { McpServer } `}<span className="kw">from</span>{` `}<span className="str">"@modelcontextprotocol/sdk/server/mcp.js"</span>{`;

`}<span className="kw">export function</span>{` `}<span className="fn">registerDatabaseTools</span>{`(server: McpServer) {
  server.`}<span className="fn">tool</span>{`(`}<span className="str">"db-query"</span>{`, { /* ... */ }, `}<span className="kw">async</span>{` () => { /* ... */ });
  server.`}<span className="fn">tool</span>{`(`}<span className="str">"db-insert"</span>{`, { /* ... */ }, `}<span className="kw">async</span>{` () => { /* ... */ });
}

`}<span className="cm">// src/tools/files.ts</span>{`
`}<span className="kw">export function</span>{` `}<span className="fn">registerFileTools</span>{`(server: McpServer) {
  server.`}<span className="fn">tool</span>{`(`}<span className="str">"read-file"</span>{`, { /* ... */ }, `}<span className="kw">async</span>{` () => { /* ... */ });
  server.`}<span className="fn">tool</span>{`(`}<span className="str">"write-file"</span>{`, { /* ... */ }, `}<span className="kw">async</span>{` () => { /* ... */ });
}

`}<span className="cm">// src/index.ts - Punto de entrada principal</span>{`
`}<span className="kw">import</span>{` { McpServer } `}<span className="kw">from</span>{` `}<span className="str">"@modelcontextprotocol/sdk/server/mcp.js"</span>{`;
`}<span className="kw">import</span>{` { StdioServerTransport } `}<span className="kw">from</span>{` `}<span className="str">"@modelcontextprotocol/sdk/server/stdio.js"</span>{`;
`}<span className="kw">import</span>{` { registerDatabaseTools } `}<span className="kw">from</span>{` `}<span className="str">"./tools/database.js"</span>{`;
`}<span className="kw">import</span>{` { registerFileTools } `}<span className="kw">from</span>{` `}<span className="str">"./tools/files.js"</span>{`;

`}<span className="kw">const</span>{` server = `}<span className="kw">new</span>{` `}<span className="fn">McpServer</span>{`({
  name: `}<span className="str">"mi-servidor-modular"</span>{`,
  version: `}<span className="str">"1.0.0"</span>{`
});

`}<span className="cm">// Registrar módulos de herramientas</span>{`
`}<span className="fn">registerDatabaseTools</span>{`(server);
`}<span className="fn">registerFileTools</span>{`(server);

`}<span className="cm">// Conectar transporte</span>{`
`}<span className="kw">const</span>{` transport = `}<span className="kw">new</span>{` `}<span className="fn">StdioServerTransport</span>{`();
`}<span className="kw">await</span>{` server.`}<span className="fn">connect</span>{`(transport);`}
        </code>
      </div>

      <div className="callout" style={{ marginTop: '24px', background: 'rgba(124,107,255,0.05)', borderColor: 'rgba(124,107,255,0.2)', borderLeftColor: 'var(--accent2)' }}>
        <p>💡 <strong style={{ color: 'var(--accent2)' }}>Tip de arquitectura:</strong> Organiza tus herramientas por dominio (database, files, api, etc.) en módulos separados. Esto facilita el mantenimiento y permite reutilizar herramientas entre diferentes servidores MCP.</p>
      </div>
    </>
  );
}
