import React from 'react';

const USP: React.FC = () => {
  return (
    <section id="over-ons" className="py-32 bg-charcoal text-offwhite relative overflow-hidden">
      {/* Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-5">
        <h2 className="text-[12vw] font-serif leading-none">HOPE</h2>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 md:order-1">
             <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" className="w-full h-64 object-cover mt-12" alt="Interior Detail" />
                <img src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" className="w-full h-64 object-cover" alt="Architectural Plan" />
             </div>
          </div>

          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">
              Niet zomaar vastgoed, <br/>
              maar een <span className="text-gold italic">thuishaven.</span>
            </h2>
            <p className="text-gray-400 text-lg font-light mb-8 leading-relaxed">
              Bij Hope Connects geloven we dat een woning meer is dan muren en een dak. Het is de plek waar herinneringen worden gemaakt. Onze aanpak is gebaseerd op discretie, diepgaande lokale kennis van West-Vlaanderen en een compromisloos streven naar perfectie.
            </p>
            
            <div className="flex gap-8 border-t border-white/10 pt-8 mt-8">
              <div>
                <span className="block text-4xl font-serif text-gold mb-1">10+</span>
                <span className="text-xs uppercase tracking-widest text-gray-500">Jaar Ervaring</span>
              </div>
              <div>
                <span className="block text-4xl font-serif text-gold mb-1">100%</span>
                <span className="text-xs uppercase tracking-widest text-gray-500">Toewijding</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default USP;