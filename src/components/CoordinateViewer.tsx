import { useState } from 'react';
import { Copy, Check, Globe, MapPin } from 'lucide-react';
import { useStore } from '../store/useStore';

const GLYPHS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
const GLYPH_SYMBOLS = ['🌀', '🌊', '🔺', '🌙', '⛵', '🏠', '🌿', '🎵', '⚡', '🌍', '💀', '🦋', '🚀', '💎', '🌸', '🔥'];

interface CoordinateViewerProps {
  address?: {
    portalCode?: string;
    galacticX?: number;
    galacticY?: number;
    galacticZ?: number;
    solarSystem?: number;
    planet?: number;
    galaxy?: string;
  };
}

function portalCodeToGlyphs(code: string): number[] {
  return code.split('').map(c => parseInt(c, 16));
}

function glyphsToPortalCode(glyphs: number[]): string {
  return glyphs.map(g => g.toString(16).toUpperCase()).join('');
}

export function CoordinateViewer({ address }: CoordinateViewerProps) {
  const { addNotification } = useStore();
  const [portalCode, setPortalCode] = useState(address?.portalCode || '000000000000');
  const [editMode, setEditMode] = useState(false);
  const [copied, setCopied] = useState(false);

  const glyphs = portalCodeToGlyphs(portalCode.padEnd(12, '0').slice(0, 12));

  const handleGlyphClick = (position: number) => {
    if (!editMode) return;
    const current = glyphs[position];
    const next = (current + 1) % 16;
    const newGlyphs = [...glyphs];
    newGlyphs[position] = next;
    setPortalCode(glyphsToPortalCode(newGlyphs));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(portalCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      addNotification('傳送門密碼已複製', 'info');
    } catch {
      addNotification('複製失敗', 'error');
    }
  };

  return (
    <div className="bg-nms-card border border-nms-border rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-nms-border">
        <div className="flex items-center gap-2">
          <Globe size={14} className="text-nms-accent2" />
          <span className="text-sm font-medium text-nms-text">座標與傳送門密碼</span>
          <span className="text-[10px] text-nms-text-muted">Coordinates & Portal Code</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setEditMode(!editMode)}
            className={`text-[10px] px-2 py-0.5 rounded transition-colors ${editMode ? 'bg-nms-accent/15 text-nms-accent' : 'bg-nms-bg text-nms-text-muted hover:text-nms-text'}`}
          >
            {editMode ? '完成編輯' : '編輯'}
          </button>
          <button onClick={handleCopy} className="p-1 rounded hover:bg-nms-hover text-nms-text-muted hover:text-nms-green transition-colors" title="複製密碼">
            {copied ? <Check size={12} className="text-nms-green" /> : <Copy size={12} />}
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Portal Glyphs */}
        <div>
          <div className="text-[10px] text-nms-text-muted mb-2">傳送門符文 Portal Glyphs {editMode && <span className="text-nms-accent">(點擊切換)</span>}</div>
          <div className="flex gap-1 justify-center">
            {glyphs.map((g, i) => (
              <button
                key={i}
                onClick={() => handleGlyphClick(i)}
                className={`w-10 h-10 rounded-lg border flex flex-col items-center justify-center transition-all ${
                  editMode
                    ? 'border-nms-accent/30 bg-nms-bg hover:bg-nms-accent/10 cursor-pointer hover:scale-110'
                    : 'border-nms-border bg-nms-bg cursor-default'
                }`}
              >
                <span className="text-sm">{GLYPH_SYMBOLS[g]}</span>
                <span className="text-[8px] font-mono text-nms-text-muted">{GLYPHS[g]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Hex code */}
        <div className="flex items-center justify-center gap-2">
          <span className="text-[10px] text-nms-text-muted">密碼:</span>
          {editMode ? (
            <input
              value={portalCode}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9A-Fa-f]/g, '').toUpperCase().slice(0, 12);
                setPortalCode(val);
              }}
              maxLength={12}
              className="bg-nms-bg border border-nms-accent rounded px-3 py-1 text-sm font-mono text-nms-accent text-center w-36 outline-none tracking-widest"
            />
          ) : (
            <span className="text-sm font-mono text-nms-accent tracking-widest">{portalCode}</span>
          )}
        </div>

        {/* Quick input buttons */}
        {editMode && (
          <div className="flex flex-wrap gap-1 justify-center">
            {GLYPHS.map((g, i) => (
              <button
                key={g}
                onClick={() => {
                  const pos = portalCode.length < 12 ? portalCode.length : 11;
                  const newCode = portalCode.slice(0, pos) + g + portalCode.slice(pos + 1);
                  setPortalCode(newCode.slice(0, 12));
                }}
                className="w-8 h-8 rounded border border-nms-border bg-nms-bg text-xs flex flex-col items-center justify-center hover:border-nms-accent/40 hover:bg-nms-accent/10 transition-colors"
              >
                <span className="text-[10px]">{GLYPH_SYMBOLS[i]}</span>
                <span className="text-[7px] font-mono text-nms-text-muted">{g}</span>
              </button>
            ))}
          </div>
        )}

        {/* Coordinate info */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-nms-bg rounded-lg p-2">
            <MapPin size={10} className="text-nms-accent2 mx-auto mb-0.5" />
            <div className="text-[9px] text-nms-text-muted">銀河</div>
            <div className="text-xs font-medium text-nms-text">{address?.galaxy || 'Euclid'}</div>
          </div>
          <div className="bg-nms-bg rounded-lg p-2">
            <div className="text-[9px] text-nms-text-muted">星系</div>
            <div className="text-xs font-mono text-nms-text">{address?.solarSystem ?? parseInt(portalCode.slice(1, 4), 16)}</div>
          </div>
          <div className="bg-nms-bg rounded-lg p-2">
            <div className="text-[9px] text-nms-text-muted">星球</div>
            <div className="text-xs font-mono text-nms-text">{address?.planet ?? parseInt(portalCode.slice(0, 1), 16)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
