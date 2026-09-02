import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GEMSTONE_TIERS, getGemstone, GemstoneInfo } from '../data/gemstonesData';
import { GemstoneGraphic } from './GemstoneGraphic';
import { crystalAudio } from '../utils/crystalAudio';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Volume2,
  VolumeX,
  RotateCcw,
  Undo2,
  Trophy,
  BookOpen,
  X,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Flame,
  ChevronRight,
  Crown,
  Shield,
  Smartphone,
  Share2,
  Check,
} from 'lucide-react';

interface GameHistoryState {
  board: (number | null)[][];
  score: number;
  moves: number;
}

interface GemStone2048GameProps {
  onClose?: () => void;
  isModal?: boolean;
}

const GemStone2048Game: React.FC<GemStone2048GameProps> = ({ onClose, isModal = false }) => {
  const [board, setBoard] = useState<(number | null)[][]>([
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ]);
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('gem_2048_best_score') || localStorage.getItem('gem_2048_best_score');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });
  const [moves, setMoves] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [hasWon1024, setHasWon1024] = useState<boolean>(false);
  const [hasDismissedWin, setHasDismissedWin] = useState<boolean>(false);
  const [hasWon2048, setHasWon2048] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(crystalAudio.getIsMuted());
  const [history, setHistory] = useState<GameHistoryState | null>(null);
  const [highestGemReached, setHighestGemReached] = useState<number>(2);

  // Modals & Drawers
  const [showCodex, setShowCodex] = useState<boolean>(false);
  const [selectedCodexGem, setSelectedCodexGem] = useState<GemstoneInfo | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const handleCopyGameLink = () => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', 'game');
      navigator.clipboard.writeText(url.toString());
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // fallback
    }
  };

  const boardRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Update best score
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      try {
        localStorage.setItem('gem_2048_best_score', score.toString());
      } catch {}
    }
  }, [score, bestScore]);

  // Find empty cells
  const getEmptyCells = (grid: (number | null)[][]) => {
    const empty: { r: number; c: number }[] = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (grid[r][c] === null) {
          empty.push({ r, c });
        }
      }
    }
    return empty;
  };

  // Add random gem (90% chance of 2 - 薰衣草紫晶, 10% chance of 4 - 海藍寶)
  const addRandomGem = (grid: (number | null)[][]): boolean => {
    const empty = getEmptyCells(grid);
    if (empty.length === 0) return false;
    const randomCell = empty[Math.floor(Math.random() * empty.length)];
    const val = Math.random() < 0.9 ? 2 : 4;
    grid[randomCell.r][randomCell.c] = val;
    return true;
  };

  // Check if any valid moves remain
  const checkGameOver = (grid: (number | null)[][]): boolean => {
    if (getEmptyCells(grid).length > 0) return false;

    // Check adjacent horizontal or vertical matches
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const current = grid[r][c];
        if (c < 3 && grid[r][c + 1] === current) return false;
        if (r < 3 && grid[r + 1][c] === current) return false;
      }
    }
    return true;
  };

  // Initialize new game
  const initGame = useCallback(() => {
    const newGrid: (number | null)[][] = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    addRandomGem(newGrid);
    addRandomGem(newGrid);
    setBoard(newGrid);
    setScore(0);
    setMoves(0);
    setIsGameOver(false);
    setHasWon1024(false);
    setHasDismissedWin(false);
    setHasWon2048(false);
    setHistory(null);
    setHighestGemReached(2);
  }, []);

  // Initialize once on mount
  useEffect(() => {
    initGame();
  }, [initGame]);

  // Standard 2048 progression: 2 -> 4 -> 8 -> 16 -> 32 -> 64 -> 128 -> 256 -> 512 -> 1024 -> 2048 -> 4096
  const getNextTierValue = (val: number): number => {
    return val * 2;
  };

  // Move and merge logic in one row/col
  const slideAndMergeRow = (
    row: (number | null)[]
  ): {
    newRow: (number | null)[];
    scoreGained: number;
    highestMerged: number;
    mergeCount: number;
  } => {
    const filtered = row.filter((v) => v !== null) as number[];
    const result: (number | null)[] = [];
    let scoreGained = 0;
    let highestMerged = 0;
    let mergeCount = 0;

    let i = 0;
    while (i < filtered.length) {
      if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
        const nextVal = getNextTierValue(filtered[i]);
        result.push(nextVal);
        scoreGained += nextVal;
        highestMerged = Math.max(highestMerged, nextVal);
        mergeCount += 1;
        i += 2; // skip merged partner
      } else {
        result.push(filtered[i]);
        i += 1;
      }
    }

    while (result.length < 4) {
      result.push(null);
    }

    return { newRow: result, scoreGained, highestMerged, mergeCount };
  };

  // Main move handler for directional shifts
  const handleMove = useCallback(
    (direction: 'up' | 'down' | 'left' | 'right') => {
      if (isGameOver) return;

      let hasChanged = false;
      let totalGained = 0;
      let maxMergedInMove = 0;
      let totalMerges = 0;

      // Deep clone previous board for history undo
      const prevBoard = board.map((r) => [...r]);
      const newGrid: (number | null)[][] = [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ];

      if (direction === 'left') {
        for (let r = 0; r < 4; r++) {
          const { newRow, scoreGained, highestMerged, mergeCount } = slideAndMergeRow(board[r]);
          newGrid[r] = newRow;
          totalGained += scoreGained;
          maxMergedInMove = Math.max(maxMergedInMove, highestMerged);
          totalMerges += mergeCount;
          for (let c = 0; c < 4; c++) {
            if (board[r][c] !== newRow[c]) hasChanged = true;
          }
        }
      } else if (direction === 'right') {
        for (let r = 0; r < 4; r++) {
          const reversed = [...board[r]].reverse();
          const { newRow, scoreGained, highestMerged, mergeCount } = slideAndMergeRow(reversed);
          const finalRow = newRow.reverse();
          newGrid[r] = finalRow;
          totalGained += scoreGained;
          maxMergedInMove = Math.max(maxMergedInMove, highestMerged);
          totalMerges += mergeCount;
          for (let c = 0; c < 4; c++) {
            if (board[r][c] !== finalRow[c]) hasChanged = true;
          }
        }
      } else if (direction === 'up') {
        for (let c = 0; c < 4; c++) {
          const col = [board[0][c], board[1][c], board[2][c], board[3][c]];
          const { newRow, scoreGained, highestMerged, mergeCount } = slideAndMergeRow(col);
          for (let r = 0; r < 4; r++) {
            newGrid[r][c] = newRow[r];
            if (board[r][c] !== newRow[r]) hasChanged = true;
          }
          totalGained += scoreGained;
          maxMergedInMove = Math.max(maxMergedInMove, highestMerged);
          totalMerges += mergeCount;
        }
      } else if (direction === 'down') {
        for (let c = 0; c < 4; c++) {
          const col = [board[3][c], board[2][c], board[1][c], board[0][c]];
          const { newRow, scoreGained, highestMerged, mergeCount } = slideAndMergeRow(col);
          const finalCol = newRow.reverse();
          for (let r = 0; r < 4; r++) {
            newGrid[r][c] = finalCol[r];
            if (board[r][c] !== finalCol[r]) hasChanged = true;
          }
          totalGained += scoreGained;
          maxMergedInMove = Math.max(maxMergedInMove, highestMerged);
          totalMerges += mergeCount;
        }
      }

      if (hasChanged) {
        // Save undo state
        setHistory({
          board: prevBoard,
          score: score,
          moves: moves,
        });

        // Add new gem
        addRandomGem(newGrid);
        setBoard(newGrid);
        setScore((prev) => prev + totalGained);
        setMoves((prev) => prev + 1);

        // Haptic feedback for mobile
        if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
          try {
            window.navigator.vibrate(10);
          } catch {}
        }

        // Sound Effects
        if (totalMerges > 0 && maxMergedInMove > 0) {
          crystalAudio.playGemMergeSound(maxMergedInMove, totalMerges);
        } else {
          crystalAudio.playSlideSound();
        }

        // Track highest gem
        let maxOnBoard = 0;
        for (let r = 0; r < 4; r++) {
          for (let c = 0; c < 4; c++) {
            if (newGrid[r][c] && newGrid[r][c]! > maxOnBoard) {
              maxOnBoard = newGrid[r][c]!;
            }
          }
        }
        if (maxOnBoard > highestGemReached) {
          setHighestGemReached(maxOnBoard);
        }

        // Milestone Checks (1024 & 2048)
        if (maxOnBoard >= 1024 && !hasWon1024 && !hasDismissedWin) {
          setHasWon1024(true);
          crystalAudio.playMilestoneFanfare(1024);
          confetti({
            particleCount: 140,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#D4AF37', '#FEF08A', '#E0F2FE', '#C084FC', '#FFFFFF'],
          });
        }
        if (maxOnBoard >= 2048 && !hasWon2048) {
          setHasWon2048(true);
          crystalAudio.playMilestoneFanfare(2048);
          confetti({
            particleCount: 220,
            spread: 120,
            origin: { y: 0.5 },
            colors: ['#FBCFE8', '#D4AF37', '#A855F7', '#60A5FA', '#FFFFFF'],
          });
        }

        // Game Over Check
        if (checkGameOver(newGrid)) {
          setIsGameOver(true);
        }
      }
    },
    [
      board,
      isGameOver,
      score,
      moves,
      highestGemReached,
      hasWon1024,
      hasDismissedWin,
      hasWon2048,
    ]
  );

  // Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) {
        e.preventDefault();
        handleMove('up');
      } else if (['ArrowDown', 'KeyS'].includes(e.code)) {
        e.preventDefault();
        handleMove('down');
      } else if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        e.preventDefault();
        handleMove('left');
      } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
        e.preventDefault();
        handleMove('right');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMove]);

  // Touch Swipe Handlers for mobile & tablet (with smooth sensitivity)
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    const minSwipeDistance = 25;

    if (Math.max(Math.abs(dx), Math.abs(dy)) < minSwipeDistance) {
      touchStartRef.current = null;
      return;
    }

    if (Math.abs(dx) > Math.abs(dy)) {
      handleMove(dx > 0 ? 'right' : 'left');
    } else {
      handleMove(dy > 0 ? 'down' : 'up');
    }
    touchStartRef.current = null;
  };

  const handleUndo = () => {
    if (!history) return;
    setBoard(history.board);
    setScore(history.score);
    setMoves(history.moves);
    setHistory(null);
    setIsGameOver(false);
    crystalAudio.playSlideSound();
  };

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    crystalAudio.setMuted(nextMuted);
    if (!nextMuted) {
      crystalAudio.playGemMergeSound(64, 1);
    }
  };

  return (
    <div
      className={`w-full ${
        isModal ? 'p-3 sm:p-5' : 'max-w-5xl mx-auto p-3 sm:p-6'
      } flex flex-col gap-4 sm:gap-5 select-none font-serif-tc text-stone-200`}
      id="gemstone-2048-game-container"
    >
      {/* 1. Header Bar: Elegant Velvet Jewelry Box Header with Brass/Gold Inlay */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0d0e14] border border-[#2b2a33] p-4 sm:p-5 rounded-2xl shadow-2xl relative overflow-hidden">
        {/* Soft Ambient Jewel Light Flares */}
        <div className="absolute -right-8 -top-8 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/4 -bottom-10 w-44 h-44 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-xl sm:text-2xl filter drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">💎</span>
            <h1 className="text-lg sm:text-2xl font-bold tracking-wider font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300">
              晶弦共鳴
            </h1>
            <span className="px-2.5 py-0.5 text-[10px] font-medium font-serif-tc tracking-widest bg-[#1c1a24] text-amber-300 border border-amber-500/30 rounded-full flex items-center gap-1 shadow-inner">
              <Sparkles className="w-3 h-3 text-amber-400" />
              水晶諧音 · 512 → 1024 → 2048
            </span>
          </div>
          <p className="text-xs text-stone-400 font-serif-tc max-w-xl leading-relaxed">
            指尖滑過黑絲絨的靜謐，讓純淨的切面寶石在碰撞間共振。當晶螢之音串連成旋律，你將在清脆的共鳴中，淬鍊出終極的創世寶鑽。
          </p>
        </div>

        {/* Action Controls */}
        <div className="relative z-10 flex flex-wrap items-center gap-2 self-start sm:self-center">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            id="gem-game-sound-toggle"
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              isMuted
                ? 'bg-[#15161e] border-stone-800 text-stone-500 hover:text-stone-400'
                : 'bg-amber-950/40 border-amber-500/40 text-amber-300 shadow-[0_0_12px_rgba(212,175,55,0.25)] hover:bg-amber-900/50'
            }`}
            title={isMuted ? '開啟水晶音效' : '靜音'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
          </button>

          {/* Gem Codex Button */}
          <button
            onClick={() => setShowCodex(true)}
            id="gem-codex-open-btn"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#191826] hover:bg-[#232136] border border-amber-500/30 text-amber-200 hover:text-amber-100 rounded-xl text-xs font-medium tracking-wide transition-all cursor-pointer shadow-md"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span className="font-serif-tc">寶石圖鑑</span>
          </button>

          {/* Share/Direct Link Button */}
          <button
            onClick={handleCopyGameLink}
            id="gem-share-link-btn"
            className={`flex items-center gap-1.5 px-3 py-2 border rounded-xl text-xs font-medium tracking-wide transition-all cursor-pointer shadow-md font-serif-tc ${
              copiedLink
                ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300'
                : 'bg-[#15161e] hover:bg-[#20212d] border-stone-700/60 text-stone-300 hover:text-white'
            }`}
            title="複製遊戲直達網址（可放於作品集）"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-amber-300" />}
            <span>{copiedLink ? '已複製網址' : '分享連結'}</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white hover:bg-stone-800/80 rounded-xl transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Game Layout: Velvet Jewel Case & Control Sidebars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Classical Scoreboards, Unlocked Tiers, and Action Controls (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-3.5 order-2 lg:order-1">
          {/* Score & Best Score Velvet Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#101118] p-3.5 rounded-2xl border border-stone-800 text-center relative overflow-hidden shadow-inner">
              <span className="text-[10px] font-medium font-serif-tc text-stone-400 tracking-widest block">當前積分</span>
              <span className="text-2xl font-bold text-amber-300 font-cinzel tracking-wider block my-0.5 drop-shadow-[0_0_6px_rgba(212,175,55,0.3)]">
                {score}
              </span>
              <span className="text-[10px] text-stone-500 font-serif-tc">已合成 {moves} 回合</span>
            </div>

            <div className="bg-[#101118] p-3.5 rounded-2xl border border-stone-800 text-center relative overflow-hidden shadow-inner">
              <div className="flex items-center justify-center gap-1 text-[10px] font-medium font-serif-tc text-amber-200/80 tracking-widest">
                <Trophy className="w-3 h-3 text-amber-400" />
                <span>歷史最佳</span>
              </div>
              <span className="text-2xl font-bold text-amber-100 font-cinzel tracking-wider block my-0.5">
                {bestScore}
              </span>
              <span className="text-[10px] text-emerald-400/80 font-serif-tc">典藏榜首紀錄</span>
            </div>
          </div>

          {/* Jewel Progression & Goal Card */}
          <div className="bg-[#0f1016] p-4 rounded-2xl border border-amber-900/30 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-amber-200 font-serif-tc">目標：合成 2048 創世寶鑽</span>
              </div>
              <span className="text-[10px] font-cinzel font-bold px-2 py-0.5 rounded-full bg-amber-950/60 text-amber-300 border border-amber-500/30">
                階級：{highestGemReached}
              </span>
            </div>

            {/* Gemstone Progression Chain without square cards - Pure jewels */}
            <div className="flex items-center justify-between gap-1 overflow-x-auto py-1.5 px-1 no-scrollbar bg-[#08080c] rounded-xl border border-stone-900">
              {[2, 8, 32, 128, 512, 1024, 2048].map((tier) => {
                const gem = getGemstone(tier);
                const isUnlocked = highestGemReached >= tier;
                return (
                  <div
                    key={tier}
                    className={`flex flex-col items-center flex-shrink-0 transition-all ${
                      isUnlocked ? 'opacity-100 scale-100' : 'opacity-25 grayscale'
                    }`}
                    title={`${gem.name} (${tier}) - ${gem.toneDescription}`}
                  >
                    <div className="w-8 h-8 flex items-center justify-center relative">
                      <GemstoneGraphic value={tier} size="sm" showNumberPill={false} />
                    </div>
                    <span className="text-[9px] font-cinzel mt-0.5 font-bold text-stone-400">{tier}</span>
                  </div>
                );
              })}
            </div>

            <p className="text-[11px] text-stone-400 font-serif-tc leading-relaxed">
              每次滑動相同寶石碰撞，即可激發清脆水晶諧音並昇華為更高硬度的珍品。
            </p>
          </div>

          {/* Quick Controls: Undo, Restart */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleUndo}
              disabled={!history}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#14151f] hover:bg-[#1e1f2d] disabled:opacity-30 disabled:cursor-not-allowed border border-stone-700 text-stone-300 hover:text-white rounded-xl text-xs font-serif-tc font-medium transition-all shadow-md cursor-pointer"
              title="回退上一步操作 (保留1步)"
            >
              <Undo2 className="w-3.5 h-3.5 text-stone-400" />
              <span>回退一步</span>
            </button>

            <button
              onClick={initGame}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#14151f] hover:bg-rose-950/40 border border-stone-700 hover:border-rose-900/60 text-stone-300 hover:text-rose-300 rounded-xl text-xs font-serif-tc font-medium transition-all shadow-md cursor-pointer"
              title="重新排列開局"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-400 hover:text-rose-400" />
              <span>重新洗牌</span>
            </button>
          </div>

          {/* Touch Pad & Key Controls */}
          <div className="bg-[#0e0f15] border border-stone-800/80 p-3 rounded-xl text-center space-y-2">
            <div className="flex items-center justify-center gap-1 text-[11px] text-stone-400 font-serif-tc">
              <Smartphone className="w-3 h-3 text-amber-400" />
              <span>手機觸控滑動 / 鍵盤 WASD / 點擊方向盤</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 max-w-[150px] mx-auto">
              <div />
              <button onClick={() => handleMove('up')} className="p-2 bg-[#171820] hover:bg-[#242633] border border-stone-700 rounded-lg text-stone-300 cursor-pointer transition-colors"><ArrowUp className="w-4 h-4 mx-auto" /></button>
              <div />
              <button onClick={() => handleMove('left')} className="p-2 bg-[#171820] hover:bg-[#242633] border border-stone-700 rounded-lg text-stone-300 cursor-pointer transition-colors"><ArrowLeft className="w-4 h-4 mx-auto" /></button>
              <button onClick={() => handleMove('down')} className="p-2 bg-[#171820] hover:bg-[#242633] border border-stone-700 rounded-lg text-stone-300 cursor-pointer transition-colors"><ArrowDown className="w-4 h-4 mx-auto" /></button>
              <button onClick={() => handleMove('right')} className="p-2 bg-[#171820] hover:bg-[#242633] border border-stone-700 rounded-lg text-stone-300 cursor-pointer transition-colors"><ArrowRight className="w-4 h-4 mx-auto" /></button>
            </div>
          </div>
        </div>

        {/* Right Column: Game Board */}
        <div className="lg:col-span-8 order-1 lg:order-2 flex flex-col items-center">
          <div
            ref={boardRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative w-full max-w-[460px] aspect-square bg-[#090a0f] rounded-3xl border-2 border-amber-900/50 p-3 sm:p-4 shadow-[0_20px_60px_rgba(0,0,0,0.55)] touch-none select-none"
          >
            <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full h-full">
              {board.flatMap((row, r) => row.map((value, c) => {
                const key = `${r}-${c}`;
                const gem = value ? getGemstone(value) : null;
                return (
                  <div key={key} className="velvet-gem-well rounded-2xl flex items-center justify-center relative overflow-hidden">
                    {gem && <GemstoneGraphic value={value!} size="lg" showNumberPill />}
                  </div>
                );
              }))}
            </div>

            {/* 2048 Victory Overlay - can continue playing */}
            {hasWon2048 && (
              <div className="absolute inset-0 bg-black/88 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-6 text-center text-white z-30 animate-fadeIn space-y-3 border-2 border-fuchsia-400/80 shadow-2xl">
                <div className="w-20 h-20 flex items-center justify-center animate-bounce">
                  <GemstoneGraphic value={2048} size="lg" showNumberPill={false} />
                </div>
                <span className="text-xs font-cinzel font-bold text-fuchsia-300 tracking-widest uppercase">★ CREATION JEWEL UNLOCKED ★</span>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif-tc text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-200 via-amber-200 to-cyan-200">
                  恭喜！2048 創世寶鑽誕生！
                </h3>
                <p className="text-xs text-stone-200 max-w-xs leading-relaxed font-serif-tc">
                  2048 是本作的重要里程碑，但旅程還沒有結束。您可以繼續挑戰更高階的寶石，包含 4096。
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => setHasWon2048(false)}
                    className="px-5 py-2.5 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 hover:brightness-110 text-white rounded-xl text-xs font-bold font-serif-tc shadow-xl transition-all cursor-pointer"
                  >
                    繼續挑戰 4096
                  </button>
                </div>
              </div>
            )}

            {/* Game Over Overlay */}
            {isGameOver && !hasWon2048 && (
              <div className="absolute inset-0 bg-black/90 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-6 text-center text-white z-40 animate-fadeIn space-y-3">
                <div className="w-16 h-16 flex items-center justify-center"><Flame className="w-12 h-12 text-rose-400" /></div>
                <h3 className="text-2xl font-bold font-serif-tc text-amber-100">棋盤已封印</h3>
                <p className="text-xs text-stone-300 max-w-xs leading-relaxed font-serif-tc">
                  本局已無法再移動。您最高合成了 <span className="text-amber-300 font-bold">{getGemstone(highestGemReached).name}</span>。
                </p>
                <p className="text-xs text-stone-400 font-serif-tc">
                  本次最終得分：<span className="text-amber-300 font-bold font-cinzel text-sm">{score}</span>，合成了最高階級的
                  <span className="text-amber-200 font-bold"> {getGemstone(highestGemReached).name}</span>。
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={handleUndo}
                    disabled={!history}
                    className="px-4 py-2 bg-[#1b1c27] hover:bg-[#252636] disabled:opacity-40 rounded-xl text-xs font-serif-tc border border-stone-700 transition-colors cursor-pointer"
                  >
                    回退一步
                  </button>
                  <button
                    onClick={initGame}
                    className="px-5 py-2 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 hover:brightness-110 text-stone-950 font-bold font-serif-tc rounded-xl text-xs shadow-lg transition-all cursor-pointer"
                  >
                    再玩一局
                  </button>
                </div>
              </div>
            )}

            {/* 1024 Victory Milestone Modal Overlay */}
            {hasWon1024 && !hasDismissedWin && (
              <div className="absolute inset-0 bg-black/92 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-6 text-center text-white z-40 animate-fadeIn space-y-3.5 border-2 border-amber-400/80 shadow-2xl">
                <div className="w-16 h-16 flex items-center justify-center animate-bounce">
                  <GemstoneGraphic value={1024} size="lg" showNumberPill={false} />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-cinzel font-bold text-amber-400 tracking-widest uppercase">★ SOLAR CORONA MILESTONE ★</span>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif-tc text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-100">
                    恭喜合成出【1024 日耀神石】！
                  </h3>
                </div>
                <p className="text-xs text-stone-200 max-w-xs leading-relaxed font-serif-tc">
                  您已達成 1024 皇室金冠里程碑！您可以繼續沉醉於合成旅程，挑戰終極傳奇
                  <span className="text-amber-300 font-bold">【2048 創世星雲寶鑽】</span>！
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => setHasDismissedWin(true)}
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:brightness-110 text-stone-950 rounded-xl text-xs font-bold font-serif-tc shadow-xl transition-all cursor-pointer"
                  >
                    繼續挑戰 2048 創世寶鑽
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Velvet Board Footer Legend */}
          <div className="w-full max-w-[460px] mt-3 flex items-center justify-between text-[11px] text-stone-400 px-2 font-serif-tc">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              黑絲絨襯墊 · 純淨 3D 寶石折射
            </span>
            <button
              onClick={() => setShowCodex(true)}
              className="text-amber-300 hover:text-amber-200 font-medium hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>檢視 12 階寶石圖鑑</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Classical Gemstone Codex Modal (古典寶石圖鑑文獻庫) */}
      {showCodex && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-xs overflow-y-auto animate-fadeIn font-serif-tc"
          onClick={() => setShowCodex(false)}
        >
          <div
            className="bg-[#0d0e14] rounded-2xl w-full max-w-3xl shadow-2xl border border-[#2b2a33] overflow-hidden flex flex-col my-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Codex Header */}
            <div className="px-5 py-4 border-b border-stone-800 flex items-center justify-between bg-[#12131b]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-950/40 text-amber-300 border border-amber-500/30"><BookOpen className="w-5 h-5" /></div>
                <div>
                  <h3 className="text-base font-bold font-serif-tc text-amber-100">寶石礦物圖鑑與光學考證</h3>
                  <p className="text-xs text-stone-400">寶石硬度、礦物文獻、3D 切面折射與水晶諧音的典藏圖鑑</p>
                </div>
              </div>
              <button onClick={() => setShowCodex(false)} className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"><X className="w-5 h-5" /></button>
            </div>

            {/* Codex Grid Body */}
            <div className="p-5 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {Object.values(GEMSTONE_TIERS).map((gem) => {
                  const isUnlocked = highestGemReached >= gem.value;
                  return (
                    <div
                      key={gem.value}
                      onClick={() => setSelectedCodexGem(gem)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isUnlocked ? 'bg-[#14151f] border-stone-800 hover:border-amber-500/50 hover:shadow-lg' : 'bg-[#0a0b10] border-stone-900 opacity-40'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center"><GemstoneGraphic value={gem.value} size="md" showNumberPill={false} /></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-amber-100 truncate font-serif-tc">{gem.name}</span>
                            <span className="text-[10px] font-cinzel font-bold text-amber-300 bg-black/60 px-1.5 py-0.5 rounded border border-amber-500/30">{gem.value}</span>
                          </div>
                          <p className="text-[10px] text-stone-400 font-cinzel truncate">{gem.enName}</p>
                          <span className="inline-block text-[9.5px] text-amber-300/80 font-serif-tc mt-0.5">莫氏硬度: {gem.mohsHardness}</span>
                        </div>
                      </div>
                      <p className="text-[10.5px] text-stone-400 mt-2 line-clamp-2 leading-relaxed font-serif-tc">{gem.description}</p>
                    </div>
                  );
                })}
              </div>

              {/* Selected Gem Deep Dive Details */}
              {selectedCodexGem && (
                <div className="bg-[#151622] rounded-xl p-4 border border-amber-900/40 space-y-2.5 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 flex items-center justify-center"><GemstoneGraphic value={selectedCodexGem.value} size="md" showNumberPill={false} /></div>
                      <div>
                        <h4 className="text-sm font-bold text-amber-100 font-serif-tc">{selectedCodexGem.name} ({selectedCodexGem.enName})</h4>
                        <span className="text-[11px] text-amber-300/80 font-serif-tc">類別：{selectedCodexGem.category} • 莫氏硬度：{selectedCodexGem.mohsHardness} • 色澤：{selectedCodexGem.toneDescription}</span>
                      </div>
                    </div>
                    <span className="text-sm font-bold font-cinzel text-amber-300 bg-black/60 px-3 py-1 rounded-lg border border-amber-500/30">TIER {selectedCodexGem.value}</span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed font-serif-tc">{selectedCodexGem.description}</p>
                  <div className="bg-[#0c0d14] p-3 rounded-lg border border-stone-800 text-[11px] text-stone-400 font-serif-tc"><span className="font-bold text-amber-300">文獻註解：</span><span> {selectedCodexGem.lore}</span></div>
                </div>
              )}
            </div>

            {/* Codex Footer */}
            <div className="px-5 py-3 border-t border-stone-800 bg-[#12131b] flex items-center justify-between text-xs">
              <span className="text-stone-400 font-serif-tc">點選任一寶石檢視光學與礦物文獻</span>
              <button onClick={() => setShowCodex(false)} className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold font-serif-tc rounded-xl transition-colors cursor-pointer">關閉圖鑑</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GemStone2048Game;
