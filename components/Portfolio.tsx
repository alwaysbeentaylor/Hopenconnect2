import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ProjectItem } from '../types';
import { useCountry } from '../contexts/CountryContext';
import { getTranslations } from '../config/translations';

const Portfolio: React.FC = () => {
  const { country } = useCountry();
  const t = getTranslations(country);
  const projects = t.portfolio.projects;

  return (
    <section id="projecten" className="py-32 bg-silk overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end mb-20">
          <h2 className="text-4xl md:text-6xl font-serif text-charcoal">
            Onze <span className="italic text-gold">Realisaties</span>
          </h2>
          <div className="hidden md:block w-32 h-[1px] bg-charcoal mb-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Main Featured Project */}
          <div className="md:col-span-8 relative group cursor-pointer">
            <div className="relative overflow-hidden h-[500px] md:h-[600px]">
              <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/0 transition-all duration-500 z-10"></div>
              <img 
                src={projects[0].imageUrl} 
                alt={projects[0].title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
              />
            </div>
            <div className="mt-6 flex justify-between items-start">
               <div>
                  <span className="text-gold text-xs uppercase tracking-widest">{projects[0].category}</span>
                  <h3 className="text-3xl font-serif mt-1">{projects[0].title}</h3>
               </div>
               <span className="text-gray-400 font-light">{projects[0].location}</span>
            </div>
          </div>

          {/* Secondary Column */}
          <div className="md:col-span-4 flex flex-col justify-between space-y-12 md:mt-24">
            {projects.slice(1).map((project) => (
              <div key={project.id} className="group cursor-pointer">
                <div className="relative overflow-hidden h-64 md:h-80 w-full mb-4">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                </div>
                <div>
                  <h3 className="text-xl font-serif group-hover:text-gold transition-colors">{project.title}</h3>
                  <p className="text-sm text-gray-500">{project.location}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Portfolio;