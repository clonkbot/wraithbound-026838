import { motion } from 'framer-motion';
import { Wraith } from '../data/wraiths';

interface WraithCardProps {
  wraith: Wraith;
  onClick?: () => void;
  compact?: boolean;
}

export function WraithCard({ wraith, onClick, compact = false }: WraithCardProps) {
  const elementColors = {
    shadow: 'from-purple-500 to-purple-900 border-purple-500/50',
    flame: 'from-orange-500 to-red-700 border-orange-500/50',
    void: 'from-pink-500 to-purple-700 border-pink-500/50',
    storm: 'from-cyan-400 to-blue-700 border-cyan-500/50',
    venom: 'from-green-500 to-emerald-800 border-green-500/50',
    frost: 'from-blue-400 to-indigo-700 border-blue-400/50',
  };

  return (
    <motion.div
      onClick={onClick}
      className={`relative group cursor-pointer ${compact ? 'h-24' : 'h-64 md:h-72'}`}
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glow effect */}
      <div className={`absolute -inset-1 bg-gradient-to-br ${elementColors[wraith.element]} rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300`} />

      {/* Card container */}
      <div className={`relative h-full bg-gradient-to-br from-[#1a1a24] to-[#0d0d14] rounded-xl border ${elementColors[wraith.element].split(' ')[2]} overflow-hidden`}>
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className={`absolute inset-0 bg-gradient-to-br ${wraith.gradient}`} />
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
            animate={{ backgroundPosition: ['0px 0px', '20px 20px'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {compact ? (
          // Compact layout for battle selection
          <div className="relative h-full flex items-center gap-3 p-3">
            <div className="w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${wraith.gradient} opacity-50`} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl">{wraith.emoji}</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold text-sm truncate">{wraith.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                  wraith.element === 'shadow' ? 'bg-purple-500/30 text-purple-300' :
                  wraith.element === 'flame' ? 'bg-orange-500/30 text-orange-300' :
                  wraith.element === 'void' ? 'bg-pink-500/30 text-pink-300' :
                  wraith.element === 'storm' ? 'bg-cyan-500/30 text-cyan-300' :
                  wraith.element === 'venom' ? 'bg-green-500/30 text-green-300' :
                  'bg-blue-500/30 text-blue-300'
                }`}>
                  {wraith.element}
                </span>
                <span className="text-yellow-400 text-xs">{'★'.repeat(wraith.rarity)}</span>
              </div>
            </div>
          </div>
        ) : (
          // Full card layout
          <>
            {/* Creature display area */}
            <div className="relative h-32 md:h-36 overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${wraith.gradient} opacity-30`} />
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="text-5xl md:text-6xl drop-shadow-2xl">{wraith.emoji}</span>
              </motion.div>
              {/* Energy particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${elementColors[wraith.element].split(' ').slice(0, 2).join(' ')}`}
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      y: [-20, -40],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: 'easeOut',
                    }}
                  />
                ))}
              </div>
              {/* Bottom gradient */}
              <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#0d0d14] to-transparent" />
            </div>

            {/* Info section */}
            <div className="relative p-3 md:p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded ${
                    wraith.element === 'shadow' ? 'bg-purple-500/30 text-purple-300' :
                    wraith.element === 'flame' ? 'bg-orange-500/30 text-orange-300' :
                    wraith.element === 'void' ? 'bg-pink-500/30 text-pink-300' :
                    wraith.element === 'storm' ? 'bg-cyan-500/30 text-cyan-300' :
                    wraith.element === 'venom' ? 'bg-green-500/30 text-green-300' :
                    'bg-blue-500/30 text-blue-300'
                  }`}>
                    {wraith.element}
                  </span>
                </div>
                <div className="text-yellow-400 text-sm">
                  {'★'.repeat(wraith.rarity)}
                </div>
              </div>

              <h3 className="font-display text-base md:text-lg font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                {wraith.name}
              </h3>

              {/* Stats bar */}
              <div className="flex gap-2 text-[10px] md:text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-red-400">⚔</span>
                  <span className="text-gray-400">{wraith.stats.attack}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-blue-400">🛡</span>
                  <span className="text-gray-400">{wraith.stats.defense}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">⚡</span>
                  <span className="text-gray-400">{wraith.stats.speed}</span>
                </div>
              </div>
            </div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </>
        )}
      </div>
    </motion.div>
  );
}
