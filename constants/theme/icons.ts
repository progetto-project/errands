import {
  Home,
  Mail,
  Cross,
  ShoppingCart,
  Footprints,
  Package,
  MapPin,
  Map,
  ClipboardList,
  Clock,
  User,
  Bell,
  Lock,
  Shield,
  FileText,
  ChevronRight,
  Search,
  ArrowLeft,
  Plus,
  Check,
  X,
  Navigation,
  Lightbulb,
  Sparkles,
  Users,
  Repeat,
  Crown,
  Pencil,
  Trash2,
  Compass,
  type LucideIcon
} from "lucide-react-native";

/**
 * Icone identificate nei mockup e la loro mappatura a lucide-react-native
 * (line icons, stroke sottile — coerente con lo stile disegnato a mano
 * delle illustrazioni). Nessuna emoji utilizzata.
 *
 * Uso previsto per categoria di commissione (icons.errandCategory) e per
 * elementi funzionali dell'interfaccia (icons.ui).
 */
export const icons = {
  // Categorie di commissione osservate nei mockup
  errandCategory: {
    package: Package, // "Restituire pacco" / Poste
    pharmacy: Cross, // Farmacia
    groceries: ShoppingCart, // Supermercato / "Comprare detersivo"
    shoes: Footprints, // Calzolaio / "Portare scarpe"
    home: Home,
    mail: Mail
  },
  // UI / navigazione / azioni
  ui: {
    back: ArrowLeft,
    add: Plus,
    check: Check,
    close: X,
    search: Search,
    chevronRight: ChevronRight,
    location: MapPin,
    map: Map,
    errandsList: ClipboardList,
    clock: Clock,
    navigate: Navigation,
    compass: Compass,
    user: User,
    bell: Bell,
    lock: Lock,
    shield: Shield,
    terms: FileText,
    suggestion: Lightbulb,
    smart: Sparkles,
    family: Users,
    recurring: Repeat,
    pro: Crown,
    edit: Pencil,
    delete: Trash2
  }
} as const;

export type IconComponent = LucideIcon;
