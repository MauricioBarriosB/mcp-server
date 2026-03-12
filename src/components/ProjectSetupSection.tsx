export function ProjectSetupSection() {
  return (
    <>
      <div className="section-label">§ 08 — Configuración del Proyecto</div>
      <h2>Guía Paso a Paso de Instalación</h2>

      <div className="callout">
        <p>📦 <strong>Requisitos previos:</strong> Node.js 18+ instalado, npm o yarn, y un editor de código (VS Code recomendado).</p>
      </div>

      <h3 style={{ marginTop: '32px', marginBottom: '16px', fontFamily: "'Space Mono', monospace", color: 'var(--accent)' }}>
        1. Crear estructura del proyecto
      </h3>
      <div className="code-block">
        <code>
{`# Crear directorio y entrar
mkdir mi-servidor-mcp && cd mi-servidor-mcp

# Inicializar proyecto Node.js
npm init -y

# Instalar dependencias principales
npm install @modelcontextprotocol/sdk zod

# Instalar dependencias de desarrollo
npm install -D typescript @types/node

# Crear archivo de configuración TypeScript
npx tsc --init`}
        </code>
      </div>

      <h3 style={{ marginTop: '32px', marginBottom: '16px', fontFamily: "'Space Mono', monospace", color: 'var(--accent)' }}>
        2. Configurar tsconfig.json
      </h3>
      <div className="code-block">
        <code>
{`{
  `}<span className="str">"compilerOptions"</span>{`: {
    `}<span className="str">"target"</span>{`: `}<span className="str">"ES2022"</span>{`,
    `}<span className="str">"module"</span>{`: `}<span className="str">"Node16"</span>{`,
    `}<span className="str">"moduleResolution"</span>{`: `}<span className="str">"Node16"</span>{`,
    `}<span className="str">"outDir"</span>{`: `}<span className="str">"./dist"</span>{`,
    `}<span className="str">"rootDir"</span>{`: `}<span className="str">"./src"</span>{`,
    `}<span className="str">"strict"</span>{`: `}<span className="kw">true</span>{`,
    `}<span className="str">"esModuleInterop"</span>{`: `}<span className="kw">true</span>{`,
    `}<span className="str">"skipLibCheck"</span>{`: `}<span className="kw">true</span>{`,
    `}<span className="str">"forceConsistentCasingInFileNames"</span>{`: `}<span className="kw">true</span>{`,
    `}<span className="str">"declaration"</span>{`: `}<span className="kw">true</span>{`
  },
  `}<span className="str">"include"</span>{`: [`}<span className="str">"src/**/*"</span>{`],
  `}<span className="str">"exclude"</span>{`: [`}<span className="str">"node_modules"</span>{`, `}<span className="str">"dist"</span>{`]
}`}
        </code>
      </div>

      <h3 style={{ marginTop: '32px', marginBottom: '16px', fontFamily: "'Space Mono', monospace", color: 'var(--accent)' }}>
        3. Configurar package.json
      </h3>
      <div className="code-block">
        <code>
{`{
  `}<span className="str">"name"</span>{`: `}<span className="str">"mi-servidor-mcp"</span>{`,
  `}<span className="str">"version"</span>{`: `}<span className="str">"1.0.0"</span>{`,
  `}<span className="str">"type"</span>{`: `}<span className="str">"module"</span>{`,  `}<span className="cm">// ¡Importante! Habilita ES modules</span>{`
  `}<span className="str">"main"</span>{`: `}<span className="str">"dist/index.js"</span>{`,
  `}<span className="str">"scripts"</span>{`: {
    `}<span className="str">"build"</span>{`: `}<span className="str">"tsc"</span>{`,
    `}<span className="str">"start"</span>{`: `}<span className="str">"node dist/index.js"</span>{`,
    `}<span className="str">"dev"</span>{`: `}<span className="str">"tsc --watch"</span>{`
  },
  `}<span className="str">"bin"</span>{`: {
    `}<span className="str">"mi-servidor"</span>{`: `}<span className="str">"./dist/index.js"</span>{`
  }
}`}
        </code>
      </div>

      <h3 style={{ marginTop: '32px', marginBottom: '16px', fontFamily: "'Space Mono', monospace", color: 'var(--accent)' }}>
        4. Estructura de archivos recomendada
      </h3>
      <div className="code-block">
        <code>
{`mi-servidor-mcp/
├── src/
│   ├── index.ts          `}<span className="cm"># Punto de entrada principal</span>{`
│   ├── tools/            `}<span className="cm"># Carpeta para herramientas</span>{`
│   │   ├── index.ts      `}<span className="cm"># Exporta todas las herramientas</span>{`
│   │   ├── database.ts   `}<span className="cm"># Herramientas de base de datos</span>{`
│   │   └── files.ts      `}<span className="cm"># Herramientas de archivos</span>{`
│   ├── resources/        `}<span className="cm"># Carpeta para recursos</span>{`
│   │   └── index.ts
│   └── utils/            `}<span className="cm"># Utilidades compartidas</span>{`
│       └── logger.ts
├── dist/                 `}<span className="cm"># Código compilado (generado)</span>{`
├── package.json
├── tsconfig.json
└── README.md`}
        </code>
      </div>

      <div className="callout" style={{ marginTop: '24px', background: 'rgba(124,107,255,0.05)', borderColor: 'rgba(124,107,255,0.2)', borderLeftColor: 'var(--accent2)' }}>
        <p>💡 <strong style={{ color: 'var(--accent2)' }}>Tip:</strong> Añade <code>#!/usr/bin/env node</code> al inicio de tu archivo index.ts si planeas ejecutarlo directamente como binario.</p>
      </div>
    </>
  );
}
