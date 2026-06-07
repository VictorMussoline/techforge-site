import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-brand-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Entre em <span className="text-brand-red">Contato</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Traga sua máquina para um diagnóstico ou entre em contato pelos nossos canais.</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/3 flex flex-col gap-6">
            <div className="bg-brand-gray p-6 rounded-xl border border-white/5 flex items-start gap-4">
              <MapPin className="text-brand-red shrink-0" size={24} />
              <div>
                <h4 className="font-bold mb-1">Localização</h4>
                <p className="text-gray-400 text-sm">R. Dr. Altíno Arantes, 1200 - Parque Universitario<br/>Franca - SP, 14404-614</p>
              </div>
            </div>
            
            <div className="bg-brand-gray p-6 rounded-xl border border-white/5 flex items-start gap-4">
              <Phone className="text-brand-red shrink-0" size={24} />
              <div>
                <h4 className="font-bold mb-1">Telefone / WhatsApp</h4>
                <p className="text-gray-400 text-sm">(16) 99429-5371</p>
              </div>
            </div>
            
            <div className="bg-brand-gray p-6 rounded-xl border border-white/5 flex items-start gap-4">
              <Mail className="text-brand-red shrink-0" size={24} />
              <div>
                <h4 className="font-bold mb-1">E-mail</h4>
                <p className="text-gray-400 text-sm">contato@techforge.com.br</p>
              </div>
            </div>
            
            <div className="bg-brand-gray p-6 rounded-xl border border-white/5 flex items-start gap-4">
              <Clock className="text-brand-red shrink-0" size={24} />
              <div>
                <h4 className="font-bold mb-1">Horário de Funcionamento</h4>
                <p className="text-gray-400 text-sm">Seg - Sex: Atendimento 24 horas<br/>Sáb e Dom: Fechado</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-2/3 rounded-xl overflow-hidden border border-white/5 h-[400px] lg:h-auto bg-brand-gray relative">
            {/* Mock Google Map - can be replaced with real iframe */}
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
               <iframe 
                  src="https://maps.google.com/maps?q=Rua%20Dr%20Altino%20Arantes%201200%20Franca%20SP&hl=pt-BR&z=17&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(100%)' }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização Tech Forge"
                ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
