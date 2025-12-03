import React, { useEffect, useRef, useState } from 'react';

const Testimonial: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-32 bg-charcoal flex items-center justify-center relative transition-opacity duration-1000"
    >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        
      <div className={`container mx-auto px-6 max-w-4xl text-center relative z-10 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="mb-8 text-6xl text-gold font-serif opacity-30">“</div>
        <blockquote className="text-3xl md:text-5xl font-serif text-offwhite leading-tight mb-12">
          De aandacht voor detail en de persoonlijke begeleiding gaven ons het vertrouwen dat we zochten.
        </blockquote>
        <div className={`w-12 h-0.5 bg-gold mx-auto mb-6 transition-all duration-1000 delay-500 ${isVisible ? 'w-12 opacity-100' : 'w-0 opacity-0'}`}></div>
        <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
          Familie Vermeulen — <span className="text-gold">Knokke</span>
        </p>
      </div>
    </section>
  );
};

export default Testimonial;