import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft, Mail, Phone } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface PrivacyPolicyPageProps {
  onNavigate: (view: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-10 sm:py-16 bg-paper-bg min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <Button variant="white" size="sm" onClick={() => onNavigate('landing')} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO HOME</span>
        </Button>

        <div className="bg-pure-white rounded-3xl border border-dark-text/10 p-8 sm:p-14 shadow-soft space-y-10">
          
          <div className="border-b border-dark-text/10 pb-8 space-y-3">
            <span className="bg-farm-green text-pure-white font-mono text-xs font-bold px-3 py-1 rounded-full uppercase inline-flex items-center gap-1.5 shadow-soft-sm">
              <ShieldCheck className="w-3.5 h-3.5" /> LEGAL AND COMPLIANCE
            </span>
            <h1 className="font-serif font-medium text-3xl sm:text-5xl tracking-tight text-dark-text">
              Privacy Policy
            </h1>
            <p className="font-mono text-xs text-dark-text/60">
              LAST REVISED: 15 SEPTEMBER 2026 : APMC AND AGRISTACK COMPLIANT
            </p>
          </div>

          <div className="space-y-8 font-sans text-sm sm:text-base text-dark-text/80 leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-serif font-bold text-xl text-dark-text">
                1. Scope and Core Philosophy
              </h2>
              <p>
                FarmChain ("we", "our", or "the Platform") operates a demand-driven agricultural matching and logistics coordination network. 
                FarmChain does not purchase, resell, or take title to agricultural commodities. 
                This Privacy Policy describes how we collect, process, and protect the personal and operational data of farmers, Farmer Producer Organizations (FPOs), commercial buyers, and transport fleet operators.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif font-bold text-xl text-dark-text">
                2. Information We Collect
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-dark-text">Farmer Profiles (Assisted Onboarding):</strong> Kisan Identification Number, farmer name, village, mandal, district, state, PIN code, field plot geospatial coordinates, acreage, primary crop varieties, and bank account / UPI VPA for direct escrow payouts.
                </li>
                <li>
                  <strong className="text-dark-text">Commercial Buyers:</strong> Legal business name, GSTIN, FSSAI license number, commercial kitchen/depot delivery address, authorized representative contact, and escrow credit allocations.
                </li>
                <li>
                  <strong className="text-dark-text">Logistics & Telemetry:</strong> Vehicle registration numbers, calibrated digital weighbridge slips, GPS waypoint coordinates during active harvest transport, and temperature readings.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif font-bold text-xl text-dark-text">
                3. How We Use Your Data
              </h2>
              <p>
                Your data is exclusively utilized to:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Execute proximity matching between nearby farm clusters and verified purchase orders using PostGIS algorithms.</li>
                <li>Push direct purchase order notifications to farmers via SMS, WhatsApp, and the FarmChain interface.</li>
                <li>Coordinate optimized circular transport routes for shared reefer vehicles.</li>
                <li>Transmit transparent settlement receipts directly to buyer and farmer banking channels.</li>
              </ul>
              <p className="font-bold text-farm-green pt-1">
                We never sell, monetize, or broker your agricultural or financial data to third-party advertisers or predatory traders.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif font-bold text-xl text-dark-text">
                4. Data Security and Encryption
              </h2>
              <p>
                All sensitive records are safeguarded using enterprise-grade controls:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Passwords and authentication credentials are hashed using <strong>Argon2id</strong>.</li>
                <li>Bank account numbers and Kisan IDs are stored encrypted at rest using <strong>AES-256-GCM</strong> with hardware security module (KMS) key rotation.</li>
                <li>Multi-tenant isolation is enforced at the PostgreSQL engine level via Row-Level Security (RLS) policies.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif font-bold text-xl text-dark-text">
                5. Contact Our Grievance Officer
              </h2>
              <p>
                For questions, data deletion requests, or assisted onboarding inquiries, contact our dedicated compliance desk:
              </p>
              <div className="p-5 bg-paper-bg rounded-2xl border border-dark-text/10 font-mono text-xs space-y-1.5">
                <p><strong className="text-dark-text">FarmChain Grievance Redressal Officer</strong></p>
                <p>Email: <a href="mailto:support@farmchain.in" className="text-farm-green font-bold hover:underline">support@farmchain.in</a></p>
                <p>Phone: <a href="tel:+918001234567" className="text-farm-green font-bold hover:underline">+91 800 123 4567</a></p>
                <p className="text-dark-text/70">Registered Hub: Financial District, Gachibowli, Hyderabad, Telangana 500032</p>
              </div>
            </section>
          </div>

        </div>

      </div>
    </div>
  );
};
