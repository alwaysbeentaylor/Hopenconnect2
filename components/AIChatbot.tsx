import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, ArrowRight, User, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";
import { trackEmailSubmission, startChatConversation, addChatMessage } from '../services/analyticsService';

// Gemini API
const GEMINI_API_KEY = 'AIzaSyAg7xc1-4HamoIZ2srX9Ka9Y5rQGPd5pcM';
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// WhatsApp number
const WHATSAPP_NUMBER = '31645998932';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface UserInfo {
  name: string;
  email: string;
  conversationId: string;
}

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check if user info is stored
  useEffect(() => {
    const stored = sessionStorage.getItem('chatUserInfo');
    if (stored) {
      const info = JSON.parse(stored);
      setUserInfo(info);
      // Restore messages if any
      const storedMessages = sessionStorage.getItem('chatMessages');
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
    }
  }, []);

  // Save messages to session
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  const handleStartChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim() && emailInput.trim()) {
      // Start conversation in analytics
      const conversationId = startChatConversation(nameInput, emailInput);
      
      const info = { name: nameInput, email: emailInput, conversationId };
      setUserInfo(info);
      sessionStorage.setItem('chatUserInfo', JSON.stringify(info));
      
      // Track the chat start
      trackEmailSubmission(emailInput, 'ai_guide', { name: nameInput });
      
      // Add welcome message
      const welcomeMsg = `Hallo ${nameInput}! 👋 Waarmee kan ik u helpen?`;
      setMessages([{
        id: '1',
        role: 'assistant',
        content: welcomeMsg,
        timestamp: new Date()
      }]);
      
      // Save welcome message to analytics
      addChatMessage(conversationId, 'assistant', welcomeMsg);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !userInfo) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Save user message to analytics
    addChatMessage(userInfo.conversationId, 'user', inputMessage);
    
    const currentInput = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: `Je bent een AI-assistent van Hope Connects, vastgoedexperts in West-Vlaanderen.

BELANGRIJKE REGELS:
- Antwoord KORT en KRACHTIG (max 2-3 zinnen)
- Wees direct, geen omhaal
- Gebruik geen opsommingen tenzij echt nodig

OVER HOPE CONNECTS:
- Exclusief vastgoedbedrijf in West-Vlaanderen
- Diensten: renovatiecoördinatie, verkoopbemiddeling, investeringsadvies
- Focus: Knokke, Brugge, kust, West-Vlaanderen
- Contact: info@hope-connects.com of WhatsApp +31 6 45 99 89 32

Voor diepgaande analyse → verwijs naar onze AI Vastgoedgids
Voor direct contact → verwijs naar WhatsApp

Gebruiker: ${userInfo.name}
Vraag: ${currentInput}`,
      });

      const assistantContent = response.text || 'Sorry, probeer het opnieuw.';
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: assistantContent,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Save assistant message to analytics
      addChatMessage(userInfo.conversationId, 'assistant', assistantContent);
      
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg = 'Er ging iets mis. Probeer opnieuw of WhatsApp ons.';
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: errorMsg,
        timestamp: new Date()
      }]);
      addChatMessage(userInfo.conversationId, 'assistant', errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const openWhatsApp = () => {
    const text = userInfo 
      ? `Hallo, ik ben ${userInfo.name}. Ik heb een vraag over vastgoed.`
      : 'Hallo, ik heb een vraag over vastgoed.';
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <>
      {/* WhatsApp Floating Button - Subtle */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hallo, ik heb een vraag over vastgoed.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 p-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 hover:scale-105"
        title="WhatsApp ons"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366]">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Chat Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 bg-gold text-charcoal rounded-full shadow-2xl hover:bg-amber-400 transition-all duration-300 hover:scale-110 ${isOpen ? 'hidden' : 'flex'} items-center gap-2`}
      >
        <MessageCircle size={24} />
        <span className="hidden sm:inline text-sm font-semibold">AI Chat</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[550px] max-h-[calc(100vh-100px)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="bg-charcoal text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                <Sparkles size={20} className="text-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Hope Connects AI</h3>
                <p className="text-xs text-gray-400">Vastgoed Assistent</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          {!userInfo ? (
            // Registration Form
            <div className="flex-1 p-6 flex flex-col justify-center">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                  <MessageCircle size={28} className="text-gold" />
                </div>
                <h4 className="text-lg font-semibold text-charcoal mb-2">Start een gesprek</h4>
                <p className="text-sm text-gray-500">
                  Vul uw gegevens in om te chatten
                </p>
              </div>

              <form onSubmit={handleStartChat} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Uw naam"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-charcoal placeholder-gray-400 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Uw e-mail"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-charcoal placeholder-gray-400 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-gold text-charcoal font-semibold rounded-lg hover:bg-amber-400 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Start Chat</span>
                  <ArrowRight size={18} />
                </button>
              </form>

              {/* Or WhatsApp */}
              <div className="mt-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-white text-gray-400">of</span>
                  </div>
                </div>
                <button
                  onClick={openWhatsApp}
                  className="mt-4 w-full py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2"
                >
                  <Phone size={18} />
                  <span>WhatsApp ons direct</span>
                </button>
              </div>
            </div>
          ) : (
            // Chat Interface
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-gold text-charcoal rounded-br-md'
                          : 'bg-white text-charcoal shadow-sm border border-gray-100 rounded-bl-md'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white p-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-100">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              <div className="px-3 py-2 bg-white border-t border-gray-100 flex gap-2">
                <Link
                  to="/gids"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 flex items-center justify-center gap-1 p-2 bg-charcoal/5 rounded-lg hover:bg-charcoal/10 transition-colors text-xs text-charcoal"
                >
                  <Sparkles size={14} className="text-gold" />
                  <span>AI Gids</span>
                </Link>
                <button
                  onClick={openWhatsApp}
                  className="flex-1 flex items-center justify-center gap-1 p-2 bg-[#25D366]/10 rounded-lg hover:bg-[#25D366]/20 transition-colors text-xs text-[#25D366]"
                >
                  <Phone size={14} />
                  <span>WhatsApp</span>
                </button>
              </div>

              {/* Input */}
              <div className="p-3 bg-white border-t border-gray-100">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Typ uw vraag..."
                    disabled={isLoading}
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-charcoal placeholder-gray-400 focus:outline-none focus:border-gold transition-colors disabled:opacity-50 text-sm"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={isLoading || !inputMessage.trim()}
                    className="px-4 py-3 bg-gold text-charcoal rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <style>{`
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default AIChatbot;
