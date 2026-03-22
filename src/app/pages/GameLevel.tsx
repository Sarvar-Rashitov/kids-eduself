import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { X, Heart, Star, RotateCcw, Trophy } from "lucide-react";
import { audioService } from "@/services/audioService";
import { authService } from "@/services/authService";
import { useNavigate, useSearchParams } from "react-router";
import { CharacterMascot } from "@/app/components/CharacterMascot";

// ==================== MEMORY GAME ====================
interface Card {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

function MemoryGame({ level, onComplete }: { level: number; onComplete: (stars: number) => void }) {
  const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯"];
  const pairCount = level < 3 ? 4 : level < 5 ? 6 : 8;
  
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matched, setMatched] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const selectedEmojis = emojis.slice(0, pairCount);
    const pairs = [...selectedEmojis, ...selectedEmojis];
    const shuffled = pairs.sort(() => Math.random() - 0.5).map((emoji, index) => ({
      id: index,
      emoji,
      flipped: false,
      matched: false,
    }));
    setCards(shuffled);
  }, [level]);

  const handleCardClick = (id: number) => {
    if (isChecking || flipped.length === 2 || cards[id].matched || flipped.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);
    setCards(cards.map(card => card.id === id ? { ...card, flipped: true } : card));

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      setIsChecking(true);

      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        audioService.playSuccess();
        setCards(cards.map(card => 
          card.id === first || card.id === second ? { ...card, matched: true } : card
        ));
        setMatched(matched + 1);
        setFlipped([]);
        setIsChecking(false);

        if (matched + 1 === pairCount) {
          const stars = moves < pairCount * 2 ? 3 : moves < pairCount * 3 ? 2 : 1;
          setTimeout(() => onComplete(stars), 500);
        }
      } else {
        audioService.playError();
        setTimeout(() => {
          setCards(cards.map(card => 
            card.id === first || card.id === second ? { ...card, flipped: false } : card
          ));
          setFlipped([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-4 text-2xl font-bold text-gray-700">
        <span>🎯 Harakatlar: {moves}</span>
        <span>✅ Topildi: {matched}/{pairCount}</span>
      </div>
      <div className={`grid gap-4 ${pairCount <= 4 ? 'grid-cols-4' : pairCount <= 6 ? 'grid-cols-4' : 'grid-cols-4'}`}>
        {cards.map((card) => (
          <motion.button
            key={card.id}
            whileHover={{ scale: card.matched ? 1 : 1.05 }}
            whileTap={{ scale: card.matched ? 1 : 0.95 }}
            onClick={() => handleCardClick(card.id)}
            disabled={card.matched}
            className={`
              aspect-square rounded-2xl text-5xl flex items-center justify-center
              transition-all shadow-lg
              ${card.matched ? 'bg-green-200' : card.flipped ? 'bg-white' : 'bg-gradient-to-br from-purple-400 to-pink-400'}
              ${card.matched ? 'opacity-60' : ''}
            `}
          >
            {card.flipped || card.matched ? card.emoji : '?'}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ==================== WORD SCRAMBLE ====================
function WordScrambleGame({ level, onComplete }: { level: number; onComplete: (stars: number) => void }) {
  const words = [
    { word: "OLMA", scrambled: "MLAO", hint: "🍎 Meva" },
    { word: "MUSHUK", scrambled: "KHUMSU", hint: "🐱 Hayvon" },
    { word: "QUY", scrambled: "YQU", hint: "☀️ Osmon" },
    { word: "KITOB", scrambled: "TOBKI", hint: "📚 O'qish" },
    { word: "GULDON", scrambled: "DONGUL", hint: "🌺 Gullar uchun" },
  ];

  const currentWord = words[level - 1] || words[0];
  const [userAnswer, setUserAnswer] = useState("");
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = () => {
    setAttempts(attempts + 1);
    if (userAnswer.toUpperCase() === currentWord.word) {
      audioService.playSuccess();
      const stars = attempts === 0 ? 3 : attempts === 1 ? 2 : 1;
      setTimeout(() => onComplete(stars), 500);
    } else {
      audioService.playError();
      setUserAnswer("");
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="text-6xl mb-4">{currentWord.hint}</div>
        <div className="text-3xl font-bold text-gray-700 tracking-widest mb-2">
          {currentWord.scrambled}
        </div>
        <p className="text-gray-600">Harflarni to'g'ri tartibda yozing</p>
      </div>

      <div className="max-w-md mx-auto">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value.toUpperCase())}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          className="w-full p-4 text-2xl text-center font-bold rounded-2xl border-4 border-purple-300 focus:border-purple-500 outline-none"
          placeholder="Javobingizni kiriting"
          autoFocus
        />
        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl text-xl font-bold shadow-lg hover:shadow-xl transition-all"
        >
          Tekshirish ✓
        </button>
      </div>

      <div className="text-center text-lg text-gray-600">
        Urinishlar: {attempts}
      </div>
    </div>
  );
}

// ==================== NUMBER SORT ====================
function NumberSortGame({ level, onComplete }: { level: number; onComplete: (stars: number) => void }) {
  const count = level < 3 ? 5 : level < 5 ? 7 : 10;
  const [numbers, setNumbers] = useState<number[]>([]);
  const [sortedNumbers, setSortedNumbers] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const nums = Array.from({ length: count }, (_, i) => i + 1);
    const shuffled = [...nums].sort(() => Math.random() - 0.5);
    setNumbers(shuffled);
  }, [level]);

  const handleNumberClick = (num: number) => {
    if (!sortedNumbers.includes(num)) {
      const newSorted = [...sortedNumbers, num];
      setSortedNumbers(newSorted);
      
      if (newSorted.length === numbers.length) {
        setAttempts(attempts + 1);
        const isCorrect = newSorted.every((n, i) => n === i + 1);
        if (isCorrect) {
          audioService.playSuccess();
          const stars = attempts === 0 ? 3 : attempts === 1 ? 2 : 1;
          setTimeout(() => onComplete(stars), 500);
        } else {
          audioService.playError();
          setTimeout(() => {
            setSortedNumbers([]);
          }, 1000);
        }
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-700 mb-2">
          Raqamlarni kichikdan kattaga tartibla! 🔢
        </h3>
        <p className="text-gray-600">Urinishlar: {attempts}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {numbers.map((num) => (
          <motion.button
            key={num}
            whileHover={{ scale: sortedNumbers.includes(num) ? 1 : 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleNumberClick(num)}
            disabled={sortedNumbers.includes(num)}
            className={`
              w-16 h-16 rounded-2xl text-3xl font-bold shadow-lg
              ${sortedNumbers.includes(num) 
                ? 'bg-gray-300 text-gray-500 opacity-50' 
                : 'bg-gradient-to-br from-orange-400 to-red-400 text-white hover:shadow-xl'
              }
            `}
          >
            {num}
          </motion.button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2 min-h-[80px] bg-white/50 rounded-2xl p-4">
        {sortedNumbers.length > 0 ? (
          sortedNumbers.map((num, index) => (
            <div key={index} className="w-14 h-14 bg-blue-500 text-white rounded-xl flex items-center justify-center text-2xl font-bold">
              {num}
            </div>
          ))
        ) : (
          <p className="text-gray-400">Raqamlarni tartibla...</p>
        )}
      </div>
    </div>
  );
}

// ==================== PUZZLE GAME ====================
function PuzzleGame({ level, onComplete }: { level: number; onComplete: (stars: number) => void }) {
  const gridSize = level < 3 ? 2 : level < 5 ? 3 : 4;
  const totalPieces = gridSize * gridSize;
  const [pieces, setPieces] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const shuffled = Array.from({ length: totalPieces - 1 }, (_, i) => i + 1);
    shuffled.push(0); // 0 represents empty space
    // Shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setPieces(shuffled);
  }, [level]);

  const handlePieceClick = (index: number) => {
    const emptyIndex = pieces.indexOf(0);
    const canMove = 
      (index === emptyIndex - 1 && emptyIndex % gridSize !== 0) || // Left
      (index === emptyIndex + 1 && index % gridSize !== 0) || // Right
      index === emptyIndex - gridSize || // Up
      index === emptyIndex + gridSize; // Down

    if (canMove) {
      const newPieces = [...pieces];
      [newPieces[index], newPieces[emptyIndex]] = [newPieces[emptyIndex], newPieces[index]];
      setPieces(newPieces);
      setMoves(moves + 1);
      audioService.playClick();

      // Check if solved
      const isSolved = newPieces.every((piece, i) => i === totalPieces - 1 ? piece === 0 : piece === i + 1);
      if (isSolved) {
        audioService.playSuccess();
        const stars = moves < totalPieces * 3 ? 3 : moves < totalPieces * 5 ? 2 : 1;
        setTimeout(() => onComplete(stars), 500);
      }
    } else {
      audioService.playError();
    }
  };

  const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔'];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-700 mb-2">
          Rasmni to'g'ri tartibda joylashtiring! 🧩
        </h3>
        <p className="text-gray-600">Harakatlar: {moves}</p>
      </div>

      <div 
        className="grid gap-2 mx-auto max-w-md"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {pieces.map((piece, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: piece === 0 ? 1 : 1.05 }}
            whileTap={{ scale: piece === 0 ? 1 : 0.95 }}
            onClick={() => handlePieceClick(index)}
            className={`
              aspect-square rounded-xl text-4xl flex items-center justify-center font-bold shadow-lg
              ${piece === 0 
                ? 'bg-gray-200 cursor-default' 
                : 'bg-gradient-to-br from-blue-400 to-purple-400 text-white cursor-pointer hover:shadow-xl'
              }
            `}
          >
            {piece !== 0 && emojis[piece - 1]}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ==================== COLOR MATCH ====================
function ColorMatchGame({ level, onComplete }: { level: number; onComplete: (stars: number) => void }) {
  const colors = [
    { name: 'Qizil', color: 'bg-red-500', emoji: '🔴' },
    { name: 'Ko\'k', color: 'bg-blue-500', emoji: '🔵' },
    { name: 'Yashil', color: 'bg-green-500', emoji: '🟢' },
    { name: 'Sariq', color: 'bg-yellow-500', emoji: '🟡' },
    { name: 'Pushti', color: 'bg-pink-500', emoji: '🩷' },
    { name: 'Binafsha', color: 'bg-purple-500', emoji: '🟣' },
  ];

  const count = level < 3 ? 3 : level < 5 ? 4 : 6;
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [options, setOptions] = useState<typeof colors>([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const totalRounds = 5;

  useEffect(() => {
    const selectedColors = colors.slice(0, count);
    const shuffled = [...selectedColors].sort(() => Math.random() - 0.5);
    const target = shuffled[Math.floor(Math.random() * shuffled.length)];
    setCurrentColor(target);
    setOptions(shuffled);
  }, [level, round]);

  const handleColorClick = (color: typeof colors[0]) => {
    if (color.name === currentColor.name) {
      audioService.playSuccess();
      setScore(score + 1);
    } else {
      audioService.playError();
    }

    if (round + 1 >= totalRounds) {
      const stars = score >= 4 ? 3 : score >= 3 ? 2 : 1;
      setTimeout(() => onComplete(stars), 500);
    } else {
      setTimeout(() => setRound(round + 1), 500);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-700 mb-4">
          To'g'ri rangni tanlang! 🎨
        </h3>
        <div className="text-5xl mb-4">{currentColor.emoji}</div>
        <p className="text-3xl font-bold text-gray-800 mb-2">{currentColor.name}</p>
        <p className="text-gray-600">Ball: {score}/{round + 1} | Round: {round + 1}/{totalRounds}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
        {options.map((color) => (
          <motion.button
            key={color.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleColorClick(color)}
            className={`${color.color} h-24 rounded-2xl shadow-lg hover:shadow-xl transition-all`}
          />
        ))}
      </div>
    </div>
  );
}

// ==================== SHAPE MATCH ====================
function ShapeMatchGame({ level, onComplete }: { level: number; onComplete: (stars: number) => void }) {
  const shapes = [
    { name: 'Doira', emoji: '⭕', shape: 'circle' },
    { name: 'Kvadrat', emoji: '🟦', shape: 'square' },
    { name: 'Uchburchak', emoji: '🔺', shape: 'triangle' },
    { name: 'Yulduz', emoji: '⭐', shape: 'star' },
    { name: 'Yurak', emoji: '❤️', shape: 'heart' },
    { name: 'Olti burchak', emoji: '⬡', shape: 'hexagon' },
  ];

  const count = level < 3 ? 3 : level < 5 ? 4 : 6;
  const [currentShape, setCurrentShape] = useState(shapes[0]);
  const [options, setOptions] = useState<typeof shapes>([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const totalRounds = 5;

  useEffect(() => {
    const selectedShapes = shapes.slice(0, count);
    const shuffled = [...selectedShapes].sort(() => Math.random() - 0.5);
    const target = shuffled[Math.floor(Math.random() * shuffled.length)];
    setCurrentShape(target);
    setOptions(shuffled);
  }, [level, round]);

  const handleShapeClick = (shape: typeof shapes[0]) => {
    if (shape.name === currentShape.name) {
      audioService.playSuccess();
      setScore(score + 1);
    } else {
      audioService.playError();
    }

    if (round + 1 >= totalRounds) {
      const stars = score >= 4 ? 3 : score >= 3 ? 2 : 1;
      setTimeout(() => onComplete(stars), 500);
    } else {
      setTimeout(() => setRound(round + 1), 500);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-700 mb-4">
          To'g'ri shaklni toping! 🔷
        </h3>
        <p className="text-3xl font-bold text-gray-800 mb-4">{currentShape.name}</p>
        <p className="text-gray-600">Ball: {score}/{round + 1} | Round: {round + 1}/{totalRounds}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
        {options.map((shape) => (
          <motion.button
            key={shape.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleShapeClick(shape)}
            className="bg-gradient-to-br from-indigo-400 to-purple-400 h-32 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-6xl"
          >
            {shape.emoji}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ==================== MATH QUIZ ====================
function MathQuizGame({ level, onComplete }: { level: number; onComplete: (stars: number) => void }) {
  const [question, setQuestion] = useState({ num1: 0, num2: 0, operator: '+', answer: 0 });
  const [options, setOptions] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const totalRounds = 5;

  useEffect(() => {
    const maxNum = level < 3 ? 10 : level < 5 ? 20 : 50;
    const operators = level < 3 ? ['+'] : level < 5 ? ['+', '-'] : ['+', '-', '×'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    let num1 = Math.floor(Math.random() * maxNum) + 1;
    let num2 = Math.floor(Math.random() * maxNum) + 1;
    
    // Make sure subtraction doesn't give negative result
    if (operator === '-' && num2 > num1) {
      [num1, num2] = [num2, num1];
    }
    
    let answer = 0;
    if (operator === '+') answer = num1 + num2;
    else if (operator === '-') answer = num1 - num2;
    else if (operator === '×') answer = num1 * num2;

    const wrongAnswers = [
      answer + Math.floor(Math.random() * 5) + 1,
      answer - Math.floor(Math.random() * 5) - 1,
      answer + Math.floor(Math.random() * 10) + 5,
    ];

    const allOptions = [answer, ...wrongAnswers].sort(() => Math.random() - 0.5);

    setQuestion({ num1, num2, operator, answer });
    setOptions(allOptions);
  }, [level, round]);

  const handleAnswer = (selectedAnswer: number) => {
    if (selectedAnswer === question.answer) {
      audioService.playSuccess();
      setScore(score + 1);
    } else {
      audioService.playError();
    }

    if (round + 1 >= totalRounds) {
      const stars = score >= 4 ? 3 : score >= 3 ? 2 : 1;
      setTimeout(() => onComplete(stars), 500);
    } else {
      setTimeout(() => setRound(round + 1), 500);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-700 mb-4">
          Hisoblang va javob bering! ➕
        </h3>
        <p className="text-gray-600 mb-4">Ball: {score}/{round + 1} | Round: {round + 1}/{totalRounds}</p>
        
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-8 mb-6 inline-block">
          <p className="text-5xl font-bold text-gray-800">
            {question.num1} {question.operator} {question.num2} = ?
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
        {options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAnswer(option)}
            className="bg-gradient-to-br from-yellow-400 to-amber-400 h-20 rounded-2xl shadow-lg hover:shadow-xl transition-all text-3xl font-bold text-white"
          >
            {option}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ==================== ANIMAL FIND ====================
function AnimalFindGame({ level, onComplete }: { level: number; onComplete: (stars: number) => void }) {
  const animals = [
    { name: 'It', emoji: '🐶', sound: 'Vov-vov!' },
    { name: 'Mushuk', emoji: '🐱', sound: 'Miyav!' },
    { name: 'Sigir', emoji: '🐮', sound: 'Moo!' },
    { name: 'Qo\'y', emoji: '🐑', sound: 'Bee!' },
    { name: 'Tovuq', emoji: '🐔', sound: 'Quo-quo!' },
    { name: 'Ot', emoji: '🐴', sound: 'Ihaha!' },
    { name: 'Cho\'chqa', emoji: '🐷', sound: 'Xro-xro!' },
    { name: 'Qush', emoji: '🐦', sound: 'Chiv-chiv!' },
  ];

  const count = level < 3 ? 4 : level < 5 ? 6 : 8;
  const [targetAnimal, setTargetAnimal] = useState(animals[0]);
  const [gridAnimals, setGridAnimals] = useState<typeof animals>([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const totalRounds = 5;

  useEffect(() => {
    const selectedAnimals = animals.slice(0, count);
    const target = selectedAnimals[Math.floor(Math.random() * selectedAnimals.length)];
    
    // Create grid with target animal and random animals
    const grid = [];
    const targetCount = Math.floor(count / 2);
    
    for (let i = 0; i < targetCount; i++) {
      grid.push(target);
    }
    
    while (grid.length < count * 2) {
      const randomAnimal = selectedAnimals[Math.floor(Math.random() * selectedAnimals.length)];
      if (randomAnimal.name !== target.name) {
        grid.push(randomAnimal);
      }
    }
    
    grid.sort(() => Math.random() - 0.5);
    
    setTargetAnimal(target);
    setGridAnimals(grid);
    setAttempts(0);
  }, [level, round]);

  const handleAnimalClick = (animal: typeof animals[0]) => {
    setAttempts(attempts + 1);
    
    if (animal.name === targetAnimal.name) {
      audioService.playSuccess();
      setScore(score + 1);
      
      if (round + 1 >= totalRounds) {
        const stars = score + 1 >= 4 ? 3 : score + 1 >= 3 ? 2 : 1;
        setTimeout(() => onComplete(stars), 500);
      } else {
        setTimeout(() => setRound(round + 1), 800);
      }
    } else {
      audioService.playError();
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-700 mb-4">
          Hayvonni toping! 🦁
        </h3>
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-3xl p-6 mb-4 inline-block">
          <p className="text-xl text-gray-700 mb-2">Quyidagi hayvonni toping:</p>
          <div className="text-6xl mb-2">{targetAnimal.emoji}</div>
          <p className="text-2xl font-bold text-gray-800">{targetAnimal.name}</p>
          <p className="text-gray-600 italic">"{targetAnimal.sound}"</p>
        </div>
        <p className="text-gray-600">Ball: {score}/{round + 1} | Round: {round + 1}/{totalRounds}</p>
      </div>

      <div className="grid grid-cols-4 gap-3 max-w-2xl mx-auto">
        {gridAnimals.map((animal, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAnimalClick(animal)}
            className="bg-gradient-to-br from-green-400 to-emerald-400 aspect-square rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-5xl"
          >
            {animal.emoji}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ==================== MAIN GAME LEVEL COMPONENT ====================
export function GameLevel() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const gameId = searchParams.get("game") || "memory";
  const levelNum = parseInt(searchParams.get("level") || "1");

  const [isComplete, setIsComplete] = useState(false);
  const [earnedStars, setEarnedStars] = useState(0);

  const gameConfig: Record<string, { title: string; icon: string; color: string }> = {
    memory: { title: "Xotira o'yini", icon: "🃏", color: "from-purple-400 to-pink-400" },
    wordscramble: { title: "So'z topish", icon: "📝", color: "from-green-400 to-emerald-400" },
    numbersort: { title: "Raqam tartibi", icon: "🔢", color: "from-orange-400 to-red-400" },
    puzzle: { title: "Puzzle o'yini", icon: "🧩", color: "from-blue-400 to-purple-400" },
    colormatch: { title: "Rang topish", icon: "🎨", color: "from-red-400 to-pink-400" },
    shapematch: { title: "Shakl topish", icon: "🔷", color: "from-indigo-400 to-purple-400" },
    mathquiz: { title: "Matematika savollari", icon: "➕", color: "from-yellow-400 to-amber-400" },
    animalfind: { title: "Hayvon topish", icon: "动物园", color: "from-green-400 to-emerald-400" },
  };

  const config = gameConfig[gameId] || gameConfig.memory;

  const handleComplete = (stars: number) => {
    setEarnedStars(stars);
    setIsComplete(true);
    authService.completeLesson(`game_${gameId}_level${levelNum}`, 'game', stars);
    authService.addXP(stars * 20);
    authService.addStars(stars);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-green-50 to-blue-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-[3rem] p-8 shadow-2xl text-center max-w-md"
        >
          <CharacterMascot mood="celebrating" size="lg" />
          <h2 className="text-3xl font-bold text-gray-800 mt-6 mb-4">
            Barakalla! 🎉
          </h2>
          <p className="text-gray-600 mb-6">
            Siz Level {levelNum}ni muvaffaqiyatli tugatdingiz!
          </p>

          <div className="flex justify-center gap-2 mb-6">
            {[...Array(3)].map((_, i) => (
              <Star
                key={i}
                className={`h-12 w-12 ${i < earnedStars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                audioService.playClick();
                navigate(`/games`);
              }}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              O'yinlarga qaytish 🎮
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 pb-8">
      {/* Header */}
      <div className="bg-white rounded-b-[3rem] shadow-lg p-6 mb-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => {
              audioService.playClick();
              navigate("/games");
            }}
            className="p-3 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors"
          >
            <X className="h-6 w-6 text-gray-700" />
          </button>

          <h1 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span>{config.icon}</span>
            {config.title} - Level {levelNum}
          </h1>

          <div className="w-14" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {gameId === "memory" && <MemoryGame level={levelNum} onComplete={handleComplete} />}
        {gameId === "wordscramble" && <WordScrambleGame level={levelNum} onComplete={handleComplete} />}
        {gameId === "numbersort" && <NumberSortGame level={levelNum} onComplete={handleComplete} />}
        {gameId === "puzzle" && <PuzzleGame level={levelNum} onComplete={handleComplete} />}
        {gameId === "colormatch" && <ColorMatchGame level={levelNum} onComplete={handleComplete} />}
        {gameId === "shapematch" && <ShapeMatchGame level={levelNum} onComplete={handleComplete} />}
        {gameId === "mathquiz" && <MathQuizGame level={levelNum} onComplete={handleComplete} />}
        {gameId === "animalfind" && <AnimalFindGame level={levelNum} onComplete={handleComplete} />}
      </div>
    </div>
  );
}