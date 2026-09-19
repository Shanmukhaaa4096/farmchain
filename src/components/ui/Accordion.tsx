import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AccordionItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpenId,
  allowMultiple = false,
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenId ? [defaultOpenId] : []);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn("divide-y divide-[#2F4A3A]/10 border-y border-[#2F4A3A]/10", className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="py-5 sm:py-6 transition-colors">
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="font-editorial text-lg sm:text-xl md:text-2xl font-bold text-[#163323] group-hover:text-[#C77B58] transition-colors">
                {item.question}
              </span>
              <span
                className={cn(
                  "w-8 h-8 rounded-full border border-[#2F4A3A]/20 flex items-center justify-center shrink-0 bg-[#FBF8F2] transition-transform duration-300",
                  isOpen && "rotate-180 bg-[#C77B58] text-[#FBF8F2] border-[#C77B58]"
                )}
              >
                <ChevronDown className="w-4 h-4 text-current" />
              </span>
            </button>

            {isOpen && (
              <div className="pt-4 pr-12 font-sans text-sm sm:text-base text-[#2F4A3A]/80 leading-relaxed animate-in fade-in-50 duration-200">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
