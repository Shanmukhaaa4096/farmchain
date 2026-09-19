import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Star, CheckCircle2, ThumbsUp } from 'lucide-react';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  counterpartName: string;
  crop: string;
  onSubmit: (data: { orderId: string; rating: number; comment: string; tags: string[] }) => void;
}

const QUICK_TAGS = [
  'Prompt Village Pickup',
  '100% Agreed Rate Paid',
  'Exact Grade A Quality',
  'Clean Crates',
  'Zero Broker Hassle',
  'Fair Digital Weighing'
];

export const RatingModal: React.FC<RatingModalProps> = ({
  isOpen,
  onClose,
  orderId,
  counterpartName,
  crop,
  onSubmit,
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['100% Agreed Rate Paid', 'Exact Grade A Quality']);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      orderId,
      rating,
      comment: comment.trim(),
      tags: selectedTags,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Rate Direct Trade Experience"
      subtitle={`Order #${orderId} • ${crop} with ${counterpartName}`}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-5 text-[#2F4A3A]">
        {/* Star Selection */}
        <div className="text-center py-2">
          <label className="block text-xs font-mono uppercase font-bold text-[#536458] mb-3">
            Overall Trade Rating (1 to 5 Stars)
          </label>
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className="p-1 text-amber-400 transition-transform hover:scale-125 focus:outline-none"
                aria-label={`Rate ${star} stars`}
              >
                <Star
                  className={`w-8 h-8 ${
                    (hoverRating || rating) >= star
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-amber-200'
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="text-xs font-mono text-[#536458] mt-2 block">
            {rating === 5 ? 'Exceptional Direct Trade Partner' : rating === 4 ? 'Very Good Trade' : rating === 3 ? 'Satisfactory' : 'Needs Improvement'}
          </span>
        </div>

        {/* Quick Tag Pills */}
        <div>
          <label className="block text-[11px] font-mono uppercase font-bold text-[#536458] mb-2">
            Select Highlights:
          </label>
          <div className="flex flex-wrap gap-2">
            {QUICK_TAGS.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-[#C77B58] text-white shadow-soft-sm'
                      : 'bg-white border border-[#2F4A3A]/15 text-[#536458] hover:border-[#C77B58]'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Written Review */}
        <div>
          <label className="block text-[11px] font-mono uppercase font-bold text-[#536458] mb-1.5">
            Public Peer Feedback (Optional)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder="Share details about produce grade, timely dock pickup, and payment release..."
            className="w-full px-4 py-3 rounded-2xl bg-white border border-[#2F4A3A]/15 text-[#2F4A3A] text-sm focus:outline-none focus:border-[#C77B58]"
          />
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-[#2F4A3A]/10">
          <Button variant="ghost" size="md" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" size="md" type="submit">
            <CheckCircle2 className="w-4 h-4 mr-1.5" />
            Submit Verified Review
          </Button>
        </div>
      </form>
    </Modal>
  );
};
