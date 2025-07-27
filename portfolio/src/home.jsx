import { useState, useEffect, useRef } from "react"
import {
  User,
  Code,
  Mail,
  Briefcase,
  Award,
  Github,
  Linkedin,
  ExternalLink,
  Download,
  Star,
  Calendar,
  MapPin,
  Phone,
  Volume2,
  Wifi,
  Battery,
  Search,
  Grid3X3,
  Monitor,
  Trash2,
  Folder,
  ImageIcon,
  Music,
  Video,
  WifiOff,
  VolumeX,
  BatteryLow,
  Globe,
  Palette,
  Zap,
  Database,
  Server,
  Terminal,
  FileCode,
  Figma,
  Braces,
  Component,
  Repeat2,
  Workflow,
  Menu,
  X,
} from "lucide-react"

// Shadcn UI Components
const Button = ({ children, className = "", variant = "default", size = "default", ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  }

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10",
  }

  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}

const Card = ({ children, className = "", ...props }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props}>
    {children}
  </div>
)

const CardHeader = ({ children, className = "", ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-4 md:p-6 ${className}`} {...props}>
    {children}
  </div>
)

const CardTitle = ({ children, className = "", ...props }) => (
  <h3 className={`text-lg md:text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
)

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-4 md:p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
)

const Badge = ({ children, className = "", variant = "default", ...props }) => {
  const variants = {
    default: "bg-primary hover:bg-primary/80 text-primary-foreground",
    secondary: "bg-secondary hover:bg-secondary/80 text-secondary-foreground",
    outline: "text-foreground border border-input hover:bg-accent hover:text-accent-foreground",
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

// Technology Icon Component
const TechIcon = ({ name, icon: IconComponent, color, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`group relative flex flex-col items-center p-3 md:p-4 rounded-xl bg-gradient-to-br ${color} transform transition-all duration-500 hover:scale-105 md:hover:scale-110 hover:rotate-1 md:hover:rotate-3 cursor-pointer shadow-lg hover:shadow-xl ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-white mb-2 group-hover:animate-bounce">
        <IconComponent className="w-8 h-8 md:w-12 md:h-12" />
      </div>
      <span className="text-white text-xs md:text-sm font-medium text-center group-hover:text-yellow-200 transition-colors">
        {name}
      </span>

      {/* Tooltip - Hidden on mobile */}
      <div className="hidden md:block absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
        {name}
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
    </div>
  )
}

// Desktop Icon Component - Hidden on mobile
const DesktopIcon = ({ icon: Icon, label, onDoubleClick, position, onDrag }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [currentPosition, setCurrentPosition] = useState(position)

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setDragOffset({
      x: e.clientX - currentPosition.x,
      y: e.clientY - currentPosition.y,
    })
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newPosition = {
        x: Math.max(0, Math.min(window.innerWidth - 80, e.clientX - dragOffset.x)),
        y: Math.max(0, Math.min(window.innerHeight - 100, e.clientY - dragOffset.y)),
      }
      setCurrentPosition(newPosition)
      onDrag && onDrag(newPosition)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, dragOffset, currentPosition])

  return (
    <div
      className="hidden lg:flex absolute flex-col items-center cursor-pointer select-none group"
      style={{ left: currentPosition.x, top: currentPosition.y }}
      onMouseDown={handleMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-2 group-hover:bg-white/30 transition-colors border border-white/30">
        <Icon className="w-8 h-8 text-white drop-shadow-lg" />
      </div>
      <span className="text-white text-xs font-medium drop-shadow-lg text-center max-w-20 leading-tight">{label}</span>
    </div>
  )
}

// Enhanced Window Component with responsive design
const Window = ({
  id,
  title,
  icon: Icon,
  children,
  initialX,
  initialY,
  initialWidth,
  initialHeight,
  onClose,
  onFocus,
  isFocused,
  isMinimized,
  onMinimize,
}) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY })
  const [size, setSize] = useState({
    width: initialWidth,
    height: initialHeight,
  })
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })
  const [isAnimating, setIsAnimating] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const windowRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    setTimeout(() => setIsAnimating(false), 300)

    // Responsive window sizing
    if (window.innerWidth < 768) {
      setSize({
        width: Math.min(window.innerWidth - 20, initialWidth),
        height: Math.min(window.innerHeight - 120, initialHeight), // More space for mobile taskbar
      })
      setPosition({
        x: 10,
        y: 10,
      })
    }
  }, [])

  const handleMouseDown = (e) => {
    if (isMobile) return

    onFocus(id)
    if (e.target.closest(".window-header") && !e.target.closest(".window-controls")) {
      setIsDragging(true)
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    } else if (e.target.classList.contains("resize-handle")) {
      setIsResizing(true)
      setResizeStart({
        x: e.clientX,
        y: e.clientY,
        width: size.width,
        height: size.height,
      })
    }
  }

  const handleMouseMove = (e) => {
    if (isMobile) return

    if (isDragging) {
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - size.width, e.clientX - dragOffset.x)),
        y: Math.max(0, Math.min(window.innerHeight - size.height - 80, e.clientY - dragOffset.y)), // Account for taskbar
      })
    } else if (isResizing) {
      const newWidth = resizeStart.width + (e.clientX - resizeStart.x)
      const newHeight = resizeStart.height + (e.clientY - resizeStart.y)
      setSize({
        width: Math.max(300, Math.min(window.innerWidth - position.x, newWidth)),
        height: Math.max(200, Math.min(window.innerHeight - position.y - 80, newHeight)), // Account for taskbar
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setIsResizing(false)
  }

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, isResizing, dragOffset, resizeStart, position, size])

  if (isMinimized) return null

  return (
    <div
      ref={windowRef}
      className={`fixed bg-gray-800/95 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 border border-gray-600/50 ${
        isFocused ? "z-50 shadow-blue-500/20" : "z-40"
      } ${isAnimating ? "scale-95 opacity-0" : "scale-100 opacity-100"} ${
        isMobile ? "inset-4 !w-auto !h-auto !left-4 !top-4 !right-4 !bottom-20" : "absolute"
      }`}
      style={
        !isMobile
          ? {
              left: position.x,
              top: position.y,
              width: size.width,
              height: size.height,
              transform: isAnimating ? "scale(0.95)" : "scale(1)",
            }
          : {}
      }
      onMouseDown={() => onFocus(id)}
    >
      <div
        className={`window-header flex items-center justify-between p-3 md:p-4 bg-gray-700/80 backdrop-blur-sm text-gray-100 ${
          !isMobile ? "cursor-grab active:cursor-grabbing" : ""
        } border-b border-gray-600/50`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-2 md:space-x-3">
          <div className="window-controls flex items-center space-x-1 md:space-x-2">
            <button
              onClick={() => onClose(id)}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
            />
            <button
              onClick={() => onMinimize(id)}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
            />
            <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors" />
          </div>
          <div className="flex items-center space-x-2">
            <Icon className="w-3 h-3 md:w-4 md:h-4 text-gray-300" />
            <span className="font-medium text-xs md:text-sm text-gray-200">{title}</span>
          </div>
        </div>
      </div>

      <div className="flex-grow p-3 md:p-6 overflow-auto bg-gray-800/90 text-gray-100 custom-scrollbar">{children}</div>

      {!isMobile && (
        <div className="resize-handle absolute bottom-0 right-0 w-4 h-4 cursor-nw-resize" onMouseDown={handleMouseDown}>
          <div className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-gray-400" />
        </div>
      )}
    </div>
  )
}

// Mobile Navigation Component
const MobileNav = ({ windowConfigs, openWindow, isOpen, onToggle }) => {
  if (!isOpen) return null

  return (
    <div className="md:hidden fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="w-full bg-white/95 backdrop-blur-xl rounded-t-xl p-4 max-h-[70vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Portfolio Menu</h2>
          <Button variant="ghost" size="sm" onClick={onToggle}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {Object.entries(windowConfigs)
            .slice(0, 5)
            .map(([id, config]) => {
              const Icon = config.icon
              return (
                <button
                  key={id}
                  onClick={() => {
                    openWindow(id)
                    onToggle()
                  }}
                  className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${config.color} flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{config.title}</span>
                </button>
              )
            })}
        </div>
      </div>
    </div>
  )
}

// This PC Content Component
const ThisPCContent = ({ onOpenSection }) => (
  <div className="space-y-4 md:space-y-6">
    <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
      This PC
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
      <Card
        className="bg-gray-700/50 border-gray-600 hover:border-blue-400 transition-colors cursor-pointer"
        onClick={() => onOpenSection("about")}
      >
        <CardContent className="p-3 md:p-4 pt-3 md:pt-4 text-center">
          <User className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-blue-400" />
          <p className="text-xs md:text-sm font-medium text-gray-200">About Me</p>
        </CardContent>
      </Card>

      <Card
        className="bg-gray-700/50 border-gray-600 hover:border-green-400 transition-colors cursor-pointer"
        onClick={() => onOpenSection("projects")}
      >
        <CardContent className="p-3 md:p-4 pt-3 md:pt-4 text-center">
          <Code className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-green-400" />
          <p className="text-xs md:text-sm font-medium text-gray-200">Projects</p>
        </CardContent>
      </Card>

      <Card
        className="bg-gray-700/50 border-gray-600 hover:border-purple-400 transition-colors cursor-pointer"
        onClick={() => onOpenSection("skills")}
      >
        <CardContent className="p-3 md:p-4 pt-3 md:pt-4 text-center">
          <Award className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-purple-400" />
          <p className="text-xs md:text-sm font-medium text-gray-200">Skills</p>
        </CardContent>
      </Card>

      <Card
        className="bg-gray-700/50 border-gray-600 hover:border-orange-400 transition-colors cursor-pointer"
        onClick={() => onOpenSection("experience")}
      >
        <CardContent className="p-3 md:p-4 pt-3 md:pt-4 text-center">
          <Briefcase className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-orange-400" />
          <p className="text-xs md:text-sm font-medium text-gray-200">Experience</p>
        </CardContent>
      </Card>

      <Card
        className="bg-gray-700/50 border-gray-600 hover:border-pink-400 transition-colors cursor-pointer"
        onClick={() => onOpenSection("contact")}
      >
        <CardContent className="p-3 md:p-4 pt-3 md:pt-4 text-center">
          <Mail className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-pink-400" />
          <p className="text-xs md:text-sm font-medium text-gray-200">Contact</p>
        </CardContent>
      </Card>
    </div>

    <div className="mt-4 md:mt-6">
      <h3 className="text-base md:text-lg font-semibold text-gray-200 mb-3">Quick Access</h3>
      <div className="grid grid-cols-1 gap-2">
        <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors cursor-pointer">
          <Folder className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
          <span className="text-xs md:text-sm text-gray-200">Documents</span>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors cursor-pointer">
          <ImageIcon className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
          <span className="text-xs md:text-sm text-gray-200">Pictures</span>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors cursor-pointer">
          <Music className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
          <span className="text-xs md:text-sm text-gray-200">Music</span>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors cursor-pointer">
          <Video className="w-4 h-4 md:w-5 md:h-5 text-red-400" />
          <span className="text-xs md:text-sm text-gray-200">Videos</span>
        </div>
      </div>
    </div>
  </div>
)

// Recycle Bin Content Component
const RecycleBinContent = () => (
  <div className="space-y-4 md:space-y-6">
    <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
      Recycle Bin
    </h2>

    <div className="text-center py-8 md:py-12">
      <Trash2 className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-gray-500" />
      <p className="text-gray-300 mb-4 text-sm md:text-base">Recycle Bin is empty</p>
      <p className="text-xs md:text-sm text-gray-400">
        When you delete files, they'll appear here before being permanently removed.
      </p>
    </div>

    <div className="border-t border-gray-600 pt-4">
      <div className="flex justify-between items-center">
        <span className="text-xs md:text-sm text-gray-400">0 items</span>
        <Button variant="outline" size="sm" disabled className="border-gray-600 text-gray-400 bg-transparent">
          Empty Recycle Bin
        </Button>
      </div>
    </div>
  </div>
)

// Search Results Component
const SearchResults = ({ query, onClose }) => (
  <div className="space-y-4 md:space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Search Results
      </h2>
      <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-300 hover:text-white">
        ×
      </Button>
    </div>

    <div className="bg-gray-700/50 p-3 rounded-lg">
      <p className="text-xs md:text-sm text-gray-300">
        Searching for: <span className="font-medium text-white">"{query}"</span>
      </p>
    </div>

    <div className="space-y-3">
      {query.toLowerCase().includes("about") && (
        <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg border border-gray-600 hover:border-blue-400 transition-colors cursor-pointer">
          <User className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
          <div>
            <p className="font-medium text-gray-200 text-sm md:text-base">About Me</p>
            <p className="text-xs md:text-sm text-gray-400">Personal information and background</p>
          </div>
        </div>
      )}

      {query.toLowerCase().includes("project") && (
        <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg border border-gray-600 hover:border-green-400 transition-colors cursor-pointer">
          <Code className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
          <div>
            <p className="font-medium text-gray-200 text-sm md:text-base">Projects</p>
            <p className="text-xs md:text-sm text-gray-400">Portfolio of completed work</p>
          </div>
        </div>
      )}

      {query.toLowerCase().includes("skill") && (
        <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg border border-gray-600 hover:border-purple-400 transition-colors cursor-pointer">
          <Award className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
          <div>
            <p className="font-medium text-gray-200 text-sm md:text-base">Skills</p>
            <p className="text-xs md:text-sm text-gray-400">Technical abilities and expertise</p>
          </div>
        </div>
      )}

      {query.toLowerCase().includes("contact") && (
        <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg border border-gray-600 hover:border-pink-400 transition-colors cursor-pointer">
          <Mail className="w-4 h-4 md:w-5 md:h-5 text-pink-400" />
          <div>
            <p className="font-medium text-gray-200 text-sm md:text-base">Contact</p>
            <p className="text-xs md:text-sm text-gray-400">Get in touch information</p>
          </div>
        </div>
      )}

      {!query.toLowerCase().includes("about") &&
        !query.toLowerCase().includes("project") &&
        !query.toLowerCase().includes("skill") &&
        !query.toLowerCase().includes("contact") &&
        query.trim() && (
          <div className="text-center py-6 md:py-8">
            <Search className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-3 text-gray-500" />
            <p className="text-gray-300 text-sm md:text-base">No results found for "{query}"</p>
            <p className="text-xs md:text-sm text-gray-400 mt-1">
              Try searching for: about, projects, skills, or contact
            </p>
          </div>
        )}
    </div>
  </div>
)

// Content Components with responsive design and photo
const AboutMeContent = () => (
  <div className="space-y-4 md:space-y-6">
    <div className="text-center">
      {/* Profile Photo */}
      <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
        <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
          <img
            src="/placeholder.svg?height=96&width=96&text=Aaditya"
            alt="Aaditya Aggarwal"
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              e.target.style.display = "none"
              e.target.nextSibling.style.display = "flex"
            }}
          />
          <User className="w-8 h-8 md:w-12 md:h-12 text-blue-400" style={{ display: "none" }} />
        </div>
      </div>
      <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Aaditya Aggarwal
      </h2>
      <p className="text-blue-400 font-medium text-sm md:text-base">MERN Stack Developer</p>
    </div>

    <Card className="bg-gray-700/50 border-gray-600">
      <CardContent className="p-3 md:p-4 pt-3 md:pt-4">
        <p className="text-gray-300 leading-relaxed text-sm md:text-base">
          Passionate developer with 1+ years of experience creating innovative web applications. I love creating
          innovative solutions and learning new technologies.
        </p>
        <br />
        <p className="text-gray-300 leading-relaxed text-sm md:text-base">I'm passionate about:</p>
        <ul className="list-disc list-inside text-gray-300 leading-relaxed text-sm md:text-base">
          <li>Building scalable and efficient web applications</li>
          <li>Learning cutting-edge technologies</li>
          <li>Solving complex problems with elegant code</li>
          <li>Collaborating with amazing teams</li>
        </ul>
      </CardContent>
    </Card>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
      <Card className="bg-gray-700/50 border-gray-600">
        <CardContent className="p-3 md:p-4 text-center pt-3 md:pt-4">
          <MapPin className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 text-blue-400" />
          <p className="text-xs md:text-sm text-gray-300">Chandigarh, India</p>
        </CardContent>
      </Card>
      <Card className="bg-gray-700/50 border-gray-600">
        <CardContent className="p-3 md:p-4 text-center pt-3 md:pt-4">
          <Calendar className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 text-green-400" />
          <p className="text-xs md:text-sm text-gray-300">Available Now</p>
        </CardContent>
      </Card>
    </div>
  </div>
)

const ProjectsContent = () => {
  const projects = [
    {
      title: "Restroom Finder",
      description:
        "Created a location-based app to find nearby restrooms using geolocation and filtering. Designed for mobile responsiveness with a user-friendly map view.",
      tech: ["React", "Node.js", "Tailwind CSS", "Map API"],
      status: "Live",
      featured: true,
    },
    {
      title: "WatchDawgs",
      description:
        "Built a tool to detect credential leaks (API keys, tokens) in GitHub repos using Puppeteer automation. Enabled real-time alerts and logging of suspicious commits for quick security action.",
      tech: ["React", "Node.js", "Puppeteer", "Tailwind CSS"],
      status: "In Development",
      featured: true,
    },
    {
      title: "Blog Platform (Appwrite)",
      description:
        "Built a basic blog site using Appwrite backend for authentication and database. Includes post creation, editing, and real-time syncing (UI still in progress).",
      tech: ["React", "Appwrite", "Tailwind CSS"],
      status: "In development",
      featured: false,
    },
    {
      title: "Folkify",
      description: "A musical website consist of folk songs.",
      tech: ["HTML", "CSS", "JS"],
      status: "Completed",
      featured: false,
    },
  ]

  return (
    <div className="space-y-4 md:space-y-6">
      <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Featured Projects
      </h2>

      <div className="grid gap-3 md:gap-4">
        {projects.map((project, index) => (
          <Card
            key={index}
            className="bg-gray-700/50 border-gray-600 hover:border-blue-400 transition-all duration-300 group hover:shadow-lg"
          >
            <CardHeader className="pb-2 md:pb-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <CardTitle className="text-base md:text-lg text-gray-200 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  {project.featured && (
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      <Star className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  <Badge
                    variant="outline"
                    className={`
                    ${
                      project.status === "Live"
                        ? "border-green-400 text-green-400"
                        : project.status === "In Development"
                          ? "border-yellow-400 text-yellow-400"
                          : "border-blue-400 text-blue-400"
                    }
                  `}
                  >
                    {project.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-xs md:text-sm mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-1 md:gap-2 mb-3">
                {project.tech.map((tech) => (
                  <Badge key={tech} variant="secondary" className="bg-blue-500/20 text-blue-300 text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 w-full md:w-auto"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Live Demo
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-500 text-gray-300 hover:bg-gray-600 bg-transparent w-full md:w-auto"
                >
                  <Github className="w-3 h-3 mr-1" />
                  Code
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Updated Skills Content with responsive design
const SkillsContent = () => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "HTML", icon: Globe, color: "from-orange-500 to-orange-600" },
        { name: "CSS", icon: Palette, color: "from-blue-500 to-blue-600" },
        {
          name: "JavaScript",
          icon: Zap,
          color: "from-yellow-500 to-yellow-600",
        },
        { name: "React", icon: Component, color: "from-cyan-500 to-cyan-600" },
        {
          name: "TypeScript",
          icon: FileCode,
          color: "from-blue-600 to-blue-700",
        },
        {
          name: "Tailwind CSS",
          icon: Braces,
          color: "from-teal-500 to-teal-600",
        },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: Server, color: "from-green-600 to-green-700" },
        {
          name: "Python",
          icon: Terminal,
          color: "from-yellow-500 to-yellow-600",
        },
        {
          name: "Express.js",
          icon: Workflow,
          color: "from-gray-600 to-gray-700",
        },
        {
          name: "MongoDB",
          icon: Database,
          color: "from-green-500 to-green-600",
        },
      ],
    },
    {
      title: "Tools & Others",
      skills: [
        {
          name: "Git",
          icon: Github,
          color: "from-orange-500 to-orange-600",
        },
        { name: "Figma", icon: Figma, color: "from-purple-500 to-purple-600" },
        { name: "VS Code", icon: Code, color: "from-blue-500 to-blue-600" },
        {
          name: "Postman",
          icon: Repeat2,
          color: "from-orange-500 to-orange-600",
        },
      ],
    },
  ]

  return (
    <div className="space-y-6 md:space-y-8">
      <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Skills & Technologies
      </h2>

      {skillCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="space-y-3 md:space-y-4">
          <h3 className="text-lg md:text-xl font-semibold text-gray-200 mb-3 md:mb-4">{category.title}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {category.skills.map((skill, index) => (
              <TechIcon key={skill.name} name={skill.name} icon={skill.icon} color={skill.color} delay={index * 100} />
            ))}
          </div>
        </div>
      ))}

      <div className="mt-6 md:mt-8 p-3 md:p-4 bg-gray-700/30 rounded-lg border border-gray-600">
        <p className="text-gray-300 text-xs md:text-sm text-center">
          🚀 Always learning and exploring new technologies to stay current with industry trends!
        </p>
      </div>
    </div>
  )
}

const ExperienceContent = () => {
  const experiences = [
    {
      title: "Tech Intern | Tech Lead",
      company: "Parihar India Pvt. Ltd.",
      period: "2025 - Present",
      description:
        "Have hands-on experience leading frontend and full-stack development projects, currently serving as the Tech Team Head during my internship. I specialize in building modern, scalable web applications using the MERN stack, while also mentoring teammates and managing end-to-end delivery.",
      achievements: [
        "Led development of 3+ full-stack web applications using React.js, Node.js, and MongoDB",
        "Headed a team of 5+ developers during internship projects, ensuring timely and quality releases",
        "Built and deployed responsive, user-friendly UIs with Tailwind CSS and GSAP animations",
        "Implemented Appwrite services for real-time backend features like authentication and storage",
        "Reduced page load time by 30% through frontend performance optimization",
        "Streamlined deployment workflows using GitHub Actions and CI/CD practices",
      ],
    },
  ]

  return (
    <div className="space-y-4 md:space-y-6">
      <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Work Experience
      </h2>

      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <Card
            key={index}
            className="bg-gray-700/50 border-gray-600 hover:border-blue-400 transition-all duration-300 hover:shadow-lg"
          >
            <CardHeader>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                <div>
                  <CardTitle className="text-base md:text-lg text-gray-200">{exp.title}</CardTitle>
                  <p className="text-blue-400 font-medium text-sm md:text-base">{exp.company}</p>
                </div>
                <Badge variant="outline" className="border-gray-500 text-gray-300 self-start">
                  {exp.period}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-200 mb-3 text-sm md:text-base">{exp.description}</p>
              <div className="space-y-1">
                <p className="text-base md:text-xl text-purple-300 font-bold">Key Achievements:</p>
                <ul className="list-disc list-inside space-y-1">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-gray-200 text-sm md:text-base">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

const ContactContent = () => (
  <div className="space-y-4 md:space-y-6">
    <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
      Let's Connect
    </h2>

    <Card className="bg-gray-700/50 border-gray-600">
      <CardContent className="p-4 md:p-6 pt-4">
        <p className="text-gray-300 mb-4 md:mb-6 text-center text-sm md:text-base">
          Ready to bring your ideas to life? Let's discuss your next project!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
          <div className="flex items-center space-x-3 p-3 bg-gray-600/50 rounded-lg border border-gray-500">
            <Mail className="w-4 h-4 md:w-5 md:h-5 text-blue-400 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-gray-400">Email</p>
              <p className="text-xs md:text-sm text-gray-200 truncate">aadityaaggarwal475@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-600/50 rounded-lg border border-gray-500">
            <Phone className="w-4 h-4 md:w-5 md:h-5 text-green-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-400">Phone</p>
              <p className="text-xs md:text-sm text-gray-200">+91 9625681776</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-600/50 rounded-lg border border-gray-500">
            <Linkedin className="w-4 h-4 md:w-5 md:h-5 text-blue-400 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-gray-400">LinkedIn</p>
              <a
                href="https://www.linkedin.com/in/aaditya-aggarwal-r4p/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs md:text-sm text-gray-200 underline hover:text-blue-400 transition truncate block"
              >
                linkedin.com/in/aaditya-aggarwal-r4p/
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-600/50 rounded-lg border border-gray-500">
            <Github className="w-4 h-4 md:w-5 md:h-5 text-gray-300 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-gray-400">GitHub</p>
              <a
                href="https://github.com/Aaditya2302"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs md:text-sm text-gray-200 underline hover:text-blue-400 transition truncate block"
              >
                github.com/Aaditya2302/
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            <Mail className="w-3 h-3 md:w-4 md:h-4 mr-2" />
            Send Message
          </Button>
          <Button variant="outline" className="flex-1 border-gray-500 text-gray-300 hover:bg-gray-600 bg-transparent">
            <Download className="w-3 h-3 md:w-4 md:h-4 mr-2" />
            Download Resume
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
)

// Main App Component with responsive design
export default function DesktopPortfolio() {
  const [openWindows, setOpenWindows] = useState({
    about: {
      isOpen: false,
      isMinimized: false,
      zIndex: 0,
      initialX: 100,
      initialY: 80,
      initialWidth: 450,
      initialHeight: 500,
    },
    projects: {
      isOpen: false,
      isMinimized: false,
      zIndex: 0,
      initialX: 200,
      initialY: 120,
      initialWidth: 700,
      initialHeight: 600,
    },
    skills: {
      isOpen: false,
      isMinimized: false,
      zIndex: 0,
      initialX: 150,
      initialY: 100,
      initialWidth: 700,
      initialHeight: 600,
    },
    experience: {
      isOpen: false,
      isMinimized: false,
      zIndex: 0,
      initialX: 250,
      initialY: 140,
      initialWidth: 650,
      initialHeight: 580,
    },
    contact: {
      isOpen: false,
      isMinimized: false,
      zIndex: 0,
      initialX: 300,
      initialY: 160,
      initialWidth: 500,
      initialHeight: 450,
    },
    thispc: {
      isOpen: false,
      isMinimized: false,
      zIndex: 0,
      initialX: 200,
      initialY: 100,
      initialWidth: 600,
      initialHeight: 500,
    },
    recyclebin: {
      isOpen: false,
      isMinimized: false,
      zIndex: 0,
      initialX: 250,
      initialY: 120,
      initialWidth: 500,
      initialHeight: 400,
    },
    search: {
      isOpen: false,
      isMinimized: false,
      zIndex: 0,
      initialX: 300,
      initialY: 140,
      initialWidth: 550,
      initialHeight: 450,
    },
  })

  const [focusedWindow, setFocusedWindow] = useState(null)
  const [nextZIndex, setNextZIndex] = useState(1)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showStartMenu, setShowStartMenu] = useState(false)
  const [showMobileNav, setShowMobileNav] = useState(false)
  const [wifiConnected, setWifiConnected] = useState(true)
  const [volumeOn, setVolumeOn] = useState(true)
  const [batteryLevel, setBatteryLevel] = useState(85)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchInput, setShowSearchInput] = useState(false)

  const [desktopIcons, setDesktopIcons] = useState([
    {
      id: "thispc",
      icon: Monitor,
      label: "This PC",
      position: { x: 50, y: 50 },
    },
    {
      id: "recyclebin",
      icon: Trash2,
      label: "Recycle Bin",
      position: { x: 50, y: 150 },
    },
  ])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const windowConfigs = {
    about: {
      title: "About Me",
      icon: User,
      content: AboutMeContent,
      color: "from-blue-500 to-blue-600",
    },
    projects: {
      title: "Projects",
      icon: Code,
      content: ProjectsContent,
      color: "from-green-500 to-green-600",
    },
    skills: {
      title: "Skills",
      icon: Award,
      content: SkillsContent,
      color: "from-purple-500 to-purple-600",
    },
    experience: {
      title: "Experience",
      icon: Briefcase,
      content: ExperienceContent,
      color: "from-orange-500 to-orange-600",
    },
    contact: {
      title: "Contact",
      icon: Mail,
      content: ContactContent,
      color: "from-pink-500 to-pink-600",
    },
    thispc: {
      title: "This PC",
      icon: Monitor,
      content: (props) => <ThisPCContent onOpenSection={openWindow} {...props} />,
      color: "from-gray-500 to-gray-600",
    },
    recyclebin: {
      title: "Recycle Bin",
      icon: Trash2,
      content: RecycleBinContent,
      color: "from-red-500 to-red-600",
    },
    search: {
      title: "Search",
      icon: Search,
      content: (props) => <SearchResults query={searchQuery} onClose={() => closeWindow("search")} {...props} />,
      color: "from-blue-500 to-purple-600",
    },
  }

  const openWindow = (id) => {
    setOpenWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: true,
        isMinimized: false,
        zIndex: nextZIndex,
      },
    }))
    setFocusedWindow(id)
    setNextZIndex((prev) => prev + 1)
  }

  const closeWindow = (id) => {
    setOpenWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false },
    }))
  }

  const minimizeWindow = (id) => {
    setOpenWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true },
    }))
  }

  const focusWindow = (id) => {
    if (focusedWindow !== id) {
      setOpenWindows((prev) => ({
        ...prev,
        [id]: { ...prev[id], zIndex: nextZIndex },
      }))
      setFocusedWindow(id)
      setNextZIndex((prev) => prev + 1)
    }
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      openWindow("search")
    }
    setShowSearchInput(false)
  }

  const handleDesktopIconDrag = (iconId, newPosition) => {
    setDesktopIcons((prev) => prev.map((icon) => (icon.id === iconId ? { ...icon, position: newPosition } : icon)))
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden font-inter">
      {/* Mountain Landscape Wallpaper */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-400 via-pink-500 to-purple-900" />

        {/* Mountain silhouettes */}
        <div className="absolute bottom-0 left-0 right-0 h-2/3">
          <svg viewBox="0 0 1200 400" className="absolute bottom-0 w-full h-full">
            {/* Back mountains */}
            <polygon points="0,400 200,100 400,200 600,80 800,180 1000,120 1200,200 1200,400" fill="rgba(0,0,0,0.3)" />
            {/* Middle mountains */}
            <polygon points="0,400 150,150 350,250 550,130 750,220 950,160 1200,250 1200,400" fill="rgba(0,0,0,0.4)" />
            {/* Front mountains */}
            <polygon points="0,400 100,200 300,300 500,180 700,280 900,220 1100,300 1200,400" fill="rgba(0,0,0,0.5)" />
          </svg>
        </div>

        {/* Stars */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-1 h-1 bg-white rounded-full animate-pulse" />
          <div
            className="absolute top-32 left-80 w-1 h-1 bg-white rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          />
          <div
            className="absolute top-16 right-40 w-1 h-1 bg-white rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-40 right-80 w-1 h-1 bg-white rounded-full animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />
          <div
            className="absolute top-24 left-1/2 w-1 h-1 bg-white rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      {/* Desktop Icons - Hidden on mobile */}
      {desktopIcons.map((iconData) => (
        <DesktopIcon
          key={iconData.id}
          icon={iconData.icon}
          label={iconData.label}
          position={iconData.position}
          onDoubleClick={() => openWindow(iconData.id)}
          onDrag={(newPosition) => handleDesktopIconDrag(iconData.id, newPosition)}
        />
      ))}

      {/* Mobile Navigation */}
      <MobileNav
        windowConfigs={windowConfigs}
        openWindow={openWindow}
        isOpen={showMobileNav}
        onToggle={() => setShowMobileNav(!showMobileNav)}
      />

      {/* Search Input Overlay */}
      {showSearchInput && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-md">
            <h3 className="text-base md:text-lg font-semibold mb-4">Search</h3>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search for files, apps, settings..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              autoFocus
            />
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setShowSearchInput(false)} size="sm">
                Cancel
              </Button>
              <Button onClick={handleSearch} size="sm">
                Search
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Render Windows */}
      {Object.entries(openWindows).map(([id, config]) => {
        if (!config.isOpen) return null
        const WindowContent = windowConfigs[id].content
        return (
          <Window
            key={id}
            id={id}
            title={windowConfigs[id].title}
            icon={windowConfigs[id].icon}
            initialX={config.initialX}
            initialY={config.initialY}
            initialWidth={config.initialWidth}
            initialHeight={config.initialHeight}
            onClose={closeWindow}
            onFocus={focusWindow}
            onMinimize={minimizeWindow}
            isFocused={focusedWindow === id}
            isMinimized={config.isMinimized}
            style={{ zIndex: config.zIndex }}
          >
            <WindowContent />
          </Window>
        )
      })}

      {/* Start Menu - Desktop only */}
      {showStartMenu && (
        <div className="hidden md:block fixed bottom-16 left-4 w-80 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/50 p-4 z-50">
          <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-gray-200">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-0.5">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Aaditya Aggarwal</p>
              <p className="text-sm text-gray-600">MERN Stack Developer</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {Object.entries(windowConfigs)
              .slice(0, 5)
              .map(([id, config]) => {
                const Icon = config.icon
                return (
                  <button
                    key={id}
                    onClick={() => {
                      openWindow(id)
                      setShowStartMenu(false)
                    }}
                    className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-r ${config.color} flex items-center justify-center`}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{config.title}</span>
                  </button>
                )
              })}
          </div>
        </div>
      )}

      {/* Enhanced Taskbar - Fixed positioning for mobile */}
      <div className="fixed bottom-0 left-0 right-0 h-16 md:h-16 bg-white/90 backdrop-blur-xl border-t border-gray-200/50 flex items-center justify-between px-2 md:px-4 shadow-lg z-30">
        {/* Start Menu / Mobile Menu */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <button
            onClick={() => {
              if (window.innerWidth < 768) {
                setShowMobileNav(!showMobileNav)
              } else {
                setShowStartMenu(!showStartMenu)
              }
            }}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100/80 transition-colors"
          >
            <div className="w-8 h-8 md:w-8 md:h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-0.5">
              <div className="w-full h-full rounded-lg bg-white flex items-center justify-center">
                <Menu className="w-4 h-4 text-blue-600 md:hidden" />
                <Grid3X3 className="w-4 h-4 text-blue-600 hidden md:block" />
              </div>
            </div>
          </button>

          <div className="w-px h-6 md:h-8 bg-gray-300 hidden md:block" />

          {/* Functional Search - Hidden on small mobile */}
          <button
            onClick={() => setShowSearchInput(true)}
            className="hidden sm:flex items-center space-x-2 px-2 md:px-3 py-1 md:py-2 bg-gray-100/80 rounded-lg hover:bg-gray-200/80 transition-colors"
          >
            <Search className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
            <span className="text-xs md:text-sm text-gray-600 hidden md:inline">Search</span>
          </button>
        </div>

        {/* App Icons - Responsive */}
        <div className="flex items-center space-x-1 md:space-x-2">
          {Object.entries(windowConfigs)
            .slice(0, 5)
            .map(([id, config]) => {
              const Icon = config.icon
              const isOpen = openWindows[id].isOpen
              const isMinimized = openWindows[id].isMinimized

              return (
                <button
                  key={id}
                  onClick={() => (isMinimized ? openWindow(id) : openWindow(id))}
                  className={`relative p-2 md:p-3 rounded-lg md:rounded-xl transition-all duration-300 hover:scale-105 md:hover:scale-110 group ${
                    isOpen && !isMinimized ? "bg-blue-100 shadow-lg" : "hover:bg-gray-100/80"
                  }`}
                  title={config.title}
                >
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-r ${config.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}
                  >
                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  {isOpen && !isMinimized && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full" />
                  )}
                </button>
              )
            })}
        </div>

        {/* Enhanced System Tray - Responsive */}
        <div className="flex items-center space-x-1 md:space-x-3">
          {/* System Icons with functionality - Hidden on small screens */}
          <div className="hidden sm:flex items-center space-x-1 md:space-x-2">
            <button onClick={() => setWifiConnected(!wifiConnected)} className="relative group">
              <Button variant="ghost" size="icon" className="w-6 h-6 md:w-8 md:h-8 text-gray-600 hover:text-gray-800">
                {wifiConnected ? (
                  <Wifi className="w-3 h-3 md:w-4 md:h-4" />
                ) : (
                  <WifiOff className="w-3 h-3 md:w-4 md:h-4" />
                )}
              </Button>
            </button>

            <button onClick={() => setVolumeOn(!volumeOn)} className="relative group">
              <Button variant="ghost" size="icon" className="w-6 h-6 md:w-8 md:h-8 text-gray-600 hover:text-gray-800">
                {volumeOn ? (
                  <Volume2 className="w-3 h-3 md:w-4 md:h-4" />
                ) : (
                  <VolumeX className="w-3 h-3 md:w-4 md:h-4" />
                )}
              </Button>
            </button>

            <button className="relative group">
              <Button variant="ghost" size="icon" className="w-6 h-6 md:w-8 md:h-8 text-gray-600 hover:text-gray-800">
                {batteryLevel > 20 ? (
                  <Battery className="w-3 h-3 md:w-4 md:h-4" />
                ) : (
                  <BatteryLow className="w-3 h-3 md:w-4 md:h-4" />
                )}
              </Button>
            </button>
          </div>

          <div className="w-px h-6 md:h-8 bg-gray-300 hidden sm:block" />

          {/* Clock - Responsive */}
          <div className="text-right">
            <div className="text-xs md:text-sm font-medium text-gray-800">
              {currentTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div className="text-xs text-gray-600 hidden md:block">
              {currentTime.toLocaleDateString([], {
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close menus */}
      {(showStartMenu || showMobileNav) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowStartMenu(false)
            setShowMobileNav(false)
          }}
        />
      )}

      {/* Custom Styles with responsive considerations */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");
        
        body {
          font-family: "Inter", sans-serif;
          margin: 0;
          overflow: hidden;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        @media (min-width: 768px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(75, 85, 99, 0.3);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.5);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.7);
        }
        
        @keyframes slideIn {
          from {
            width: 0%;
          }
          to {
            width: var(--target-width);
          }
        }
        
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(-180deg);
          }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        
        /* Touch-friendly interactions for mobile */
        @media (max-width: 767px) {
          .group:hover .group-hover\\:animate-bounce {
            animation: none;
          }
          
          .hover\\:scale-110:hover {
            transform: scale(1.05);
          }
          
          .hover\\:rotate-3:hover {
            transform: rotate(1deg);
          }
        }
      `}</style>
    </div>
  )
}
