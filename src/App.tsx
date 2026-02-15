import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WraithCard } from './components/WraithCard';
import { BattleArena } from './components/BattleArena';
import { WraithCollection } from './components/WraithCollection';
import { wraiths, Wraith } from './data/wraiths';

type Screen = 'home' | 'collection' | 'battle';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedWraith, setSelectedWraith] = useState<Wraith | null>(null);
  const [playerWraith, setPlayerWraith] = useState<Wraith>(wraiths[0]);
  const [enemyWraith, setEnemyWraith] = useState<Wraith>(wraiths[3]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startBattle = (wraith: Wraith) => {
    setPlayerWraith(wraith);
    const enemies = wraiths.filter(w => w.id !== wraith.id);
    setEnemyWraith(enemies[Math.floor(Math.random() * enemies.length)]);
    setCurrentScreen('battle');
    setSelectedWraith(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden relative">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#12121a] to-[#0a0a0f]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-cyan-900/10 to-transparent rounded-full" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,240,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-cyan-500/20 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2 md:gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <span className="text-lg md:text-xl font-black">W</span>
            </div>
            <span className="font-display text-xl md:text-2xl font-bold tracking-wider bg-gradient-to-r from-cyan-400 via-white to-pink-400 bg-clip-text text-transparent">
              WRAITHBOUND
            </span>
          </motion.div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            {(['home', 'collection', 'battle'] as Screen[]).map((screen) => (
              <motion.button
                key={screen}
                onClick={() => setCurrentScreen(screen)}
                className={`px-4 py-2 rounded-lg font-medium uppercase tracking-wider text-sm transition-all ${
                  currentScreen === screen
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {screen}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-cyan-500/20 bg-[#0a0a0f]/95 backdrop-blur-xl"
            >
              <div className="px-4 py-3 flex flex-col gap-2">
                {(['home', 'collection', 'battle'] as Screen[]).map((screen) => (
                  <button
                    key={screen}
                    onClick={() => {
                      setCurrentScreen(screen);
                      setMenuOpen(false);
                    }}
                    className={`px-4 py-3 rounded-lg font-medium uppercase tracking-wider text-sm transition-all text-left ${
                      currentScreen === screen
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {screen}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main content */}
      <main className="relative z-10 min-h-[calc(100vh-140px)]">
        <AnimatePresence mode="wait">
          {currentScreen === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-4 md:px-6 py-8 md:py-12"
            >
              <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-12 md:mb-20">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-4 md:mb-6 leading-tight">
                      <span className="bg-gradient-to-r from-cyan-400 via-white to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
                        CAPTURE
                      </span>
                      <br />
                      <span className="text-white">THE</span>{' '}
                      <span className="relative inline-block">
                        <span className="bg-gradient-to-r from-pink-500 via-orange-400 to-cyan-400 bg-clip-text text-transparent">
                          DARKNESS
                        </span>
                        <motion.span
                          className="absolute -inset-1 md:-inset-2 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 blur-xl -z-10"
                          animate={{ opacity: [0.5, 0.8, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </span>
                    </h1>
                    <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 px-4">
                      Command shadow-infused Wraiths in brutal combat. Collect, evolve, and dominate
                      in a world where light fears to tread.
                    </p>
                    <motion.button
                      onClick={() => setCurrentScreen('collection')}
                      className="group relative px-8 md:px-12 py-4 md:py-5 rounded-xl font-bold text-base md:text-lg uppercase tracking-widest overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-pink-500" />
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="absolute inset-[2px] bg-[#0a0a0f] rounded-[10px]" />
                      <span className="relative z-10 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                        Begin Hunt
                      </span>
                    </motion.button>
                  </motion.div>
                </div>

                {/* Featured Wraiths */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className="font-display text-xl md:text-2xl font-bold text-center mb-6 md:mb-10 uppercase tracking-widest text-gray-300">
                    <span className="text-cyan-400">//</span> Featured Wraiths <span className="text-cyan-400">//</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {wraiths.slice(0, 4).map((wraith, index) => (
                      <motion.div
                        key={wraith.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <WraithCard
                          wraith={wraith}
                          onClick={() => setSelectedWraith(wraith)}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {currentScreen === 'collection' && (
            <motion.div
              key="collection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <WraithCollection
                onSelectWraith={setSelectedWraith}
                onStartBattle={startBattle}
              />
            </motion.div>
          )}

          {currentScreen === 'battle' && (
            <motion.div
              key="battle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <BattleArena
                playerWraith={playerWraith}
                enemyWraith={enemyWraith}
                onBack={() => setCurrentScreen('collection')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Wraith Detail Modal */}
      <AnimatePresence>
        {selectedWraith && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedWraith(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: 15 }}
              className="relative max-w-lg w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-pink-500/30 rounded-2xl blur-xl" />
              <div className="relative bg-[#12121a] border border-cyan-500/30 rounded-2xl p-4 md:p-6 overflow-hidden">
                <button
                  onClick={() => setSelectedWraith(null)}
                  className="absolute top-3 right-3 md:top-4 md:right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
                >
                  <span className="text-xl">×</span>
                </button>

                <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                  <div className="w-full md:w-40 h-48 md:h-40 flex-shrink-0 rounded-xl overflow-hidden relative mx-auto md:mx-0">
                    <div className={`absolute inset-0 bg-gradient-to-br ${selectedWraith.gradient} opacity-30`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl md:text-7xl">{selectedWraith.emoji}</span>
                    </div>
                    <div className={`absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t ${selectedWraith.gradient} opacity-50`} />
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                        selectedWraith.element === 'shadow' ? 'bg-purple-500/30 text-purple-300' :
                        selectedWraith.element === 'flame' ? 'bg-orange-500/30 text-orange-300' :
                        selectedWraith.element === 'void' ? 'bg-pink-500/30 text-pink-300' :
                        selectedWraith.element === 'storm' ? 'bg-cyan-500/30 text-cyan-300' :
                        selectedWraith.element === 'venom' ? 'bg-green-500/30 text-green-300' :
                        'bg-gray-500/30 text-gray-300'
                      }`}>
                        {selectedWraith.element}
                      </span>
                      <span className="text-yellow-400 text-sm">{'★'.repeat(selectedWraith.rarity)}</span>
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-bold mb-2">{selectedWraith.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{selectedWraith.description}</p>

                    <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4">
                      <div className="bg-black/30 rounded-lg p-2 md:p-3 text-center">
                        <div className="text-lg md:text-xl font-bold text-red-400">{selectedWraith.stats.attack}</div>
                        <div className="text-[10px] md:text-xs text-gray-500 uppercase">Attack</div>
                      </div>
                      <div className="bg-black/30 rounded-lg p-2 md:p-3 text-center">
                        <div className="text-lg md:text-xl font-bold text-blue-400">{selectedWraith.stats.defense}</div>
                        <div className="text-[10px] md:text-xs text-gray-500 uppercase">Defense</div>
                      </div>
                      <div className="bg-black/30 rounded-lg p-2 md:p-3 text-center">
                        <div className="text-lg md:text-xl font-bold text-yellow-400">{selectedWraith.stats.speed}</div>
                        <div className="text-[10px] md:text-xs text-gray-500 uppercase">Speed</div>
                      </div>
                    </div>

                    <motion.button
                      onClick={() => startBattle(selectedWraith)}
                      className="w-full py-3 rounded-lg font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Enter Battle
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative z-10 border-t border-cyan-500/10 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <p className="text-center text-xs text-gray-600">
            Requested by <span className="text-gray-500">@stringer_kade</span> · Built by <span className="text-gray-500">@clonkbot</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
