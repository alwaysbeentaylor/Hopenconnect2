import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, MapPin, Euro, User, Mail, Briefcase, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserProfile } from '../types';

interface GuideFormProps {
  onSubmit: (data: UserProfile) => void;
  onBack?: () => void;
}

export const GuideForm: React.FC<GuideFormProps> = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    email: '',
    budgetRange: '200k-350k',
    focusRegion: 'West-Vlaanderen',
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
    <div className="min-h-screen bg-charcoal flex flex-col justify-center py-12 px-4">
      {/* Back to Home Button */}
      <div className="absolute top-6 left-4 md:left-8 z-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors"
        >
          <Home size={18} />
          <span className="text-sm">Terug naar site</span>
        </Link>
      </div>

      <div className="max-w-lg mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold text-xs uppercase tracking-widest mb-6 rounded-full">
            <Briefcase size={14} />
            Gepersonaliseerd Rapport
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
            Uw <span className="text-gold italic">Profiel</span>
          </h1>
          <p className="text-gray-400 font-light">
            We genereren een gids op maat van uw situatie en doelen.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="relative">
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
              Volledige Naam
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Jan Peeters"
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-gold transition-colors rounded-lg"
                style={{ fontSize: '16px' }}
              />
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
              E-mailadres
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="jan@voorbeeld.be"
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-gold transition-colors rounded-lg"
                style={{ fontSize: '16px' }}
              />
            </div>
          </div>

          {/* Budget */}
          <div className="relative">
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
              Investeringsbudget
            </label>
            <div className="relative">
              <Euro className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <select
                name="budgetRange"
                value={formData.budgetRange}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-colors rounded-lg appearance-none cursor-pointer"
              >
                <option value="<200k" className="bg-charcoal">Minder dan €200.000</option>
                <option value="200k-350k" className="bg-charcoal">€200.000 - €350.000</option>
                <option value="350k-500k" className="bg-charcoal">€350.000 - €500.000</option>
                <option value="500k+" className="bg-charcoal">Meer dan €500.000</option>
              </select>
            </div>
          </div>

          {/* Region */}
          <div className="relative">
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
              Interesse Regio
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <select
                name="focusRegion"
                value={formData.focusRegion}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-colors rounded-lg appearance-none cursor-pointer"
              >
                <option value="West-Vlaanderen" className="bg-charcoal">West-Vlaanderen (Kust)</option>
                <option value="Oost-Vlaanderen" className="bg-charcoal">Oost-Vlaanderen (Gent e.o.)</option>
                <option value="Antwerpen" className="bg-charcoal">Provincie Antwerpen</option>
                <option value="Vlaams-Brabant" className="bg-charcoal">Vlaams-Brabant</option>
                <option value="Limburg" className="bg-charcoal">Limburg</option>
                <option value="Brussel" className="bg-charcoal">Brussel Hoofdstedelijk Gewest</option>
              </select>
            </div>
          </div>

          {/* Experience */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-4">
              Ervaring met Vastgoed
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'beginner', label: 'Starter', sublabel: '0 panden' },
                { value: 'intermediate', label: 'Ervaren', sublabel: '1-3 panden' },
                { value: 'expert', label: 'Pro', sublabel: '4+ panden' }
              ].map(({ value, label, sublabel }) => (
                <label
                  key={value}
                  className={`relative flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all ${
                    formData.experience === value
                      ? 'bg-gold/20 border-2 border-gold'
                      : 'bg-white/5 border border-white/10 hover:border-white/30'
                  }`}
                >
                  <input
                    type="radio"
                    name="experience"
                    value={value}
                    checked={formData.experience === value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className={`text-sm font-medium ${formData.experience === value ? 'text-gold' : 'text-white'}`}>
                    {label}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">{sublabel}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                <ArrowLeft size={18} />
                Terug
              </button>
            )}
            <button
              type="submit"
              className="flex-1 group flex items-center justify-center gap-3 px-8 py-4 bg-gold text-charcoal font-semibold rounded-lg hover:bg-amber-400 transition-all"
            >
              <span>Genereer Mijn Gids</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <p className="text-xs text-gray-600 text-center">
            Uw gegevens worden veilig verwerkt. Geen spam.
          </p>
        </form>
      </div>
    </div>
  );
};

export default GuideForm;

