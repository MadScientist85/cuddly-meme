import type React from "react"
import {
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Copy,
  Download,
  Edit,
  ExternalLink,
  FileText,
  Gavel,
  HelpCircle,
  Laptop,
  Loader2,
  MessageSquare,
  Monitor,
  Moon,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Save,
  Scale,
  Search,
  Settings,
  Share,
  Sidebar,
  Star,
  StopCircle,
  Sun,
  Trash,
  User,
  Users,
  X,
} from "lucide-react"

export function IconSpinner({ className, ...props }: React.ComponentProps<"svg">) {
  return <Loader2 className={className} {...props} />
}

export function IconArrowDown({ className, ...props }: React.ComponentProps<"svg">) {
  return <ArrowDown className={className} {...props} />
}

export function IconCheck({ className, ...props }: React.ComponentProps<"svg">) {
  return <Check className={className} {...props} />
}

export function IconCopy({ className, ...props }: React.ComponentProps<"svg">) {
  return <Copy className={className} {...props} />
}

export function IconOpenAI({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  )
}

export function IconUser({ className, ...props }: React.ComponentProps<"svg">) {
  return <User className={className} {...props} />
}

export function IconRefresh({ className, ...props }: React.ComponentProps<"svg">) {
  return <RefreshCw className={className} {...props} />
}

export function IconStop({ className, ...props }: React.ComponentProps<"svg">) {
  return <StopCircle className={className} {...props} />
}

export function IconFileText({ className, ...props }: React.ComponentProps<"svg">) {
  return <FileText className={className} {...props} />
}

export function IconDownload({ className, ...props }: React.ComponentProps<"svg">) {
  return <Download className={className} {...props} />
}

export function IconShare({ className, ...props }: React.ComponentProps<"svg">) {
  return <Share className={className} {...props} />
}

export function IconSearch({ className, ...props }: React.ComponentProps<"svg">) {
  return <Search className={className} {...props} />
}

export function IconArrowRight({ className, ...props }: React.ComponentProps<"svg">) {
  return <ArrowRight className={className} {...props} />
}

export function IconGitHub({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 438.549 438.549" className={className} {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      ></path>
    </svg>
  )
}

export function IconNextChat({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg fill="currentColor" viewBox="0 0 256 256" className={className} {...props}>
      <path d="m221.66 133.66-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32Z" />
    </svg>
  )
}

export function IconSeparator({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      fill="none"
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      viewBox="0 0 24 24"
      className={className}
      {...props}
    >
      <path d="M16.88 3.549L7.12 20.451" />
    </svg>
  )
}

export function IconGavel({ className, ...props }: React.ComponentProps<"svg">) {
  return <Gavel className={className} {...props} />
}

export function IconScale({ className, ...props }: React.ComponentProps<"svg">) {
  return <Scale className={className} {...props} />
}

export function IconUsers({ className, ...props }: React.ComponentProps<"svg">) {
  return <Users className={className} {...props} />
}

export function IconPlus({ className, ...props }: React.ComponentProps<"svg">) {
  return <Plus className={className} {...props} />
}

export function IconEdit({ className, ...props }: React.ComponentProps<"svg">) {
  return <Edit className={className} {...props} />
}

export function IconTrash({ className, ...props }: React.ComponentProps<"svg">) {
  return <Trash className={className} {...props} />
}

export function IconSave({ className, ...props }: React.ComponentProps<"svg">) {
  return <Save className={className} {...props} />
}

export function IconArrowElbow({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" className={className} {...props}>
      <path d="M200 32v144a8 8 0 0 1-8 8H67.31l34.35 34.34a8 8 0 0 1-11.32 11.32l-48-48a8 8 0 0 1 0-11.32l48-48a8 8 0 0 1 11.32 11.32L67.31 168H184V32a8 8 0 0 1 16 0Z" />
    </svg>
  )
}

export function IconMessage({ className, ...props }: React.ComponentProps<"svg">) {
  return <MessageSquare className={className} {...props} />
}

export function IconSidebar({ className, ...props }: React.ComponentProps<"svg">) {
  return <Sidebar className={className} {...props} />
}

export function IconStar({ className, ...props }: React.ComponentProps<"svg">) {
  return <Star className={className} {...props} />
}

export function IconMoon({ className, ...props }: React.ComponentProps<"svg">) {
  return <Moon className={className} {...props} />
}

export function IconSun({ className, ...props }: React.ComponentProps<"svg">) {
  return <Sun className={className} {...props} />
}

export function IconMonitor({ className, ...props }: React.ComponentProps<"svg">) {
  return <Monitor className={className} {...props} />
}

export function IconExternalLink({ className, ...props }: React.ComponentProps<"svg">) {
  return <ExternalLink className={className} {...props} />
}

export function IconChevronLeft({ className, ...props }: React.ComponentProps<"svg">) {
  return <ChevronLeft className={className} {...props} />
}

export function IconChevronRight({ className, ...props }: React.ComponentProps<"svg">) {
  return <ChevronRight className={className} {...props} />
}

export function IconChevronUp({ className, ...props }: React.ComponentProps<"svg">) {
  return <ChevronUp className={className} {...props} />
}

export function IconChevronDown({ className, ...props }: React.ComponentProps<"svg">) {
  return <ChevronDown className={className} {...props} />
}

export function IconChevronUpDown({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" className={className} {...props}>
      <path d="M181.66 170.34a8 8 0 0 1 0 11.32l-48 48a8 8 0 0 1-11.32 0l-48-48a8 8 0 0 1 11.32-11.32L128 212.69l42.34-42.35a8 8 0 0 1 11.32 0Zm-96-84.68L128 43.31l42.34 42.35a8 8 0 0 0 11.32-11.32l-48-48a8 8 0 0 0-11.32 0l-48 48a8 8 0 0 0 11.32 11.32Z" />
    </svg>
  )
}

export function IconEnter({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" className={className} {...props}>
      <path d="M200 32v144a8 8 0 0 1-8 8H67.31l34.35 34.34a8 8 0 0 1-11.32 11.32l-48-48a8 8 0 0 1 0-11.32l48-48a8 8 0 0 1 11.32 11.32L67.31 168H184V32a8 8 0 0 1 16 0Z" />
    </svg>
  )
}

export function IconArrowLeft({ className, ...props }: React.ComponentProps<"svg">) {
  return <ArrowLeft className={className} {...props} />
}

export function IconArrowUp({ className, ...props }: React.ComponentProps<"svg">) {
  return <ArrowUp className={className} {...props} />
}

export function IconHelp({ className, ...props }: React.ComponentProps<"svg">) {
  return <HelpCircle className={className} {...props} />
}

export function IconPizza({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" className={className} {...props}>
      <path d="M239.54 63.64c.37-.37.37-.97 0-1.34L225.7 48.46c-.37-.37-.97-.37-1.34 0L210.52 62.3c-.37.37-.37.97 0 1.34l13.84 13.84c.37.37.97.37 1.34 0ZM128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88 88.1 88.1 0 0 1-88 88Zm32-120a16 16 0 1 1-16-16 16 16 0 0 1 16 16Zm-64 32a16 16 0 1 1-16-16 16 16 0 0 1 16 16Zm32 32a16 16 0 1 1-16-16 16 16 0 0 1 16 16Z" />
    </svg>
  )
}

export function IconEllipsis({ className, ...props }: React.ComponentProps<"svg">) {
  return <MoreHorizontal className={className} {...props} />
}

export function IconWarning({ className, ...props }: React.ComponentProps<"svg">) {
  return <AlertTriangle className={className} {...props} />
}

export function IconPerson({ className, ...props }: React.ComponentProps<"svg">) {
  return <User className={className} {...props} />
}

export function IconDiscord({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 256 256" className={className} {...props}>
      <path
        fill="currentColor"
        d="M104 140a12 12 0 1 1-12-12 12 12 0 0 1 12 12Zm60-12a12 12 0 1 0 12 12 12 12 0 0 0-12-12Zm58.83 58.81c-2.68-3.31-7.12-9.29-8.85-10.5a68 68 0 1 0-71.96 0c-1.73 1.21-6.17 7.19-8.85 10.5a8 8 0 1 0 12.66 10.06c.33-.42 1.12-1.21 2.17-2.37a68.26 68.26 0 0 0 60 0c1.05 1.16 1.84 2 2.17 2.37a8 8 0 1 0 12.66-10.06ZM128 36a52 52 0 1 1-52 52 52.06 52.06 0 0 1 52-52Z"
      />
    </svg>
  )
}

export function IconVercel({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg aria-label="Vercel logomark" height="64" role="img" viewBox="0 0 74 64" className={className} {...props}>
      <path d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z" fill="currentColor" />
    </svg>
  )
}

export function IconNextJS({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg height="394" viewBox="0 0 512 394" width="512" className={className} {...props}>
      <path
        d="M204.6 22C117.4 22 47.4 91.9 47.4 179.1c0 87.2 70 157.1 157.2 157.1 87.2 0 157.2-70 157.2-157.1C361.8 91.9 291.8 22 204.6 22zM287.8 273.4c-5.4 9.4-15.8 15.8-27.6 15.8-11.8 0-22.2-6.4-27.6-15.8l-67.6-117.2c-5.4-9.4-5.4-21 0-30.4 5.4-9.4 15.8-15.8 27.6-15.8h135.2c11.8 0 22.2 6.4 27.6 15.8 5.4 9.4 5.4 21 0 30.4L287.8 273.4z"
        fill="currentColor"
      />
    </svg>
  )
}

export function IconWhatsApp({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 256 256" className={className} {...props}>
      <path
        fill="currentColor"
        d="M187.58 144.84l-32-16a8 8 0 0 0-8 .5l-14.69 9.8a40.55 40.55 0 0 1-16-16l9.8-14.69a8 8 0 0 0 .5-8l-16-32A8 8 0 0 0 104 64a40 40 0 0 0-40 40 88.1 88.1 0 0 0 88 88 40 40 0 0 0 40-40 8 8 0 0 0-4.42-7.16ZM152 176a72.08 72.08 0 0 1-72-72 24 24 0 0 1 19.29-23.54l11.48 23L101 118a8 8 0 0 0-.73 7.51 56.47 56.47 0 0 0 30.15 30.15A8 8 0 0 0 138 155l14.61-9.74 23 11.48A24 24 0 0 1 152 176ZM128 24A104 104 0 1 0 232 128 104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88 88.1 88.1 0 0 1-88 88Z"
      />
    </svg>
  )
}

export function IconX({ className, ...props }: React.ComponentProps<"svg">) {
  return <X className={className} {...props} />
}

export function IconYouTube({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 256 180" className={className} {...props}>
      <path
        fill="currentColor"
        d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134Z"
      />
      <path fill="#FFF" d="m102.421 128.06 66.328-38.418-66.328-38.418z" />
    </svg>
  )
}

export function IconApple({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 256 315" className={className} {...props}>
      <path
        fill="currentColor"
        d="M213.803 167.03c.442 47.58 41.74 63.413 42.197 63.615-.35 1.116-6.599 22.563-21.757 44.716-13.104 19.153-26.705 38.235-48.13 38.63-21.05.388-27.82-12.483-51.888-12.483-24.061 0-31.582 12.088-51.51 12.871-20.68.783-36.428-20.71-49.64-39.793-27-39.033-47.633-110.3-19.928-158.406 13.763-23.89 38.36-39.017 65.056-39.405 20.307-.387 39.475 13.662 51.889 13.662 12.406 0 35.699-16.895 60.186-14.414 10.25.427 39.026 4.14 57.503 31.186-1.49.923-34.335 20.044-33.978 59.822M174.24 50.199c10.98-13.29 18.369-31.79 16.353-50.199-15.826.636-34.962 10.546-46.314 23.828-10.145 11.703-19.021 30.61-16.638 48.644 17.586 1.364 35.522-8.964 46.599-22.273"
      />
    </svg>
  )
}

export function IconFacebook({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 256 256" className={className} {...props}>
      <path
        fill="currentColor"
        d="M256 128C256 57.308 198.692 0 128 0 57.308 0 0 57.307 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
      />
      <path
        fill="#FFF"
        d="m177.825 165 5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A128.959 128.959 0 0 0 128 256a128.9 128.9 0 0 0 20-1.555V165z"
      />
    </svg>
  )
}

export function IconInstagram({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 256 256" className={className} {...props}>
      <path
        fill="currentColor"
        d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.26-4.408 23.769-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.289-4.408-23.77-.616-13.496-.746-17.544-.746-51.722 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.26 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.770 75.226.147 88.878 0 93.237 0 128s.147 39.122.77 52.774c.622 13.625 2.785 22.93 5.950 31.071 3.270 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.070-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.447 5.95-31.071.623-13.652.77-18.011.77-52.774s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.070-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"
      />
    </svg>
  )
}

export function IconLinkedIn({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 256 256" className={className} {...props}>
      <path
        fill="currentColor"
        d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.456"
      />
    </svg>
  )
}

export function IconTikTok({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 256 290" className={className} {...props}>
      <path
        fill="currentColor"
        d="M189.72 104.421c18.678 13.345 41.56 21.197 66.273 21.197v-47.53c-4.632 0-9.123-.496-13.407-1.433v37.323c-24.713 0-47.595-7.852-66.273-21.197v96.578c0 48.523-39.356 87.879-87.879 87.879-18.113 0-34.949-5.473-48.934-14.86 15.962 16.313 38.222 26.432 62.848 26.432 48.523 0 87.879-39.356 87.879-87.879v-96.51zm17.17-47.952c-9.546-10.423-15.814-23.893-17.17-38.785v-6.113h-13.189c3.32 18.927 14.644 35.097 30.358 44.898zM69.673 225.607a40.397 40.397 0 0 1-8.203-24.33c0-22.331 18.094-40.425 40.425-40.425 4.18 0 8.2.635 11.967 1.801v-48.314c-4.506-.404-9.091-.48-13.967-.174v37.65c-3.767-1.166-7.787-1.801-11.967-1.801-22.331 0-40.425 18.094-40.425 40.425 0 15.392 8.598 28.8 21.17 35.168z"
      />
      <path
        fill="#FF004F"
        d="M180.315 92.18c18.678 13.345 41.56 21.197 66.273 21.197V76.054c-13.815-2.898-26.069-10.645-35.186-21.415C195.676 46.018 184.352 29.848 181.032 10.921h-35.447v179.732c-.084 22.178-18.133 40.104-40.374 40.104-7.237 0-14.065-1.902-19.969-5.244-12.572-6.368-21.17-19.776-21.17-35.168 0-22.331 18.094-40.425 40.425-40.425 4.18 0 8.2.635 11.967 1.801v-37.65c-47.652 1.166-86.206 40.244-86.206 87.884 0 24.492 10.01 46.618 26.18 62.65 13.985 9.387 30.821 14.86 48.934 14.86 48.523 0 87.879-39.356 87.879-87.879V92.18z"
      />
      <path
        fill="#00F2EA"
        d="M246.588 76.054v-10.06c-12.083 0-23.746-3.505-33.653-9.864 9.13 10.95 21.398 18.717 35.186 21.415l-1.533-.49zm-65.273-65.133c-.405-1.415-.684-2.85-.836-4.302V0h-47.818v179.732c-.084 22.178-18.133 40.104-40.374 40.104a40.313 40.313 0 0 1-18.778-4.668c5.904 3.342 12.732 5.244 19.969 5.244 22.24 0 40.29-17.926 40.374-40.104V10.921h47.463zm-45.15 125.408v-10.626c-3.767-1.166-7.787-1.801-11.967-1.801-22.331 0-40.425 18.094-40.425 40.425 0 15.392 8.598 28.8 21.17 35.168a40.313 40.313 0 0 0 18.778 4.668c22.24 0 40.29-17.926 40.374-40.104 0-9.553-3.342-18.317-8.93-25.73z"
      />
    </svg>
  )
}

export function IconThreads({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 256 256" className={className} {...props}>
      <path
        fill="currentColor"
        d="M192 96a96 96 0 1 0-96 96c42.36 0 81.13-27.36 94.92-68.21a8 8 0 0 0-15.38-5.06A80.07 80.07 0 0 1 96 176a80 80 0 1 1 80-80 8 8 0 0 0 16 0Z"
      />
    </svg>
  )
}

export function IconSnapchat({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 256 256" className={className} {...props}>
      <path
        fill="currentColor"
        d="M128 24A104 104 0 1 0 232 128 104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88 88.1 88.1 0 0 1-88 88Zm32-120a16 16 0 1 1-16-16 16 16 0 0 1 16 16Zm-64 32a16 16 0 1 1-16-16 16 16 0 0 1 16 16Zm32 32a16 16 0 1 1-16-16 16 16 0 0 1 16 16Z"
      />
    </svg>
  )
}

export function IconPinterest({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 256 256" className={className} {...props}>
      <path
        fill="currentColor"
        d="M128 20A108 108 0 0 0 54.46 220l10.93-34.9a68 68 0 1 1 125.22 0l10.93 34.9A108 108 0 0 0 128 20Zm0 192a84 84 0 0 1-75.31-46.11L64.25 141a8 8 0 0 0 15.5-4.86L67.19 111.2a52 52 0 1 0 121.62 0l-12.56 24.94a8 8 0 0 0 15.5 4.86l11.56-24.89A84 84 0 0 1 128 212Z"
      />
    </svg>
  )
}

export function IconReddit({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 256 256" className={className} {...props}>
      <path
        fill="currentColor"
        d="M248 104a32 32 0 0 0-52.94-24.19c-16.71-8.84-36.76-14.28-58.82-15.53L145.61 24a8 8 0 0 0-7.75-6H120a8 8 0 0 0-7.75 9.83l8.68 34.72c-22.06 1.25-42.11 6.69-58.82 15.53A32 32 0 0 0 8 104a32.16 32.16 0 0 0 24 31v17a88 88 0 0 0 88 88h16a88 88 0 0 0 88-88v-17a32.16 32.16 0 0 0 24-31ZM72 128a16 16 0 1 1 16 16 16 16 0 0 1-16-16Zm96 64H88a8 8 0 0 1 0-16h80a8 8 0 0 1 0 16Zm16-48a16 16 0 1 1 16-16 16 16 0 0 1-16 16Z"
      />
    </svg>
  )
}

export function IconTwitch({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 256 268" className={className} {...props}>
      <path
        fill="currentColor"
        d="M17.458 0L0 46.556v186.201h63.983v34.934h34.931l34.898-34.934h52.36L256 162.954V0H17.458zm23.259 23.263H232.73v128.029l-40.739 40.741H128L93.113 226.92v-34.887H40.717V23.263zm64.008 116.405H128V69.844h-23.275v69.824zm62.1 0h23.27V69.844H166.82v69.824z"
      />
    </svg>
  )
}

export function IconMastodon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 256 274" className={className} {...props}>
      <path
        fill="currentColor"
        d="M249.874 164.085c-3.753 19.307-33.613 40.438-67.908 44.533-17.883 2.134-35.49 4.095-54.266 3.234-30.705-1.407-54.933-7.330-54.933-7.330 0 2.991.185 5.836.553 8.498 4.016 29.111 30.181 30.866 54.963 31.694 25.090.839 47.431-6.189 47.431-6.189l1.032 22.583s-17.552 9.427-48.826 11.164c-17.26.957-38.697-.434-63.655-7.029C29.9 244.393 1.547 186.262 1.547 186.262 1.547 186.262.307 116.519.307 116.519c0-69.744 45.619-90.25 45.619-90.25C78.853 10.067 120.021 8.758 162.86 8.758h1.178c42.839 0 84.018 1.309 116.945 17.511 0 0 45.619 20.506 45.619 90.25 0 0-.185 51.496-1.032 87.433-1.296 55.285-9.696 98.133-75.696 110.133z"
      />
      <path
        fill="#FFF"
        d="M209.413 94.469v71.894h-22.982v-69.794c0-14.386-6.056-21.703-18.168-21.703-13.393 0-20.121 8.661-20.121 25.778v37.35h-22.821v-37.35c0-17.117-6.728-25.778-20.121-25.778-12.112 0-18.168 7.317-18.168 21.703v69.794H64.05V94.469c0-14.386 3.67-25.778 11.018-34.177 7.593-8.399 17.547-12.705 29.896-12.705 14.289 0 25.073 5.498 32.249 16.492L128 75.167l8.787-11.088c7.176-10.994 17.96-16.492 32.249-16.492 12.349 0 22.303 4.306 29.896 12.705 7.348 8.399 11.018 19.791 11.018 34.177z"
      />
    </svg>
  )
}

export function IconBluesky({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 256 226" className={className} {...props}>
      <path
        fill="currentColor"
        d="M42.817 162.805c4.906 5.895 3.899 14.668-2.251 19.574L2.25 208.25c-6.15 4.906-14.923 3.899-19.829-2.251-4.906-6.15-3.899-14.923 2.251-19.829l38.316-25.871c6.15-4.906 14.923-3.899 19.829 2.506zm170.366 0c-4.906 5.895-3.899 14.668 2.251 19.574l38.316 25.871c6.15 4.906 14.923 3.899 19.829-2.251 4.906-6.15 3.899-14.923-2.251-19.829l-38.316-25.871c-6.15-4.906-14.923-3.899-19.829 2.506zM128 0C57.308 0 0 57.308 0 128s57.308 128 128 128 128-57.308 128-128S198.692 0 128 0zm0 208c-44.183 0-80-35.817-80-80s35.817-80 80-80 80 35.817 80 80-35.817 80-80 80z"
      />
    </svg>
  )
}

export function IconSettings({ className, ...props }: React.ComponentProps<"svg">) {
  return <Settings className={className} {...props} />
}

export function IconLaptop({ className, ...props }: React.ComponentProps<"svg">) {
  return <Laptop className={className} {...props} />
}

export function IconGoogle({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 256 262" className={className} {...props}>
      <path
        fill="#4285F4"
        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
      />
      <path
        fill="#34A853"
        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
      />
      <path
        fill="#FBBC05"
        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
      />
      <path
        fill="#EB4335"
        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
      />
    </svg>
  )
}

export function IconTwitter({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 256 209" className={className} {...props}>
      <path
        fill="currentColor"
        d="M256 25.45c-9.42 4.177-19.542 7-30.166 8.27 10.845-6.5 19.172-16.793 23.093-29.057a105.183 105.183 0 0 1-33.351 12.745C205.995 7.201 192.346.822 177.239.822c-29.006 0-52.523 23.516-52.523 52.52 0 4.117.465 8.125 1.36 11.970-43.65-2.191-82.35-23.1-108.255-54.876-4.52 7.757-7.11 16.78-7.11 26.404 0 18.222 9.273 34.297 23.365 43.716a52.312 52.312 0 0 1-23.79-6.57c-.003.22-.003.44-.003.661 0 25.447 18.104 46.675 42.13 51.5a52.592 52.592 0 0 1-23.718.9c6.683 20.866 26.08 36.05 49.062 36.475-17.975 14.086-40.622 22.483-65.228 22.483-4.24 0-8.42-.249-12.529-.734 23.243 14.902 50.85 23.597 80.51 23.597 96.607 0 149.434-80.031 149.434-149.435 0-2.278-.05-4.543-.152-6.795A106.748 106.748 0 0 0 256 25.45"
      />
    </svg>
  )
}

// Export all icons as an object for convenience
export const Icons = {
  spinner: IconSpinner,
  arrowDown: IconArrowDown,
  check: IconCheck,
  copy: IconCopy,
  openAI: IconOpenAI,
  user: IconUser,
  refresh: IconRefresh,
  stop: IconStop,
  fileText: IconFileText,
  download: IconDownload,
  share: IconShare,
  search: IconSearch,
  arrowRight: IconArrowRight,
  gitHub: IconGitHub,
  nextChat: IconNextChat,
  separator: IconSeparator,
  gavel: IconGavel,
  scale: IconScale,
  users: IconUsers,
  plus: IconPlus,
  edit: IconEdit,
  trash: IconTrash,
  save: IconSave,
  arrowElbow: IconArrowElbow,
  message: IconMessage,
  sidebar: IconSidebar,
  star: IconStar,
  moon: IconMoon,
  sun: IconSun,
  monitor: IconMonitor,
  externalLink: IconExternalLink,
  chevronLeft: IconChevronLeft,
  chevronRight: IconChevronRight,
  chevronUp: IconChevronUp,
  chevronDown: IconChevronDown,
  chevronUpDown: IconChevronUpDown,
  enter: IconEnter,
  arrowLeft: IconArrowLeft,
  arrowUp: IconArrowUp,
  help: IconHelp,
  pizza: IconPizza,
  ellipsis: IconEllipsis,
  warning: IconWarning,
  person: IconPerson,
  discord: IconDiscord,
  vercel: IconVercel,
  nextJS: IconNextJS,
  whatsApp: IconWhatsApp,
  x: IconX,
  youTube: IconYouTube,
  apple: IconApple,
  facebook: IconFacebook,
  instagram: IconInstagram,
  linkedIn: IconLinkedIn,
  tikTok: IconTikTok,
  threads: IconThreads,
  snapchat: IconSnapchat,
  pinterest: IconPinterest,
  reddit: IconReddit,
  twitch: IconTwitch,
  mastodon: IconMastodon,
  bluesky: IconBluesky,
  settings: IconSettings,
  laptop: IconLaptop,
  google: IconGoogle,
  twitter: IconTwitter,
}
