import React from 'react';
import { 
  Sprout, 
  Building2,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { Button } from '../ui/Button';
import { WavySquiggle } from '../ui/SketchAccents';
import { RotatingBadge } from '../ui/RotatingBadge';
import { GrainWave } from '../reactbits/GrainWave';
import { BlurFade } from '../magicui/BlurFade';
import { BackgroundLines } from '../aceternity/BackgroundLines';
import { useLanguage } from '../../context/LanguageContext';

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
  const { t } = useLanguage();

  return (
    <section className="relative w-full overflow-hidden bg-[#F4EFE6] border-b border-[#2F4A3A]/10">
      
      {/* Background Contour Lines */}
      <BackgroundLines className="absolute inset-0 z-0 opacity-35 pointer-events-none" />

      {/* Subtle Grain Wave background */}
      <GrainWave opacity={0.025} />

      {/* Top Editorial Ticker Bar */}
      <div className="relative z-10 border-b border-[#2F4A3A]/10 bg-[#FBF8F2]/80 backdrop-blur-sm py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-mono text-[10px] sm:text-xs text-[#536458] uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C77B58] animate-pulse" />
            <span className="font-semibold text-[#163323]">FARMCHAIN LIVE NETWORK</span>
            <span className="hidden sm:inline text-[#2F4A3A]/20">|</span>
            <span className="hidden sm:inline text-[#2F4A3A] font-medium">184 VILLAGES CONNECTED DIRECTLY TO WHOLESALE KITCHENS</span>
          </div>
          <div className="font-medium text-[#2F4A3A] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A8B89A]" />
            <span>0% BROKER COMMISSION</span>
          </div>
        </div>
      </div>

      {/* Main Asymmetrical Hero Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Eyebrow, Chunky Headline, Core Promise, Dual-Track CTAs */}
          <div className="lg:col-span-7 space-y-7">
            <BlurFade delay={0.1} yOffset={20}>
              
              {/* Eyebrow Label */}
              <div className="flex items-center gap-2">
                <span className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#C77B58]">
                  {t.hero.tagline}
                </span>
              </div>

              {/* Chunky Retro Serif Headline with Wavy Squiggle */}
              <div className="space-y-3 mt-3">
                <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-bold tracking-tight text-[#163323] leading-[0.96]">
                  {t.hero.headlinePart1}<br />
                  <span className="relative inline-block text-[#C77B58] mt-1">
                    {t.hero.headlinePart2}
                    <span className="absolute left-0 -bottom-3 sm:-bottom-4 w-full flex justify-start pointer-events-none">
                      <WavySquiggle color="#C77B58" className="w-44 sm:w-60 h-4 sm:h-5 text-[#C77B58]" />
                    </span>
                  </span>
                </h1>
              </div>

              {/* Core Promise Copy */}
              <p className="font-sans text-base sm:text-lg md:text-xl text-[#2F4A3A]/90 leading-[1.6] max-w-[54ch] pt-3 font-medium">
                {t.hero.corePromise}
              </p>

              {/* Dual-Track Primary CTAs: "I'm a Farmer" & "I'm a Buyer" */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  withArrow
                  onClick={onOpenSellModal || (() => onNavigate('farmer'))}
                  className="shadow-soft-terracotta text-xs tracking-[0.14em]"
                >
                  {t.hero.farmerCta}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  withArrow
                  onClick={onOpenPostDemand || (() => onNavigate('buyer'))}
                  className="text-xs tracking-[0.14em]"
                >
                  {t.hero.buyerCta}
                </Button>
              </div>

              {/* Micro Trust Guarantee Note */}
              <div className="pt-2 flex items-center gap-2 text-xs font-sans text-[#2F4A3A]/70">
                <ShieldCheck className="w-4 h-4 text-[#2F4A3A] shrink-0" />
                <span>{t.hero.freeNotice}</span>
              </div>

            </BlurFade>
          </div>

          {/* Right Column: Organic Blob-Masked Hero Photo with Overlapping 20s Rotating Badge */}
          <div className="lg:col-span-5 relative">
            <BlurFade delay={0.25} yOffset={24}>
              
              {/* Organic Backdrop Curve */}
              <div className="absolute -inset-4 sm:-inset-6 bg-[#A8B89A]/30 mask-organic-blob pointer-events-none -z-10" />

              {/* Image Container with Organic Arch Mask */}
              <div className="relative w-full overflow-hidden mask-organic-hero border border-[#2F4A3A]/15 shadow-soft-lg bg-[#A8B89A]/20 aspect-[4/3] sm:aspect-[16/12]">
                <img
                  src="/hero_indian_agriculture.jpg"
                  alt="Indian farmer in rural field holding fresh harvested crops"
                  className="w-full h-full object-cover object-center image-soft-zoom"
                  loading="eager"
                />

                {/* Documentary Caption Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#163323]/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-end justify-between text-[#FBF8F2] font-mono text-xs pointer-events-none">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-[#E5B94A] font-bold uppercase tracking-widest block">
                      VILLAGE CLUSTER // CHEVELLA
                    </span>
                    <span className="font-editorial text-base sm:text-lg font-bold block text-[#FBF8F2]">
                      Direct farm-gate pickup &amp; bank settlement.
                    </span>
                  </div>
                </div>
              </div>

              {/* Signature 20s Rotating Circular Text Sticker Badge */}
              <div className="absolute -bottom-7 -left-5 sm:-bottom-9 sm:-left-9 z-20">
                <RotatingBadge
                  text="DIRECT FROM FARM • ZERO MIDDLEMEN • 100% DIRECT BANK PAYOUT • "
                  size={128}
                  icon={<Sprout className="w-6 h-6 text-[#2F4A3A]" />}
                />
              </div>

            </BlurFade>
          </div>

        </div>

      </div>

    </section>
  );
};
