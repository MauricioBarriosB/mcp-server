import {
  Header,
  Sidebar,
  MetricsRow,
  FlowSection,
  StdioSection,
  ArchitectureSection,
  ConfigSection,
  ProtocolSection,
  ErrorsSection,
  ComparisonSection,
  ProjectSetupSection,
  AdvancedToolsSection,
  ResourcesSection,
  PromptsSection,
  RealWorldExamplesSection,
  BestPracticesSection,
  AdvancedPatternsSection,
  Footer,
} from './components';

function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main>
          <MetricsRow />

          <section id="flujo">
            <FlowSection />
          </section>
          <hr className="divider" />

          <section id="stdio">
            <StdioSection />
          </section>
          <hr className="divider" />

          <section id="anatomia">
            <ArchitectureSection />
          </section>
          <hr className="divider" />

          <section id="config">
            <ConfigSection />
          </section>
          <hr className="divider" />

          <section id="protocolo">
            <ProtocolSection />
          </section>
          <hr className="divider" />

          <section id="errores">
            <ErrorsSection />
          </section>
          <hr className="divider" />

          <section id="comparativa">
            <ComparisonSection />
          </section>
          <hr className="divider" />

          <section id="setup">
            <ProjectSetupSection />
          </section>
          <hr className="divider" />

          <section id="tools-avanzadas">
            <AdvancedToolsSection />
          </section>
          <hr className="divider" />

          <section id="resources">
            <ResourcesSection />
          </section>
          <hr className="divider" />

          <section id="prompts">
            <PromptsSection />
          </section>
          <hr className="divider" />

          <section id="ejemplos">
            <RealWorldExamplesSection />
          </section>
          <hr className="divider" />

          <section id="practicas">
            <BestPracticesSection />
          </section>
          <hr className="divider" />

          <section id="patrones">
            <AdvancedPatternsSection />
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
