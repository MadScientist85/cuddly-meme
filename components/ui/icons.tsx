"use client"

import {
  AlertTriangle,
  Check,
  Command,
  File,
  FileText,
  Shell as Help,
  ImageIcon,
  Laptop,
  Loader as Load,
  Moon,
  Move as More,
  Pizza,
  Plus,
  Settings as Setting,
  SunMedium as Medium,
  Trash,
  Twitter,
  User,
  X,
  Eye,
  BotOff as Off,
  Github,
  Cookie as Google,
  Cog as Log,
  Menu,
  Search,
  Copy,
  Edit,
  Share,
  Save,
  Calendar,
  Clock,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Home,
  Users,
  MessageSquare,
  Bell,
  Star,
  Heart,
  Flag,
  Shield,
  Lock,
  Unlock,
  Key,
  Zap,
  Target,
  BarChart as Chart,
  Activity,
  RefreshCw as Refresh,
} from "lucide-react"
import { Loader2, ChevronLeft, ChevronRight, ChevronDown, ThumbsUp, ThumbsDown, CreditCard } from "lucide-react"

import type { LucideIcon } from "lucide-react"

export type LucideIconType = LucideIcon

export const Icons = {
  logo: Command,
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  post: FileText,
  page: File,
  media: ImageIcon,
  settings: Setting,
  billing: CreditCard,
  ellipsis: More,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ChevronRight,
  help: Help,
  pizza: Pizza,
  sun: Medium,
  moon: Moon,
  laptop: Laptop,
  gitHub: Github,
  twitter: Twitter,
  check: Check,
  eye: Eye,
  eyeOff: Off,
  google: Google,
  logout: Log,
  menu: Menu,
  search: Search,
  download: Folder,
  upload: FolderOpen,
  copy: Copy,
  edit: Edit,
  share: Share,
  save: Save,
  folder: Folder,
  folderOpen: FolderOpen,
  calendar: Calendar,
  clock: Clock,
  mail: Mail,
  phone: Phone,
  mapPin: MapPin,
  externalLink: ExternalLink,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  home: Home,
  users: Users,
  bookOpen: BookOpen,
  messageSquare: MessageSquare,
  bell: Bell,
  star: Star,
  heart: Heart,
  thumbsUp: ThumbsUp,
  thumbsDown: ThumbsDown,
  flag: Flag,
  shield: Shield,
  lock: Lock,
  unlock: Unlock,
  key: Key,
  zap: Zap,
  target: Target,
  trendingUp: TrendingUp,
  barChart: Chart,
  pieChart: null, // Placeholder for PieChart as it's not available in lucide-react
  activity: Activity,
}

// Individual icon exports
export const IconSpinner = Loader2
export const IconUser = User
export const IconSettings = Setting
export const IconTrash = Trash
export const IconEdit = Edit
export const IconCopy = Copy
export const IconShare = Share
export const IconDownload = Folder
export const IconUpload = FolderOpen
export const IconSearch = Search
export const IconMenu = Menu
export const IconClose = X
export const IconChevronLeft = ChevronLeft
export const IconChevronRight = ChevronRight
export const IconChevronUp = ChevronUp
export const IconChevronDown = ChevronDown
export const IconArrowRight = ChevronRight
export const IconPlus = Plus
export const IconMinus = null // Placeholder for Minus as it's not used in Icons
export const IconCheck = Check
export const IconX = X
export const IconEye = Eye
export const IconEyeOff = Off
export const IconGitHub = Github
export const IconGoogle = Google
export const IconLogOut = Log
export const IconMail = Mail
export const IconLock = Lock
export const IconUnlock = Unlock
export const IconHome = Home
export const IconFolder = Folder
export const IconFile = File
export const IconImage = ImageIcon
export const IconCalendar = Calendar
export const IconClock = Clock
export const IconBell = Bell
export const IconStar = Star
export const IconHeart = Heart
export const IconMessageSquare = MessageSquare
export const IconUsers = Users
export const IconBookOpen = BookOpen
export const IconShield = Shield
export const IconKey = Key
export const IconZap = Zap
export const IconTarget = Target
export const IconTrendingUp = TrendingUp
export const IconBarChart = Chart
export const IconPieChart = null // Placeholder for PieChart as it's not available in lucide-react
export const IconActivity = Activity
export const IconSun = Medium
export const IconMoon = Moon
export const IconLaptop = Laptop
export const IconCommand = Command
export const IconWarning = AlertTriangle
export const IconHelp = Help
export const IconExternalLink = ExternalLink
export const IconRefresh = Refresh
export const IconLoader = Load
