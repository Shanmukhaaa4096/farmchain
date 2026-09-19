import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  side?: 'left' | 'right';
  children: React.ReactNode;
}

export const Sheet: React.FC<SheetProps> = ({
  isOpen,
  onClose,
  title,
  side = 'right',
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#163323]/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet panel */}
      <div
        className={cn(
          "relative z-10 w-full max-w-sm bg-[#F4EFE6] border-[#2F4A3A]/15 shadow-soft-lg flex flex-col h-full",
          side === 'right' ? "ml-auto border-l animate-in slide-in-from-right duration-300" : "mr-auto border-r animate-in slide-in-from-left duration-300"
        )}
      >
        <div className="flex items-center justify-between p-5 border-b border-[#2F4A3A]/10 bg-[#FBF8F2]">
          <span className="font-editorial text-lg font-bold text-[#163323]">
            {title || 'Menu'}
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#2F4A3A]/15 flex items-center justify-center text-[#2F4A3A] hover:bg-[#F4EFE6] cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {children}
        </div>
      </div>
    </div>
  );
};
