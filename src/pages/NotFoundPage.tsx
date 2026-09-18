import React from 'react';
import { AlertCircle, ArrowLeft, Home, Sprout } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface NotFoundPageProps {
  onNavigate: (view: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-20 sm:py-28 bg-paper-bg min-h-[75vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-pure-white rounded-3xl border border-dark-text/10 p-8 sm:p-10 shadow-soft text-center space-y-6">
        
        <div className="w-16 h-16 rounded-2xl bg-terracotta/15 text-terracotta border border-terracotta/30 mx-auto flex items-center justify-center shadow-soft-sm">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-semibold uppercase text-terracotta bg-terracotta/10 border border-terracotta/20 px-3 py-1 rounded-full inline-block">
            ERROR 404 : PLOT NOT FOUND
          </span>
          <h1 className="font-serif font-medium text-3xl sm:text-4xl tracking-tight text-dark-text pt-1">
            Unreachable Harvest Coordinate
          </h1>
          <p className="font-sans text-sm text-dark-text/70 leading-relaxed">
            The agricultural route or page you requested does not exist or has moved to an updated telemetry node.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
          <Button variant="primary" size="md" onClick={() => onNavigate('landing')} className="flex items-center justify-center gap-2">
            <Home className="w-4 h-4" />
            <span>RETURN TO HOME</span>
          </Button>

          <Button variant="outline" size="md" onClick={() => onNavigate('marketplace')}>
            <span>EXPLORE MARKETPLACE</span>
          </Button>
        </div>

      </div>
    </div>
  );
};
