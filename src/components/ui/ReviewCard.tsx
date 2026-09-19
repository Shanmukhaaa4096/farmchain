import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Star, CheckCircle2, Quote } from 'lucide-react';

export interface ReviewItem {
  id: string;
  reviewerName: string;
  reviewerRole: 'farmer' | 'buyer';
  targetName: string;
  crop: string;
  rating: number;
  comment: string;
  tags?: string[];
  date: string;
  orderTotalKg: number;
}

export const ReviewCard: React.FC<{ review: ReviewItem }> = ({ review }) => {
  return (
    <Card className="p-5 bg-[#FBF8F2] border border-[#2F4A3A]/10 rounded-2xl shadow-soft-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#C77B58]/10 text-[#C77B58] flex items-center justify-center font-bold font-serif text-xs">
            {review.reviewerName.charAt(0)}
          </div>
          <div>
            <h5 className="font-serif font-bold text-sm text-[#2F4A3A]">
              {review.reviewerName}
            </h5>
            <span className="text-[10px] font-mono text-[#536458] block">
              {review.reviewerRole.toUpperCase()} • {review.date}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-0.5 text-amber-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-amber-200'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs font-mono">
        <Badge variant="neutral">{review.crop}</Badge>
        <span className="text-[#536458]">({review.orderTotalKg.toLocaleString()} KG Traded)</span>
        <span className="text-emerald-700 flex items-center gap-1 font-semibold text-[10px]">
          <CheckCircle2 className="w-3 h-3" /> Verified Trade
        </span>
      </div>

      {review.comment && (
        <p className="text-xs text-[#2F4A3A] italic leading-relaxed">
          "{review.comment}"
        </p>
      )}

      {review.tags && review.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {review.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-white border border-[#2F4A3A]/10 text-[10px] font-medium text-[#536458]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Card>
  );
};
