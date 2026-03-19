import { Monitor, Globe, FolderOpen, Info } from 'lucide-react';

export function SettingsPage() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-lg font-bold text-nms-text">設定 <span className="text-xs text-nms-text-muted font-normal">Settings</span></h2>
        <p className="text-xs text-nms-text-muted mt-1">應用程式設定與偏好</p>
      </div>

      <div className="space-y-4">
        {/* Display */}
        <div className="bg-nms-card border border-nms-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <Monitor size={16} className="text-nms-accent" />
            <h3 className="text-sm font-bold text-nms-text">顯示設定 Display</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-nms-text">深色模式 Dark Mode</div>
                <div className="text-[10px] text-nms-text-muted">始終使用深色主題</div>
              </div>
              <div className="w-10 h-5 rounded-full bg-nms-accent relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white transition-all" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-nms-text">動畫效果 Animations</div>
                <div className="text-[10px] text-nms-text-muted">啟用UI動畫效果</div>
              </div>
              <div className="w-10 h-5 rounded-full bg-nms-accent relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white transition-all" />
              </div>
            </div>
          </div>
        </div>

        {/* Language */}
        <div className="bg-nms-card border border-nms-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <Globe size={16} className="text-nms-green" />
            <h3 className="text-sm font-bold text-nms-text">語言設定 Language</h3>
          </div>
          <div className="flex gap-2">
            {['繁體中文', 'English', '日本語'].map((lang, i) => (
              <button key={lang} className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${i === 0 ? 'border-nms-accent/30 bg-nms-accent/10 text-nms-accent' : 'border-nms-border text-nms-text-muted hover:border-nms-text-muted/40'}`}>
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Save paths */}
        <div className="bg-nms-card border border-nms-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <FolderOpen size={16} className="text-nms-gold" />
            <h3 className="text-sm font-bold text-nms-text">存檔路徑 Save Paths</h3>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Steam', path: 'C:\\Users\\Player\\AppData\\Roaming\\HelloGames\\NMS\\' },
              { label: 'GOG', path: 'C:\\Users\\Player\\AppData\\Roaming\\HelloGames\\NMS\\DefaultUser\\' },
              { label: 'Game Pass', path: '%LOCALAPPDATA%\\Packages\\HelloGames...\\SystemAppData\\wgs\\' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3 p-2 bg-nms-bg rounded-lg">
                <span className="text-xs font-medium text-nms-text w-20">{item.label}</span>
                <code className="text-[10px] text-nms-text-muted flex-1 truncate">{item.path}</code>
                <button className="text-[10px] px-2 py-0.5 rounded bg-nms-hover text-nms-text-dim hover:text-nms-text">瀏覽</button>
              </div>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="bg-nms-card border border-nms-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <Info size={16} className="text-nms-purple" />
            <h3 className="text-sm font-bold text-nms-text">關於 About</h3>
          </div>
          <div className="text-xs text-nms-text-muted space-y-1">
            <p><strong className="text-nms-text">NMS Save Master</strong> v1.0.0</p>
            <p>No Man's Sky 存檔管理大師</p>
            <p>基於 NMSSaveEditor 重新設計的現代化管理介面</p>
            <p className="mt-2">支援 NMS v6.2 "Remnant" | Steam / GOG / Game Pass / PS4</p>
          </div>
        </div>
      </div>
    </div>
  );
}
