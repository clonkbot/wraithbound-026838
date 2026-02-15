import { motion } from 'framer-motion';
import { Wraith, wraiths } from '../data/wraiths';
import { WraithCard } from './WraithCard';

interface WraithCollectionProps {
  onSelectWraith: (wraith: Wraith) => void;
  onStartBattle: (wraith: Wraith) => void;
}

export function WraithCollection({ onSelectWraith }: WraithCollectionProps) {
  const groupedWraiths = wraiths.reduce((acc, wraith) => {
    if (!acc[wraith.element]) acc[wraith.element] = [];
    acc[wraith.element].push(wraith);
    return acc;
  }, {} as Record<string, Wraith[]>);

  const elementOrder = ['shadow', 'flame', 'void', 'storm', 'venom', 'frost'];

  return (
    <div className="px-4 md:px-6 py-6 md:py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 md:mb-12"
        >
          <h1 className="font-display text-3xl md:text-5xl font-black mb-3 md:mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
              WRAITH VAULT
            </span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Your collection of captured Wraiths. Select one to view details or enter battle.
          </p>
        </motion.div>

        {/* Stats overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12"
        >
          <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 rounded-xl p-4 md:p-5">
            <div className="text-2xl md:text-3xl font-black text-cyan-400">{wraiths.length}</div>
            <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">Total Wraiths</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20 rounded-xl p-4 md:p-5">
            <div className="text-2xl md:text-3xl font-black text-yellow-400">{wraiths.filter(w => w.rarity === 5).length}</div>
            <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">Legendary</div>
          </div>
          <div className="bg-gradient-to-br from-pink-500/10 to-pink-500/5 border border-pink-500/20 rounded-xl p-4 md:p-5">
            <div className="text-2xl md:text-3xl font-black text-pink-400">{Object.keys(groupedWraiths).length}</div>
            <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">Elements</div>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-4 md:p-5">
            <div className="text-2xl md:text-3xl font-black text-green-400">87%</div>
            <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">Power Level</div>
          </div>
        </motion.div>

        {/* Wraith grid by element */}
        {elementOrder.map((element, sectionIndex) => {
          const elementWraiths = groupedWraiths[element];
          if (!elementWraiths) return null;

          return (
            <motion.div
              key={element}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + sectionIndex * 0.1 }}
              className="mb-8 md:mb-12"
            >
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className={`w-1 h-6 md:h-8 rounded-full ${
                  element === 'shadow' ? 'bg-purple-500' :
                  element === 'flame' ? 'bg-orange-500' :
                  element === 'void' ? 'bg-pink-500' :
                  element === 'storm' ? 'bg-cyan-500' :
                  element === 'venom' ? 'bg-green-500' :
                  'bg-blue-400'
                }`} />
                <h2 className="font-display text-lg md:text-xl font-bold uppercase tracking-wider text-gray-300">
                  {element} Wraiths
                </h2>
                <span className="text-xs md:text-sm text-gray-500">({elementWraiths.length})</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {elementWraiths.map((wraith, index) => (
                  <motion.div
                    key={wraith.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    <WraithCard
                      wraith={wraith}
                      onClick={() => onSelectWraith(wraith)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
