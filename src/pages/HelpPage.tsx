import React, { useState } from 'react';
import { 
  HelpCircle, 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  ChevronDown, 
  ShieldCheck, 
  Sprout, 
  ShoppingBag, 
  Truck, 
  Send
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Accordion } from '../components/ui/Accordion';

interface HelpPageProps {
  onNavigate: (view: string) => void;
  onShowToast: (message: string, type?: 'success' | 'error') => void;
}

const FAQ_ITEMS = [
  {
    id: 'h-faq-1',
    question: 'How do I get the green Verified Tick on my profile?',
    answer: 'Farmers upload their Kisan Passbook or RoR land ownership record under Set Up Account. Our village team checks the survey number within 24 hours and issues the Verified Tick. This builds instant trust with buyers.',
  },
  {
    id: 'h-faq-2',
    question: 'How much does it cost to use FarmChain?',
    answer: 'It is 100% free to register. There is 0% broker fee on transactions. The price agreed between the farmer and buyer is paid in full to the farmer bank account without commission cuts.',
  },
  {
    id: 'h-faq-3',
    question: 'What if a buyer rejects my crop after delivery?',
    answer: 'Quality testing happens at the village gate during pickup. Once weighed and checked by the collection driver, the sale is confirmed. If minor damage occurs during transport, FarmChain transit coverage handles the loss—the farmer is not penalized.',
  },
  {
    id: 'h-faq-4',
    question: 'I cannot read English well. Can I use Hindi or Telugu?',
    answer: 'Yes! Tap the language selector at the top of the screen to switch to Hindi (हिन्दी) or Telugu (తెలుగు). You can also call our toll-free phone number for assistance in your local language.',
  },
  {
    id: 'h-faq-5',
    question: 'When will the money reach my bank account?',
    answer: 'Payment is released directly via IMPS to your linked bank account within 2 hours of digital quality signoff at the collection point.',
  },
];

export const HelpPage: React.FC<HelpPageProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formQuery, setFormQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    onShowToast('Your message has been sent. Our village support team will call you within 2 hours!');
  };

  return (
    <div className="py-10 sm:py-16 bg-[#F4EFE6] min-h-screen text-[#2F4A3A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C77B58] bg-[#FBF8F2] border border-[#2F4A3A]/10 px-3.5 py-1.5 rounded-full">
            WE ARE HERE TO HELP
          </span>
          <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-[#163323] tracking-tight">
            How Can We Assist You Today?
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#536458] leading-relaxed">
            Simple answers and direct phone support for farmers and buyers across all 42 villages.
          </p>
        </div>

        {/* 3 Quick Help Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FBF8F2] p-6 rounded-[28px] border border-[#2F4A3A]/15 shadow-soft space-y-3 text-center">
            <div className="w-12 h-12 rounded-full bg-[#2F4A3A] text-[#FBF8F2] flex items-center justify-center mx-auto">
              <Phone className="w-5 h-5 text-[#A8B89A]" />
            </div>
            <strong className="font-editorial text-lg text-[#163323] block">Toll-Free Phone Helpline</strong>
            <p className="text-xs text-[#536458] font-sans">
              Talk to our team in Hindi, Telugu, or English (7 AM – 8 PM).
            </p>
            <a
              href="tel:18001024096"
              className="font-mono text-sm font-bold text-[#C77B58] hover:underline block pt-1"
            >
              1800-102-4096 (Toll Free)
            </a>
          </div>

          <div className="bg-[#FBF8F2] p-6 rounded-[28px] border border-[#2F4A3A]/15 shadow-soft space-y-3 text-center">
            <div className="w-12 h-12 rounded-full bg-[#2F4A3A] text-[#FBF8F2] flex items-center justify-center mx-auto">
              <MessageCircle className="w-5 h-5 text-[#E5B94A]" />
            </div>
            <strong className="font-editorial text-lg text-[#163323] block">WhatsApp Village Support</strong>
            <p className="text-xs text-[#536458] font-sans">
              Send a voice note or photo of your harvest for quick help.
            </p>
            <span className="font-mono text-sm font-bold text-[#2F4A3A] block pt-1">
              +91 98765 43210
            </span>
          </div>

          <div className="bg-[#FBF8F2] p-6 rounded-[28px] border border-[#2F4A3A]/15 shadow-soft space-y-3 text-center">
            <div className="w-12 h-12 rounded-full bg-[#2F4A3A] text-[#FBF8F2] flex items-center justify-center mx-auto">
              <MapPin className="w-5 h-5 text-[#C77B58]" />
            </div>
            <strong className="font-editorial text-lg text-[#163323] block">Village Hub Coordinators</strong>
            <p className="text-xs text-[#536458] font-sans">
              Field officers stationed at Chevella, Lasalgaon, and Mandya hubs.
            </p>
            <span className="font-sans text-xs text-[#163323] font-bold block pt-1">
              42 Centers Active
            </span>
          </div>
        </div>

        {/* 4 Simple Guides */}
        <div className="bg-[#FBF8F2] p-8 sm:p-10 rounded-[36px] border border-[#2F4A3A]/15 shadow-soft space-y-6">
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#163323]">
            Simple Step-by-Step Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
            <div className="p-4 rounded-2xl bg-[#F4EFE6] border border-[#2F4A3A]/10 space-y-2">
              <Sprout className="w-6 h-6 text-[#2F4A3A]" />
              <strong className="text-sm font-bold text-[#163323] block">How to Sell Crops</strong>
              <p className="text-xs text-[#536458] leading-relaxed">
                Tap "Sell your crop", enter your harvest quantity, variety, and expected date.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F4EFE6] border border-[#2F4A3A]/10 space-y-2">
              <ShieldCheck className="w-6 h-6 text-[#C77B58]" />
              <strong className="text-sm font-bold text-[#163323] block">Get Verified Tick</strong>
              <p className="text-xs text-[#536458] leading-relaxed">
                Go to profile, upload a photo of your Kisan card or land document to get the green tick.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F4EFE6] border border-[#2F4A3A]/10 space-y-2">
              <ShoppingBag className="w-6 h-6 text-[#163323]" />
              <strong className="text-sm font-bold text-[#163323] block">How to Buy for Home</strong>
              <p className="text-xs text-[#536458] leading-relaxed">
                Choose 1 to 25 kg of fresh produce, add to cart, and enter your delivery address.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F4EFE6] border border-[#2F4A3A]/10 space-y-2">
              <Truck className="w-6 h-6 text-[#2F4A3A]" />
              <strong className="text-sm font-bold text-[#163323] block">Village Pickup</strong>
              <p className="text-xs text-[#536458] leading-relaxed">
                Bring produce to your village point on the agreed morning for weighing and pickup.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ & Contact Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* FAQ Column */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#163323]">
              Frequently Asked Questions
            </h2>
            <Accordion
              items={FAQ_ITEMS}
              defaultOpenId="h-faq-1"
            />
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-5">
            <div className="bg-[#FBF8F2] p-6 sm:p-8 rounded-[32px] border border-[#2F4A3A]/15 shadow-soft space-y-4">
              <h3 className="font-editorial text-2xl font-bold text-[#163323]">
                Send Us a Message
              </h3>
              <p className="text-xs text-[#536458] font-sans">
                Leave your number and question below. Our team will call back in your preferred language.
              </p>

              {submitted ? (
                <div className="p-4 bg-[#A8B89A]/20 border border-[#A8B89A]/40 rounded-2xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 mx-auto text-[#2F4A3A]" />
                  <strong className="font-editorial text-lg text-[#163323] block">Message Received!</strong>
                  <p className="text-xs text-[#536458]">
                    We will call you on {formPhone} shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 font-sans text-xs">
                  <div>
                    <label className="font-bold text-[#163323] block mb-1">Your Name:</label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Ramesh Reddy"
                      className="w-full min-h-[44px] px-3.5 py-2 bg-[#F4EFE6] border border-[#2F4A3A]/20 rounded-xl text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#163323] block mb-1">Phone Number (+91):</label>
                    <input
                      type="tel"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full min-h-[44px] px-3.5 py-2 bg-[#F4EFE6] border border-[#2F4A3A]/20 rounded-xl text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#163323] block mb-1">How can we help you?</label>
                    <textarea
                      rows={3}
                      value={formQuery}
                      onChange={(e) => setFormQuery(e.target.value)}
                      placeholder="Ask about crop prices, pickup days, or getting verified..."
                      className="w-full px-3.5 py-2 bg-[#F4EFE6] border border-[#2F4A3A]/20 rounded-xl text-sm"
                      required
                    />
                  </div>

                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    type="submit"
                    className="text-xs uppercase tracking-wider font-semibold min-h-[44px] shadow-soft-terracotta"
                  >
                    <Send className="w-4 h-4 mr-1.5" />
                    <span>Request Callback</span>
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
