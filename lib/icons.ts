import {
  Activity, Award, BadgeCheck, BarChart3, Box, Brain, Briefcase, Building, Building2,
  Bus, BusFront, Camera, Caravan, ClipboardCheck, ClipboardList, Cog, Compass, Cpu,
  Download, Factory, FileCheck, FlaskConical, Fuel, Gem, Globe, Globe2,
  GraduationCap, Hammer, Hash, HeartHandshake, Home, Info, Landmark, Layers,
  LayoutDashboard, Leaf, LifeBuoy, Lightbulb, MapPin, PackageCheck,
  PaintBucket, Phone, Mail, MessageCircle, FileText, CalendarCheck,
  Radar, Radio, Receipt, Rocket, Ruler, ScrollText, Settings2, Shield,
  ShieldAlert, ShieldCheck, ShieldQuestion, Siren, Snowflake, Sofa,
  Sparkles, Star, Stethoscope, Sun, Target, TreePine, Truck, UserCircle, Users,
  UtensilsCrossed, Waves, Wrench, Zap, Circle,
  type LucideIcon,
} from "lucide-react";

/**
 * Centralized icon registry — the ONLY place lib/data files' `icon`
 * fields are resolved to an actual React component. Data files store a
 * string key (e.g. `icon: "bus"`); components look the key up here.
 *
 * Why: a raw component reference (e.g. `icon: Bus`) stored in a plain
 * data object is not a serializable value. Passing that data as a prop
 * from a Server Component to a Client Component (e.g. a page rendering
 * `<CategoryGrid categories={...} />`) throws "Only plain objects can be
 * passed to Client Components from Server Components" at runtime — a
 * real Next.js App Router constraint, not a lint nitpick. Keeping every
 * `icon` field a plain string everywhere, permanently, means this class
 * of error can't recur regardless of how server/client boundaries move
 * around the app later.
 */
export const ICON_MAP = {
  activity: Activity,
  award: Award,
  "badge-check": BadgeCheck,
  "bar-chart": BarChart3,
  box: Box,
  brain: Brain,
  briefcase: Briefcase,
  building: Building,
  "building-2": Building2,
  bus: Bus,
  "bus-front": BusFront,
  camera: Camera,
  "calendar-check": CalendarCheck,
  caravan: Caravan,
  "clipboard-check": ClipboardCheck,
  "clipboard-list": ClipboardList,
  cog: Cog,
  compass: Compass,
  cpu: Cpu,
  download: Download,
  factory: Factory,
  "file-check": FileCheck,
  "file-text": FileText,
  "flask-conical": FlaskConical,
  fuel: Fuel,
  gem: Gem,
  globe: Globe,
  "globe-2": Globe2,
  "graduation-cap": GraduationCap,
  hammer: Hammer,
  hash: Hash,
  "heart-handshake": HeartHandshake,
  home: Home,
  info: Info,
  landmark: Landmark,
  layers: Layers,
  "layout-dashboard": LayoutDashboard,
  leaf: Leaf,
  "life-buoy": LifeBuoy,
  lightbulb: Lightbulb,
  mail: Mail,
  "map-pin": MapPin,
  "message-circle": MessageCircle,
  "package-check": PackageCheck,
  "paint-bucket": PaintBucket,
  phone: Phone,
  radar: Radar,
  radio: Radio,
  receipt: Receipt,
  rocket: Rocket,
  ruler: Ruler,
  "scroll-text": ScrollText,
  settings: Settings2,
  shield: Shield,
  "shield-alert": ShieldAlert,
  "shield-check": ShieldCheck,
  "shield-question": ShieldQuestion,
  siren: Siren,
  snowflake: Snowflake,
  sofa: Sofa,
  sparkles: Sparkles,
  star: Star,
  stethoscope: Stethoscope,
  sun: Sun,
  target: Target,
  "tree-pine": TreePine,
  truck: Truck,
  "user-circle": UserCircle,
  users: Users,
  "utensils-crossed": UtensilsCrossed,
  waves: Waves,
  wrench: Wrench,
  zap: Zap,
  default: Circle,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICON_MAP;

/** Resolve a string key to its component, falling back to a generic circle for an unrecognized key rather than crashing. */
export function resolveIcon(name: string): LucideIcon {
  return ICON_MAP[name as IconName] ?? ICON_MAP.default;
}
