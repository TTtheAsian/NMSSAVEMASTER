import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Notifications } from './components/Notifications';
import { CommandPalette } from './components/CommandPalette';
import { FloatingActions } from './components/FloatingActions';
import { Dashboard } from './pages/Dashboard';
import { SavesPage } from './pages/SavesPage';
import { InventoryPage } from './pages/InventoryPage';
import { ShipsPage } from './pages/ShipsPage';
import { MultiToolsPage } from './pages/MultiToolsPage';
import { FreighterPage } from './pages/FreighterPage';
import { VehiclesPage } from './pages/VehiclesPage';
import { CompanionsPage } from './pages/CompanionsPage';
import { BasesPage } from './pages/BasesPage';
import { SettlementsPage } from './pages/SettlementsPage';
import { DiscoveryPage } from './pages/DiscoveryPage';
import { SquadronPage } from './pages/SquadronPage';
import { AccountPage } from './pages/AccountPage';
import { SettingsPage } from './pages/SettingsPage';
import { useStore } from './store/useStore';
import { useEffect } from 'react';

const pages: Record<string, React.FC> = {
  dashboard: Dashboard,
  saves: SavesPage,
  inventory: InventoryPage,
  ships: ShipsPage,
  multitools: MultiToolsPage,
  freighter: FreighterPage,
  vehicles: VehiclesPage,
  companions: CompanionsPage,
  bases: BasesPage,
  settlements: SettlementsPage,
  discovery: DiscoveryPage,
  squadron: SquadronPage,
  account: AccountPage,
  settings: SettingsPage,
};

function App() {
  const { activeTab, sidebarCollapsed, setActiveTab } = useStore();
  const PageComponent = pages[activeTab] ?? Dashboard;

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ctrl+S to save
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        useStore.getState().addNotification('存檔已儲存！', 'success');
      }
      // Ctrl+Z to undo
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        e.preventDefault();
        useStore.getState().addNotification('已還原上次修改', 'info');
      }
      // Number key navigation (1-9 for tabs when not in input)
      if (e.altKey && !e.ctrlKey && !e.metaKey) {
        const tabKeys: Record<string, string> = {
          'd': 'dashboard', 'i': 'inventory', 's': 'ships',
          'm': 'multitools', 'f': 'freighter', 'v': 'vehicles',
          'c': 'companions', 'b': 'bases',
        };
        if (tabKeys[e.key]) {
          e.preventDefault();
          setActiveTab(tabKeys[e.key]);
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [setActiveTab]);

  return (
    <div className="min-h-screen bg-nms-bg">
      <Sidebar />
      <Header />
      <Notifications />
      <CommandPalette />
      <FloatingActions />
      <main className={`pt-14 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-56'}`}>
        <div className="p-6 max-w-7xl mx-auto">
          <PageComponent />
        </div>
      </main>
    </div>
  );
}

export default App;
