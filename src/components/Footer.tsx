export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] py-8 border-t border-white/5">
      <div className="container mx-auto px-6 flex flex-col justify-center items-center gap-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Tech Forge" className="h-8 object-contain opacity-80" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <span className="font-bold text-lg" style={{ display: 'none' }}>Tech <span className="text-brand-red">Forge</span></span>
        </div>
        
        <div className="text-gray-500 text-sm text-center">
          <p>&copy; {currentYear} Tech Forge. Todos os direitos reservados.</p>
          <p className="mt-1">
            Desenvolvido por{' '}
            <a 
              href="https://www.linkedin.com/in/victormussoline/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-brand-red font-bold transition-all duration-300 hover:text-white drop-shadow-[0_0_12px_rgba(220,38,38,0.6)] hover:drop-shadow-[0_0_20px_rgba(220,38,38,1)]"
            >
              Victor Mussoline
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
