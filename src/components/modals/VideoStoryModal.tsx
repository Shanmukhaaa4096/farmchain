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
      title="CHEVELLA FARMERS PRODUCER CO-OP"
      subtitle="DOCUMENTARY // DIRECT AGRI-DEMAND CASE STUDY"
      maxWidth="2xl"
    >
      <div className="space-y-6 font-mono text-xs">
        
        {/* Simulated Video Player Box */}
        <div className="relative aspect-video w-full border-brutal-thick bg-black overflow-hidden shadow-brutal">
          <img
            src="/farmer_video_thumb.jpg"
            alt="Farmer Ramesh Reddy story video thumbnail"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-between p-6">
            <div className="flex justify-between items-center">
              <Badge variant="yellow" size="sm">FARMCHAIN GROUND STORIES</Badge>
              <span className="bg-ink-black text-white px-2 py-0.5 text-[10px] font-bold">02:40</span>
            </div>

            <div className="flex items-center justify-center">
              <div className="w-16 h-16 rounded-none bg-harvest-yellow text-ink-black border-brutal flex items-center justify-center shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer">
                <Play className="w-8 h-8 fill-ink-black ml-0.5" />
              </div>
            </div>

            <div className="text-paper-white space-y-0.5">
              <strong className="font-heading font-black text-lg uppercase text-harvest-yellow block">
                "We Bypassed 5 Brokers in Ranga Reddy"
              </strong>
              <p className="text-xs text-gray-300">
                Ramesh Reddy (Kisan TS-RR-902184) explains how 14 village farmers pooled 12 tons of tomatoes.
              </p>
            </div>
          </div>
        </div>

        {/* Co-op Impact Numbers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-warm-cream border-2 border-ink-black text-center">
            <span className="text-[10px] text-gray-600 block">NET INCOME REALIZED</span>
            <strong className="font-heading font-black text-2xl text-farm-green">+28.4%</strong>
            <span className="text-[9px] text-gray-500">Over Mandi auction rates</span>
          </div>

          <div className="p-3 bg-warm-cream border-2 border-ink-black text-center">
            <span className="text-[10px] text-gray-600 block">TRANSIT LOSS REDUCTION</span>
            <strong className="font-heading font-black text-2xl text-ink-black">-34%</strong>
            <span className="text-[9px] text-gray-500">12h farm-to-dock transit</span>
          </div>

          <div className="p-3 bg-warm-cream border-2 border-ink-black text-center">
            <span className="text-[10px] text-gray-600 block">PAYMENT SETTLEMENT</span>
            <strong className="font-heading font-black text-2xl text-farm-green">24 HOURS</strong>
            <span className="text-[9px] text-gray-500">Direct escrow bank credit</span>
          </div>
        </div>

        {/* Modal Close CTA */}
        <div className="pt-2 border-t border-ink-black flex justify-end">
          <Button variant="primary" size="sm" onClick={onClose}>
            CLOSE STORY WINDOW
          </Button>
        </div>

      </div>
    </Modal>
  );
};
