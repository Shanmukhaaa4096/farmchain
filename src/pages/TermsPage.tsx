import React from 'react';
import { FileText, CheckCircle2, AlertTriangle, ArrowLeft, Mail, Phone } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface TermsPageProps {
  onNavigate: (view: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 bg-warm-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <Button variant="white" size="sm" onClick={() => onNavigate('landing')} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO HOME</span>
        </Button>

        <div className="bg-paper-white border-brutal-thick p-6 sm:p-10 shadow-brutal-lg space-y-8">
          
          <div className="border-b-2 border-ink-black pb-6 space-y-2">
            <span className="bg-harvest-yellow text-ink-black font-mono text-xs font-bold px-3 py-1 border-2 border-ink-black shadow-brutal-sm uppercase inline-flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> PLATFORM CONTRACT TERMS
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-black">
              TERMS AND CONDITIONS
            </h1>
            <p className="font-mono text-xs text-gray-600">
              EFFECTIVE DATE: 15 SEPTEMBER 2026 : B2B AGRI-TECH STANDARD
            </p>
          </div>

          <div className="space-y-6 font-body text-sm text-gray-800 leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-heading font-black text-xl uppercase text-ink-black">
                1. THE DIRECT AGRI-DEMAND MODEL
              </h2>
              <p>
                FarmChain operates as a direct software coordination and logistics infrastructure platform. 
                <strong> FarmChain is not a middleman, merchant, or reseller.</strong> 
                FarmChain does not take custody, title, or ownership of any farm produce. 
                Contracts are formed directly between verified commercial buyers and participating farmers or registered Farmer Producer Organizations (FPOs).
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading font-black text-xl uppercase text-ink-black">
                2. ASSISTED ONBOARDING AND PUSH DEMAND ACCEPTANCE
              </h2>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Assisted Onboarding:</strong> Farmers registered by certified FPO field coordinators agree to keep their harvest availability, crop variety, and bank settlement details accurate.
                </li>
                <li>
                  <strong>Push Demand Notification:</strong> When a commercial buyer logs a verified demand requirement, FarmChain dispatches a direct contract alert to nearby qualified farmers.
                </li>
                <li>
                  <strong>Acceptance or Rejection:</strong> Farmers retain 100% voluntary autonomy to accept or reject any requirement. Tapping "Accept" locks the allocated harvest quantity and commits the farmer to the agreed collection schedule.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading font-black text-xl uppercase text-ink-black">
                3. QUALITY GRADING AND DIGITAL WEIGHBRIDGE
              </h2>
              <p>
                To eliminate traditional mandi deductions and disputes, all dispatches must conform to agreed specifications (Grade A, Grade B) and are weighed using calibrated digital scales at the village collection point. Geotagged photographic records and digital weight slips are generated at dispatch.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading font-black text-xl uppercase text-ink-black">
                4. ESCROW AND DIRECT BANK SETTLEMENT
              </h2>
              <p>
                Buyers are required to maintain verified escrow or credit balances prior to posting purchase orders. Upon successful quality check and delivery confirmation at the buyer depot, 100% of the agreed farm-gate price transfers directly to the farmer's bank account or UPI VPA within 24 hours. Zero brokerage fees are subtracted from the farmer payout.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading font-black text-xl uppercase text-ink-black">
                5. DISPUTE RESOLUTION AND CONTACT
              </h2>
              <p>
                In the event of weather-related harvest shortfall, logistics transit disruption, or specification disagreement, the dispute is mediated by the local FPO coordinator and FarmChain operations team under the Indian Arbitration and Conciliation Act.
              </p>
              <div className="p-4 bg-warm-cream border border-ink-black font-mono text-xs space-y-1">
                <p>Email: <a href="mailto:support@farmchain.in" className="text-farm-green font-bold hover:underline">support@farmchain.in</a></p>
                <p>Phone: <a href="tel:+918001234567" className="text-farm-green font-bold hover:underline">+91 800 123 4567</a></p>
              </div>
            </section>
          </div>

        </div>

      </div>
    </div>
  );
};
