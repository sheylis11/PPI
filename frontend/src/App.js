import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import PathSelector from './components/PathSelector';
import ParaUsuarios from './components/ParaUsuarios';
import ParaFamiliares from './components/ParaFamiliares';
import Comunidad from './components/Comunidad';
import ProofCluster from './components/ProofCluster';
import Trabajadores from './components/Trabajadores';
import Cierre from './components/Cierre';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import WorkerAuthModal from './components/WorkerAuthModal';
import AIAssistant from './components/AIAssistant';

export default function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [showWorkerAuth, setShowWorkerAuth] = useState(false);

  return (
    <div>
      <NavBar onOpenAuth={() => setShowAuth(true)} onOpenWorkerAuth={() => setShowWorkerAuth(true)} />
      <Hero />
      <PathSelector />
      <ParaUsuarios />
      <ParaFamiliares />
      <Comunidad />
      <ProofCluster />
      <Trabajadores onOpenWorkerAuth={() => setShowWorkerAuth(true)} />
      <Cierre />
      <Footer />

      <AuthModal show={showAuth} onClose={() => setShowAuth(false)} />
      <WorkerAuthModal show={showWorkerAuth} onClose={() => setShowWorkerAuth(false)} />
      <AIAssistant />
    </div>
  );
}
