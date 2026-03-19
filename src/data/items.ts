export interface ItemDefinition {
  id: string;
  name: string;
  nameCN: string;
  category: 'substance' | 'product' | 'technology';
  subCategory: string;
  maxStack: number;
  icon: string;
  description: string;
}

export const SUBSTANCES: ItemDefinition[] = [
  { id: 'FUEL1', name: 'Carbon', nameCN: '碳', category: 'substance', subCategory: 'Fuel', maxStack: 9999, icon: 'C', description: 'Common organic element' },
  { id: 'FUEL2', name: 'Condensed Carbon', nameCN: '凝結碳', category: 'substance', subCategory: 'Fuel', maxStack: 9999, icon: 'C+', description: 'Refined organic element' },
  { id: 'OXYGEN', name: 'Oxygen', nameCN: '氧氣', category: 'substance', subCategory: 'Fuel', maxStack: 9999, icon: 'O2', description: 'Essential life support element' },
  { id: 'LAND1', name: 'Ferrite Dust', nameCN: '鐵氧體粉塵', category: 'substance', subCategory: 'Earth', maxStack: 9999, icon: 'Fe', description: 'Common mineral element' },
  { id: 'LAND2', name: 'Pure Ferrite', nameCN: '純鐵氧體', category: 'substance', subCategory: 'Earth', maxStack: 9999, icon: 'Fe+', description: 'Processed mineral element' },
  { id: 'LAND3', name: 'Magnetised Ferrite', nameCN: '磁化鐵氧體', category: 'substance', subCategory: 'Earth', maxStack: 9999, icon: 'Fe++', description: 'Highly processed mineral' },
  { id: 'CAVE1', name: 'Cobalt', nameCN: '鈷', category: 'substance', subCategory: 'Earth', maxStack: 9999, icon: 'Co', description: 'Subterranean mineral' },
  { id: 'CAVE2', name: 'Ionised Cobalt', nameCN: '離子化鈷', category: 'substance', subCategory: 'Earth', maxStack: 9999, icon: 'Co+', description: 'Processed subterranean mineral' },
  { id: 'LAUNCHSUB', name: 'Di-hydrogen', nameCN: '二氫', category: 'substance', subCategory: 'Fuel', maxStack: 9999, icon: 'H', description: 'High-energy hydrogen isotope' },
  { id: 'LAUNCHSUB2', name: 'Di-hydrogen Jelly', nameCN: '二氫凝膠', category: 'product', subCategory: 'Fuel', maxStack: 5, icon: 'H+', description: 'Stabilised hydrogen' },
  { id: 'WATER1', name: 'Salt', nameCN: '鹽', category: 'substance', subCategory: 'Earth', maxStack: 9999, icon: 'Na', description: 'Mineral salt' },
  { id: 'WATER2', name: 'Chlorine', nameCN: '氯', category: 'substance', subCategory: 'Earth', maxStack: 9999, icon: 'Cl', description: 'Reactive gas element' },
  { id: 'STELLAR2', name: 'Cadmium', nameCN: '鎘', category: 'substance', subCategory: 'Stellar', maxStack: 9999, icon: 'Cd', description: 'Red star isotope' },
  { id: 'STELLAR3', name: 'Emeril', nameCN: '翡翠', category: 'substance', subCategory: 'Stellar', maxStack: 9999, icon: 'Em', description: 'Green star isotope' },
  { id: 'STELLAR4', name: 'Indium', nameCN: '銦', category: 'substance', subCategory: 'Stellar', maxStack: 9999, icon: 'In', description: 'Blue star isotope' },
  { id: 'YELLOW2', name: 'Copper', nameCN: '銅', category: 'substance', subCategory: 'Stellar', maxStack: 9999, icon: 'Cu', description: 'Yellow star isotope' },
  { id: 'EX_YELLOW', name: 'Activated Copper', nameCN: '活化銅', category: 'substance', subCategory: 'Stellar', maxStack: 9999, icon: 'Cu+', description: 'Activated isotope' },
  { id: 'EX_RED', name: 'Activated Cadmium', nameCN: '活化鎘', category: 'substance', subCategory: 'Stellar', maxStack: 9999, icon: 'Cd+', description: 'Activated red isotope' },
  { id: 'EX_GREEN', name: 'Activated Emeril', nameCN: '活化翡翠', category: 'substance', subCategory: 'Stellar', maxStack: 9999, icon: 'Em+', description: 'Activated green isotope' },
  { id: 'EX_BLUE', name: 'Activated Indium', nameCN: '活化銦', category: 'substance', subCategory: 'Stellar', maxStack: 9999, icon: 'In+', description: 'Activated blue isotope' },
  { id: 'RADIO1', name: 'Uranium', nameCN: '鈾', category: 'substance', subCategory: 'Catalyst', maxStack: 9999, icon: 'U', description: 'Radioactive element' },
  { id: 'DUSTY1', name: 'Pyrite', nameCN: '黃鐵礦', category: 'substance', subCategory: 'Catalyst', maxStack: 9999, icon: 'Py', description: 'Scorched element' },
  { id: 'COLD1', name: 'Dioxite', nameCN: '二氧化物', category: 'substance', subCategory: 'Catalyst', maxStack: 9999, icon: 'CO2', description: 'Frozen element' },
  { id: 'TOXIC1', name: 'Ammonia', nameCN: '氨', category: 'substance', subCategory: 'Catalyst', maxStack: 9999, icon: 'NH3', description: 'Toxic element' },
  { id: 'LUSH1', name: 'Paraffinium', nameCN: '石蠟', category: 'substance', subCategory: 'Catalyst', maxStack: 9999, icon: 'Pf', description: 'Lush element' },
  { id: 'CREATURE1', name: 'Mordite', nameCN: '死靈素', category: 'substance', subCategory: 'Exotic', maxStack: 9999, icon: 'Mo', description: 'Harvested from creatures' },
  { id: 'PLANT_LUSH', name: 'Star Bulb', nameCN: '星球根', category: 'substance', subCategory: 'Exotic', maxStack: 9999, icon: 'Sb', description: 'Agricultural product' },
  { id: 'PLANT_POIS', name: 'Fungal Mould', nameCN: '真菌黴菌', category: 'substance', subCategory: 'Exotic', maxStack: 9999, icon: 'Fm', description: 'Toxic agriculture' },
  { id: 'PLANT_SNOW', name: 'Frost Crystal', nameCN: '霜晶', category: 'substance', subCategory: 'Exotic', maxStack: 9999, icon: 'Fc', description: 'Frozen agriculture' },
  { id: 'PLANT_HOT', name: 'Cactus Flesh', nameCN: '仙人掌肉', category: 'substance', subCategory: 'Exotic', maxStack: 9999, icon: 'Cf', description: 'Scorched agriculture' },
  { id: 'PLANT_RAD', name: 'Gamma Root', nameCN: '伽馬根', category: 'substance', subCategory: 'Exotic', maxStack: 9999, icon: 'Gr', description: 'Irradiated agriculture' },
  { id: 'PLANT_CAVE', name: 'Marrow Bulb', nameCN: '髓球根', category: 'substance', subCategory: 'Exotic', maxStack: 9999, icon: 'Mb', description: 'Subterranean plant' },
  { id: 'PLANT_WATER', name: 'Kelp Sac', nameCN: '海帶囊', category: 'substance', subCategory: 'Exotic', maxStack: 9999, icon: 'Ks', description: 'Underwater plant' },
  { id: 'CATALYST1', name: 'Sodium', nameCN: '鈉', category: 'substance', subCategory: 'Catalyst', maxStack: 9999, icon: 'Na', description: 'Catalytic element' },
  { id: 'CATALYST2', name: 'Sodium Nitrate', nameCN: '硝酸鈉', category: 'substance', subCategory: 'Catalyst', maxStack: 9999, icon: 'Na+', description: 'Processed catalyst' },
  { id: 'ROCKETSUB', name: 'Tritium', nameCN: '氚', category: 'substance', subCategory: 'Fuel', maxStack: 9999, icon: 'H3', description: 'Starship fuel isotope' },
  { id: 'JELLY', name: 'Deuterium', nameCN: '氘', category: 'substance', subCategory: 'Fuel', maxStack: 9999, icon: 'D', description: 'Processed hydrogen' },
  { id: 'BP_SALVAGE', name: 'Salvaged Data', nameCN: '回收數據', category: 'substance', subCategory: 'Exotic', maxStack: 9999, icon: 'Sd', description: 'Encrypted blueprint data' },
  { id: 'NANITES', name: 'Nanite Cluster', nameCN: '奈米星團', category: 'substance', subCategory: 'Exotic', maxStack: 9999, icon: 'Nn', description: 'Programmable matter' },
  { id: 'TGOLD', name: 'Gold', nameCN: '金', category: 'substance', subCategory: 'Metal', maxStack: 9999, icon: 'Au', description: 'Tradeable precious metal' },
  { id: 'TSILVER', name: 'Silver', nameCN: '銀', category: 'substance', subCategory: 'Metal', maxStack: 9999, icon: 'Ag', description: 'Tradeable metal' },
  { id: 'TPLAT', name: 'Platinum', nameCN: '鉑', category: 'substance', subCategory: 'Metal', maxStack: 9999, icon: 'Pt', description: 'Rare tradeable metal' },
  { id: 'SPECIAL_POOP', name: 'Faecium', nameCN: '糞晶', category: 'substance', subCategory: 'Exotic', maxStack: 9999, icon: 'Fa', description: 'Organic waste' },
];

export const PRODUCTS: ItemDefinition[] = [
  { id: 'CASING', name: 'Metal Plating', nameCN: '金屬鍍層', category: 'product', subCategory: 'Component', maxStack: 10, icon: 'Mp', description: 'Standard construction component' },
  { id: 'MICROCHIP', name: 'Microprocessor', nameCN: '微處理器', category: 'product', subCategory: 'Component', maxStack: 10, icon: 'Mc', description: 'Advanced component' },
  { id: 'ANTIMATTER', name: 'Antimatter', nameCN: '反物質', category: 'product', subCategory: 'Fuel', maxStack: 5, icon: 'Am', description: 'Warp drive fuel component' },
  { id: 'HYPERFUEL1', name: 'Warp Cell', nameCN: '曲速電池', category: 'product', subCategory: 'Fuel', maxStack: 5, icon: 'Wc', description: 'Hyperdrive fuel' },
  { id: 'POWERCELL', name: 'Ion Battery', nameCN: '離子電池', category: 'product', subCategory: 'Energy', maxStack: 20, icon: 'Ib', description: 'Hazard protection fuel' },
  { id: 'LAUNCHFUEL', name: 'Starship Launch Fuel', nameCN: '星艦發射燃料', category: 'product', subCategory: 'Fuel', maxStack: 10, icon: 'Lf', description: 'Launch thruster fuel' },
  { id: 'GRENFUEL1', name: 'Life Support Gel', nameCN: '生命支持凝膠', category: 'product', subCategory: 'Energy', maxStack: 20, icon: 'Lg', description: 'Life support recharge' },
  { id: 'ATLAS_SEED_1', name: 'Atlas Stone', nameCN: '阿特拉斯之石', category: 'product', subCategory: 'Curiosity', maxStack: 1, icon: 'As', description: 'Mysterious artefact' },
  { id: 'TECH_COMP', name: 'Technology Module', nameCN: '科技模組', category: 'product', subCategory: 'Component', maxStack: 10, icon: 'Tm', description: 'Upgrade component' },
  { id: 'FARMPROD1', name: 'Glass', nameCN: '玻璃', category: 'product', subCategory: 'Crafted', maxStack: 10, icon: 'Gl', description: 'Transparent building material' },
  { id: 'FARMPROD3', name: 'Circuit Board', nameCN: '電路板', category: 'product', subCategory: 'Crafted', maxStack: 5, icon: 'Cb', description: 'Advanced electronics' },
  { id: 'FARMPROD5', name: 'Living Glass', nameCN: '活性玻璃', category: 'product', subCategory: 'Crafted', maxStack: 5, icon: 'Lg', description: 'Organic-infused glass' },
  { id: 'FARMPROD8', name: 'Stasis Device', nameCN: '停滯裝置', category: 'product', subCategory: 'Crafted', maxStack: 1, icon: 'Sd', description: 'High-value crafted item' },
  { id: 'FARMPROD7', name: 'Fusion Ignitor', nameCN: '聚變點火器', category: 'product', subCategory: 'Crafted', maxStack: 1, icon: 'Fi', description: 'High-value crafted item' },
  { id: 'GEODE_RARE', name: 'Storm Crystal', nameCN: '風暴水晶', category: 'product', subCategory: 'Curiosity', maxStack: 5, icon: 'Sc', description: 'Valuable storm collectible' },
  { id: 'FRIG_TOKEN', name: 'Salvaged Frigate Module', nameCN: '回收護衛艦模組', category: 'product', subCategory: 'Component', maxStack: 10, icon: 'Fm', description: 'Frigate upgrade module' },
  { id: 'CHART_TREAS', name: 'Treasure Map', nameCN: '藏寶圖', category: 'product', subCategory: 'Chart', maxStack: 5, icon: 'Tr', description: 'Points to treasure' },
  { id: 'MEGAPROD1', name: 'Quantum Processor', nameCN: '量子處理器', category: 'product', subCategory: 'Crafted', maxStack: 5, icon: 'Qp', description: 'Advanced crafted component' },
  { id: 'MEGAPROD2', name: 'Cryogenic Chamber', nameCN: '低溫艙', category: 'product', subCategory: 'Crafted', maxStack: 5, icon: 'Cc', description: 'Advanced crafted component' },
  { id: 'MEGAPROD3', name: 'Iridesite', nameCN: '虹彩石', category: 'product', subCategory: 'Crafted', maxStack: 5, icon: 'Ir', description: 'High-value alloy' },
  { id: 'MEGAPROD4', name: 'Geodesite', nameCN: '晶洞石', category: 'product', subCategory: 'Crafted', maxStack: 5, icon: 'Ge', description: 'High-value alloy' },
];

export const TECHNOLOGIES: ItemDefinition[] = [
  { id: 'HHAZ_HOT', name: 'Thermal Protection', nameCN: '熱防護', category: 'technology', subCategory: 'Exosuit', maxStack: 1, icon: 'Tp', description: 'Heat protection module' },
  { id: 'HHAZ_COLD', name: 'Cold Protection', nameCN: '冷防護', category: 'technology', subCategory: 'Exosuit', maxStack: 1, icon: 'Cp', description: 'Cold protection module' },
  { id: 'HHAZ_RAD', name: 'Radiation Protection', nameCN: '輻射防護', category: 'technology', subCategory: 'Exosuit', maxStack: 1, icon: 'Rp', description: 'Radiation protection module' },
  { id: 'HHAZ_TOX', name: 'Toxic Protection', nameCN: '毒素防護', category: 'technology', subCategory: 'Exosuit', maxStack: 1, icon: 'Xp', description: 'Toxic protection module' },
  { id: 'HHAZ_WATER', name: 'Aeration Membrane', nameCN: '透氣膜', category: 'technology', subCategory: 'Exosuit', maxStack: 1, icon: 'Am', description: 'Underwater breathing' },
  { id: 'HJUMP1', name: 'Jetpack', nameCN: '噴射背包', category: 'technology', subCategory: 'Exosuit', maxStack: 1, icon: 'Jp', description: 'Jump augmentation' },
  { id: 'HLASERGUN', name: 'Mining Beam', nameCN: '採礦光束', category: 'technology', subCategory: 'MultiTool', maxStack: 1, icon: 'Mb', description: 'Resource extraction tool' },
  { id: 'HGUNGUN', name: 'Boltcaster', nameCN: '螺栓發射器', category: 'technology', subCategory: 'MultiTool', maxStack: 1, icon: 'Bc', description: 'Projectile weapon' },
  { id: 'HSCAN', name: 'Scanner', nameCN: '掃描器', category: 'technology', subCategory: 'MultiTool', maxStack: 1, icon: 'Sc', description: 'Resource and creature scanner' },
  { id: 'HYPERDRIVE', name: 'Hyperdrive', nameCN: '超光速引擎', category: 'technology', subCategory: 'Ship', maxStack: 1, icon: 'Hd', description: 'Interstellar travel device' },
  { id: 'SHIPJUMP1', name: 'Pulse Engine', nameCN: '脈衝引擎', category: 'technology', subCategory: 'Ship', maxStack: 1, icon: 'Pe', description: 'In-system boost drive' },
  { id: 'SHIPGUN1', name: 'Photon Cannon', nameCN: '光子炮', category: 'technology', subCategory: 'Ship', maxStack: 1, icon: 'Pc', description: 'Standard ship weapon' },
  { id: 'SHIPSHIELD', name: 'Deflector Shield', nameCN: '偏轉護盾', category: 'technology', subCategory: 'Ship', maxStack: 1, icon: 'Ds', description: 'Ship shield system' },
  { id: 'FRHYPER', name: 'Freighter Hyperdrive', nameCN: '貨船超光速引擎', category: 'technology', subCategory: 'Freighter', maxStack: 1, icon: 'Fh', description: 'Capital ship warp drive' },
];

export const ALL_ITEMS = [...SUBSTANCES, ...PRODUCTS, ...TECHNOLOGIES];

export function getItemById(id: string): ItemDefinition | undefined {
  return ALL_ITEMS.find(item => item.id === id);
}

export function searchItems(query: string, category?: string): ItemDefinition[] {
  const lower = query.toLowerCase();
  return ALL_ITEMS.filter(item => {
    const matchesQuery = !query ||
      item.name.toLowerCase().includes(lower) ||
      item.nameCN.includes(query) ||
      item.id.toLowerCase().includes(lower);
    const matchesCategory = !category || item.category === category;
    return matchesQuery && matchesCategory;
  });
}
