import { Telescope, Languages, FlaskConical, BookOpen, Lock, Unlock, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useStore } from '../store/useStore';
import { TECHNOLOGIES, PRODUCTS, SUBSTANCES } from '../data/items';
import { useState } from 'react';

const RACES = [
  { id: 'gek', name: 'Gek', nameCN: '格克族', icon: '🐸', totalWords: 800 },
  { id: 'korvax', name: 'Korvax', nameCN: '科瓦克斯族', icon: '🤖', totalWords: 800 },
  { id: 'vykeen', name: "Vy'keen", nameCN: '維琴族', icon: '⚔️', totalWords: 800 },
  { id: 'atlas', name: 'Atlas', nameCN: '阿特拉斯', icon: '🔴', totalWords: 200 },
  { id: 'builder', name: 'Builders', nameCN: '建造者', icon: '🏗️', totalWords: 100 },
  { id: 'autophage', name: 'Autophage', nameCN: '自噬者', icon: '🦾', totalWords: 100 },
];

const GLYPH_SYMBOLS = ['🌀', '🌊', '🔺', '🌙', '⛵', '🏠', '🌿', '🎵', '⚡', '🌍', '💀', '🦋', '🚀', '💎', '🌸', '🔥'];

export function DiscoveryPage() {
  const { addNotification } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>('tech');
  const [knownGlyphs, setKnownGlyphs] = useState(16);
  const [wordsLearned, setWordsLearned] = useState<Record<string, number>>({
    gek: 450, korvax: 380, vykeen: 520, atlas: 100, builder: 45, autophage: 30,
  });

  const toggleSection = (id: string) => setExpandedSection(prev => prev === id ? null : id);

  const unlockAllGlyphs = () => {
    setKnownGlyphs(16);
    addNotification('已解鎖全部 16 個傳送門符文！', 'success');
  };

  const learnAllWords = (raceId: string, raceName: string) => {
    const race = RACES.find(r => r.id === raceId);
    if (race) {
      setWordsLearned(prev => ({ ...prev, [raceId]: race.totalWords }));
      addNotification(`已學會全部 ${raceName} 語言！`, 'success');
    }
  };

  const learnAllLanguages = () => {
    const all: Record<string, number> = {};
    RACES.forEach(r => { all[r.id] = r.totalWords; });
    setWordsLearned(all);
    addNotification('已學會所有種族語言！', 'success');
  };

  const sections = [
    {
      id: 'tech', label: '科技藍圖', labelEN: 'Technology Blueprints', icon: <FlaskConical size={16} />,
      color: 'text-nms-accent', count: TECHNOLOGIES.length, items: TECHNOLOGIES,
    },
    {
      id: 'products', label: '配方知識', labelEN: 'Product Recipes', icon: <BookOpen size={16} />,
      color: 'text-nms-green', count: PRODUCTS.length, items: PRODUCTS,
    },
    {
      id: 'substances', label: '物質資料庫', labelEN: 'Substance Database', icon: <Telescope size={16} />,
      color: 'text-nms-gold', count: SUBSTANCES.length, items: SUBSTANCES,
    },
  ];

  const filteredItems = (items: typeof TECHNOLOGIES) => {
    if (!searchQuery) return items;
    const q = searchQuery.toLowerCase();
    return items.filter(i => i.name.toLowerCase().includes(q) || i.nameCN.includes(searchQuery) || i.id.toLowerCase().includes(q));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-nms-text">發現與知識管理 <span className="text-xs text-nms-text-muted font-normal">Discovery & Knowledge</span></h2>
          <p className="text-xs text-nms-text-muted mt-1">管理已知科技、配方、語言與傳送門符文</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => { addNotification('已解鎖全部科技與配方！', 'success'); }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-nms-accent/10 border border-nms-accent/30 text-nms-accent text-xs font-medium hover:bg-nms-accent/20 transition-colors">
            <Unlock size={12} /> 全部解鎖
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-nms-text-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="搜尋科技、配方或物質... Search tech, recipes, substances..."
          className="w-full bg-nms-card border border-nms-border rounded-lg pl-9 pr-3 py-2.5 text-sm text-nms-text outline-none focus:border-nms-accent placeholder:text-nms-text-muted/50"
        />
      </div>

      {/* Portal Glyphs */}
      <div className="bg-nms-card border border-nms-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Telescope size={16} className="text-nms-accent2" />
            <span className="text-sm font-bold text-nms-text">傳送門符文</span>
            <span className="text-xs text-nms-text-muted">Portal Glyphs ({knownGlyphs}/16)</span>
          </div>
          <button onClick={unlockAllGlyphs} className="flex items-center gap-1 px-2 py-1 rounded bg-nms-accent2/10 text-nms-accent2 text-[10px] hover:bg-nms-accent2/20 transition-colors">
            <Unlock size={10} /> 全部解鎖
          </button>
        </div>
        <div className="flex gap-2 justify-center">
          {GLYPH_SYMBOLS.map((sym, i) => (
            <button
              key={i}
              onClick={() => {
                if (i >= knownGlyphs) {
                  setKnownGlyphs(i + 1);
                  addNotification(`已解鎖符文 ${i + 1}`, 'success');
                }
              }}
              className={`w-10 h-10 rounded-lg border flex flex-col items-center justify-center transition-all ${
                i < knownGlyphs
                  ? 'border-nms-accent2/40 bg-nms-accent2/10'
                  : 'border-nms-border bg-nms-bg opacity-40 hover:opacity-70 cursor-pointer'
              }`}
            >
              <span className="text-sm">{sym}</span>
              <span className="text-[7px] font-mono text-nms-text-muted">{i.toString(16).toUpperCase()}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="bg-nms-card border border-nms-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Languages size={16} className="text-nms-gold" />
            <span className="text-sm font-bold text-nms-text">語言學習</span>
            <span className="text-xs text-nms-text-muted">Languages</span>
          </div>
          <button onClick={learnAllLanguages} className="flex items-center gap-1 px-2 py-1 rounded bg-nms-gold/10 text-nms-gold text-[10px] hover:bg-nms-gold/20 transition-colors">
            <Unlock size={10} /> 學會全部
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {RACES.map(race => {
            const learned = wordsLearned[race.id] || 0;
            const percent = Math.round((learned / race.totalWords) * 100);
            return (
              <div key={race.id} className="bg-nms-bg rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg">{race.icon}</span>
                    <div>
                      <div className="text-xs font-medium text-nms-text">{race.nameCN}</div>
                      <div className="text-[9px] text-nms-text-muted">{race.name}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => learnAllWords(race.id, race.nameCN)}
                    className="text-[9px] px-1.5 py-0.5 rounded bg-nms-card text-nms-text-muted hover:text-nms-gold transition-colors"
                  >
                    MAX
                  </button>
                </div>
                <div className="h-1.5 bg-nms-card rounded-full overflow-hidden mb-1">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percent}%`,
                      background: percent === 100 ? '#10b981' : percent > 50 ? '#f59e0b' : '#3b82f6',
                    }}
                  />
                </div>
                <div className="text-[9px] text-nms-text-muted text-right">{learned}/{race.totalWords} ({percent}%)</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tech / Products / Substances sections */}
      {sections.map(section => (
        <div key={section.id} className="bg-nms-card border border-nms-border rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection(section.id)}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-nms-hover transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className={section.color}>{section.icon}</span>
              <span className="text-sm font-bold text-nms-text">{section.label}</span>
              <span className="text-xs text-nms-text-muted">{section.labelEN} ({section.count})</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); addNotification(`已解鎖全部${section.label}！`, 'success'); }}
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-nms-bg text-[10px] text-nms-text-muted hover:text-nms-green transition-colors"
              >
                <Unlock size={10} /> 全部
              </button>
              {expandedSection === section.id ? <ChevronUp size={14} className="text-nms-text-muted" /> : <ChevronDown size={14} className="text-nms-text-muted" />}
            </div>
          </button>

          {expandedSection === section.id && (
            <div className="border-t border-nms-border px-4 py-3 max-h-64 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                {filteredItems(section.items).map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-nms-hover transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded flex items-center justify-center text-[9px] font-bold ${
                        item.category === 'substance' ? 'bg-nms-green/20 text-nms-green' :
                        item.category === 'product' ? 'bg-nms-gold/20 text-nms-gold' :
                        'bg-nms-purple/20 text-nms-purple'
                      }`}>{item.icon}</span>
                      <div>
                        <div className="text-xs text-nms-text">{item.nameCN}</div>
                        <div className="text-[9px] text-nms-text-muted">{item.name}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => addNotification(`${item.nameCN} 已切換狀態`, 'info')}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-nms-bg"
                    >
                      <Lock size={10} className="text-nms-text-muted" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
