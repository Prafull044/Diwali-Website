import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { playSparkleSound, playBellSound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import {
  Gamepad2,
  Award,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  Trophy,
  Brain,
  HelpCircle,
  Flame,
  Star
} from 'lucide-react';

// TRIVIA QUESTIONS
const TRIVIA_QUESTIONS = [
  {
    question: "What does the word 'Deepawali' literally translate to in Sanskrit?",
    options: ["Row of illuminated lamps", "Victory of warriors", "Night of full moon", "Harvest celebration"],
    correct: 0,
    explanation: "Deepawali originates from 'Deepa' (clay lamp) and 'Avali' (series or continuous row)."
  },
  {
    question: "Which sacred epic event is celebrated with the lighting of diyas on Diwali in Ayodhya?",
    options: ["Arjuna's battle triumph", "Lord Rama's return with Sita & Lakshmana", "Samudra Manthan beginning", "Buddha's enlightenment"],
    correct: 1,
    explanation: "The citizens of Ayodhya illuminated the entire kingdom with earthen lamps to welcome Lord Rama after 14 years of exile."
  },
  {
    question: "Which deity of medicine and healing is worshiped on Dhanteras alongside Goddess Lakshmi?",
    options: ["Lord Dhanvantari", "Lord Indra", "Lord Kartikeya", "Sage Agastya"],
    correct: 0,
    explanation: "Lord Dhanvantari, the physician of the gods who emerged during Samudra Manthan carrying the pot of Amrit, is revered on Dhanteras."
  },
  {
    question: "What is the day dedicated to the sacred bond between brothers and sisters during Diwali?",
    options: ["Govardhan Puja", "Choti Diwali", "Bhai Dooj (Bhau Beej)", "Dhanteras"],
    correct: 2,
    explanation: "Bhai Dooj commemorates the affectionate visit of Lord Yama (God of Death) to his sister Yami (the Yamuna River)."
  },
  {
    question: "Which natural ingredient is traditionally mixed with rice flour to prepare sacred white rangoli?",
    options: ["Limestone powder", "River sand", "Crushed marble & rice powder", "Plaster"],
    correct: 2,
    explanation: "Traditional Kolam and Rangoli use natural rice flour and crushed natural minerals so small birds and ants can feed on it."
  }
];

// MEMORY MATCHING CARDS
const MEMORY_CARDS = [
  { id: 1, symbol: '🪔', name: 'Diya' },
  { id: 2, symbol: '🎆', name: 'Fireworks' },
  { id: 3, symbol: '🍬', name: 'Mithai' },
  { id: 4, symbol: '🏮', name: 'Lantern' },
  { id: 5, symbol: '🌸', name: 'Lotus' },
  { id: 6, symbol: '🔔', name: 'Bell' },
];

// WORD SCRAMBLE DATA
const WORD_PUZZLES = [
  { scrambled: 'AYID', original: 'DIYA', hint: 'The sacred clay lamp that dispels darkness' },
  { scrambled: 'THMIIA', original: 'MITHAI', hint: 'Delicious festive Indian sweets' },
  { scrambled: 'OGILRAN', original: 'RANGOLI', hint: 'Auspicious geometric floor artwork' },
  { scrambled: 'IKNDAL', original: 'KANDIL', hint: 'Hanging colorful paper lantern on balconies' },
  { scrambled: 'AMILSKH', original: 'LAKSHMI', hint: 'The divine Goddess of wealth, grace, and light' },
];

export default function Games() {
  const { gameScores, setGameScores, showToast } = useApp();
  const [activeGame, setActiveGame] = useState('trivia'); // 'trivia', 'memory', 'words'

  // TRIVIA STATE
  const [triviaIndex, setTriviaIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [triviaScore, setTriviaScore] = useState(0);
  const [triviaFinished, setTriviaFinished] = useState(false);

  // MEMORY GAME STATE
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [moves, setMoves] = useState(0);

  // WORD SCRAMBLE STATE
  const [wordIndex, setWordIndex] = useState(0);
  const [wordInput, setWordInput] = useState('');
  const [wordScore, setWordScore] = useState(0);

  // Initialize Memory Game Cards
  useEffect(() => {
    restartMemoryGame();
  }, []);

  const restartMemoryGame = () => {
    const deck = [...MEMORY_CARDS, ...MEMORY_CARDS]
      .map((item, index) => ({ ...item, uniqueKey: index }))
      .sort(() => Math.random() - 0.5);
    setCards(deck);
    setFlippedIndices([]);
    setMatchedIds([]);
    setMoves(0);
  };

  const handleCardClick = (index) => {
    if (flippedIndices.length === 2 || flippedIndices.includes(index)) return;
    if (matchedIds.includes(cards[index].id)) return;

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const firstCard = cards[newFlipped[0]];
      const secondCard = cards[newFlipped[1]];

      if (firstCard.id === secondCard.id) {
        // Matched!
        playSparkleSound();
        const nextMatched = [...matchedIds, firstCard.id];
        setMatchedIds(nextMatched);
        setFlippedIndices([]);

        if (nextMatched.length === MEMORY_CARDS.length) {
          confetti({ particleCount: 70, spread: 80 });
          showToast("🎉 Spectacular! You matched all Diwali pairs!", "festive");
          setGameScores((prev) => ({
            ...prev,
            memoryMatches: (prev.memoryMatches || 0) + 1,
          }));
        }
      } else {
        setTimeout(() => {
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  // Trivia Answer
  const handleAnswerSelect = (optionIndex) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionIndex);

    const isCorrect = optionIndex === TRIVIA_QUESTIONS[triviaIndex].correct;
    if (isCorrect) {
      playSparkleSound();
      setTriviaScore((s) => s + 1);
      showToast("Correct Answer! 🌟", "success");
    } else {
      showToast("Incorrect answer. Check the explanation below.", "info");
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    if (triviaIndex < TRIVIA_QUESTIONS.length - 1) {
      setTriviaIndex((i) => i + 1);
    } else {
      setTriviaFinished(true);
      confetti({ particleCount: 60 });
      setGameScores((prev) => ({
        ...prev,
        triviaBest: Math.max(prev.triviaBest || 0, triviaScore + (selectedAnswer === TRIVIA_QUESTIONS[triviaIndex].correct ? 1 : 0)),
      }));
    }
  };

  const restartTrivia = () => {
    setTriviaIndex(0);
    setSelectedAnswer(null);
    setTriviaScore(0);
    setTriviaFinished(false);
  };

  // Word Scramble Check
  const handleWordSubmit = (e) => {
    e.preventDefault();
    const currentWord = WORD_PUZZLES[wordIndex];
    if (wordInput.trim().toUpperCase() === currentWord.original) {
      playSparkleSound();
      setWordScore((s) => s + 1);
      showToast("Brilliant! Word correctly solved! 🪔", "festive");
      setWordInput('');
      if (wordIndex < WORD_PUZZLES.length - 1) {
        setWordIndex((i) => i + 1);
      } else {
        confetti({ particleCount: 80 });
        showToast("You solved all Diwali word puzzles! 🏆", "festive");
        setGameScores((prev) => ({
          ...prev,
          wordsSolved: (prev.wordsSolved || 0) + WORD_PUZZLES.length,
        }));
      }
    } else {
      showToast("Not quite right! Try again.", "info");
    }
  };

  return (
    <div className="min-h-screen bg-[#160B26] text-[#FFF4DD] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241039] border border-[#F5C75E]/30 text-[#F5C75E] text-xs font-semibold uppercase tracking-wider mb-3">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Interactive Festive Games</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-royal text-[#F5C75E] gold-glow mb-4">
            Diwali Games & Trivia Zone 🎮
          </h1>
          <p className="text-sm sm:text-base text-[#FFF4DD]/80">
            Challenge your family and friends with cultural trivia, memory card matching, and sacred word puzzles. Earn festive achievement badges!
          </p>
        </div>

        {/* Game Switcher Tabs */}
        <div className="flex justify-center mb-8">
          <div className="p-1.5 rounded-2xl bg-[#241039] border border-[#F5C75E]/30 flex gap-2">
            {[
              { id: 'trivia', label: 'Diwali Trivia Quiz', icon: Brain },
              { id: 'memory', label: 'Festive Memory Match', icon: Sparkles },
              { id: 'words', label: 'Festival Word Puzzle', icon: HelpCircle },
            ].map((tab) => {
              const IconC = tab.icon;
              const isActive = activeGame === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveGame(tab.id)}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer ${
                    isActive
                      ? 'bg-[#F5C75E] text-[#160B26] shadow-[0_0_15px_rgba(245,199,94,0.4)]'
                      : 'text-[#FFF4DD]/70 hover:text-white'
                  }`}
                >
                  <IconC className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* GAME 1: DIWALI TRIVIA QUIZ */}
        {activeGame === 'trivia' && (
          <div className="max-w-2xl mx-auto bg-[#241039]/90 border border-[#F5C75E]/30 rounded-3xl p-6 sm:p-10 shadow-2xl gold-glow-box">
            {!triviaFinished ? (
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#F5C75E]/20 text-xs">
                  <span className="font-semibold text-[#F5C75E] uppercase tracking-wider">
                    Question {triviaIndex + 1} of {TRIVIA_QUESTIONS.length}
                  </span>
                  <span className="font-bold text-amber-300">
                    Current Score: {triviaScore}
                  </span>
                </div>

                <h3 className="font-serif-heading font-bold text-xl sm:text-2xl text-[#FFF4DD] mb-6 leading-snug">
                  {TRIVIA_QUESTIONS[triviaIndex].question}
                </h3>

                {/* Options List */}
                <div className="space-y-3 mb-6">
                  {TRIVIA_QUESTIONS[triviaIndex].options.map((option, idx) => {
                    const isSelected = selectedAnswer === idx;
                    const isCorrect = idx === TRIVIA_QUESTIONS[triviaIndex].correct;

                    let btnStyle = 'bg-[#160B26] border-white/10 hover:border-[#F5C75E]/50 text-[#FFF4DD]';
                    if (selectedAnswer !== null) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-950/70 border-emerald-400 text-emerald-200';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-950/70 border-rose-400 text-rose-200';
                      } else {
                        btnStyle = 'bg-[#160B26] border-white/5 opacity-50 text-[#FFF4DD]';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswerSelect(idx)}
                        disabled={selectedAnswer !== null}
                        className={`w-full p-4 rounded-xl border text-left font-medium text-xs sm:text-sm flex items-center justify-between transition cursor-pointer ${btnStyle}`}
                      >
                        <span>{option}</span>
                        {selectedAnswer !== null && (
                          <span>
                            {isCorrect ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : isSelected ? (
                              <XCircle className="w-4 h-4 text-rose-400" />
                            ) : null}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation on Answer */}
                {selectedAnswer !== null && (
                  <div className="p-4 rounded-xl bg-[#160B26] border border-[#F5C75E]/30 mb-6">
                    <p className="text-xs text-[#FFF4DD]/80 leading-relaxed">
                      💡 <span className="font-bold text-[#F5C75E]">Tradition Insight: </span>
                      {TRIVIA_QUESTIONS[triviaIndex].explanation}
                    </p>
                  </div>
                )}

                {selectedAnswer !== null && (
                  <div className="flex justify-end">
                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#F28C28] to-[#F5C75E] text-[#160B26] font-bold text-sm shadow hover:scale-105 transition cursor-pointer"
                    >
                      {triviaIndex < TRIVIA_QUESTIONS.length - 1 ? 'Next Question →' : 'See Results 🏆'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6">
                <Trophy className="w-16 h-16 text-[#F5C75E] mx-auto mb-4 animate-bounce" />
                <h3 className="font-royal text-3xl font-bold text-[#F5C75E] mb-2">
                  Quiz Completed!
                </h3>
                <p className="text-base text-[#FFF4DD] mb-4">
                  You scored <span className="font-bold text-[#F5C75E] text-xl">{triviaScore}</span> out of {TRIVIA_QUESTIONS.length}!
                </p>

                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#160B26] border border-[#F5C75E]/40 text-amber-300 text-xs font-bold mb-6">
                  <Award className="w-4 h-4 text-[#F5C75E]" />
                  <span>
                    {triviaScore >= 4 ? 'Achievement Unlocked: Festival Scholar 📜' : 'Good Effort! Keep Learning Traditions'}
                  </span>
                </div>

                <div>
                  <button
                    onClick={restartTrivia}
                    className="px-6 py-3 rounded-xl bg-[#F5C75E] text-[#160B26] font-bold text-sm hover:bg-amber-400 transition cursor-pointer"
                  >
                    Play Again 🔄
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* GAME 2: MEMORY MATCHING CARDS */}
        {activeGame === 'memory' && (
          <div className="max-w-2xl mx-auto bg-[#241039]/90 border border-[#F5C75E]/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-center">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#F5C75E]/20 text-xs">
              <span className="font-semibold text-[#F5C75E]">Moves: {moves}</span>
              <span className="font-semibold text-amber-300">
                Matched Pairs: {matchedIds.length} / {MEMORY_CARDS.length}
              </span>
              <button
                onClick={restartMemoryGame}
                className="text-xs text-[#FFF4DD]/60 hover:text-[#F5C75E] flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart</span>
              </button>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 max-w-md mx-auto">
              {cards.map((card, idx) => {
                const isFlipped = flippedIndices.includes(idx) || matchedIds.includes(card.id);
                return (
                  <button
                    key={card.uniqueKey}
                    onClick={() => handleCardClick(idx)}
                    className={`aspect-square rounded-2xl border-2 transition-all duration-300 flex items-center justify-center text-3xl sm:text-4xl shadow-md cursor-pointer ${
                      isFlipped
                        ? 'bg-gradient-to-tr from-[#241039] to-[#3C125E] border-[#F5C75E] rotate-0 shadow-[0_0_12px_rgba(245,199,94,0.3)]'
                        : 'bg-[#160B26] border-white/20 hover:border-white/40'
                    }`}
                  >
                    {isFlipped ? card.symbol : '🪔'}
                  </button>
                );
              })}
            </div>

            {matchedIds.length === MEMORY_CARDS.length && (
              <div className="mt-8 p-4 rounded-xl bg-[#160B26] border border-[#F5C75E]/40 text-center animate-fade-in">
                <p className="font-royal text-xl font-bold text-[#F5C75E] mb-1">
                  🎉 Fantastic Memory! All Pairs Found in {moves} Moves!
                </p>
                <button
                  onClick={restartMemoryGame}
                  className="mt-3 px-5 py-2 rounded-xl bg-[#F5C75E] text-[#160B26] font-bold text-xs hover:bg-amber-400 transition"
                >
                  Play Another Round
                </button>
              </div>
            )}
          </div>
        )}

        {/* GAME 3: WORD SCRAMBLE */}
        {activeGame === 'words' && (
          <div className="max-w-xl mx-auto bg-[#241039]/90 border border-[#F5C75E]/30 rounded-3xl p-6 sm:p-10 shadow-2xl text-center gold-glow-box">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#F5C75E]/20 text-xs">
              <span className="font-semibold text-[#F5C75E]">
                Word {wordIndex + 1} of {WORD_PUZZLES.length}
              </span>
              <span className="font-bold text-amber-300">Solved: {wordScore}</span>
            </div>

            <div className="my-6">
              <span className="text-xs font-semibold text-[#F5C75E] uppercase tracking-wider block mb-2">
                Unscramble this festive word:
              </span>
              <div className="text-4xl sm:text-5xl font-black font-royal tracking-widest text-[#F5C75E] bg-[#160B26] py-5 px-6 rounded-2xl border border-[#F5C75E]/30 shadow-inner gold-glow">
                {WORD_PUZZLES[wordIndex].scrambled}
              </div>
              <p className="text-xs text-[#FFF4DD]/70 italic mt-3">
                Hint: {WORD_PUZZLES[wordIndex].hint}
              </p>
            </div>

            <form onSubmit={handleWordSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Type your answer in capital letters..."
                value={wordInput}
                onChange={(e) => setWordInput(e.target.value)}
                className="w-full bg-[#160B26] border border-[#F5C75E]/30 rounded-xl px-4 py-3 text-center text-lg font-bold tracking-widest text-[#FFF4DD] focus:outline-none focus:border-[#F5C75E] uppercase"
              />
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F28C28] to-[#F5C75E] text-[#160B26] font-bold text-sm shadow hover:scale-[1.01] transition cursor-pointer"
              >
                Submit Answer ✨
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

