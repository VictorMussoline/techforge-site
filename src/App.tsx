import { Helmet } from 'react-helmet-async';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Gallery } from './components/Gallery';
import { Reviews } from './components/Reviews';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-brand-dark text-white font-sans">
      <Helmet>
        <title>Tech Forge | Assistência Técnica Especializada</title>
        <meta name="description" content="Assistência Técnica Especializada em PCs & Notebooks. A Tech Forge resolve seus problemas com qualidade e rapidez." />
        <meta name="keywords" content="assistência técnica, manutenção de computadores, conserto de notebook, pc gamer, são paulo" />
        <meta property="og:title" content="Tech Forge | Assistência Técnica Especializada" />
        <meta property="og:description" content="Assistência Técnica Especializada em PCs & Notebooks. A Tech Forge resolve seus problemas com qualidade e rapidez." />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar />
      <main className="flex-1 w-full">
        <Hero />
        <About />
        <Gallery />
        <Reviews />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}

export default App
