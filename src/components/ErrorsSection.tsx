const errors = [
  { error: 'No se pudo conectar al servidor', severity: 'CRÍTICO', severityClass: 'err-red', cause: 'Ruta relativa en lugar de absoluta', solution: 'Usar ruta absoluta completa en args[]' },
  { error: 'EACCES: permission denied', severity: 'CRÍTICO', severityClass: 'err-red', cause: 'Permisos insuficientes en el archivo', solution: 'chmod +x server.js' },
  { error: 'El servidor no aparece en la UI', severity: 'MEDIO', severityClass: 'err-yellow', cause: 'JSON malformado (coma extra, etc.)', solution: 'Validar config.json con un linter' },
  { error: 'Claude no llama a la herramienta', severity: 'MEDIO', severityClass: 'err-yellow', cause: 'Descripción poco clara o genérica', solution: 'Mejorar .describe() con contexto específico' },
  { error: 'Cannot find module', severity: 'CRÍTICO', severityClass: 'err-red', cause: 'TypeScript no compilado', solution: 'Ejecutar npx tsc antes de usar' },
  { error: 'Timeout en respuesta', severity: 'MEDIO', severityClass: 'err-yellow', cause: 'Handler async sin await correcto', solution: 'Revisar que todos los async/await estén correctos' },
  { error: 'Respuesta inesperada de tipo', severity: 'BAJO', severityClass: 'err-green', cause: 'Zod schema no coincide con input', solution: 'Revisar tipos del schema vs argumentos enviados' },
];

export function ErrorsSection() {
  return (
    <div className="errors-section">
      <div className="section-label">§ 06 — Depuración</div>
      <h2>Errores Comunes y Soluciones</h2>

      <div className="callout">
        <p>📍 <strong>Ver logs en tiempo real:</strong> <code>tail -f ~/Library/Logs/Claude/mcp*.log</code> (macOS) o <code>Get-Content "$env:AppData\Claude\logs\mcp*.log" -Wait</code> (Windows)</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Error</th>
            <th>Severidad</th>
            <th>Causa probable</th>
            <th>Solución</th>
          </tr>
        </thead>
        <tbody>
          {errors.map((err, index) => (
            <tr key={index}>
              <td>{err.error}</td>
              <td><span className={`err-badge ${err.severityClass}`}>{err.severity}</span></td>
              <td>{err.cause}</td>
              <td><code>{err.solution}</code></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
