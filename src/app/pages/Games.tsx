import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, Trophy, Star, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router";
import { KidsNavBar } from "@/app/components/KidsNavBar";
import { audioService } from "@/services/audioService";
import { authService } from "@/services/authService";

// ──────────────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────────────
type GameId = "menu" | "memory" | "puzzle" | "wordscramble" | "numbersort" | "colormatch";

// ──────────────────────────────────────────────────────────────────────────────
// MEMORY MATCH DATA
// ──────────────────────────────────────────────────────────────────────────────
const MEMORY_ITEMS = [
  { id: "cat",    emoji: "🐱", label: "Mushuk" },
  { id: "dog",    emoji: "🐶", label: "It" },
  { id: "rabbit", emoji: "🐰", label: "Quyon" },
  { id: "fox",    emoji: "🦊", label: "Tulki" },
  { id: "bear",   emoji: "🐻", label: "Ayiq" },
  { id: "lion",   emoji: "🦁", label: "Sher" },
  { id: "tiger",  emoji: "🐯", label: "Yo'lbars" },
  { id: "monkey", emoji: "🐵", label: "Maymun" },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ──────────────────────────────────────────────────────────────────────────────
// MEMORY MATCH GAME
// ──────────────────────────────────────────────────────────────────────────────
function MemoryMatch({ onBack }: { onBack: () => void }) {
  const initCards = () =>
    shuffle([...MEMORY_ITEMS, ...MEMORY_ITEMS].map((item, i) => ({
      ...item,
      uid: `${item.id}-${i}`,
      flipped: false,
      matched: false,
    })));

  const [cards, setCards] = useState(initCards);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [locked, setLocked] = useState(false);

  const handleFlip = (uid: string) => {
    if (locked) return;
    const card = cards.find(c => c.uid === uid);
    if (!card || card.flipped || card.matched) return;

    const newFlipped = [...flipped, uid];
    const newCards = cards.map(c => c.uid === uid ? { ...c, flipped: true } : c);
    setCards(newCards);
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setLocked(true);
      setMoves(m => m + 1);
      const [a, b] = newFlipped.map(id => newCards.find(c => c.uid === id)!);
      if (a.id === b.id) {
        const matched = newCards.map(c =>
          c.uid === a.uid || c.uid === b.uid ? { ...c, matched: true } : c
        );
        setCards(matched);
        setFlipped([]);
        setLocked(false);
        audioService.playSuccess();
        if (matched.every(c => c.matched)) {
          setWon(true);
          audioService.playReward();
          authService.addStars(5);
        }
      } else {
        audioService.playError();
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            newFlipped.includes(c.uid) ? { ...c, flipped: false } : c
          ));
          setFlipped([]);
          setLocked(false);
        }, 900);
      }
    }
  };

  const reset = () => {
    setCards(initCards());
    setFlipped([]);
    setMoves(0);
    setWon(false);
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-between w-full mb-4">
        <p className="text-gray-600 font-semibold">Harakatlar: <span className="text-purple-600">{moves}</span></p>
        <button onClick={reset} className="flex items-center gap-1 px-4 py-2 bg-gray-100 rounded-2xl text-gray-700 font-bold">
          <RotateCcw className="h-4 w-4" /> Qayta
        </button>
      </div>

      {won ? (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center py-8">
          <div className="text-8xl mb-4">🎉</div>
          <p className="text-3xl font-bold text-gray-800 mb-2">Barakalla!</p>
          <p className="text-gray-600 mb-2">{moves} ta harakatda topdingiz!</p>
          <p className="text-yellow-500 font-bold mb-6">+5 yulduz qo'shildi! ⭐</p>
          <button
            onClick={reset}
            className="px-8 py-4 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-3xl font-bold shadow-lg"
          >
            Yana o'ynash
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-4 gap-2 md:gap-3 w-full max-w-sm md:max-w-md">
          {cards.map(card => (
            <motion.button
              key={card.uid}
              onClick={() => handleFlip(card.uid)}
              whileTap={{ scale: 0.9 }}
              className="aspect-square"
            >
              <motion.div
                animate={{ rotateY: card.flipped || card.matched ? 180 : 0 }}
                transition={{ duration: 0.35 }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative w-full h-full"
              >
                {/* Back */}
                <div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center shadow-md"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <span className="text-3xl">⭐</span>
                </div>
                {/* Front */}
                <div
                  className={`absolute inset-0 rounded-2xl flex flex-col items-center justify-center shadow-md
                    ${card.matched ? "bg-gradient-to-br from-green-300 to-emerald-300" : "bg-white"}`}
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <span className="text-3xl md:text-4xl">{card.emoji}</span>
                  <span className="text-xs text-gray-600 font-semibold mt-1">{card.label}</span>
                </div>
              </motion.div>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// JIGSAW PUZZLE GAME  (3×3 sliding tile)
// ──────────────────────────────────────────────────────────────────────────────
const PUZZLES = [
  { emoji: "🐱", label: "Mushuk", tiles: ["🐱","😺","😸","😻","🐾","🎀","😹","🐈","🌟"] },
  { emoji: "🌈", label: "Kamalak", tiles: ["🔴","🟠","🟡","🟢","🔵","🟣","⭐","🌟","✨"] },
  { emoji: "🍎", label: "Mevalar", tiles: ["🍎","🍊","🍋","🍇","🍓","🍑","🍒","🍉","🥝"] },
];

function JigsawPuzzle({ onBack }: { onBack: () => void }) {
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const puzzle = PUZZLES[puzzleIdx];

  // Sliding tile puzzle: 8 tiles + 1 empty (index 8 = empty)
  const solved = [0,1,2,3,4,5,6,7,8];
  const [tiles, setTiles] = useState<number[]>(() => shufflePuzzle(solved));
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  function shufflePuzzle(arr: number[]) {
    let a = [...arr];
    for (let i = 0; i < 200; i++) {
      const empty = a.indexOf(8);
      const neighbors = getNeighbors(empty);
      const rnd = neighbors[Math.floor(Math.random() * neighbors.length)];
      [a[empty], a[rnd]] = [a[rnd], a[empty]];
    }
    return a;
  }

  function getNeighbors(idx: number) {
    const row = Math.floor(idx / 3), col = idx % 3;
    const n = [];
    if (row > 0) n.push(idx - 3);
    if (row < 2) n.push(idx + 3);
    if (col > 0) n.push(idx - 1);
    if (col < 2) n.push(idx + 1);
    return n;
  }

  const clickTile = (pos: number) => {
    if (won) return;
    const empty = tiles.indexOf(8);
    if (!getNeighbors(empty).includes(pos)) return;
    const next = [...tiles];
    [next[empty], next[pos]] = [next[pos], next[empty]];
    setTiles(next);
    setMoves(m => m + 1);
    audioService.playClick();
    if (next.every((v, i) => v === i)) {
      setWon(true);
      audioService.playReward();
      authService.addStars(5);
    }
  };

  const reset = () => {
    setTiles(shufflePuzzle(solved));
    setMoves(0);
    setWon(false);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Puzzle selector */}
      <div className="flex gap-2 mb-4">
        {PUZZLES.map((p, i) => (
          <button
            key={i}
            onClick={() => { setPuzzleIdx(i); reset(); }}
            className={`px-4 py-2 rounded-2xl font-bold text-sm transition-all
              ${i === puzzleIdx ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-md" : "bg-white text-gray-600 shadow-sm"}`}
          >
            {p.emoji} {p.label}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between w-full mb-4">
        <p className="text-gray-600 font-semibold">Harakatlar: <span className="text-purple-600">{moves}</span></p>
        <button onClick={reset} className="flex items-center gap-1 px-4 py-2 bg-gray-100 rounded-2xl text-gray-700 font-bold">
          <RotateCcw className="h-4 w-4" /> Qayta
        </button>
      </div>

      {won ? (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center py-8">
          <div className="text-8xl mb-4">🎊</div>
          <p className="text-3xl font-bold text-gray-800 mb-2">Zo'r!</p>
          <p className="text-gray-600 mb-2">{moves} ta harakatda yig'dingiz!</p>
          <p className="text-yellow-500 font-bold mb-6">+5 yulduz! ⭐</p>
          <button onClick={reset} className="px-8 py-4 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-3xl font-bold shadow-lg">
            Yana o'ynash
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-3 gap-2 w-64 md:w-80">
          {tiles.map((tile, pos) => (
            <motion.button
              key={pos}
              onClick={() => clickTile(pos)}
              whileTap={{ scale: 0.92 }}
              className={`w-full aspect-square rounded-2xl text-3xl md:text-4xl font-bold shadow-md transition-all
                ${tile === 8
                  ? "bg-gray-100 shadow-inner opacity-0"
                  : "bg-gradient-to-br from-indigo-100 to-purple-100 hover:from-indigo-200 hover:to-purple-200 cursor-pointer"
                }`}
            >
              {tile !== 8 ? puzzle.tiles[tile] : ""}
            </motion.button>
          ))}
        </div>
      )}
      <p className="text-gray-400 text-xs mt-4 text-center">Bo'sh katakka yaqin parchalarni bosing!</p>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// WORD SCRAMBLE
// ──────────────────────────────────────────────────────────────────────────────
const SCRAMBLE_WORDS = [
  { word: "MUSHUK", emoji: "🐱", hint: "Uy hayvoni, miyovlaydi" },
  { word: "KITOB",  emoji: "📚", hint: "O'qiladigan narsa" },
  { word: "OLMA",   emoji: "🍎", hint: "Qizil meva" },
  { word: "BOLA",   emoji: "👦", hint: "Kichkina inson" },
  { word: "QUYOSH", emoji: "☀️", hint: "Osmonda porlaydi" },
  { word: "DARAXT", emoji: "🌳", hint: "Bargli o'simlik" },
  { word: "BALIQ",  emoji: "🐟", hint: "Suvda yashaydigan" },
  { word: "GULSARA",emoji: "🌸", hint: "Qiz ismi, gul kabi" },
];

function WordScramble({ onBack }: { onBack: () => void }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [scrambled, setScrambled] = useState<string[]>([]);
  const [result, setResult] = useState<"idle"|"correct"|"wrong">("idle");
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const current = SCRAMBLE_WORDS[idx];

  useEffect(() => {
    const letters = current.word.split("");
    let shuffled = shuffle(letters);
    while (shuffled.join("") === current.word) shuffled = shuffle(letters);
    setScrambled(shuffled);
    setSelected([]);
    setResult("idle");
    setShowHint(false);
  }, [idx]);

  const toggleLetter = (i: number) => {
    if (result !== "idle") return;
    if (selected.includes(i)) {
      setSelected(selected.filter(s => s !== i));
    } else {
      const next = [...selected, i];
      setSelected(next);
      if (next.length === current.word.length) {
        const formed = next.map(n => scrambled[n]).join("");
        if (formed === current.word) {
          setResult("correct");
          audioService.playSuccess();
          setScore(s => s + 1);
          authService.addStars(1);
          setTimeout(() => {
            if (idx < SCRAMBLE_WORDS.length - 1) setIdx(i => i + 1);
            else { audioService.playReward(); authService.addStars(5); setIdx(0); setScore(0); }
          }, 1200);
        } else {
          setResult("wrong");
          audioService.playError();
          setTimeout(() => { setSelected([]); setResult("idle"); }, 900);
        }
      }
    }
  };

  const formed = selected.map(i => scrambled[i]).join("");

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-between w-full mb-4">
        <p className="text-gray-600 font-semibold">
          Savol: <span className="text-purple-600">{idx + 1}/{SCRAMBLE_WORDS.length}</span>
        </p>
        <p className="text-yellow-500 font-bold">⭐ {score}</p>
      </div>

      {/* Emoji & hint */}
      <motion.div
        key={idx}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="text-7xl mb-3"
      >
        {current.emoji}
      </motion.div>

      <button
        onClick={() => setShowHint(h => !h)}
        className="mb-4 px-4 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold"
      >
        💡 {showHint ? current.hint : "Ko'rsatma ko'rsatish"}
      </button>

      {/* Formed word display */}
      <div className={`flex gap-2 mb-6 min-h-[3.5rem] items-center`}>
        {Array.from({ length: current.word.length }).map((_, i) => (
          <div
            key={i}
            className={`w-10 h-12 border-b-4 flex items-end justify-center pb-1 font-bold text-xl
              ${result === "correct" ? "border-green-400 text-green-600" : result === "wrong" ? "border-red-400 text-red-600" : "border-purple-400 text-gray-800"}`}
          >
            {formed[i] || ""}
          </div>
        ))}
      </div>

      {/* Scrambled letters */}
      <div className="flex flex-wrap gap-3 justify-center">
        {scrambled.map((letter, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleLetter(i)}
            className={`w-12 h-14 rounded-2xl font-bold text-xl shadow-md transition-all
              ${selected.includes(i)
                ? "bg-purple-400 text-white scale-95 opacity-50"
                : "bg-white text-gray-800 hover:bg-purple-50"
              }`}
          >
            {letter}
          </motion.button>
        ))}
      </div>

      {result === "correct" && (
        <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-6 text-2xl font-bold text-green-500">
          ✅ Zo'r! To'g'ri!
        </motion.p>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// NUMBER SORT GAME
// ──────────────────────────────────────────────────────────────────────────────
function NumberSort({ onBack }: { onBack: () => void }) {
  const LEVEL_SIZES = [5, 7, 10];
  const [level, setLevel] = useState(0);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [sorted, setSorted] = useState(false);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);

  const initLevel = useCallback((lvl: number) => {
    const size = LEVEL_SIZES[lvl];
    const nums = shuffle(Array.from({ length: size }, (_, i) => i + 1));
    setNumbers(nums);
    setSelected(null);
    setSorted(false);
    setMoves(0);
  }, []);

  useEffect(() => { initLevel(level); }, [level, initLevel]);

  const clickNumber = (idx: number) => {
    if (sorted) return;
    if (selected === null) {
      setSelected(idx);
    } else {
      if (selected === idx) { setSelected(null); return; }
      const next = [...numbers];
      [next[selected], next[idx]] = [next[idx], next[selected]];
      setNumbers(next);
      setSelected(null);
      setMoves(m => m + 1);
      audioService.playClick();
      if (next.every((v, i) => v === i + 1)) {
        setSorted(true);
        audioService.playReward();
        authService.addStars(level + 1);
        setScore(s => s + level + 1);
      }
    }
  };

  const size = LEVEL_SIZES[level];

  return (
    <div className="flex flex-col items-center">
      {/* Level selector */}
      <div className="flex gap-2 mb-4">
        {["Oson", "O'rta", "Qiyin"].map((lbl, i) => (
          <button
            key={i}
            onClick={() => { setLevel(i); }}
            className={`px-4 py-2 rounded-2xl font-bold text-sm transition-all
              ${i === level ? "bg-gradient-to-r from-green-400 to-emerald-400 text-white shadow-md" : "bg-white text-gray-600 shadow-sm"}`}
          >
            {lbl}
          </button>
        ))}
      </div>

      <p className="text-gray-500 text-sm mb-4 text-center">
        Raqamlarni 1 dan {size} gacha tartibda joylashtiring!<br/>
        Ikki raqamni bosib almashtiring.
      </p>

      <div className="flex items-center justify-between w-full mb-4">
        <p className="text-gray-600 font-semibold">Harakatlar: <span className="text-purple-600">{moves}</span></p>
        <p className="text-yellow-500 font-bold">⭐ {score}</p>
        <button onClick={() => initLevel(level)} className="flex items-center gap-1 px-4 py-2 bg-gray-100 rounded-2xl text-gray-700 font-bold">
          <RotateCcw className="h-4 w-4" /> Qayta
        </button>
      </div>

      {sorted ? (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center py-6">
          <div className="text-8xl mb-4">🏆</div>
          <p className="text-3xl font-bold text-gray-800 mb-2">Ajoyib!</p>
          <p className="text-gray-600 mb-1">{moves} ta harakatda tartibladingiz!</p>
          <p className="text-yellow-500 font-bold mb-6">+{level+1} yulduz! ⭐</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => initLevel(level)} className="px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-400 text-white rounded-3xl font-bold shadow-lg">
              Yana o'ynash
            </button>
            {level < 2 && (
              <button onClick={() => setLevel(l => l + 1)} className="px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-3xl font-bold shadow-lg">
                Keyingi daraja →
              </button>
            )}
          </div>
        </motion.div>
      ) : (
        <div className={`flex flex-wrap gap-3 justify-center max-w-xs`}>
          {numbers.map((num, idx) => (
            <motion.button
              key={idx}
              onClick={() => clickNumber(idx)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{ scale: selected === idx ? 1.15 : 1 }}
              className={`w-14 h-14 rounded-2xl font-bold text-2xl shadow-md transition-all
                ${selected === idx
                  ? "bg-gradient-to-br from-yellow-300 to-orange-400 text-white ring-4 ring-yellow-300"
                  : num === idx + 1
                    ? "bg-gradient-to-br from-green-300 to-emerald-400 text-white"
                    : "bg-white text-gray-800 hover:bg-purple-50"
                }`}
            >
              {num}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// COLOR MATCH GAME
// ──────────────────────────────────────────────────────────────────────────────
const COLOR_DATA = [
  { name: "Qizil",    nameEn: "Red",    bg: "bg-red-400",    ring: "ring-red-400" },
  { name: "Ko'k",     nameEn: "Blue",   bg: "bg-blue-400",   ring: "ring-blue-400" },
  { name: "Sariq",    nameEn: "Yellow", bg: "bg-yellow-400", ring: "ring-yellow-400" },
  { name: "Yashil",   nameEn: "Green",  bg: "bg-green-400",  ring: "ring-green-400" },
  { name: "To'q sariq",nameEn: "Orange",bg: "bg-orange-400", ring: "ring-orange-400" },
  { name: "Binafsha", nameEn: "Purple", bg: "bg-purple-400", ring: "ring-purple-400" },
  { name: "Pushti",   nameEn: "Pink",   bg: "bg-pink-400",   ring: "ring-pink-400" },
  { name: "Moviy",    nameEn: "Cyan",   bg: "bg-cyan-400",   ring: "ring-cyan-400" },
];

function ColorMatch({ onBack }: { onBack: () => void }) {
  const [target, setTarget] = useState(() => Math.floor(Math.random() * COLOR_DATA.length));
  const [options, setOptions] = useState<number[]>([]);
  const [result, setResult] = useState<"idle"|"correct"|"wrong">("idle");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const TOTAL_ROUNDS = 10;

  const nextRound = useCallback((newScore: number) => {
    const newTarget = Math.floor(Math.random() * COLOR_DATA.length);
    const others = COLOR_DATA
      .map((_, i) => i)
      .filter(i => i !== newTarget)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const opts = shuffle([newTarget, ...others]);
    setTarget(newTarget);
    setOptions(opts);
    setResult("idle");
  }, []);

  useEffect(() => { nextRound(0); }, [nextRound]);

  const [done, setDone] = useState(false);

  const handlePick = (idx: number) => {
    if (result !== "idle") return;
    if (idx === target) {
      setResult("correct");
      audioService.playSuccess();
      const ns = score + 1;
      setScore(ns);
      authService.addStars(1);
    } else {
      setResult("wrong");
      audioService.playError();
    }
    setTimeout(() => {
      if (round >= TOTAL_ROUNDS) { setDone(true); audioService.playReward(); authService.addStars(3); }
      else { setRound(r => r + 1); nextRound(score); }
    }, 800);
  };

  const reset = () => {
    setScore(0);
    setRound(1);
    setDone(false);
    nextRound(0);
  };

  if (done) return (
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center py-8">
      <div className="text-8xl mb-4">🌈</div>
      <p className="text-3xl font-bold text-gray-800 mb-2">Tugadi!</p>
      <p className="text-gray-600 mb-1">{score}/{TOTAL_ROUNDS} to'g'ri javob!</p>
      <p className="text-yellow-500 font-bold mb-6">+{score + 3} yulduz! ⭐</p>
      <button onClick={reset} className="px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-3xl font-bold shadow-lg">
        Yana o'ynash
      </button>
    </motion.div>
  );

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-between w-full mb-6">
        <p className="text-gray-600 font-semibold">Savol: <span className="text-purple-600">{round}/{TOTAL_ROUNDS}</span></p>
        <p className="text-yellow-500 font-bold">⭐ {score}</p>
      </div>

      {/* Question: show color name, pick the matching color circle */}
      <p className="text-gray-500 text-sm mb-2">Ushbu rangni toping:</p>
      <motion.div
        key={round}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="text-4xl font-bold text-gray-800 mb-8 px-8 py-4 bg-white rounded-3xl shadow-lg"
      >
        {COLOR_DATA[target].name}
        <span className="text-lg text-gray-500 ml-2">({COLOR_DATA[target].nameEn})</span>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
        {options.map((optIdx) => (
          <motion.button
            key={optIdx}
            onClick={() => handlePick(optIdx)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            className={`h-20 rounded-3xl shadow-lg transition-all ${COLOR_DATA[optIdx].bg}
              ${result !== "idle" && optIdx === target ? `ring-4 ${COLOR_DATA[optIdx].ring} scale-105` : ""}
              ${result === "wrong" && optIdx !== target ? "opacity-50" : ""}
            `}
          />
        ))}
      </div>

      {result === "correct" && (
        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mt-6 text-2xl font-bold text-green-500">✅ To'g'ri!</motion.p>
      )}
      {result === "wrong" && (
        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mt-6 text-2xl font-bold text-red-500">❌ Noto'g'ri!</motion.p>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// GAMES MENU
// ──────────────────────────────────────────────────────────────────────────────
const GAME_LIST = [
  {
    id: "memory" as GameId,
    title: "Xotira O'yini",
    emoji: "🧠",
    description: "Juftlikdagi kartochkalarni toping!",
    gradient: "from-purple-400 to-indigo-500",
    stars: "⭐⭐",
  },
  {
    id: "puzzle" as GameId,
    title: "Puzzle",
    emoji: "🧩",
    description: "Parchalarni to'g'ri joyiga qo'ying!",
    gradient: "from-blue-400 to-cyan-500",
    stars: "⭐⭐⭐",
  },
  {
    id: "wordscramble" as GameId,
    title: "So'z Puzzle",
    emoji: "🔤",
    description: "Aralashtirilgan harflarni to'g'rila!",
    gradient: "from-green-400 to-emerald-500",
    stars: "⭐⭐",
  },
  {
    id: "numbersort" as GameId,
    title: "Raqam Tartibi",
    emoji: "🔢",
    description: "Raqamlarni tartibga sol!",
    gradient: "from-orange-400 to-red-500",
    stars: "⭐⭐⭐",
  },
  {
    id: "colormatch" as GameId,
    title: "Rang Tanlash",
    emoji: "🎨",
    description: "To'g'ri rangni topib bos!",
    gradient: "from-pink-400 to-rose-500",
    stars: "⭐",
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// MAIN GAMES PAGE
// ──────────────────────────────────────────────────────────────────────────────
export function Games() {
  const navigate = useNavigate();
  const [activeGame, setActiveGame] = useState<GameId>("menu");

  const activeInfo = GAME_LIST.find(g => g.id === activeGame);

  useEffect(() => { authService.updateStreak(); }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pb-24">
      {/* Header */}
      <div className="bg-white rounded-b-[3rem] shadow-lg p-5 mb-5">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <button
            onClick={() => {
              audioService.playClick();
              if (activeGame === "menu") navigate("/home");
              else setActiveGame("menu");
            }}
            className="p-3 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors flex-shrink-0"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              🎮
              {activeGame === "menu" ? "O'yinlar" : activeInfo?.title}
            </h1>
            {activeGame === "menu" && (
              <p className="text-gray-500 text-sm">O'ynab o'rganing!</p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4">
        <AnimatePresence mode="wait">
          {activeGame === "menu" ? (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 gap-4"
            >
              {GAME_LIST.map((game, i) => (
                <motion.button
                  key={game.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { audioService.playClick(); setActiveGame(game.id); }}
                  className={`bg-gradient-to-r ${game.gradient} rounded-3xl p-5 shadow-xl flex items-center gap-4 text-left`}
                >
                  <div className="text-5xl">{game.emoji}</div>
                  <div className="flex-1">
                    <p className="text-white font-bold text-xl">{game.title}</p>
                    <p className="text-white/80 text-sm">{game.description}</p>
                    <p className="text-yellow-200 text-sm mt-1">{game.stars}</p>
                  </div>
                  <div className="text-white/60 text-2xl">›</div>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={activeGame}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-xl p-5 md:p-6"
            >
              {activeGame === "memory"      && <MemoryMatch    onBack={() => setActiveGame("menu")} />}
              {activeGame === "puzzle"      && <JigsawPuzzle   onBack={() => setActiveGame("menu")} />}
              {activeGame === "wordscramble"&& <WordScramble   onBack={() => setActiveGame("menu")} />}
              {activeGame === "numbersort"  && <NumberSort     onBack={() => setActiveGame("menu")} />}
              {activeGame === "colormatch"  && <ColorMatch     onBack={() => setActiveGame("menu")} />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <KidsNavBar />
    </div>
  );
}
