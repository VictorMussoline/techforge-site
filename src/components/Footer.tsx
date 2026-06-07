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
            Desenvolvido por <span className="text-white font-medium">Victor Mussoline</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
