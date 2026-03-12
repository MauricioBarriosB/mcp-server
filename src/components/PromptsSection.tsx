export function PromptsSection() {
  return (
    <>
      <div className="section-label">§ 11 — Prompts (Plantillas)</div>
      <h2>Prompts Reutilizables</h2>

      <p style={{ color: 'var(--muted)', fontFamily: "'Space Mono', monospace", fontSize: '0.85rem', marginBottom: '24px' }}>
        Los Prompts son plantillas predefinidas que el usuario puede invocar. Útiles para tareas repetitivas o flujos de trabajo complejos que requieren instrucciones específicas.
      </p>

      <div className="callout" style={{ background: 'rgba(124,107,255,0.05)', borderColor: 'rgba(124,107,255,0.2)', borderLeftColor: 'var(--accent2)' }}>
        <p>💡 <strong style={{ color: 'var(--accent2)' }}>Caso de uso:</strong> Un prompt "analizar-codigo" puede proporcionar instrucciones detalladas sobre cómo revisar código, qué buscar, y qué formato de respuesta usar — sin que el usuario tenga que escribirlo cada vez.</p>
      </div>

      <h3 style={{ marginTop: '32px', marginBottom: '16px', fontFamily: "'Space Mono', monospace", color: 'var(--accent)' }}>
        Prompt Simple
      </h3>
      <div className="code-block">
        <code>
{`server.`}<span className="fn">prompt</span>{`(
  `}<span className="str">"revisar-pr"</span>{`,
  `}<span className="str">"Genera una revisión detallada de un Pull Request"</span>{`,
  () => ({
    messages: [
      {
        role: `}<span className="str">"user"</span>{`,
        content: {
          type: `}<span className="str">"text"</span>{`,
          text: \`Actúa como un senior developer haciendo code review.

Analiza el código proporcionado siguiendo esta estructura:

## 📋 Resumen
Breve descripción de los cambios

## ✅ Puntos Positivos
- Qué está bien implementado
- Buenas prácticas observadas

## ⚠️ Sugerencias de Mejora
- Posibles optimizaciones
- Refactoring sugerido

## 🐛 Posibles Bugs
- Casos edge no manejados
- Problemas potenciales

## 🔒 Seguridad
- Vulnerabilidades detectadas

## 📝 Checklist
- [ ] Tests actualizados
- [ ] Documentación actualizada
- [ ] Sin console.logs
- [ ] Sin credenciales hardcodeadas

Por favor, proporciona el código o diff a revisar.\`
        }
      }
    ]
  })
);`}
        </code>
      </div>

      <h3 style={{ marginTop: '32px', marginBottom: '16px', fontFamily: "'Space Mono', monospace", color: 'var(--accent2)' }}>
        Prompt con Argumentos
      </h3>
      <div className="code-block">
        <code>
{`server.`}<span className="fn">prompt</span>{`(
  `}<span className="str">"generar-tests"</span>{`,
  `}<span className="str">"Genera tests unitarios para una función"</span>{`,
  (args) => {
    `}<span className="kw">const</span>{` framework = args?.framework || `}<span className="str">"jest"</span>{`;
    `}<span className="kw">const</span>{` estilo = args?.estilo || `}<span className="str">"describe-it"</span>{`;

    `}<span className="kw">return</span>{` {
      messages: [
        {
          role: `}<span className="str">"user"</span>{`,
          content: {
            type: `}<span className="str">"text"</span>{`,
            text: \`Genera tests unitarios completos usando \${framework}.

Estilo de tests: \${estilo}

Requisitos:
1. Cubrir casos happy path
2. Cubrir casos edge (null, undefined, empty, etc.)
3. Cubrir manejo de errores
4. Tests deben ser independientes
5. Usar mocks cuando sea necesario
6. Incluir setup y teardown si aplica

Formato del test:
\\\`\\\`\\\`typescript
import { describe, it, expect } from '\${framework}';

describe('NombreFuncion', () => {
  describe('cuando recibe input válido', () => {
    it('debería retornar el resultado esperado', () => {
      // Arrange
      // Act
      // Assert
    });
  });

  describe('cuando recibe input inválido', () => {
    it('debería lanzar un error descriptivo', () => {
      // ...
    });
  });
});
\\\`\\\`\\\`

Por favor, proporciona la función a testear.\`
          }
        }
      ]
    };
  }
);`}
        </code>
      </div>

      <h3 style={{ marginTop: '32px', marginBottom: '16px', fontFamily: "'Space Mono', monospace", color: 'var(--accent3)' }}>
        Prompt Multi-Mensaje
      </h3>
      <div className="code-block">
        <code>
{`server.`}<span className="fn">prompt</span>{`(
  `}<span className="str">"debug-error"</span>{`,
  `}<span className="str">"Ayuda a debuggear un error paso a paso"</span>{`,
  (args) => ({
    messages: [
      {
        role: `}<span className="str">"user"</span>{`,
        content: {
          type: `}<span className="str">"text"</span>{`,
          text: `}<span className="str">"Tengo un error en mi aplicación y necesito ayuda para debuggearlo."</span>{`
        }
      },
      {
        role: `}<span className="str">"assistant"</span>{`,
        content: {
          type: `}<span className="str">"text"</span>{`,
          text: \`Entendido, vamos a debuggear el error paso a paso.

Para ayudarte mejor, necesito:

1. **El mensaje de error completo** (incluyendo stack trace)
2. **El código relevante** donde ocurre el error
3. **Qué esperabas que pasara** vs qué está pasando
4. **Pasos para reproducir** el error
5. **Qué has intentado** hasta ahora

Por favor, comparte estos detalles y te guiaré en el proceso de debugging.\`
        }
      },
      {
        role: `}<span className="str">"user"</span>{`,
        content: {
          type: `}<span className="str">"text"</span>{`,
          text: args?.error_message || `}<span className="str">"[Pega aquí el error]"</span>{`
        }
      }
    ]
  })
);`}
        </code>
      </div>

      <div className="callout" style={{ marginTop: '24px' }}>
        <p>🎯 <strong>Cuándo usar Prompts vs Tools:</strong></p>
        <p style={{ marginTop: '8px' }}>• <strong>Prompts</strong>: Para establecer contexto, instrucciones o iniciar conversaciones estructuradas.</p>
        <p>• <strong>Tools</strong>: Para ejecutar acciones concretas con parámetros validados y retornar datos.</p>
      </div>
    </>
  );
}
