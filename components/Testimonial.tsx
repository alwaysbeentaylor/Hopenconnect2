import React from 'react';

const Testimonial: React.FC = () => {
  return (
    <section className="py-32 bg-charcoal flex items-center justify-center relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        
      <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
        <div className="mb-8 text-6xl text-gold font-serif opacity-30">“</div>
        <blockquote className="text-3xl md:text-5xl font-serif text-offwhite leading-tight mb-12">
          De aandacht voor detail en de persoonlijke begeleiding gaven ons het vertrouwen dat we zochten.
        </blockquote>
        <div className="w-12 h-0.5 bg-gold mx-auto mb-6"></div>
        <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
          Familie Vermeulen — <span className="text-gold">Knokke</span>
        </p>
      </div>
    </section>
  );
};

export default Testimonial;