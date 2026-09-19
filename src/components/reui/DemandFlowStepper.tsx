import React, { useState } from 'react';
import { Users, ShoppingBag, Sprout, Truck, Store, ArrowRight } from 'lucide-react';

interface FlowStep {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  icon: React.ElementType;
  accent: string;
}

const FLOW_STEPS: FlowStep[] = [
  {
    id: 'buyers',
    stepNumber: '01',
    title: 'BUYERS',
    subtitle: 'Aggregated verified purchase orders',
    description: 'Procurement teams at retail chains, supermarkets, and food processors publish verified quantity requirements with transparent price bands.',
    metric: '₹2.4 Cr monthly demand',
    icon: Users,
    accent: '#315C3A',
  },
  {
    id: 'demand',
    stepNumber: '02',
    title: 'DEMAND',
    subtitle: 'Forward commitments before sowing',
    description: 'Algorithmic demand pooling locks in procurement contracts 30–60 days ahead of harvest, eliminating distress sales.',
    metric: '100% pre-committed',
    icon: ShoppingBag,
    accent: '#E5B94A',
  },
  {
    id: 'farmers',
    stepNumber: '03',
    title: 'FARMERS',
    subtitle: 'Direct harvest planning with FPOs',
    description: 'Farmers plant guaranteed acreage with guaranteed floor pricing and direct agronomic guidance tailored to verified buyer specs.',
    metric: '4,200+ registered growers',
    icon: Sprout,
    accent: '#315C3A',
  },
  {
    id: 'logistics',
    stepNumber: '04',
    title: 'LOGISTICS',
    subtitle: 'Temperature-controlled farmgate pickup',
    description: 'Multi-stop reefer vans scheduled within 4 hours of morning harvest to preserve field heat reduction and curb spoilage.',
    metric: '< 2.1% transit loss',
    icon: Truck,
    accent: '#C96B45',
  },
  {
    id: 'market',
    stepNumber: '05',
    title: 'MARKET',
    subtitle: 'Safe bank settlement on delivery',
    description: 'Direct dispatch to fulfillment centers with instant safe payment directly into the farmer’s bank account.',
    metric: 'Instant T+0 payment',
    icon: Store,
    accent: '#315C3A',
  },
];

export const DemandFlowStepper: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <div className={`w-full ${className}`}>
      {/* Step Buttons Flow Bar */}
      <div className="relative mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {FLOW_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isActive = activeStep === idx;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className={`group relative flex flex-col items-start rounded-2xl border p-4 text-left transition-all duration-300 ${
                isActive
                  ? 'border-farm-green bg-pure-white shadow-soft-md ring-2 ring-farm-green/10'
                  : 'border-dark-text/10 bg-paper-bg/60 hover:border-farm-green/40 hover:bg-pure-white'
              }`}
            >
              <div className="mb-3 flex w-full items-center justify-between">
                <span className="font-mono text-xs font-semibold tracking-wider text-dark-text/50">
                  {step.stepNumber}
                </span>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${
                    isActive
                      ? 'bg-farm-green text-paper-bg'
                      : 'bg-dark-text/5 text-dark-text/70'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <span className="font-serif text-base font-bold tracking-tight text-dark-text">
                {step.title}
              </span>
              <span className="mt-1 line-clamp-1 text-xs text-dark-text/60">
                {step.subtitle}
              </span>

              {/* Progress Connector Indicator */}
              {idx < FLOW_STEPS.length - 1 && (
                <div className="pointer-events-none absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                  <ArrowRight className="h-3.5 w-3.5 text-dark-text/25" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Step Feature Box */}
      <div className="overflow-hidden rounded-3xl border border-dark-text/15 bg-pure-white p-6 sm:p-8 shadow-soft-sm">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-dark-text/10 bg-paper-bg px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-farm-green">
              <span>Phase {FLOW_STEPS[activeStep].stepNumber}</span>
              <span className="h-1 w-1 rounded-full bg-farm-green"></span>
              <span>{FLOW_STEPS[activeStep].metric}</span>
            </div>
            <h3 className="mt-4 font-serif text-2xl font-bold tracking-tight text-dark-text sm:text-3xl">
              {FLOW_STEPS[activeStep].title}: {FLOW_STEPS[activeStep].subtitle}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-dark-text/80">
              {FLOW_STEPS[activeStep].description}
            </p>
          </div>

          <div className="flex flex-col justify-center rounded-2xl border border-dark-text/10 bg-paper-bg/70 p-6 lg:col-span-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-farm-green text-paper-bg">
                {React.createElement(FLOW_STEPS[activeStep].icon, { className: 'h-5 w-5' })}
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-dark-text/50">Market Direct Metric</p>
                <p className="font-serif text-lg font-bold text-farm-green">{FLOW_STEPS[activeStep].metric}</p>
              </div>
            </div>
            <div className="mt-4 border-t border-dark-text/10 pt-4 text-xs leading-relaxed text-dark-text/70">
              Contract guarantee governed by FarmChain smart routing. Fully compliant with direct farm trade norms.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
