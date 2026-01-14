
import React, { useState, useCallback, useMemo, useRef } from 'react';
import { LADDER_CARDS } from './constants';
import { BoardState, CategoryType, AppView, DevelopmentPlanData } from './types';
import Card from './components/Card';
import { PdfProfile } from './components/PdfProfile';
import DevelopmentPlan from './components/DevelopmentPlan';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('dashboard');
  const [board, setBoard] = useState<BoardState>({
    deck: LADDER_CARDS.map(c => c.id),
    strength: Array(9).fill(null),
    standard: Array(8).fill(null),
    stressor: Array(9).fill(null),
  });

  const [plan, setPlan] = useState<DevelopmentPlanData>({
    selectedCardId: null,
    step1: '',
    step2: '',
    step3: '',
    step4: '',
    step5: '',
    step6: '',
    step7: '',
    step8: '',
    step9: '',
    step10: '',
    studentName: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [selectedFrom, setSelectedFrom] = useState<{ category: CategoryType, index?: number } | null>(null);
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
  const [hoverTarget, setHoverTarget] = useState<{ category: CategoryType, index: number } | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'vowels' | 'consonants'>('all');
  const [isDeckExpanded, setIsDeckExpanded] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const moveCard = useCallback((cardId: string, fromCategory: CategoryType, fromIndex: number | undefined, toCategory: CategoryType, toIndex: number | undefined) => {
    setBoard(prev => {
      const next = { ...prev };
      if (fromCategory === 'deck') {
        next.deck = prev.deck.filter(id => id !== cardId);
      } else {
        const sourceArray = [...(prev[fromCategory as keyof BoardState] as (string | null)[])];
        sourceArray[fromIndex!] = null;
        (next[fromCategory as keyof BoardState] as (string | null)[]) = sourceArray;
      }
      if (toCategory === 'deck') {
        if (!next.deck.includes(cardId)) {
          next.deck = [...next.deck, cardId];
        }
      } else {
        const targetArray = [...(next[toCategory as keyof BoardState] as (string | null)[])];
        const displacedCardId = targetArray[toIndex!];
        targetArray[toIndex!] = cardId;
        (next[toCategory as keyof BoardState] as (string | null)[]) = targetArray;
        if (displacedCardId && !next.deck.includes(displacedCardId)) {
          next.deck = [...next.deck, displacedCardId];
        }
      }
      return next;
    });
    setSelectedCardId(null);
    setSelectedFrom(null);
  }, []);

  const handleExportPDF = async () => {
    setIsExporting(true);
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pages = ['pdf-page-strengths', 'pdf-page-standards', 'pdf-page-stressors', 'pdf-page-plan'];
    
    try {
      for (let i = 0; i < pages.length; i++) {
        const element = document.getElementById(pages[i]);
        if (!element) continue;
        
        const canvas = await html2canvas(element, { 
          scale: 2,
          useCORS: true,
          logging: false,
          windowWidth: 800,
          windowHeight: 1100
        });
        
        const imgData = canvas.toDataURL('image/png');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      }
      pdf.save(`LADDER_Leadership_Profile_${plan.studentName.replace(/\s+/g, '_') || 'Export'}.pdf`);
    } catch (err) {
      console.error('Failed to export PDF', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const updatePlan = (updates: Partial<DevelopmentPlanData>) => {
    setPlan(prev => ({ ...prev, ...updates }));
  };

  const onDragStart = (e: React.DragEvent, cardId: string, category: CategoryType, index?: number) => {
    setDraggedCardId(cardId);
    setSelectedFrom({ category, index });
    e.dataTransfer.setData('cardId', cardId);
  };

  const scrollDeck = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 600;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const renderSlot = (category: CategoryType, index: number) => {
    const cardId = (board[category as keyof BoardState] as (string | null)[])[index];
    const card = cardId ? LADDER_CARDS.find(c => c.id === cardId) : null;
    const isHovered = hoverTarget?.category === category && hoverTarget?.index === index;

    return (
      <div 
        key={`${category}-${index}`}
        className={`w-48 h-64 border-2 rounded-xl flex items-center justify-center transition-all duration-200 relative
          ${cardId ? 'border-transparent' : 'border-dashed border-slate-300'}
          ${isHovered ? 'border-blue-500 bg-blue-100 scale-105 shadow-inner' : selectedCardId ? 'border-blue-300 bg-blue-50' : 'bg-white/50 hover:bg-white'}
        `}
        onDragOver={(e) => { e.preventDefault(); setHoverTarget({ category, index }); }}
        onDragLeave={() => setHoverTarget(null)}
        onDrop={(e) => {
          e.preventDefault();
          const cid = e.dataTransfer.getData('cardId');
          if (cid && selectedFrom) moveCard(cid, selectedFrom.category, selectedFrom.index, category, index);
          setDraggedCardId(null);
          setHoverTarget(null);
        }}
        onClick={() => {
          if (cardId) {
            setSelectedCardId(cardId === selectedCardId ? null : cardId);
            setSelectedFrom({ category, index });
          } else if (selectedCardId && selectedFrom) {
            moveCard(selectedCardId, selectedFrom.category, selectedFrom.index, category, index);
          }
        }}
      >
        {card ? (
          <Card 
            card={card} 
            isSelected={selectedCardId === cardId}
            isDragging={draggedCardId === cardId}
            onDragStart={(e) => onDragStart(e, cardId, category, index)}
          />
        ) : (
          <div className="text-slate-400 text-[10px] font-black uppercase tracking-tighter text-center select-none p-6 opacity-30">
            {category} {index + 1}
          </div>
        )}
      </div>
    );
  };

  const deckCards = useMemo(() => {
    return board.deck
      .map(id => LADDER_CARDS.find(c => c.id === id)!)
      .filter(card => {
        const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase()) || card.letter.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === 'all' || (filterType === 'vowels' && card.isVowel) || (filterType === 'consonants' && !card.isVowel);
        return matchesSearch && matchesFilter;
      });
  }, [board.deck, searchTerm, filterType]);

  const isBoardFilled = board.deck.length === 0;

  return (
    <div className="min-h-screen pb-96 bg-slate-50 relative">
      <PdfProfile board={board} plan={plan} />
      
      {isExporting && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[100] flex flex-col items-center justify-center text-white">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-black uppercase tracking-widest">Generating Your Profile PDF...</p>
          <p className="text-slate-400 text-sm mt-2 italic">Compiling qualitative action roadmap...</p>
        </div>
      )}

      <header className="bg-slate-900 text-white py-4 px-8 shadow-xl sticky top-0 z-50 flex justify-between items-center border-b border-slate-700">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-2 rounded-lg rotate-3 shadow-lg shadow-blue-500/20">
              <h1 className="text-2xl font-black italic leading-none text-white">LADDER</h1>
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-200">Leadership Program</h2>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Development & Sorting</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center bg-slate-800 p-1 rounded-xl">
            <button 
              onClick={() => setView('dashboard')}
              className={`px-4 py-2 text-[11px] font-black uppercase tracking-widest rounded-lg transition-all ${view === 'dashboard' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              1. Sort Dispositions
            </button>
            <button 
              onClick={() => setView('plan')}
              className={`px-4 py-2 text-[11px] font-black uppercase tracking-widest rounded-lg transition-all ${view === 'plan' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              2. Development Plan
            </button>
          </nav>
        </div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={handleExportPDF}
            disabled={isExporting}
            className="flex items-center gap-2 text-[11px] font-black uppercase bg-green-600 hover:bg-green-500 text-white px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-green-600/30 disabled:opacity-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Final Export PDF
          </button>
          
          <button 
            onClick={() => { if(confirm("Are you sure you want to reset everything?")) window.location.reload(); }}
            className="text-[10px] font-bold bg-slate-800 hover:bg-slate-700 border border-slate-600 px-3 py-2.5 rounded-xl transition-colors"
          >
            RESET
          </button>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto p-8">
        {view === 'dashboard' ? (
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Strength Section */}
            <section className="bg-green-50/50 p-8 rounded-3xl border border-green-100">
              <div className="flex items-end gap-3 mb-8">
                <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-green-200 -rotate-2">9</div>
                <div>
                  <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">Strengths</h2>
                  <p className="text-slate-500 text-xs font-semibold italic">"Natural gifts and consistent proficiencies."</p>
                </div>
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-6 justify-items-center">
                {board.strength.map((_, idx) => renderSlot('strength', idx))}
              </div>
            </section>

            {/* Standard Section */}
            <section className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100">
              <div className="flex items-end gap-3 mb-8">
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-blue-200 rotate-2">8</div>
                <div>
                  <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">Standards</h2>
                  <p className="text-slate-500 text-xs font-semibold italic">"Functional skills that are consistent."</p>
                </div>
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-6 justify-items-center">
                {board.standard.map((_, idx) => renderSlot('standard', idx))}
              </div>
            </section>

            {/* Stressor Section */}
            <section className="bg-red-50/50 p-8 rounded-3xl border border-red-100">
              <div className="flex items-end gap-3 mb-8">
                <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-red-200 -rotate-1">9</div>
                <div>
                  <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">Stressors</h2>
                  <p className="text-slate-500 text-xs font-semibold italic">"Dispositions that cause frustration or tension."</p>
                </div>
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-6 justify-items-center">
                {board.stressor.map((_, idx) => renderSlot('stressor', idx))}
              </div>
            </section>
          </div>
        ) : (
          <DevelopmentPlan board={board} plan={plan} onUpdatePlan={updatePlan} />
        )}
      </main>

      {/* Persistent Navigation & Deck (only visible in dashboard) */}
      <footer className={`fixed bottom-0 left-0 right-0 z-[60] transition-all duration-500 ${view === 'plan' ? 'translate-y-full' : isDeckExpanded ? 'h-[90vh]' : 'h-80'}`}>
        <div 
          className="bg-slate-900 h-full shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border-t border-slate-700 p-6 flex flex-col relative"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const cid = e.dataTransfer.getData('cardId');
            if (cid && selectedFrom && selectedFrom.category !== 'deck') {
              moveCard(cid, selectedFrom.category, selectedFrom.index, 'deck', undefined);
            }
          }}
        >
          {/* Deck Drop Indicator */}
          <div className="absolute inset-x-0 -top-4 flex justify-center pointer-events-none">
            <span className="bg-slate-700 text-[9px] text-slate-400 font-bold px-3 py-1 rounded-full border border-slate-600 uppercase tracking-widest shadow-xl">
              Drop here to return card to deck
            </span>
          </div>

          <div className="max-w-[1700px] mx-auto w-full flex-1 flex flex-col overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4 flex-1">
                <h3 className="text-white font-black flex items-center gap-3">
                  <span className="bg-blue-600 text-xs px-2.5 py-1.5 rounded-full shadow-lg shadow-blue-600/20">{deckCards.length}</span>
                  <span className="hidden sm:inline">UNSORTED CARDS</span>
                </h3>
                
                <div className="relative flex-1 max-w-xs group">
                  <input 
                    type="text" 
                    placeholder="Search LADDER cards..." 
                    className="w-full bg-slate-800 border border-slate-700 text-white text-xs px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all group-hover:border-slate-500" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                  />
                  {searchTerm && (
                    <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">×</button>
                  )}
                </div>

                <div className="flex bg-slate-800 p-1.5 rounded-xl border border-slate-700">
                  <button onClick={() => setFilterType('all')} className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${filterType === 'all' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-white'}`}>ALL</button>
                  <button onClick={() => setFilterType('vowels')} className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${filterType === 'vowels' ? 'bg-yellow-500 text-slate-900 shadow-lg shadow-yellow-500/20' : 'text-slate-400 hover:text-white'}`}>VOWELS</button>
                  <button onClick={() => setFilterType('consonants')} className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${filterType === 'consonants' ? 'bg-slate-600 text-white shadow-lg shadow-slate-600/20' : 'text-slate-400 hover:text-white'}`}>CONS</button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {isBoardFilled && (
                  <button 
                    onClick={() => setView('plan')}
                    className="bg-green-600 text-white px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-green-600/30 hover:bg-green-500 transition-all hover:-translate-y-0.5"
                  >
                    Start Development Plan →
                  </button>
                )}
                <button 
                  onClick={() => setIsDeckExpanded(!isDeckExpanded)} 
                  className="bg-slate-700 hover:bg-slate-600 text-white px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border border-slate-600 shadow-lg"
                >
                  {isDeckExpanded ? 'Collapse' : 'Expand Grid'}
                  <svg className={`w-4 h-4 transition-transform duration-300 ${isDeckExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7"></path></svg>
                </button>
              </div>
            </div>

            <div className="relative flex-1 group">
              {!isDeckExpanded && deckCards.length > 0 && (
                <>
                  <button 
                    onClick={() => scrollDeck('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-slate-800/80 hover:bg-slate-700 text-white p-3 rounded-full shadow-2xl backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity -ml-4 border border-slate-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
                  </button>
                  <button 
                    onClick={() => scrollDeck('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-slate-800/80 hover:bg-slate-700 text-white p-3 rounded-full shadow-2xl backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity -mr-4 border border-slate-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                  </button>
                </>
              )}

              <div 
                ref={scrollContainerRef}
                className={`flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar p-2 scroll-smooth ${!isDeckExpanded ? 'overflow-x-auto overflow-y-hidden' : ''}`}
              >
                {deckCards.length > 0 ? (
                  <div className={isDeckExpanded ? 'grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-6 justify-items-center' : 'flex gap-6 pb-6 h-full items-center'}>
                    {deckCards.map((card) => (
                      <div key={card.id} className={`flex-shrink-0 transition-all duration-300 ${selectedCardId === card.id ? 'translate-y-[-16px]' : ''}`}>
                        <Card 
                          card={card} 
                          isSelected={selectedCardId === card.id} 
                          isDragging={draggedCardId === card.id} 
                          onDragStart={(e) => onDragStart(e, card.id, 'deck')} 
                          onClick={() => { setSelectedCardId(card.id === selectedCardId ? null : card.id); setSelectedFrom({ category: 'deck' }); }} 
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-500 py-12">
                    <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center text-3xl mb-4 border border-slate-700 animate-pulse">
                      {searchTerm ? '🔍' : '✅'}
                    </div>
                    <p className="font-black uppercase tracking-widest text-sm text-white">
                      {searchTerm ? `No results for "${searchTerm}"` : 'All dispositions categorized!'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
