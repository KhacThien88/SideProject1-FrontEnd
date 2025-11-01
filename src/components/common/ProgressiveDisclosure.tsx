import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ProgressiveDisclosureProps {
  title: string;
  preview: string;
  fullContent: React.ReactNode;
  defaultExpanded?: boolean;
}

export const ProgressiveDisclosure: React.FC<ProgressiveDisclosureProps> = ({
  title,
  preview,
  fullContent,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors"
      >
        <div className="text-left flex-1">
          <h3 className="font-semibold text-neutral-900 mb-1">{title}</h3>
          {!isExpanded && <p className="text-sm text-neutral-600">{preview}</p>}
        </div>
        <div className="ml-4 text-primary-600">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {isExpanded && (
        <div className="px-6 pb-4 border-t border-neutral-100 pt-4 animate-fadeIn">
          {fullContent}
        </div>
      )}
    </div>
  );
};

interface FAQItem {
  question: string;
  answer: string;
}

interface ProgressiveDisclosureFAQProps {
  faqs: FAQItem[];
}

export const ProgressiveDisclosureFAQ: React.FC<ProgressiveDisclosureFAQProps> = ({ faqs }) => {
  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <ProgressiveDisclosure
          key={index}
          title={faq.question}
          preview={faq.answer.substring(0, 80) + '...'}
          fullContent={<p className="text-neutral-700 leading-relaxed">{faq.answer}</p>}
        />
      ))}
    </div>
  );
};
