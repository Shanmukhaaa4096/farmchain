import React from 'react';
import { AlertCircle, ArrowLeft, Home, Sprout } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface NotFoundPageProps {
  onNavigate: (view: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-20 bg-warm-cream min-h-[70vh] flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center space-y-6">
        
        <div className="w-16 h-16 bg-rust-red text-paper-white border-brutal mx-auto flex items-center justify-center shadow-brutal">
          <AlertCircle className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-bold uppercase text-rust-red bg-red-100 border border-rust-red px-2.5 py-0.5">
            ERROR 404 : PLOT NOT FOUND
          </span>
          <h1 className="font-heading font-black text-4xl uppercase tracking-tight text-ink-black">
            UNREACHABLE HARVEST COORDINATE
          </h1>
          <p className="font-body text-sm text-gray-700 leading-relaxed font-medium">
            The agricultural route or page you requested does not exist or has moved to an updated telemetry node.
          </p>
        </div>

        <div className="pt-2 flex justify-center gap-3">
          <Button variant="primary" size="md" onClick={() => onNavigate('landing')} className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            <span>RETURN TO HOME</span>
          </Button>

          <Button variant="yellow" size="md" onClick={() => onNavigate('marketplace')}>
            <span>EXPLORE DEMAND BOARD</span>
          </Button>
        </div>

      </div>
    </div>
  );
};
