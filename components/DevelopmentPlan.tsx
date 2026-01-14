
import React, { useState } from 'react';
import { BoardState, DevelopmentPlanData, DispositionCard } from '../types';
import { LADDER_CARDS } from '../constants';
import { GoogleGenAI } from "@google/genai";

interface DevelopmentPlanProps {
  board: BoardState;
  plan: DevelopmentPlanData;
  onUpdatePlan: (plan: Partial<DevelopmentPlanData>) => void;
}

const DevelopmentPlan: React.FC<DevelopmentPlanProps> = ({ board, plan, onUpdatePlan }) => {
  const [loadingStep, setLoadingStep] = useState<string | null>(null);
  const selectableCardIds = [...board.standard, ...board.stressor].filter((id): id is string => id !== null);
  const selectableCards = selectableCardIds.map(id => LADDER_CARDS.find(c => c.id === id)!);
  const selectedCard = plan.selectedCardId ? LADDER_CARDS.find(c => c.id === plan.selectedCardId) : null;

  const getProfileContext = () => {
    const getTitles = (ids: (string | null)[]) => ids.filter(id => id !== null).map(id => LADDER_CARDS.find(c => c.id === id)?.title).join(', ');
    return {
      strengths: getTitles(board.strength),
      standards: getTitles(board.standard),
      stressors: getTitles(board.stressor),
    };
  };

  const refineWithAI = async (stepKey: keyof DevelopmentPlanData, prompt: string, label: string) => {
    if (!selectedCard) return;
    const currentText = plan[stepKey] as string;
    
    if (!currentText || currentText.trim().length < 3) {
      alert("Please write a draft first so the AI can refine your unique thoughts!");
      return;
    }

    setLoadingStep(stepKey);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const profile = getProfileContext();
      
      const isGoalStep = label.toLowerCase() === 'goal';
      
      const systemInstruction = `You are a world-class leadership coach helping a student refine their 'Step LADDER' development plan.
      
      The student is focusing on the disposition: "${selectedCard.title}".
      
      Student's Profile:
      - Strengths: ${profile.strengths}
      - Stressors: ${profile.stressors}
      
      Tone & Style Guidelines:
      - Use PLAIN, SIMPLE LANGUAGE that is easy for a student to understand.
      - Be EXTREMELY CONCISE (strictly 1-2 sentences).
      - Maintain a FIRST-PERSON perspective (I/Me/My).
      
      Specialized Rules:
      ${isGoalStep ? 
        `- This is the GOAL step. You MUST transform the student's draft into a SMART goal (Specific, Measurable, Achievable, Relevant, Time-bound).
         - Use context from their previous steps: Strategy: "${plan.step6}", Deadline: "${plan.step7}".` : 
        `- Refine the student's draft to be more impactful while staying true to their original intent.`
      }
      
      Do not add preamble. Just provide the refined text.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Draft to Refine: "${currentText}"
        Step Prompt: "${prompt}"
        Step Label: "${label}"
        Previous Context: 
        - Reflect: "${plan.step2}"
        - Strategy: "${plan.step6}"
        - Deadline: "${plan.step7}"`,
        config: {
          systemInstruction,
          temperature: 0.4, // Lower temperature for more consistent, concise results
        }
      });

      const suggestion = response.text || '';
      onUpdatePlan({ [stepKey]: suggestion.trim().replace(/^"|"$/g, '') });
    } catch (error) {
      console.error('AI Refinement failed:', error);
      alert("AI was unable to refine at this moment.");
    } finally {
      setLoadingStep(null);
    }
  };

  const steps = [
    { num: 10, label: 'Retain', prompt: 'What long term change has occurred as a result of practicing this disposition? What lessons have you learned?', key: 'step10' as const },
    { num: 9, label: 'Review', prompt: 'How do you know you’ve improved?', key: 'step9' as const, note: 'Steps 9 and 10 are completed at follow-up session.' },
    { num: 8, label: 'Goal', prompt: 'What will success look like? How will you know you’ve improved? (SMART Goal)', key: 'step8' as const },
    { num: 7, label: 'Deadline', prompt: 'What is your target date for evaluation? Date for follow-up.', key: 'step7' as const },
    { num: 6, label: 'Strategy', prompt: 'What specific behaviors will you model and practice?', key: 'step6' as const },
    { num: 5, label: 'Mentor', prompt: 'Name someone whose skill in this disposition you admire.', key: 'step5' as const },
    { num: 4, label: 'Rationale', prompt: 'What are the underlying reasons for mastering this disposition?', key: 'step4' as const },
    { num: 3, label: 'Engage', prompt: 'Describe a time when this disposition would have been helpful.', key: 'step3' as const },
    { num: 2, label: 'Reflect', prompt: 'What does this disposition bring up for you?', key: 'step2' as const },
    { num: 1, label: 'Name', prompt: 'Name the disposition for development.', key: 'step1' as const },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-200">
        <header className="mb-10">
          <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter mb-2 flex items-center gap-3">
            Step LADDER- <span className="text-blue-600">Development Roadmap</span>
          </h2>
          <p className="text-slate-500 text-sm font-medium italic">Refine your leadership edge with plain-language SMART planning.</p>
        </header>

        {/* Card Selector */}
        <div className="mb-8">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
            1. Select a focus area from your Standards or Stressors
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {selectableCards.map(card => (
              <button
                key={card.id}
                onClick={() => onUpdatePlan({ selectedCardId: card.id, step1: card.title })}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center text-center gap-2 ${
                  plan.selectedCardId === card.id 
                    ? 'border-blue-500 bg-blue-50 ring-4 ring-blue-100 scale-105 z-10 shadow-lg' 
                    : 'border-slate-100 bg-slate-50 hover:border-slate-200 grayscale-[0.5] hover:grayscale-0'
                }`}
              >
                <span className={`text-2xl font-black ${card.isVowel ? 'text-yellow-500' : 'text-slate-400'}`}>{card.letter}</span>
                <span className="text-[11px] font-black text-slate-700 leading-tight uppercase tracking-tighter">{card.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Reveal Metrics Section */}
        {selectedCard && (
          <div className="mb-10 p-8 bg-slate-900 rounded-3xl text-white animate-in zoom-in-95 duration-300 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl -mr-10 -mt-10 rounded-full"></div>
            <div className="flex items-center gap-4 mb-8 border-b border-slate-700 pb-4 relative z-10">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-3xl font-black italic shadow-inner">{selectedCard.letter}</div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight leading-none mb-1">{selectedCard.title}</h3>
                <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest opacity-80">Target Disposition Insights</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              <div>
                <p className="text-[10px] font-black text-green-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> Skilled
                </p>
                <ul className="text-[11px] space-y-2 opacity-80 list-disc pl-4 font-medium text-slate-200">
                  {selectedCard.skilled.slice(0, 5).map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-black text-yellow-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span> Overused
                </p>
                <ul className="text-[11px] space-y-2 opacity-80 list-disc pl-4 font-medium text-slate-200">
                  {selectedCard.overused.slice(0, 5).map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span> Unskilled
                </p>
                <ul className="text-[11px] space-y-2 opacity-80 list-disc pl-4 font-medium text-slate-200">
                  {selectedCard.unskilled.slice(0, 5).map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* The Form */}
        <div className="border-[1.5px] border-slate-200 rounded-3xl overflow-hidden divide-y divide-slate-200 shadow-sm bg-slate-50/30">
          {steps.map((step) => (
            <React.Fragment key={step.key}>
              {step.note && (
                <div className="bg-slate-100/80 px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center italic">
                  — {step.note} —
                </div>
              )}
              <div className="flex flex-col md:flex-row group transition-colors hover:bg-white">
                <div className="w-full md:w-60 p-6 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col justify-center bg-slate-50/50 group-hover:bg-white/50">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">Step {step.num}</span>
                  <span className="text-base font-black text-slate-800 leading-tight">{step.label}</span>
                </div>
                <div className="flex-1 p-6 relative">
                  <div className="flex justify-between items-start mb-3">
                    <p className="text-[12px] font-semibold text-slate-500 italic flex-1 pr-16 leading-relaxed">
                      {step.prompt}
                      {step.label === 'Goal' && <span className="block mt-1 text-blue-500 font-bold not-italic">Refine to create a SMART goal.</span>}
                    </p>
                    {step.num > 1 && selectedCard && (
                      <div className="group/btn relative">
                        <button 
                          onClick={() => refineWithAI(step.key, step.prompt, step.label)}
                          disabled={!!loadingStep || !(plan[step.key] as string).trim()}
                          className={`text-[10px] font-black uppercase tracking-widest text-white px-4 py-2 rounded-xl transition-all shadow-md hover:shadow-lg disabled:shadow-none flex items-center gap-2 ${step.label === 'Goal' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} disabled:bg-slate-200 disabled:text-slate-400`}
                        >
                          {loadingStep === step.key ? (
                            <>
                              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                              Refining...
                            </>
                          ) : (
                            <>✨ Refine with AI</>
                          )}
                        </button>
                        {!(plan[step.key] as string).trim() && (
                          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover/btn:opacity-100 pointer-events-none transition-opacity bg-slate-800 text-white text-[9px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl">
                            Draft a response first!
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <textarea
                    className={`w-full text-sm font-semibold text-slate-700 placeholder:text-slate-300 focus:outline-none min-h-[80px] p-4 rounded-xl bg-white border border-transparent focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all resize-none leading-relaxed ${loadingStep === step.key ? 'animate-pulse bg-blue-50/50' : ''}`}
                    placeholder={step.num === 1 ? "Selected disposition name..." : "Type your draft here..."}
                    value={plan[step.key]}
                    readOnly={step.num === 1 || !!loadingStep}
                    onChange={(e) => onUpdatePlan({ [step.key]: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 pt-10 border-t border-slate-100">
          <div className="group">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 group-focus-within:text-blue-500 transition-colors">Student Profile Name</label>
            <input 
              type="text" 
              className="w-full bg-slate-50 border-b-2 border-slate-200 px-5 py-4 focus:border-blue-500 focus:bg-white focus:outline-none font-black text-slate-800 rounded-t-2xl transition-all"
              placeholder="Enter Full Name"
              value={plan.studentName}
              onChange={(e) => onUpdatePlan({ studentName: e.target.value })}
            />
          </div>
          <div className="group">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 group-focus-within:text-blue-500 transition-colors">Development Plan Date</label>
            <input 
              type="date" 
              className="w-full bg-slate-50 border-b-2 border-slate-200 px-5 py-4 focus:border-blue-500 focus:bg-white focus:outline-none font-black text-slate-800 rounded-t-2xl transition-all"
              value={plan.date}
              onChange={(e) => onUpdatePlan({ date: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentPlan;
