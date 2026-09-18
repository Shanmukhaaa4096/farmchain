import React from 'react';
import { Sprout, ShoppingBag, Truck, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  type?: 'demand' | 'orders' | 'inventory' | 'logistics' | 'generic';
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'demand',
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  const getDefaultContent = () => {
    switch (type) {
      case 'demand':
        return {
          icon: Sprout,
          title: title || 'NO DEMAND YET',
          desc: description || 'New buyer procurement contracts are pooled every morning. Post your harvest availability early to be matched first.',
          action: actionLabel || 'List Produce Availability',
        };
      case 'orders':
        return {
          icon: ShoppingBag,
          title: title || 'NO ACTIVE CONTRACTS',
          desc: description || 'You currently have no running orders in dispatch. Browse verified demand lots in the marketplace to lock in orders.',
          action: actionLabel || 'Browse Marketplace',
        };
      case 'logistics':
        return {
          icon: Truck,
          title: title || 'NO SHIPMENTS IN TRANSIT',
          desc: description || 'All agricultural batches have been safely delivered to fulfillment centers. Fresh route dispatches open at dawn.',
          action: actionLabel || 'View Route Network',
        };
      default:
        return {
          icon: RefreshCw,
          title: title || 'NO RECORDS FOUND',
          desc: description || 'No matching items match your current filter parameters. Try broadening your search or resetting filters.',
          action: actionLabel || 'Reset Filters',
        };
    }
  };

  const config = getDefaultContent();
  const Icon = config.icon;

  return (
    <div className={`relative flex flex-col items-center justify-center rounded-3xl border border-dashed border-dark-text/20 bg-paper-bg/40 p-8 sm:p-12 text-center ${className}`}>
      {/* Decorative organic background halo */}
      <div className="absolute h-32 w-32 rounded-full bg-sage/15 blur-2xl pointer-events-none" />

      <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-dark-text/10 bg-pure-white text-farm-green shadow-soft-sm">
        <Icon className="h-8 w-8 stroke-[1.5]" />
      </div>

      <h3 className="relative font-serif text-xl font-bold tracking-tight text-dark-text sm:text-2xl">
        {config.title}
      </h3>

      <p className="relative mt-2 max-w-md text-sm leading-relaxed text-dark-text/70">
        {config.desc}
      </p>

      {onAction && (
        <div className="relative mt-6">
          <Button variant="primary" onClick={onAction}>
            {config.action}
          </Button>
        </div>
      )}
    </div>
  );
};
