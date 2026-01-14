
import React from 'react';
import { DispositionCard, BoardState, DevelopmentPlanData } from '../types';
import { LADDER_CARDS } from '../constants';

interface PdfProfileProps {
  board: BoardState;
  plan: DevelopmentPlanData;
}

const FullDetailCard: React.FC<{ card: DispositionCard; colorClass: string }> = ({ card, colorClass }) => (
  <div className={`p-3 border-2 rounded-lg bg-white flex flex-col h-full shadow-sm ${colorClass}`}>
    <div className="flex justify-between items-start mb-1.5 border-b pb-1">
      <h4 className="text-[9px] font-black text-slate-900 uppercase leading-tight">{card.title}</h4>
      <span className="text-sm font-black text-slate-300 leading-none">{card.letter}</span>
    </div>
    <div className="space-y-2 flex-1">
      <div>
        <p className="text-[7px] font-black text-slate-500 uppercase tracking-tighter mb-0.5">Skilled</p>
        <ul className="text-[6.5px] leading-tight text-slate-700 list-disc pl-2.5">
          {card.skilled.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
      </div>
      <div>
        <p className="text-[7px] font-black text-slate-500 uppercase tracking-tighter mb-0.5">Overused</p>
        <ul className="text-[6.5px] leading-tight text-slate-600 list-disc pl-2.5">
          {card.overused.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
      </div>
      <div>
        <p className="text-[7px] font-black text-slate-500 uppercase tracking-tighter mb-0.5">Unskilled</p>
        <ul className="text-[6.5px] leading-tight text-slate-600 list-disc pl-2.5">
          {card.unskilled.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
      </div>
    </div>
  </div>
);

const PdfPage: React.FC<{ 
  title: string; 
  subtitle: string; 
  cardIds: (string | null)[]; 
  colorClass: string;
  id: string;
}> = ({ title, subtitle, cardIds, colorClass, id }) => {
  const cards = cardIds
    .filter((id): id is string => id !== null)
    .map(id => LADDER_CARDS.find(c => c.id === id)!);

  return (
    <div id={id} className="w-[800px] p-12 bg-white min-h-[1100px] flex flex-col">
      <div className="flex justify-between items-end border-b-4 border-slate-900 pb-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 italic">LADDER <span className="not-italic font-light">Leadership Profile</span></h1>
          <h2 className={`text-xl font-bold uppercase tracking-widest mt-1 ${colorClass.replace('border-', 'text-')}`}>{title}</h2>
        </div>
        <div className="text-right text-slate-400 text-xs font-medium">
          {new Date().toLocaleDateString()} | {subtitle}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 flex-1 content-start">
        {cards.length > 0 ? (
          cards.map(card => (
            <FullDetailCard key={card.id} card={card} colorClass={colorClass} />
          ))
        ) : (
          <div className="col-span-3 h-64 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl">
            <p className="text-slate-300 font-bold uppercase tracking-widest">No Dispositions Categorized in this section</p>
          </div>
        )}
      </div>
      
      <div className="mt-8 pt-4 border-t text-[10px] text-slate-400 flex justify-between">
        <span>LADDER Disposition Sort Activity</span>
        <span>{cards.length} Dispositions Documented</span>
      </div>
    </div>
  );
};

const PlanPdfPage: React.FC<{ plan: DevelopmentPlanData }> = ({ plan }) => {
  const steps = [
    { num: 10, label: 'Retain', prompt: 'What long term change has occurred as a result of practicing this disposition? What lessons have you learned?', key: 'step10' as const },
    { num: 9, label: 'Review', prompt: 'How do you know you’ve improved?', key: 'step9' as const, note: 'Steps 9 and 10 are completed at follow-up session.' },
    { num: 8, label: 'Goal', prompt: 'What will success look like? How will you know you’ve improved?', key: 'step8' as const },
    { num: 7, label: 'Deadline', prompt: 'What is your target date for evaluation? Date for follow-up.', key: 'step7' as const },
    { num: 6, label: 'Strategy', prompt: 'What specific behaviors will you model and practice?', key: 'step6' as const },
    { num: 5, label: 'Mentor', prompt: 'Name someone whose skill in this disposition you admire.', key: 'step5' as const },
    { num: 4, label: 'Rationale', prompt: 'What are the underlying reasons for mastering this disposition?', key: 'step4' as const },
    { num: 3, label: 'Engage', prompt: 'Describe a time when this disposition would have been helpful.', key: 'step3' as const },
    { num: 2, label: 'Reflect', prompt: 'What does this disposition bring up for you?', key: 'step2' as const },
    { num: 1, label: 'Name', prompt: 'Name the disposition for development.', key: 'step1' as const },
  ];

  return (
    <div id="pdf-page-plan" className="w-[800px] p-12 bg-white min-h-[1100px] flex flex-col">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Step LADDER - Disposition Development Plan</h1>
      </div>

      <div className="border-[1.5px] border-slate-400 divide-y divide-slate-400 flex-1 flex flex-col">
        {steps.map((step) => (
          <React.Fragment key={step.key}>
            {step.note && (
              <div className="bg-slate-200 border-y border-slate-400 px-4 py-1.5 text-[11px] font-bold text-slate-700 text-center uppercase tracking-tight">
                {step.note}
              </div>
            )}
            <div className="flex flex-1 min-h-[70px]">
              <div className="w-40 bg-slate-50 p-2.5 border-r border-slate-400 flex items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-600">Step {step.num}- {step.label}</span>
                </div>
              </div>
              <div className="flex-1 p-3 flex flex-col justify-center">
                <p className="text-[10px] text-slate-500 mb-2 leading-tight">{step.prompt}</p>
                <div className="text-[12px] font-semibold text-slate-900 min-h-[24px]">
                  {plan[step.key] || ''}
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="mt-12 space-y-4">
        <div className="flex gap-4 items-end">
          <span className="text-sm font-bold w-16">Name:</span>
          <div className="flex-1 border-b border-slate-400 pb-1 font-semibold">{plan.studentName}</div>
        </div>
        <div className="flex gap-4 items-end">
          <span className="text-sm font-bold w-16">Date:</span>
          <div className="flex-1 border-b border-slate-400 pb-1 font-semibold">{plan.date}</div>
        </div>
      </div>
    </div>
  );
};

export const PdfProfile: React.FC<PdfProfileProps> = ({ board, plan }) => {
  return (
    <div className="fixed left-[-9999px] top-[-9999px] overflow-hidden">
      <PdfPage 
        id="pdf-page-strengths"
        title="My Core Strengths" 
        subtitle="Tier 1 Dispositions"
        cardIds={board.strength} 
        colorClass="border-green-500" 
      />
      <PdfPage 
        id="pdf-page-standards"
        title="My Standards" 
        subtitle="Tier 2 Dispositions"
        cardIds={board.standard} 
        colorClass="border-blue-500" 
      />
      <PdfPage 
        id="pdf-page-stressors"
        title="My Stressors" 
        subtitle="Development Areas"
        cardIds={board.stressor} 
        colorClass="border-red-500" 
      />
      <PlanPdfPage plan={plan} />
    </div>
  );
};
