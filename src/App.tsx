import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Notifications } from './components/Notifications';
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
import { SquadronPage } from './pages/SquadronPage';
import { AccountPage } from './pages/AccountPage';
import { SettingsPage } from './pages/SettingsPage';
import { useStore } from './store/useStore';

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
  squadron: SquadronPage,
  account: AccountPage,
  settings: SettingsPage,
};

function App() {
  const { activeTab, sidebarCollapsed } = useStore();
  const PageComponent = pages[activeTab] ?? Dashboard;

  return (
    <div className="min-h-screen bg-nms-bg">
      <Sidebar />
      <Header />
      <Notifications />
      <main className={`pt-14 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-56'}`}>
        <div className="p-6 max-w-7xl mx-auto">
          <PageComponent />
        </div>
      </main>
    </div>
  );
}

export default App;
