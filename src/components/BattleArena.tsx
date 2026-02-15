import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wraith } from '../data/wraiths';

interface BattleArenaProps {
  playerWraith: Wraith;
  enemyWraith: Wraith;
  onBack: () => void;
}

interface BattleState {
  playerHP: number;
  enemyHP: number;
  turn: 'player' | 'enemy';
  lastAction: string;
  battleEnded: boolean;
  winner: 'player' | 'enemy' | null;
}

export function BattleArena({ playerWraith, enemyWraith, onBack }: BattleArenaProps) {
  const [battleState, setBattleState] = useState<BattleState>({
    playerHP: playerWraith.stats.hp,
    enemyHP: enemyWraith.stats.hp,
    turn: playerWraith.stats.speed >= enemyWraith.stats.speed ? 'player' : 'enemy',
    lastAction: 'Battle begins! Choose your attack!',
    battleEnded: false,
    winner: null,
  });

  const [isAnimating, setIsAnimating] = useState(false);
  const [showHitEffect, setShowHitEffect] = useState<'player' | 'enemy' | null>(null);

  const calculateDamage = (attacker: Wraith, defender: Wraith) => {
    const baseDamage = attacker.stats.attack;
    const defense = defender.stats.defense;
    const variance = 0.8 + Math.random() * 0.4;
    const damage = Math.floor((baseDamage * variance) - (defense * 0.3));
    return Math.max(5, damage);
  };

  const performAttack = (abilityIndex: number) => {
    if (isAnimating || battleState.battleEnded || battleState.turn !== 'player') return;

    setIsAnimating(true);
    const ability = playerWraith.abilities[abilityIndex];
    const damage = calculateDamage(playerWraith, enemyWraith);

    setShowHitEffect('enemy');
    setTimeout(() => setShowHitEffect(null), 300);

    const newEnemyHP = Math.max(0, battleState.enemyHP - damage);

    setBattleState(prev => ({
      ...prev,
      enemyHP: newEnemyHP,
      lastAction: `${playerWraith.name} used ${ability}! Dealt ${damage} damage!`,
    }));

    setTimeout(() => {
      if (newEnemyHP <= 0) {
        setBattleState(prev => ({
          ...prev,
          battleEnded: true,
          winner: 'player',
          lastAction: `${enemyWraith.name} has fallen! Victory!`,
        }));
        setIsAnimating(false);
      } else {
        setBattleState(prev => ({ ...prev, turn: 'enemy' }));
      }
    }, 800);
  };

  useEffect(() => {
    if (battleState.turn === 'enemy' && !battleState.battleEnded) {
      const timeout = setTimeout(() => {
        const abilityIndex = Math.floor(Math.random() * enemyWraith.abilities.length);
        const ability = enemyWraith.abilities[abilityIndex];
        const damage = calculateDamage(enemyWraith, playerWraith);

        setShowHitEffect('player');
        setTimeout(() => setShowHitEffect(null), 300);

        const newPlayerHP = Math.max(0, battleState.playerHP - damage);

        setBattleState(prev => ({
          ...prev,
          playerHP: newPlayerHP,
          lastAction: `${enemyWraith.name} used ${ability}! Dealt ${damage} damage!`,
        }));

        setTimeout(() => {
          if (newPlayerHP <= 0) {
            setBattleState(prev => ({
              ...prev,
              battleEnded: true,
              winner: 'enemy',
              lastAction: `${playerWraith.name} has fallen! Defeat...`,
            }));
          } else {
            setBattleState(prev => ({ ...prev, turn: 'player' }));
          }
          setIsAnimating(false);
        }, 800);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [battleState.turn, battleState.battleEnded, enemyWraith, playerWraith, battleState.playerHP]);

  const HPBar = ({ current, max, side }: { current: number; max: number; side: 'player' | 'enemy' }) => {
    const percentage = (current / max) * 100;
    const color = percentage > 60 ? 'from-green-500 to-emerald-400' :
                  percentage > 30 ? 'from-yellow-500 to-orange-400' :
                  'from-red-500 to-pink-500';

    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs md:text-sm font-bold text-gray-300">{side === 'player' ? playerWraith.name : enemyWraith.name}</span>
          <span className="text-xs md:text-sm text-gray-400">{current}/{max}</span>
        </div>
        <div className="h-2.5 md:h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
          <motion.div
            className={`h-full bg-gradient-to-r ${color} rounded-full`}
            initial={{ width: '100%' }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    );
  };

  const WraithDisplay = ({ wraith, side, isHit }: { wraith: Wraith; side: 'player' | 'enemy'; isHit: boolean }) => (
    <motion.div
      className="relative"
      animate={isHit ? { x: side === 'player' ? [-10, 10, -10, 10, 0] : [10, -10, 10, -10, 0] } : {}}
      transition={{ duration: 0.3 }}
    >
      <div className={`relative w-20 h-20 md:w-32 md:h-32 mx-auto rounded-xl overflow-hidden ${
        side === 'enemy' ? 'md:scale-x-[-1]' : ''
      }`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${wraith.gradient} opacity-40`} />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className={`text-4xl md:text-6xl ${side === 'enemy' ? 'md:scale-x-[-1]' : ''}`}>{wraith.emoji}</span>
        </motion.div>
        {isHit && (
          <motion.div
            className="absolute inset-0 bg-red-500/50"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>

      {/* Element indicator */}
      <div className={`mt-2 text-center text-[10px] md:text-xs font-bold uppercase tracking-wider ${
        wraith.element === 'shadow' ? 'text-purple-400' :
        wraith.element === 'flame' ? 'text-orange-400' :
        wraith.element === 'void' ? 'text-pink-400' :
        wraith.element === 'storm' ? 'text-cyan-400' :
        wraith.element === 'venom' ? 'text-green-400' :
        'text-blue-400'
      }`}>
        {wraith.element}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col px-4 md:px-6 py-4 md:py-6">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        {/* Back button */}
        <motion.button
          onClick={onBack}
          className="self-start mb-4 md:mb-6 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2"
          whileHover={{ x: -5 }}
        >
          <span>←</span> Back to Collection
        </motion.button>

        {/* Battle arena */}
        <div className="flex-1 flex flex-col">
          {/* Arena header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-4 md:mb-8"
          >
            <h1 className="font-display text-xl md:text-3xl font-black">
              <span className="text-cyan-400">{playerWraith.name}</span>
              <span className="text-gray-500 mx-2 md:mx-4">VS</span>
              <span className="text-pink-400">{enemyWraith.name}</span>
            </h1>
          </motion.div>

          {/* Battle field */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative flex-1 min-h-[250px] md:min-h-[300px] bg-gradient-to-br from-[#12121a] to-[#0a0a0f] rounded-2xl border border-cyan-500/20 overflow-hidden mb-4 md:mb-6"
          >
            {/* Background effects */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-cyan-500/5 to-transparent" />
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-pink-500/5 to-transparent" />
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `radial-gradient(circle at 30% 50%, rgba(0,240,255,0.3), transparent 50%), radial-gradient(circle at 70% 50%, rgba(255,0,128,0.3), transparent 50%)`
              }} />
            </div>

            {/* Wraiths */}
            <div className="relative h-full flex items-center justify-between px-4 md:px-12 lg:px-20 py-4">
              <div className="flex flex-col items-center w-1/3">
                <WraithDisplay
                  wraith={playerWraith}
                  side="player"
                  isHit={showHitEffect === 'player'}
                />
                <div className="mt-3 md:mt-4 w-full max-w-[140px] md:max-w-[200px]">
                  <HPBar current={battleState.playerHP} max={playerWraith.stats.hp} side="player" />
                </div>
              </div>

              {/* VS indicator */}
              <motion.div
                className="text-2xl md:text-4xl font-black text-gray-700"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ⚔
              </motion.div>

              <div className="flex flex-col items-center w-1/3">
                <WraithDisplay
                  wraith={enemyWraith}
                  side="enemy"
                  isHit={showHitEffect === 'enemy'}
                />
                <div className="mt-3 md:mt-4 w-full max-w-[140px] md:max-w-[200px]">
                  <HPBar current={battleState.enemyHP} max={enemyWraith.stats.hp} side="enemy" />
                </div>
              </div>
            </div>

            {/* Turn indicator */}
            <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2">
              <div className={`px-3 md:px-4 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider ${
                battleState.turn === 'player' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' :
                'bg-pink-500/20 text-pink-400 border border-pink-500/30'
              }`}>
                {battleState.battleEnded ? (battleState.winner === 'player' ? 'VICTORY!' : 'DEFEAT') :
                  (battleState.turn === 'player' ? 'Your Turn' : 'Enemy Turn')}
              </div>
            </div>
          </motion.div>

          {/* Action log */}
          <motion.div
            className="bg-black/50 border border-gray-800 rounded-xl p-3 md:p-4 mb-4 md:mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={battleState.lastAction}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center text-xs md:text-sm text-gray-300 font-medium"
              >
                {battleState.lastAction}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Action buttons */}
          {!battleState.battleEnded ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-3 gap-2 md:gap-4"
            >
              {playerWraith.abilities.map((ability, index) => (
                <motion.button
                  key={ability}
                  onClick={() => performAttack(index)}
                  disabled={isAnimating || battleState.turn !== 'player'}
                  className={`relative overflow-hidden py-3 md:py-4 rounded-xl font-bold text-xs md:text-sm uppercase tracking-wider transition-all ${
                    isAnimating || battleState.turn !== 'player'
                      ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:from-cyan-500/30 hover:to-cyan-500/20 hover:border-cyan-500/50'
                  }`}
                  whileHover={battleState.turn === 'player' && !isAnimating ? { scale: 1.02 } : {}}
                  whileTap={battleState.turn === 'player' && !isAnimating ? { scale: 0.98 } : {}}
                >
                  <span className="relative z-10 px-1">{ability}</span>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                className={`inline-block text-4xl md:text-6xl mb-4 ${
                  battleState.winner === 'player' ? '' : 'grayscale'
                }`}
                animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 0.5, repeat: battleState.winner === 'player' ? Infinity : 0, repeatDelay: 1 }}
              >
                {battleState.winner === 'player' ? '🏆' : '💀'}
              </motion.div>
              <h2 className={`font-display text-2xl md:text-4xl font-black mb-4 md:mb-6 ${
                battleState.winner === 'player' ? 'text-yellow-400' : 'text-gray-500'
              }`}>
                {battleState.winner === 'player' ? 'VICTORY!' : 'DEFEAT'}
              </h2>
              <motion.button
                onClick={onBack}
                className="px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 transition-all text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Return to Collection
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
