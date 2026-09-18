import React from 'react';
import { Play, CheckCircle2, ShieldCheck, MapPin, X } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface VideoStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoStoryModal: React.FC<VideoStoryModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="CHEVALLA FARMERS PRODUCER CO-OP"
      subtitle="DOCUMENTARY // DIRECT AGRI-DEMAND CASE STUDY"
      maxWidth="2xl"
    >
      <div className="space-y-6 font-sans text-xs">
        
        {/* Simulated Video Player Box */}
        <div className="relative aspect-video w-full rounded-2xl bg-black overflow-hidden shadow-soft border border-dark-text/10">
          <img
            src="/farmer_video_thumb.jpg"
            alt="Farmer Ramesh Reddy story video thumbnail"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 flex flex-col justify-between p-6">
            <div className="flex justify-between items-center">
              <Badge variant="yellow" size="sm">FARMCHAIN GROUND STORIES</Badge>
              <span className="bg-dark-text/80 backdrop-blur-sm text-pure-white px-2.5 py-1 rounded-full text-[10px] font-mono font-bold">02:40</span>
            </div>

            <div className="flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-harvest-yellow text-dark-text flex items-center justify-center shadow-soft hover:scale-105 transition-transform cursor-pointer">
                <Play className="w-7 h-7 fill-dark-text ml-0.5" />
              </div>
            </div>

            <div className="text-pure-white space-y-1">
              <strong className="font-serif font-bold text-lg sm:text-xl text-harvest-yellow block">
                "We Bypassed 5 Brokers in Ranga Reddy"
              </strong>
              <p className="text-xs text-pure-white/80 font-sans">
                Ramesh Reddy (Kisan TS-RR-902184) explains how 14 village farmers pooled 12 tons of tomatoes.
              </p>
            </div>
          </div>
        </div>

        {/* Co-op Impact Numbers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
          <div className="p-4 bg-paper-bg rounded-2xl border border-dark-text/10 text-center shadow-soft-sm">
            <span className="text-[10px] text-dark-text/60 block font-semibold">NET INCOME REALIZED</span>
            <strong className="font-serif font-bold text-2xl text-farm-green block mt-0.5">+28.4%</strong>
            <span className="text-[10px] text-dark-text/50">Over Mandi auction rates</span>
          </div>

          <div className="p-4 bg-paper-bg rounded-2xl border border-dark-text/10 text-center shadow-soft-sm">
            <span className="text-[10px] text-dark-text/60 block font-semibold">TRANSIT LOSS REDUCTION</span>
            <strong className="font-serif font-bold text-2xl text-dark-text block mt-0.5">-34%</strong>
            <span className="text-[10px] text-dark-text/50">12h farm-to-dock transit</span>
          </div>

          <div className="p-4 bg-paper-bg rounded-2xl border border-dark-text/10 text-center shadow-soft-sm">
            <span className="text-[10px] text-dark-text/60 block font-semibold">PAYMENT SETTLEMENT</span>
            <strong className="font-serif font-bold text-2xl text-farm-green block mt-0.5">24 HOURS</strong>
            <span className="text-[10px] text-dark-text/50">Direct escrow bank credit</span>
          </div>
        </div>

        {/* Modal Close CTA */}
        <div className="pt-3 border-t border-dark-text/10 flex justify-end">
          <Button variant="primary" size="sm" onClick={onClose}>
            CLOSE STORY WINDOW
          </Button>
        </div>

      </div>
    </Modal>
  );
};
