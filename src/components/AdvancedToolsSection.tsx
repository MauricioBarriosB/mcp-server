export function AdvancedToolsSection() {
  return (
    <>
      <div className="section-label">§ 09 — Herramientas Avanzadas</div>
      <h2>Patrones de Herramientas Complejas</h2>

      <p style={{ color: 'var(--muted)', fontFamily: "'Space Mono', monospace", fontSize: '0.85rem', marginBottom: '32px' }}>
        Las herramientas MCP pueden manejar esquemas complejos con validación robusta usando Zod.
      </p>

      <h3 style={{ marginTop: '32px', marginBottom: '16px', fontFamily: "'Space Mono', monospace", color: 'var(--accent)' }}>
        Parámetros Opcionales y Valores por Defecto
      </h3>
      <div className="code-block">
        <code>
{`server.`}<span className="fn">tool</span>{`(
  `}<span className="str">"buscar-usuarios"</span>{`,
  {
    query: z.`}<span className="fn">string</span>{`()
      .`}<span className="fn">describe</span>{`(`}<span className="str">"Término de búsqueda para filtrar usuarios"</span>{`),
    limite: z.`}<span className="fn">number</span>{`()
      .`}<span className="fn">optional</span>{`()
      .`}<span className="fn">default</span>{`(10)
      .`}<span className="fn">describe</span>{`(`}<span className="str">"Número máximo de resultados (default: 10)"</span>{`),
    ordenar_por: z.`}<span className="fn">enum</span>{`([`}<span className="str">"nombre"</span>{`, `}<span className="str">"fecha"</span>{`, `}<span className="str">"relevancia"</span>{`])
      .`}<span className="fn">optional</span>{`()
      .`}<span className="fn">default</span>{`(`}<span className="str">"relevancia"</span>{`)
      .`}<span className="fn">describe</span>{`(`}<span className="str">"Campo por el cual ordenar resultados"</span>{`),
    incluir_inactivos: z.`}<span className="fn">boolean</span>{`()
      .`}<span className="fn">optional</span>{`()
      .`}<span className="fn">default</span>{`(`}<span className="kw">false</span>{`)
      .`}<span className="fn">describe</span>{`(`}<span className="str">"Si true, incluye usuarios desactivados"</span>{`)
  },
  `}<span className="kw">async</span>{` ({ query, limite, ordenar_por, incluir_inactivos }) => {
    `}<span className="cm">// Los valores opcionales ya tienen sus defaults aplicados</span>{`
    `}<span className="kw">const</span>{` resultados = `}<span className="kw">await</span>{` buscarEnDB(query, { limite, ordenar_por, incluir_inactivos });

    `}<span className="kw">return</span>{` {
      content: [{
        type: `}<span className="str">"text"</span>{`,
        text: JSON.`}<span className="fn">stringify</span>{`(resultados, `}<span className="kw">null</span>{`, 2)
      }]
    };
  }
);`}
        </code>
      </div>

      <h3 style={{ marginTop: '32px', marginBottom: '16px', fontFamily: "'Space Mono', monospace", color: 'var(--accent2)' }}>
        Objetos Anidados y Arrays
      </h3>
      <div className="code-block">
        <code>
{``}<span className="cm">// Definir schema reutilizable</span>{`
`}<span className="kw">const</span>{` DireccionSchema = z.`}<span className="fn">object</span>{`({
  calle: z.`}<span className="fn">string</span>{`(),
  ciudad: z.`}<span className="fn">string</span>{`(),
  codigo_postal: z.`}<span className="fn">string</span>{`().`}<span className="fn">regex</span>{`(/^\\d{5}$/),
  pais: z.`}<span className="fn">string</span>{`().`}<span className="fn">optional</span>{`().`}<span className="fn">default</span>{`(`}<span className="str">"España"</span>{`)
});

`}<span className="kw">const</span>{` ProductoSchema = z.`}<span className="fn">object</span>{`({
  id: z.`}<span className="fn">string</span>{`(),
  cantidad: z.`}<span className="fn">number</span>{`().`}<span className="fn">min</span>{`(1).`}<span className="fn">max</span>{`(100),
  precio_unitario: z.`}<span className="fn">number</span>{`().`}<span className="fn">positive</span>{`()
});

server.`}<span className="fn">tool</span>{`(
  `}<span className="str">"crear-pedido"</span>{`,
  {
    cliente_id: z.`}<span className="fn">string</span>{`().`}<span className="fn">uuid</span>{`()
      .`}<span className="fn">describe</span>{`(`}<span className="str">"UUID del cliente que realiza el pedido"</span>{`),
    productos: z.`}<span className="fn">array</span>{`(ProductoSchema)
      .`}<span className="fn">min</span>{`(1)
      .`}<span className="fn">describe</span>{`(`}<span className="str">"Lista de productos con cantidad y precio"</span>{`),
    direccion_envio: DireccionSchema
      .`}<span className="fn">describe</span>{`(`}<span className="str">"Dirección completa para el envío"</span>{`),
    notas: z.`}<span className="fn">string</span>{`().`}<span className="fn">optional</span>{`()
      .`}<span className="fn">describe</span>{`(`}<span className="str">"Instrucciones especiales de entrega"</span>{`)
  },
  `}<span className="kw">async</span>{` ({ cliente_id, productos, direccion_envio, notas }) => {
    `}<span className="kw">const</span>{` total = productos.`}<span className="fn">reduce</span>{`(
      (sum, p) => sum + (p.cantidad * p.precio_unitario), 0
    );

    `}<span className="kw">const</span>{` pedido = `}<span className="kw">await</span>{` crearPedidoEnDB({
      cliente_id,
      productos,
      direccion_envio,
      notas,
      total
    });

    `}<span className="kw">return</span>{` {
      content: [{
        type: `}<span className="str">"text"</span>{`,
        text: \`Pedido #\${pedido.id} creado. Total: €\${total.toFixed(2)}\`
      }]
    };
  }
);`}
        </code>
      </div>

      <h3 style={{ marginTop: '32px', marginBottom: '16px', fontFamily: "'Space Mono', monospace", color: 'var(--accent3)' }}>
        Uniones Discriminadas (Discriminated Unions)
      </h3>
      <div className="code-block">
        <code>
{``}<span className="cm">// Herramienta que acepta diferentes tipos de notificación</span>{`
`}<span className="kw">const</span>{` NotificacionSchema = z.`}<span className="fn">discriminatedUnion</span>{`(`}<span className="str">"tipo"</span>{`, [
  z.`}<span className="fn">object</span>{`({
    tipo: z.`}<span className="fn">literal</span>{`(`}<span className="str">"email"</span>{`),
    destinatario: z.`}<span className="fn">string</span>{`().`}<span className="fn">email</span>{`(),
    asunto: z.`}<span className="fn">string</span>{`(),
    cuerpo_html: z.`}<span className="fn">string</span>{`()
  }),
  z.`}<span className="fn">object</span>{`({
    tipo: z.`}<span className="fn">literal</span>{`(`}<span className="str">"sms"</span>{`),
    telefono: z.`}<span className="fn">string</span>{`().`}<span className="fn">regex</span>{`(/^\\+\\d{10,15}$/),
    mensaje: z.`}<span className="fn">string</span>{`().`}<span className="fn">max</span>{`(160)
  }),
  z.`}<span className="fn">object</span>{`({
    tipo: z.`}<span className="fn">literal</span>{`(`}<span className="str">"push"</span>{`),
    dispositivo_id: z.`}<span className="fn">string</span>{`(),
    titulo: z.`}<span className="fn">string</span>{`(),
    mensaje: z.`}<span className="fn">string</span>{`()
  })
]);

server.`}<span className="fn">tool</span>{`(
  `}<span className="str">"enviar-notificacion"</span>{`,
  { notificacion: NotificacionSchema },
  `}<span className="kw">async</span>{` ({ notificacion }) => {
    `}<span className="kw">switch</span>{` (notificacion.tipo) {
      `}<span className="kw">case</span>{` `}<span className="str">"email"</span>{`:
        `}<span className="kw">await</span>{` enviarEmail(notificacion);
        `}<span className="kw">break</span>{`;
      `}<span className="kw">case</span>{` `}<span className="str">"sms"</span>{`:
        `}<span className="kw">await</span>{` enviarSMS(notificacion);
        `}<span className="kw">break</span>{`;
      `}<span className="kw">case</span>{` `}<span className="str">"push"</span>{`:
        `}<span className="kw">await</span>{` enviarPush(notificacion);
        `}<span className="kw">break</span>{`;
    }
    `}<span className="kw">return</span>{` { content: [{ type: `}<span className="str">"text"</span>{`, text: `}<span className="str">"Notificación enviada"</span>{` }] };
  }
);`}
        </code>
      </div>

      <div className="callout" style={{ marginTop: '24px' }}>
        <p>📝 <strong>Importante:</strong> Las descripciones en <code>.describe()</code> son fundamentales. Claude las usa para entender cuándo y cómo usar cada herramienta. Sé específico y proporciona ejemplos cuando sea útil.</p>
      </div>
    </>
  );
}
