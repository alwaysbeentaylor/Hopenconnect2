import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Button } from './Button';

interface LeadFormProps {
  onSubmit: (data: UserProfile) => void;
  onBack: () => void;
}

export const LeadForm: React.FC<LeadFormProps> = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    email: '',
    budgetRange: '200k-300k',
    focusRegion: 'Vlaanderen',
    experience: 'beginner'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-serif font-bold text-navy-900">
          Personaliseer uw Gids
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          We genereren een rapport op maat van uw situatie.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Volledige Naam
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-navy-900 focus:border-navy-900 sm:text-sm"
                  placeholder="Bv. Jan Peeters"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Emailadres
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-navy-900 focus:border-navy-900 sm:text-sm"
                  placeholder="jan@voorbeeld.be"
                />
              </div>
            </div>

            {/* Budget */}
            <div>
              <label htmlFor="budgetRange" className="block text-sm font-medium text-gray-700">
                Investeringsbudget
              </label>
              <div className="mt-1">
                <select
                  id="budgetRange"
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-navy-900 focus:border-navy-900 sm:text-sm"
                >
                  <option value="<200k">Minder dan €200.000</option>
                  <option value="200k-350k">€200.000 - €350.000</option>
                  <option value="350k-500k">€350.000 - €500.000</option>
                  <option value="500k+">Meer dan €500.000</option>
                </select>
              </div>
            </div>

            {/* Region */}
            <div>
              <label htmlFor="focusRegion" className="block text-sm font-medium text-gray-700">
                Interesse Regio
              </label>
              <div className="mt-1">
                <select
                  id="focusRegion"
                  name="focusRegion"
                  value={formData.focusRegion}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-navy-900 focus:border-navy-900 sm:text-sm"
                >
                  <option value="Antwerpen">Provincie Antwerpen</option>
                  <option value="Oost-Vlaanderen">Oost-Vlaanderen (Gent e.o.)</option>
                  <option value="West-Vlaanderen">West-Vlaanderen (Kust)</option>
                  <option value="Limburg">Limburg</option>
                  <option value="Vlaams-Brabant">Vlaams-Brabant</option>
                  <option value="Brussel">Brussel Hoofdstedelijk Gewest</option>
                </select>
              </div>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ervaring
              </label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <input
                    id="beginner"
                    name="experience"
                    type="radio"
                    value="beginner"
                    checked={formData.experience === 'beginner'}
                    onChange={handleChange}
                    className="focus:ring-navy-900 h-4 w-4 text-navy-900 border-gray-300"
                  />
                  <label htmlFor="beginner" className="ml-3 block text-sm font-medium text-gray-700">
                    Starter (0 panden)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="intermediate"
                    name="experience"
                    type="radio"
                    value="intermediate"
                    checked={formData.experience === 'intermediate'}
                    onChange={handleChange}
                    className="focus:ring-navy-900 h-4 w-4 text-navy-900 border-gray-300"
                  />
                  <label htmlFor="intermediate" className="ml-3 block text-sm font-medium text-gray-700">
                    Ervaren (1-3 panden)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="expert"
                    name="experience"
                    type="radio"
                    value="expert"
                    checked={formData.experience === 'expert'}
                    onChange={handleChange}
                    className="focus:ring-navy-900 h-4 w-4 text-navy-900 border-gray-300"
                  />
                  <label htmlFor="expert" className="ml-3 block text-sm font-medium text-gray-700">
                    Pro (4+ panden)
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4 flex gap-4">
               <button 
                type="button" 
                onClick={onBack}
                className="w-1/3 flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-900"
              >
                Terug
              </button>
              <Button type="submit" fullWidth className="w-2/3">
                Genereer Gids
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};