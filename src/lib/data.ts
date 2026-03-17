// =============================================================================
// The Source AI Explorer — Mock Data
// Construction procurement AI demo for "The Source" (FF&E procurement)
// =============================================================================

// -----------------------------------------------------------------------------
// Type Definitions
// -----------------------------------------------------------------------------

export interface SourceStats {
  procured: string;
  projects: string;
  onTime: string;
}

export interface Project {
  name: string;
  client: string;
  budget: number;
  timeline: string;
  location: string;
  scope: string;
  status: string;
  categories: string[];
}

export interface ExtractedLineItem {
  id: string;
  code: string;
  name: string;
  category: "FF&E" | "OFCI" | "OS&E";
  description: string;
  material: string;
  dimensions: string;
  quantity: number;
  unitPrice: number;
  confidence: number;
  status: "APPROVED" | "ORDERED" | "NEEDS REVIEW" | "PENDING";
  vendor?: string;
  leadTime?: string;
  imageUrl?: string;
}

export interface Vendor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  avgLeadTime: string;
  onTimeRate: number;
  location: string;
  certifications: string[];
}

export interface VendorMatch {
  vendorName: string;
  score: number;
  price: number;
  leadTime: string;
  notes: string;
  bestMatch?: boolean;
}

export interface BidItem {
  name: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
  leadTime: string;
  complianceScore: number;
}

export interface VendorBid {
  vendorId: string;
  vendorName: string;
  totalPrice: number;
  items: BidItem[];
  overallCompliance: number;
  deliveryDate: string;
  warranty: string;
  notes: string;
}

export interface BudgetCategory {
  category: string;
  allocated: number;
  spent: number;
}

export interface MarketDataPoint {
  year: number;
  value: number;
}

export interface LandscapeStat {
  label: string;
  value: string;
  source: string;
}

export interface ProtocolLayer {
  name: string;
  full: string;
  description: string;
  sourceMapping: string;
  color: string;
}

export interface FrameworkComparison {
  name: string;
  company: string;
  stateManagement: boolean;
  humanInLoop: boolean;
  multiAgent: boolean;
  streaming: boolean;
  toolUse: boolean;
  recommended: boolean;
}

export interface RoadmapPhase {
  phase: number;
  title: string;
  timeline: string;
  description: string;
  items: string[];
}

export interface ArchitectureLayer {
  id: string;
  label: string;
  sub: string;
  color: string;
  detail: string;
  alternatives: string;
  tradeoff: string;
}

export interface PipelineStage {
  id: number;
  title: string;
  description: string;
  aiAction: string;
  icon: string;
  duration: number;
}

export interface AgentField {
  label: string;
  value: string;
  confidence: number;
}

export interface AgentCard {
  id: string;
  name: string;
  icon: string;
  status: string;
  logs: string[];
  fields: AgentField[];
}

// -----------------------------------------------------------------------------
// 1. Company Stats
// -----------------------------------------------------------------------------

export const sourceStats: SourceStats = {
  procured: "$6.5B",
  projects: "1,225+",
  onTime: "97%",
};

// -----------------------------------------------------------------------------
// 2. Ritz-Carlton Project
// -----------------------------------------------------------------------------

export const ritzCarltonProject: Project = {
  name: "Ritz-Carlton Denver — Lobby & Public Spaces",
  client: "Marriott International",
  budget: 2400000,
  timeline: "Q2 2025 — Q4 2025",
  location: "Denver, CO",
  scope: "FF&E procurement for lobby, restaurant, bar, meeting rooms",
  status: "In Progress",
  categories: ["FF&E", "OFCI", "OS&E"],
};

// -----------------------------------------------------------------------------
// 3. Hotel Specification Text (for spec extraction demo)
// -----------------------------------------------------------------------------

export const hotelSpec: string = `RITZ-CARLTON DENVER — FF&E SPECIFICATION DOCUMENT
Project No. RC-DEN-2025-001 | Rev. 3 | Prepared by HKS Architects

DIVISION 12 — FURNISHINGS

Section 12 21 13 — Horizontal Louver Blinds
  Item HL-001: Motorized blackout roller shades, Lutron Palladiom QED, white fabric, ceiling-recessed pocket. Qty: 48 units. Lobby & restaurant perimeter windows.

Section 12 51 00 — Office Furniture (OFCI)
  Item OF-001: Reception desk, custom millwork, white oak veneer with brushed brass inlay, solid surface countertop (Corian Designer White). Dims: 14'-0" L x 3'-6" D x 42" H (standing height), ADA section at 34" H. Qty: 1.
  Item OF-002: Concierge station, matching white oak veneer, integrated monitor arm, power/data grommets. Dims: 6'-0" L x 2'-6" D x 42" H. Qty: 2.

Section 12 52 00 — Seating
  Item SE-001: Lobby lounge chair, fully upholstered, high-back wing profile, tight seat and back. COM Grade III fabric (Holly Hunt Great Plains "Velvety" in Dusk). Solid walnut turned legs with antique brass ferrules. Dims: 32"W x 34"D x 44"H, seat height 18". Qty: 24.
  Item SE-002: Restaurant dining chair, open-back cane detail, solid ash frame in ebonized finish. COM Grade II fabric seat (Kravet "Versailles" in Champagne). Dims: 21"W x 22"D x 33"H, seat height 18.5". Qty: 64.
  Item SE-003: Bar stool, swivel base, brushed stainless steel pedestal, memory-return mechanism. Full-grain leather seat in Cognac (Spinneybeck Volo). Dims: 17"W x 18"D x 42"H (overall), seat height 30". Qty: 18.
  Item SE-004: Meeting room task chair, high-back, synchro-tilt mechanism, adjustable lumbar. Mesh back (charcoal), upholstered seat Grade I fabric. Qty: 48. OFCI.

Section 12 53 00 — Tables
  Item TA-001: Lobby side table, round, Calacatta marble top (honed finish, 3/4" thick), blackened steel tripod base. Dims: 22" dia x 24"H. Qty: 12.
  Item TA-002: Restaurant dining table, rectangular, engineered white oak top with live edge detail, matte black powder-coated steel trestle base. Dims: 60"L x 30"W x 30"H. Qty: 32.
  Item TA-003: Bar high-top table, round, poured concrete top with brass edge banding, blackened steel column base. Dims: 36" dia x 42"H. Qty: 8.
  Item TA-004: Meeting room conference table, boat-shaped, walnut veneer, integrated power/data trough with soft-close lids, cable management. Dims: 12'-0"L x 4'-6"W x 30"H. Qty: 4.

Section 12 54 00 — Casegoods
  Item CG-001: Lobby credenza/console, white oak with fluted door fronts, brushed brass hardware, Calacatta marble top. Dims: 72"L x 18"D x 34"H. Qty: 3.

Section 12 56 00 — Decorative Accessories (OS&E)
  Item DA-001: Lobby area rug, hand-knotted wool/silk blend, custom abstract pattern (colorway: slate, gold, ivory). 70% New Zealand wool / 30% silk. Dims: 16'-0" x 12'-0". Qty: 3. Lead time: 16 weeks.
  Item DA-002: Decorative throw pillows, assorted sizes (20"x20", 22"x22", lumbar 12"x24"), coordinated fabrics per design intent package. Qty: 72 total (24 per colorway, 3 colorways).

Section 12 58 00 — Specialty Furniture
  Item SP-001: Host/hostess stand, restaurant entry, walnut with leather writing surface, integrated iPad mount, lower shelf for menus. Dims: 24"W x 18"D x 44"H. Qty: 2.

Section 26 51 00 — Interior Lighting (OFCI)
  Item LT-001: Lobby pendant chandelier, custom, hand-blown glass globes (amber/clear mix) on brushed brass armature, LED 3000K, dimmable. Dims: 48" dia x 60"H (approx 85 glass elements). Qty: 2.
  Item LT-002: Restaurant pendant, linear cluster, mouth-blown smoked glass cylinders on blackened steel rail, LED 2700K. Dims: 96"L x 12"W x adjustable drop 24"-48". Qty: 8.
  Item LT-003: Bar pendant, single blown glass orb, brass fitting, LED 2700K, adjustable drop. Dims: 12" dia. Qty: 12.

END OF SPECIFICATION — For complete finishes schedule see Appendix B.
Budget authority: $2,400,000 total FF&E/OFCI/OS&E package.
All items subject to designer approval of shop drawings and finish samples prior to production release.`;

// -----------------------------------------------------------------------------
// 4. Extracted Line Items
// -----------------------------------------------------------------------------

export const extractedLineItems: ExtractedLineItem[] = [
  {
    id: "SE-001",
    code: "12 52 00.A",
    name: "Lobby Lounge Chair — High-Back Wing",
    category: "FF&E",
    description:
      "Fully upholstered high-back wing chair, tight seat and back, COM Grade III fabric, solid walnut legs with antique brass ferrules",
    material: "Holly Hunt Great Plains 'Velvety' in Dusk / Solid Walnut",
    dimensions: '32"W x 34"D x 44"H, SH 18"',
    quantity: 24,
    unitPrice: 4850,
    confidence: 0.96,
    status: "APPROVED",
    vendor: "Bernhardt Hospitality",
    leadTime: "10-12 weeks",
  },
  {
    id: "SE-002",
    code: "12 52 00.B",
    name: "Restaurant Dining Chair — Cane Back",
    category: "FF&E",
    description:
      "Open-back cane detail dining chair, solid ash frame in ebonized finish, COM Grade II fabric seat",
    material: "Kravet 'Versailles' in Champagne / Solid Ash (ebonized)",
    dimensions: '21"W x 22"D x 33"H, SH 18.5"',
    quantity: 64,
    unitPrice: 1275,
    confidence: 0.93,
    status: "ORDERED",
    vendor: "Global Furniture Group",
    leadTime: "8-10 weeks",
  },
  {
    id: "SE-003",
    code: "12 52 00.C",
    name: "Bar Stool — Swivel Pedestal",
    category: "FF&E",
    description:
      "Swivel bar stool, brushed stainless steel pedestal base with memory-return, full-grain leather seat",
    material: "Spinneybeck Volo Leather (Cognac) / Brushed Stainless Steel",
    dimensions: '17"W x 18"D x 42"H, SH 30"',
    quantity: 18,
    unitPrice: 2100,
    confidence: 0.91,
    status: "APPROVED",
    vendor: "HBF",
    leadTime: "10-12 weeks",
  },
  {
    id: "TA-001",
    code: "12 53 00.A",
    name: "Lobby Side Table — Marble Top",
    category: "FF&E",
    description:
      "Round side table, honed Calacatta marble top (3/4\" thick), blackened steel tripod base",
    material: "Calacatta Marble / Blackened Steel",
    dimensions: '22" dia x 24"H',
    quantity: 12,
    unitPrice: 3200,
    confidence: 0.88,
    status: "PENDING",
    vendor: "Knoll",
    leadTime: "12-14 weeks",
  },
  {
    id: "LT-001",
    code: "26 51 00.A",
    name: "Lobby Pendant Chandelier — Custom Glass",
    category: "OFCI",
    description:
      "Custom hand-blown glass globe chandelier (~85 elements), amber/clear mix on brushed brass armature, LED 3000K dimmable",
    material: "Hand-Blown Glass / Brushed Brass",
    dimensions: '48" dia x 60"H',
    quantity: 2,
    unitPrice: 42000,
    confidence: 0.72,
    status: "NEEDS REVIEW",
    leadTime: "16-20 weeks",
  },
  {
    id: "DA-001",
    code: "12 56 00.A",
    name: "Lobby Area Rug — Hand-Knotted Wool/Silk",
    category: "OS&E",
    description:
      "Hand-knotted area rug, 70% NZ wool / 30% silk blend, custom abstract pattern in slate/gold/ivory colorway",
    material: "New Zealand Wool / Silk Blend",
    dimensions: "16'-0\" x 12'-0\"",
    quantity: 3,
    unitPrice: 28500,
    confidence: 0.65,
    status: "NEEDS REVIEW",
    leadTime: "16-18 weeks",
  },
  {
    id: "OF-001",
    code: "12 51 00.A",
    name: "Reception Desk — Custom Millwork",
    category: "OFCI",
    description:
      "Custom reception desk, white oak veneer with brushed brass inlay, Corian Designer White solid surface counter, ADA section at 34\" H",
    material: "White Oak Veneer / Brushed Brass / Corian",
    dimensions: "14'-0\"L x 3'-6\"D x 42\"H",
    quantity: 1,
    unitPrice: 65000,
    confidence: 0.85,
    status: "APPROVED",
    vendor: "Bernhardt Hospitality",
    leadTime: "14-16 weeks",
  },
  {
    id: "TA-002",
    code: "12 53 00.B",
    name: "Restaurant Dining Table — Live Edge Oak",
    category: "FF&E",
    description:
      "Rectangular dining table, engineered white oak top with live edge detail, matte black powder-coated steel trestle base",
    material: "Engineered White Oak / Powder-Coated Steel",
    dimensions: '60"L x 30"W x 30"H',
    quantity: 32,
    unitPrice: 2850,
    confidence: 0.9,
    status: "PENDING",
    vendor: "Restoration Hardware Contract",
    leadTime: "8-10 weeks",
  },
];

// -----------------------------------------------------------------------------
// 5. Vendors
// -----------------------------------------------------------------------------

export const vendors: Vendor[] = [
  {
    id: "v-bernhardt",
    name: "Bernhardt Hospitality",
    specialty: "Custom hospitality seating & casegoods",
    rating: 4.8,
    avgLeadTime: "10-14 weeks",
    onTimeRate: 94,
    location: "Lenoir, NC",
    certifications: ["BIFMA Level 3", "FSC Certified", "SCS Indoor Advantage Gold"],
  },
  {
    id: "v-rh-contract",
    name: "Restoration Hardware Contract",
    specialty: "Tables, lighting, and decorative furniture for hospitality",
    rating: 4.3,
    avgLeadTime: "8-12 weeks",
    onTimeRate: 88,
    location: "Corte Madera, CA",
    certifications: ["BIFMA Level 2", "GREENGUARD"],
  },
  {
    id: "v-global",
    name: "Global Furniture Group",
    specialty: "High-volume seating and tables for commercial interiors",
    rating: 4.5,
    avgLeadTime: "6-10 weeks",
    onTimeRate: 96,
    location: "Marlton, NJ",
    certifications: [
      "BIFMA Level 3",
      "SCS Indoor Advantage Gold",
      "ISO 14001",
    ],
  },
  {
    id: "v-knoll",
    name: "Knoll",
    specialty: "Modern furniture, textiles, and architectural accessories",
    rating: 4.7,
    avgLeadTime: "10-16 weeks",
    onTimeRate: 91,
    location: "East Greenville, PA",
    certifications: [
      "BIFMA Level 3",
      "FSC Certified",
      "GREENGUARD Gold",
      "Cradle to Cradle",
    ],
  },
  {
    id: "v-hbf",
    name: "HBF",
    specialty: "Premium seating, tables, and textiles for luxury hospitality",
    rating: 4.6,
    avgLeadTime: "10-14 weeks",
    onTimeRate: 93,
    location: "Hickory, NC",
    certifications: ["BIFMA Level 2", "SCS Indoor Advantage Gold", "FSC Certified"],
  },
];

// -----------------------------------------------------------------------------
// 6. Vendor Matches (function)
// -----------------------------------------------------------------------------

const vendorMatchDatabase: Record<string, VendorMatch[]> = {
  default: [
    {
      vendorName: "Bernhardt Hospitality",
      score: 0.92,
      price: 4850,
      leadTime: "10-12 weeks",
      notes: "Preferred vendor — strong track record on Marriott projects",
      bestMatch: true,
    },
    {
      vendorName: "HBF",
      score: 0.85,
      price: 5200,
      leadTime: "10-14 weeks",
      notes: "Premium quality, slightly higher price point",
    },
    {
      vendorName: "Global Furniture Group",
      score: 0.78,
      price: 3950,
      leadTime: "6-8 weeks",
      notes: "Competitive pricing, fastest lead time",
    },
    {
      vendorName: "Knoll",
      score: 0.74,
      price: 5500,
      leadTime: "12-16 weeks",
      notes: "Excellent quality but longer lead time for custom work",
    },
  ],
  chair: [
    {
      vendorName: "Bernhardt Hospitality",
      score: 0.95,
      price: 4850,
      leadTime: "10-12 weeks",
      notes: "Top-rated hospitality seating manufacturer, Marriott approved vendor",
      bestMatch: true,
    },
    {
      vendorName: "HBF",
      score: 0.88,
      price: 5100,
      leadTime: "10-14 weeks",
      notes: "Premium lounge seating specialist, excellent COM program",
    },
    {
      vendorName: "Global Furniture Group",
      score: 0.82,
      price: 3750,
      leadTime: "6-8 weeks",
      notes: "Best value option, strong warranty program",
    },
  ],
  table: [
    {
      vendorName: "Restoration Hardware Contract",
      score: 0.91,
      price: 2850,
      leadTime: "8-10 weeks",
      notes: "Excellent natural wood table program, design-forward aesthetic",
      bestMatch: true,
    },
    {
      vendorName: "Knoll",
      score: 0.86,
      price: 3400,
      leadTime: "12-14 weeks",
      notes: "Premium stone and metal table options",
    },
    {
      vendorName: "Bernhardt Hospitality",
      score: 0.79,
      price: 3100,
      leadTime: "10-12 weeks",
      notes: "Solid custom table program, pairs well with their seating",
    },
    {
      vendorName: "Global Furniture Group",
      score: 0.72,
      price: 2200,
      leadTime: "6-8 weeks",
      notes: "Most competitive pricing on standard table configurations",
    },
  ],
  lighting: [
    {
      vendorName: "Restoration Hardware Contract",
      score: 0.89,
      price: 38000,
      leadTime: "12-16 weeks",
      notes: "Strong custom lighting division, good blown glass capabilities",
    },
    {
      vendorName: "Knoll",
      score: 0.84,
      price: 45000,
      leadTime: "16-20 weeks",
      notes: "Partners with artisan glass studios for custom fixtures",
      bestMatch: true,
    },
    {
      vendorName: "HBF",
      score: 0.71,
      price: 41000,
      leadTime: "14-18 weeks",
      notes: "Limited custom lighting — would subcontract glass elements",
    },
  ],
  rug: [
    {
      vendorName: "Knoll",
      score: 0.87,
      price: 28500,
      leadTime: "14-18 weeks",
      notes: "KnollTextiles division handles custom rugs, strong silk/wool program",
      bestMatch: true,
    },
    {
      vendorName: "HBF",
      score: 0.82,
      price: 26000,
      leadTime: "16-20 weeks",
      notes: "HBF Textiles — excellent hand-knotted rug program through Nepal workshops",
    },
    {
      vendorName: "Restoration Hardware Contract",
      score: 0.68,
      price: 22000,
      leadTime: "10-12 weeks",
      notes: "Limited custom rug capability — best for standard patterns",
    },
  ],
  stool: [
    {
      vendorName: "HBF",
      score: 0.93,
      price: 2100,
      leadTime: "10-12 weeks",
      notes: "Excellent swivel stool program with Spinneybeck leather options",
      bestMatch: true,
    },
    {
      vendorName: "Bernhardt Hospitality",
      score: 0.87,
      price: 2350,
      leadTime: "10-14 weeks",
      notes: "Strong bar/counter stool line, good metal finish options",
    },
    {
      vendorName: "Global Furniture Group",
      score: 0.76,
      price: 1650,
      leadTime: "6-8 weeks",
      notes: "Value option — good for high-volume, standard configurations",
    },
  ],
};

export function vendorMatches(itemName: string): VendorMatch[] {
  const lower = itemName.toLowerCase();
  if (lower.includes("chair") || lower.includes("lounge") || lower.includes("wing")) {
    return vendorMatchDatabase.chair;
  }
  if (lower.includes("table") || lower.includes("desk") || lower.includes("credenza")) {
    return vendorMatchDatabase.table;
  }
  if (lower.includes("pendant") || lower.includes("light") || lower.includes("chandelier")) {
    return vendorMatchDatabase.lighting;
  }
  if (lower.includes("rug") || lower.includes("carpet") || lower.includes("textile")) {
    return vendorMatchDatabase.rug;
  }
  if (lower.includes("stool") || lower.includes("bar")) {
    return vendorMatchDatabase.stool;
  }
  return vendorMatchDatabase.default;
}

// -----------------------------------------------------------------------------
// 7. Vendor Bids
// -----------------------------------------------------------------------------

export const vendorBids: VendorBid[] = [
  {
    vendorId: "v-global",
    vendorName: "Global Furniture Group",
    totalPrice: 368400,
    items: [
      { name: "Lobby Lounge Chair", unitPrice: 3750, quantity: 24, lineTotal: 90000, leadTime: "8 weeks", complianceScore: 0.88 },
      { name: "Restaurant Dining Chair", unitPrice: 1050, quantity: 64, lineTotal: 67200, leadTime: "6 weeks", complianceScore: 0.92 },
      { name: "Bar Stool", unitPrice: 1650, quantity: 18, lineTotal: 29700, leadTime: "6 weeks", complianceScore: 0.85 },
      { name: "Lobby Side Table", unitPrice: 2600, quantity: 12, lineTotal: 31200, leadTime: "8 weeks", complianceScore: 0.82 },
      { name: "Restaurant Dining Table", unitPrice: 2200, quantity: 32, lineTotal: 70400, leadTime: "8 weeks", complianceScore: 0.90 },
      { name: "Bar High-Top Table", unitPrice: 1800, quantity: 8, lineTotal: 14400, leadTime: "6 weeks", complianceScore: 0.86 },
    ],
    overallCompliance: 0.87,
    deliveryDate: "2025-09-15",
    warranty: "5-year structural, 2-year fabric",
    notes:
      "Lowest total price. Strong volume discount applied. Slightly lower compliance on custom finishes — ebonized ash may not match spec exactly. Fastest overall delivery.",
  },
  {
    vendorId: "v-bernhardt",
    vendorName: "Bernhardt Hospitality",
    totalPrice: 452800,
    items: [
      { name: "Lobby Lounge Chair", unitPrice: 4850, quantity: 24, lineTotal: 116400, leadTime: "10 weeks", complianceScore: 0.97 },
      { name: "Restaurant Dining Chair", unitPrice: 1275, quantity: 64, lineTotal: 81600, leadTime: "10 weeks", complianceScore: 0.95 },
      { name: "Bar Stool", unitPrice: 2100, quantity: 18, lineTotal: 37800, leadTime: "12 weeks", complianceScore: 0.94 },
      { name: "Lobby Side Table", unitPrice: 3200, quantity: 12, lineTotal: 38400, leadTime: "12 weeks", complianceScore: 0.96 },
      { name: "Restaurant Dining Table", unitPrice: 2850, quantity: 32, lineTotal: 91200, leadTime: "10 weeks", complianceScore: 0.98 },
      { name: "Bar High-Top Table", unitPrice: 2200, quantity: 8, lineTotal: 17600, leadTime: "10 weeks", complianceScore: 0.95 },
    ],
    overallCompliance: 0.96,
    deliveryDate: "2025-10-01",
    warranty: "10-year structural, 5-year fabric, 3-year finish",
    notes:
      "Best overall compliance — every line item meets or exceeds spec. Marriott preferred vendor with proven track record on luxury projects. Mid-range pricing with strongest warranty terms.",
  },
  {
    vendorId: "v-knoll",
    vendorName: "Knoll",
    totalPrice: 498600,
    items: [
      { name: "Lobby Lounge Chair", unitPrice: 5500, quantity: 24, lineTotal: 132000, leadTime: "8 weeks", complianceScore: 0.93 },
      { name: "Restaurant Dining Chair", unitPrice: 1450, quantity: 64, lineTotal: 92800, leadTime: "8 weeks", complianceScore: 0.91 },
      { name: "Bar Stool", unitPrice: 2400, quantity: 18, lineTotal: 43200, leadTime: "8 weeks", complianceScore: 0.90 },
      { name: "Lobby Side Table", unitPrice: 3800, quantity: 12, lineTotal: 45600, leadTime: "10 weeks", complianceScore: 0.94 },
      { name: "Restaurant Dining Table", unitPrice: 3300, quantity: 32, lineTotal: 105600, leadTime: "8 weeks", complianceScore: 0.92 },
      { name: "Bar High-Top Table", unitPrice: 2550, quantity: 8, lineTotal: 20400, leadTime: "8 weeks", complianceScore: 0.91 },
    ],
    overallCompliance: 0.92,
    deliveryDate: "2025-08-15",
    warranty: "12-year structural, 5-year fabric, 5-year finish",
    notes:
      "Highest price but fastest delivery — can meet aggressive Q3 timeline. Premium build quality with industry-leading warranty. Knoll's in-house manufacturing enables tighter schedule control.",
  },
];

// -----------------------------------------------------------------------------
// 8. Budget Breakdown (for Recharts)
// -----------------------------------------------------------------------------

export const budgetBreakdown: BudgetCategory[] = [
  { category: "Seating", allocated: 450000, spent: 320000 },
  { category: "Tables", allocated: 380000, spent: 265000 },
  { category: "Lighting", allocated: 320000, spent: 184000 },
  { category: "Textiles", allocated: 240000, spent: 155000 },
  { category: "Casegoods", allocated: 180000, spent: 98000 },
  { category: "Accessories", allocated: 130000, spent: 72000 },
];

// -----------------------------------------------------------------------------
// 9. Market Data (AI in Construction Procurement, $B)
// -----------------------------------------------------------------------------

export const marketData: MarketDataPoint[] = [
  { year: 2023, value: 4.86 },
  { year: 2024, value: 6.2 },
  { year: 2025, value: 8.1 },
  { year: 2026, value: 11.5 },
  { year: 2027, value: 16.3 },
  { year: 2028, value: 22.68 },
];

// -----------------------------------------------------------------------------
// 10. Landscape Stats
// -----------------------------------------------------------------------------

export const landscapeStats: LandscapeStat[] = [
  {
    label: "Orgs with AI Agents in Production",
    value: "57%",
    source: "Salesforce 2025",
  },
  {
    label: "AI-Intermediated B2B by 2028",
    value: "$15T",
    source: "Gartner",
  },
  {
    label: "Report ROI Within Year 1",
    value: "74%",
    source: "McKinsey 2024",
  },
];

// -----------------------------------------------------------------------------
// 11. Protocol Layers
// -----------------------------------------------------------------------------

export const protocolLayers: ProtocolLayer[] = [
  {
    name: "AG-UI",
    full: "Agent-User Interaction Protocol",
    description:
      "Streams agent state to frontend — enables real-time UI updates as AI processes procurement data",
    sourceMapping:
      "Real-time bid analysis updates, streaming spec extraction results, live agent status in canvas view",
    color: "#4F6EF7",
  },
  {
    name: "A2A",
    full: "Agent-to-Agent Protocol",
    description:
      "Google's protocol for agent interoperability — enables specialist agents to coordinate on complex procurement workflows",
    sourceMapping:
      "Spec agent → Vendor matching agent → Quote comparison agent → Compliance agent chain",
    color: "#2D8B5E",
  },
  {
    name: "MCP",
    full: "Model Context Protocol",
    description:
      "Anthropic's standard for connecting AI to tools and data — gives agents access to vendor databases, ERP systems, spec documents",
    sourceMapping:
      "Connect to vendor APIs, ERP/PO systems, document stores, building code databases",
    color: "#C74B2A",
  },
];

// -----------------------------------------------------------------------------
// 12. Framework Comparison
// -----------------------------------------------------------------------------

export const frameworkComparison: FrameworkComparison[] = [
  {
    name: "LangGraph",
    company: "LangChain",
    stateManagement: true,
    humanInLoop: true,
    multiAgent: true,
    streaming: true,
    toolUse: true,
    recommended: true,
  },
  {
    name: "CrewAI",
    company: "CrewAI",
    stateManagement: false,
    humanInLoop: true,
    multiAgent: true,
    streaming: false,
    toolUse: true,
    recommended: false,
  },
  {
    name: "OpenAI Agents SDK",
    company: "OpenAI",
    stateManagement: false,
    humanInLoop: false,
    multiAgent: true,
    streaming: true,
    toolUse: true,
    recommended: false,
  },
  {
    name: "Google ADK",
    company: "Google",
    stateManagement: true,
    humanInLoop: true,
    multiAgent: true,
    streaming: true,
    toolUse: true,
    recommended: false,
  },
];

// -----------------------------------------------------------------------------
// 13. Roadmap Phases
// -----------------------------------------------------------------------------

export const roadmapPhases: RoadmapPhase[] = [
  {
    phase: 1,
    title: "RAG Foundation",
    timeline: "Months 1-3",
    description:
      "Document intelligence — extract, search, and reason over procurement specs, contracts, and vendor data",
    items: [
      "Spec document ingestion & chunking",
      "Semantic search over procurement history",
      "Contract clause extraction",
      "Vendor profile knowledge base",
    ],
  },
  {
    phase: 2,
    title: "Single-Agent Workflows",
    timeline: "Months 3-6",
    description:
      "Purpose-built agents that automate individual procurement tasks end-to-end",
    items: [
      "Spec extraction agent (CSI division parsing)",
      "Bid comparison agent (normalize & rank)",
      "Vendor communication agent (RFQ generation)",
      "Budget tracking agent (spend vs forecast)",
    ],
  },
  {
    phase: 3,
    title: "Multi-Agent Orchestration",
    timeline: "Months 6-12",
    description:
      "Coordinated agent teams that handle full procurement workflows with human-in-the-loop gates",
    items: [
      "Procurement orchestrator (saga pattern)",
      "Confidence-based routing to human review",
      "Cross-agent memory & shared state",
      "AG-UI streaming for real-time visibility",
    ],
  },
  {
    phase: 4,
    title: "Predictive Intelligence",
    timeline: "Month 12+",
    description:
      "Proactive AI that anticipates needs, optimizes decisions, and learns from Source's $6.5B procurement history",
    items: [
      "Price forecasting from historical data",
      "Lead time prediction & risk scoring",
      "Automated vendor discovery & qualification",
      "Portfolio optimization across projects",
    ],
  },
];

// -----------------------------------------------------------------------------
// 14. Architecture Layers
// -----------------------------------------------------------------------------

export const architectureLayers: ArchitectureLayer[] = [
  {
    id: "frontend",
    label: "Frontend",
    sub: "Next.js 14 + CopilotKit + AG-UI",
    color: "#4F6EF7",
    detail:
      "App Router with streaming UI. CopilotKit provides chat, actions, and generative UI. AG-UI protocol streams agent state changes to React components in real-time.",
    alternatives: "Remix, SvelteKit",
    tradeoff:
      "Next.js has best CopilotKit support and Vercel deployment story",
  },
  {
    id: "orchestration",
    label: "Agent Orchestration",
    sub: "LangGraph + Python microservice",
    color: "#2D8B5E",
    detail:
      "Stateful agent graphs with human-in-the-loop interrupt nodes. Saga pattern for financial safety — every PO generation is a compensatable transaction.",
    alternatives: "CrewAI, raw OpenAI function calling",
    tradeoff:
      "LangGraph's checkpointing enables reliable multi-step procurement workflows",
  },
  {
    id: "rag",
    label: "RAG Pipeline",
    sub: "pgvector + chunking + reranking",
    color: "#4ECBA0",
    detail:
      "Procurement specs, vendor catalogs, and historical PO data embedded and stored in pgvector. Hybrid search (semantic + keyword) with cross-encoder reranking.",
    alternatives: "Pinecone, Weaviate, Chroma",
    tradeoff:
      "pgvector co-locates vectors with relational data — one database for procurement data + embeddings",
  },
  {
    id: "models",
    label: "AI Models",
    sub: "GPT-4o + Claude 3.5 + specialized",
    color: "#C74B2A",
    detail:
      "GPT-4o for structured extraction and tool use. Claude for long-context spec analysis. Fine-tuned models for domain-specific tasks (CSI classification, price estimation).",
    alternatives: "Gemini, open-source (Llama)",
    tradeoff:
      "Multi-model approach matches model strengths to task requirements",
  },
  {
    id: "infra",
    label: "Infrastructure",
    sub: "Vercel + Render + Neon",
    color: "#6B7280",
    detail:
      "Vercel for frontend (edge, streaming SSR). Render for Python agent service (persistent process for LangGraph). Neon Postgres for procurement data + pgvector.",
    alternatives: "AWS (ECS/RDS), GCP (Cloud Run)",
    tradeoff:
      "Managed platforms minimize ops burden for small team, easy to migrate to cloud later",
  },
  {
    id: "observability",
    label: "Observability",
    sub: "LangSmith + Sentry + custom metrics",
    color: "#1A1A1A",
    detail:
      "LangSmith traces every agent step, tool call, and LLM invocation. Sentry for error tracking. Custom dashboards for procurement metrics (PO accuracy, vendor response times, cost savings).",
    alternatives: "Datadog, Helicone, Langfuse",
    tradeoff:
      "LangSmith has deepest LangGraph integration; Sentry is battle-tested for Next.js",
  },
];

// -----------------------------------------------------------------------------
// 15. Pipeline Stages
// -----------------------------------------------------------------------------

export const pipelineStages: PipelineStage[] = [
  {
    id: 1,
    title: "Project Intake",
    description: "Client submits project brief",
    aiAction:
      "AI parses scope, identifies FF&E/OFCI/OS&E categories, extracts timeline and budget constraints",
    icon: "FileInput",
    duration: 3000,
  },
  {
    id: 2,
    title: "Specification Analysis",
    description: "Design docs received from architect",
    aiAction:
      "AI extracts line items across CSI divisions, categorizes by FF&E/OFCI/OS&E, flags ambiguous specs",
    icon: "FileSearch",
    duration: 3000,
  },
  {
    id: 3,
    title: "RFQ Generation",
    description: "Vendor-specific RFQs from specs",
    aiAction:
      "AI matches specs to qualified vendors, generates customized RFQ documents with line-item details",
    icon: "FileOutput",
    duration: 3000,
  },
  {
    id: 4,
    title: "Bid Collection",
    description: "Vendor bids arrive and are normalized",
    aiAction:
      "AI normalizes pricing across vendors, flags outliers, creates comparison matrix with best-value indicators",
    icon: "BarChart3",
    duration: 3000,
  },
  {
    id: 5,
    title: "PO Generation",
    description: "Purchase orders with approval routing",
    aiAction:
      "AI generates POs with confidence-based routing — high confidence auto-routes, low confidence triggers human review gate",
    icon: "ShieldCheck",
    duration: 3000,
  },
  {
    id: 6,
    title: "Tracking",
    description: "Delivery monitoring and expediting",
    aiAction:
      "AI monitors timelines, flags at-risk deliveries, suggests alternative vendors for delayed items",
    icon: "Truck",
    duration: 3000,
  },
];

// -----------------------------------------------------------------------------
// 16. Agent Cards
// -----------------------------------------------------------------------------

export const agentCards: AgentCard[] = [
  {
    id: "invoice-reviewer",
    name: "Invoice Reviewer",
    icon: "FileCheck",
    status: "idle",
    logs: [],
    fields: [
      { label: "Vendor", value: "Bernhardt Hospitality", confidence: 0.96 },
      { label: "Amount", value: "$142,500.00", confidence: 0.99 },
      { label: "PO Number", value: "PO-2025-4521", confidence: 0.94 },
      { label: "Line Items", value: "12 items matched", confidence: 0.91 },
    ],
  },
  {
    id: "bid-analyzer",
    name: "Bid Analyzer",
    icon: "Scale",
    status: "idle",
    logs: [],
    fields: [
      { label: "Bids Compared", value: "3 vendors", confidence: 0.98 },
      { label: "Best Value", value: "Global Furniture", confidence: 0.87 },
      { label: "Price Spread", value: "\u00b118% variance", confidence: 0.95 },
      { label: "Recommendation", value: "Pending analysis", confidence: 0.0 },
    ],
  },
  {
    id: "compliance-checker",
    name: "Compliance Checker",
    icon: "ShieldCheck",
    status: "idle",
    logs: [],
    fields: [
      { label: "ADA Compliance", value: "Checking...", confidence: 0.0 },
      { label: "Fire Rating", value: "Checking...", confidence: 0.0 },
      { label: "LEED Credits", value: "Checking...", confidence: 0.0 },
      { label: "Warranty Terms", value: "Checking...", confidence: 0.0 },
    ],
  },
  {
    id: "budget-monitor",
    name: "Budget Monitor",
    icon: "DollarSign",
    status: "idle",
    logs: [],
    fields: [
      { label: "Total Budget", value: "$2,400,000", confidence: 1.0 },
      { label: "Committed", value: "$1,820,000", confidence: 0.98 },
      { label: "Remaining", value: "$580,000", confidence: 0.98 },
      { label: "Risk Level", value: "Low", confidence: 0.92 },
    ],
  },
];
