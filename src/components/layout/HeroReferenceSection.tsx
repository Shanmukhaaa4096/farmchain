import React from 'react';
import { 
  ArrowRight, 
  Sprout, 
  ShieldCheck,
  MapPin,
  Sparkles
} from 'lucide-react';
import { Button } from '../ui/Button';
import { WavySquiggle, CircularRotatingBadge } from '../ui/SketchAccents';
import { GrainWave } from '../reactbits/GrainWave';
import { BlurFade } from '../magicui/BlurFade';
import { BackgroundLines } from '../aceternity/BackgroundLines';

interface HeroReferenceSectionProps {
  onNavigate: (view: string) => void;
  onOpenSellModal?: () => void;
  onOpenPostDemand: () => void;
}

export const HeroReferenceSection: React.FC<HeroReferenceSectionProps> = ({
  onNavigate,
  onOpenSellModal,
  onOpenPostDemand
}) => {
  return (
    <section className="relative w-full overflow-hidden bg-paper-bg border-b border-dark-text/10">
      
      {/* Background Contour Lines from Aceternity */}
      <BackgroundLines className="absolute inset-0 z-0 opacity-40 pointer-events-none" />

      {/* Subtle Grain Wave background */}
      <GrainWave opacity={0.03} />

      {/* Top Editorial Ticker Bar */}
      <div className="relative z-10 border-b border-dark-text/10 bg-pure-white/80 backdrop-blur-sm py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-mono text-[10px] sm:text-xs text-mandi-charcoal-muted uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
            <span className="font-semibold text-dark-text">FARMCHAIN APMC LEDGER</span>
            <span className="hidden sm:inline text-dark-text/20">|</span>
            <span className="hidden sm:inline text-primary-green font-medium">TELANGANA &amp; MAHARASHTRA AGRI-CORRIDORS</span>
          </div>
          <div className="font-medium text-primary-green flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-green" />
            <span>DEMAND ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Main Asymmetrical Hero Layout (Wash House Inspired) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-18 lg:pt-20 pb-16 sm:pb-24 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Eyebrow, Chunky Headline, Wavy Squiggle, Comfortable Copy, Pill CTA */}
          <div className="lg:col-span-6 space-y-7 sm:space-y-8">
            <BlurFade delay={0.1} yOffset={20}>
              {/* Eyebrow Label */}
              <div className="flex items-center gap-2">
                <span className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-terracotta">
                  NATURAL AGRICULTURE
                </span>
              </div>

              {/* Chunky Retro Serif Headline with Wavy Squiggle */}
              <div className="space-y-3 mt-3">
                <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-[4.75rem] font-bold tracking-tight text-dark-text leading-[0.98]">
                  From farm<br />
                  to market.<br />
                  <span className="relative inline-block text-terracotta mt-1">
                    Directly.
                    <span className="absolute left-0 -bottom-3 sm:-bottom-4 w-full flex justify-start pointer-events-none">
                      <WavySquiggle color="#C96B45" className="w-36 sm:w-48 h-4 sm:h-5 text-terracotta" />
                    </span>
                  </span>
                </h1>
              </div>

              {/* Comfortable Body Copy (max-w-[55ch]) */}
              <p className="font-sans text-base sm:text-lg text-dark-text/75 leading-[1.65] max-w-[50ch] pt-4">
                Thoughtful harvests. Direct procurement. FarmChain connects farmers with real market demand, helping produce move directly toward the buyers who need it — with zero broker cuts.
              </p>

              {/* Actions: Solid Pill CTA + Underline Text Link */}
              <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Button
                  variant="clay"
                  size="lg"
                  onClick={() => {
                    const ideaEl = document.getElementById('big-idea') || document.getElementById('problem');
                    if (ideaEl) {
                      ideaEl.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      onNavigate('marketplace');
                    }
                  }}
                  className="shadow-soft-terracotta text-xs tracking-[0.14em] px-8 py-3.5"
                >
                  <span>EXPLORE FARMCHAIN</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 stroke-[2.2]" />
                </Button>

                <button
                  onClick={() => {
                    const journeyEl = document.getElementById('farm-to-market-journey') || document.getElementById('journey');
                    if (journeyEl) {
                      journeyEl.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      onNavigate('about');
                    }
                  }}
                  className="font-sans text-xs uppercase tracking-[0.16em] font-bold text-dark-text/85 hover:text-primary-green inline-flex items-center gap-1.5 border-b border-dark-text/30 pb-0.5 hover:border-dark-text transition-all group cursor-pointer"
                >
                  <span>HOW IT WORKS</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </BlurFade>
          </div>

          {/* Right Column: Organic Arch/Blob Masked Hero Photo + Overlapping Rotating Badge */}
          <div className="lg:col-span-6 relative">
            <BlurFade delay={0.25} yOffset={24}>
              {/* Warm Organic Backdrop Curve */}
              <div className="absolute -inset-4 sm:-inset-6 bg-[#E8DFCF]/60 mask-organic-blob pointer-events-none -z-10" />

              {/* Image Container with Organic Arch Mask */}
              <div className="relative w-full overflow-hidden mask-organic-hero border border-dark-text/15 shadow-soft-lg bg-soft-green/20 aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="/hero_indian_agriculture.jpg"
                  alt="Indian farmer standing in fresh crop field in warm daylight"
                  className="w-full h-full object-cover object-center image-soft-zoom"
                  loading="eager"
                />

                {/* Documentary Caption Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-text/75 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-end justify-between text-pure-white font-mono text-xs pointer-events-none">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-accent-yellow font-bold uppercase tracking-widest block">
                      CHEVELLA AGRI-CLUSTER // TELANGANA
                    </span>
                    <span className="font-editorial text-base sm:text-xl font-bold block text-pure-white">
                      Fresh harvests committed before picking.
                    </span>
                  </div>
                </div>
              </div>

              {/* Signature Rotating Circular Text Sticker Badge */}
              <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-8 z-20">
                <CircularRotatingBadge
                  text="FROM FARM TO MARKET • DIRECT TRADE • "
                  size={116}
                  bg="bg-accent-yellow"
                  textColor="#17231A"
                  icon={<Sprout className="w-6 h-6 text-primary-green stroke-[2.4]" />}
                />
              </div>
            </BlurFade>
          </div>

        </div>

      </div>

    </section>
  );
};

