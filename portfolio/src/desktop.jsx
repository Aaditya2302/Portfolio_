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
  X,
  Minimize2,
  Star,
  Calendar,
  MapPin,
  Phone,
} from "lucide-react"

// Shadcn UI Components
const Button = ({ children, className = "", variant = "default", size = "default", ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  }

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
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
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
)

const CardTitle = ({ children, className = "", ...props }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
)

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
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

// Enhanced Window Component with animations
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
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight })
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const [isAnimating, setIsAnimating] = useState(true)
  const windowRef = useRef(null)

  useEffect(() => {
    // Opening animation
    setTimeout(() => setIsAnimating(false), 300)
  }, [])

  const handleMouseDown = (e) => {
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
    if (isDragging) {
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - size.width, e.clientX - dragOffset.x)),
        y: Math.max(0, Math.min(window.innerHeight - size.height, e.clientY - dragOffset.y)),
      })
    } else if (isResizing) {
      const newWidth = resizeStart.width + (e.clientX - resizeStart.x)
      const newHeight = resizeStart.height + (e.clientY - resizeStart.y)
      setSize({
        width: Math.max(300, Math.min(window.innerWidth - position.x, newWidth)),
        height: Math.max(200, Math.min(window.innerHeight - position.y, newHeight)),
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
      className={`absolute bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 border border-purple-500/30 ${
        isFocused ? "z-50 ring-2 ring-purple-400 shadow-purple-500/25" : "z-40"
      } ${isAnimating ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        transform: isAnimating ? "scale(0.95)" : "scale(1)",
      }}
      onMouseDown={() => onFocus(id)}
    >
      {/* Window Header */}
      <div
        className="window-header flex items-center justify-between p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-2">
          <Icon className="w-4 h-4" />
          <span className="font-semibold text-sm">{title}</span>
        </div>
        <div className="window-controls flex items-center space-x-1">
          <button
            onClick={() => onMinimize(id)}
            className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"
          >
            <Minimize2 className="w-3 h-3 text-yellow-900" />
          </button>
          <button
            onClick={() => onClose(id)}
            className="w-6 h-6 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-400 transition-colors"
          >
            <X className="w-3 h-3 text-red-900" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-grow p-6 overflow-auto bg-gray-800/50 text-gray-100 custom-scrollbar">{children}</div>

      {/* Resize Handle */}
      <div
        className="resize-handle absolute bottom-0 right-0 w-4 h-4 bg-purple-500 hover:bg-purple-400 cursor-nw-resize transition-colors"
        onMouseDown={handleMouseDown}
        style={{
          clipPath: "polygon(100% 0%, 0% 100%, 100% 100%)",
        }}
      />
    </div>
  )
}

// Enhanced Content Components
const AboutMeContent = () => (
  <div className="space-y-6">
    <div className="text-center">
      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1">
        <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
          <User className="w-12 h-12 text-purple-400" />
        </div>
      </div>
      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        John Doe
      </h2>
      <p className="text-purple-300">Full-Stack Developer & UI/UX Designer</p>
    </div>

    <Card className="bg-gray-700/50 border-purple-500/30">
      <CardContent className="p-4">
        <p className="text-gray-300 leading-relaxed">
          Passionate developer with 5+ years of experience creating innovative web applications. I specialize in React,
          Node.js, and modern web technologies. My goal is to build user-centric solutions that make a real impact.
        </p>
      </CardContent>
    </Card>

    <div className="grid grid-cols-2 gap-4">
      <Card className="bg-gray-700/50 border-purple-500/30">
        <CardContent className="p-4 text-center">
          <MapPin className="w-6 h-6 mx-auto mb-2 text-purple-400" />
          <p className="text-sm text-gray-300">San Francisco, CA</p>
        </CardContent>
      </Card>
      <Card className="bg-gray-700/50 border-purple-500/30">
        <CardContent className="p-4 text-center">
          <Calendar className="w-6 h-6 mx-auto mb-2 text-pink-400" />
          <p className="text-sm text-gray-300">Available Now</p>
        </CardContent>
      </Card>
    </div>
  </div>
)

const ProjectsContent = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      status: "Live",
      featured: true,
    },
    {
      title: "AI Chat Application",
      description:
        "Real-time chat application with AI-powered responses using OpenAI API. Built with Next.js and Socket.io for seamless communication.",
      tech: ["Next.js", "OpenAI", "Socket.io", "PostgreSQL"],
      status: "In Development",
      featured: true,
    },
    {
      title: "Task Management Tool",
      description:
        "Collaborative project management tool with real-time updates, file sharing, and team collaboration features.",
      tech: ["Vue.js", "Firebase", "Tailwind", "PWA"],
      status: "Completed",
      featured: false,
    },
    {
      title: "Portfolio Website",
      description:
        "Modern portfolio website with interactive animations and responsive design. Built with React and Framer Motion.",
      tech: ["React", "Framer Motion", "Tailwind", "Vercel"],
      status: "Live",
      featured: false,
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Featured Projects
      </h2>

      <div className="grid gap-4">
        {projects.map((project, index) => (
          <Card
            key={index}
            className="bg-gray-700/50 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 group"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-purple-300 group-hover:text-purple-200 transition-colors">
                  {project.title}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  {project.featured && (
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  <Badge
                    variant="outline"
                    className={`
                    ${
                      project.status === "Live"
                        ? "border-green-500 text-green-400"
                        : project.status === "In Development"
                          ? "border-yellow-500 text-yellow-400"
                          : "border-blue-500 text-blue-400"
                    }
                  `}
                  >
                    {project.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tech.map((tech) => (
                  <Badge key={tech} variant="secondary" className="bg-purple-500/20 text-purple-300 text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Live Demo
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white bg-transparent"
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

const SkillsContent = () => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React", level: 95, color: "bg-blue-500" },
        { name: "TypeScript", level: 90, color: "bg-blue-600" },
        { name: "Next.js", level: 88, color: "bg-gray-700" },
        { name: "Tailwind CSS", level: 92, color: "bg-cyan-500" },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", level: 85, color: "bg-green-600" },
        { name: "Python", level: 80, color: "bg-yellow-500" },
        { name: "PostgreSQL", level: 75, color: "bg-blue-700" },
        { name: "MongoDB", level: 82, color: "bg-green-500" },
      ],
    },
    {
      title: "Tools & Others",
      skills: [
        { name: "Git", level: 90, color: "bg-orange-500" },
        { name: "Docker", level: 70, color: "bg-blue-400" },
        { name: "AWS", level: 65, color: "bg-orange-600" },
        { name: "Figma", level: 85, color: "bg-purple-500" },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Skills & Technologies
      </h2>

      {skillCategories.map((category, categoryIndex) => (
        <Card key={categoryIndex} className="bg-gray-700/50 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-lg text-purple-300">{category.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {category.skills.map((skill, index) => (
              <div key={skill.name} className="group">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                  <span className="text-xs text-gray-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full ${skill.color} rounded-full transition-all duration-1000 ease-out group-hover:brightness-110`}
                    style={{
                      width: `${skill.level}%`,
                      animation: `slideIn 1s ease-out ${index * 0.1}s both`,
                    }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

const ExperienceContent = () => {
  const experiences = [
    {
      title: "Senior Full-Stack Developer",
      company: "TechCorp Inc.",
      period: "2022 - Present",
      description:
        "Lead development of scalable web applications using React and Node.js. Mentored junior developers and implemented CI/CD pipelines.",
      achievements: [
        "Increased app performance by 40%",
        "Led team of 5 developers",
        "Implemented microservices architecture",
      ],
    },
    {
      title: "Frontend Developer",
      company: "StartupXYZ",
      period: "2020 - 2022",
      description:
        "Developed responsive web applications and collaborated with design team to create intuitive user interfaces.",
      achievements: ["Built 3 major product features", "Reduced load time by 60%", "Implemented design system"],
    },
    {
      title: "Junior Developer",
      company: "WebSolutions",
      period: "2019 - 2020",
      description: "Started career building websites and learning modern web development practices.",
      achievements: ["Completed 20+ client projects", "Learned React and Node.js", "Contributed to open source"],
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Work Experience
      </h2>

      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <Card
            key={index}
            className="bg-gray-700/50 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300"
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg text-purple-300">{exp.title}</CardTitle>
                  <p className="text-pink-400 font-medium">{exp.company}</p>
                </div>
                <Badge variant="outline" className="border-purple-400 text-purple-300">
                  {exp.period}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm mb-3">{exp.description}</p>
              <div className="space-y-1">
                <p className="text-xs text-purple-300 font-medium">Key Achievements:</p>
                <ul className="list-disc list-inside space-y-1">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-xs text-gray-400">
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
  <div className="space-y-6">
    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
      Let's Connect
    </h2>

    <Card className="bg-gray-700/50 border-purple-500/30">
      <CardContent className="p-6">
        <p className="text-gray-300 mb-6 text-center">
          Ready to bring your ideas to life? Let's discuss your next project!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-3 p-3 bg-gray-600/50 rounded-lg">
            <Mail className="w-5 h-5 text-purple-400" />
            <div>
              <p className="text-xs text-gray-400">Email</p>
              <p className="text-sm text-gray-200">john.doe@example.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-600/50 rounded-lg">
            <Phone className="w-5 h-5 text-pink-400" />
            <div>
              <p className="text-xs text-gray-400">Phone</p>
              <p className="text-sm text-gray-200">+1 (555) 123-4567</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-600/50 rounded-lg">
            <Linkedin className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-xs text-gray-400">LinkedIn</p>
              <p className="text-sm text-gray-200">linkedin.com/in/johndoe</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-600/50 rounded-lg">
            <Github className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-400">GitHub</p>
              <p className="text-sm text-gray-200">github.com/johndoe</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            <Mail className="w-4 h-4 mr-2" />
            Send Message
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white bg-transparent"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Resume
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
)

// Main App Component
export default function DesktopPortfolio() {
  const [openWindows, setOpenWindows] = useState({
    about: {
      isOpen: true,
      isMinimized: false,
      zIndex: 1,
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
      initialWidth: 600,
      initialHeight: 550,
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
  })

  const [focusedWindow, setFocusedWindow] = useState("about")
  const [nextZIndex, setNextZIndex] = useState(2)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const windowConfigs = {
    about: { title: "About Me", icon: User, content: AboutMeContent },
    projects: { title: "Projects", icon: Code, content: ProjectsContent },
    skills: { title: "Skills", icon: Award, content: SkillsContent },
    experience: { title: "Experience", icon: Briefcase, content: ExperienceContent },
    contact: { title: "Contact", icon: Mail, content: ContactContent },
  }

  const openWindow = (id) => {
    setOpenWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: true, isMinimized: false, zIndex: nextZIndex },
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

  return (
    <div className="relative w-screen h-screen bg-slate-900 font-inter overflow-hidden">
      {/* Realistic Desktop Wallpaper */}
      <div className="absolute inset-0">
        {/* Base gradient wallpaper */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900" />
        
        {/* Tech-style abstract overlay */}
        <div className="absolute inset-0 opacity-30">
            <div className={`absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg%20width='60'%20height='60'%20viewBox='0%200%2060%2060'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cg%20fill='none'%20fill-rule='evenodd'%3E%3Cg%20fill='%23ffffff'%20fill-opacity='0.1'%3E%3Ccircle%20cx='7'%20cy='7'%20r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`} />
        </div>
        
        {/* Subtle geometric patterns */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-32 right-32 w-80 h-80 bg-gradient-to-l from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-emerald-500/5 to-teal-500/5 rounded-full blur-2xl" />
        
        {/* Grid overlay for tech feel */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

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

      {/* Enhanced Modern Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-black/80 backdrop-blur-2xl border-t border-white/10 flex items-center justify-between px-4 shadow-2xl">
        
        {/* Start Menu / Personal Avatar */}
        <div className="flex items-center space-x-4">
          <Button
            className="flex items-center space-x-2 p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
              JD
            </div>
            <span className="text-white text-sm font-medium">Start</span>
          </Button>
        </div>

        {/* App Icons - Centered */}
        <div className="flex items-center space-x-1 bg-white/5 rounded-xl p-2 backdrop-blur-sm">
          {Object.entries(windowConfigs).map(([id, config]) => {
            const Icon = config.icon
            const isOpen = openWindows[id].isOpen
            const isMinimized = openWindows[id].isMinimized

            return (
              <div key={id} className="relative group">
                <Button
                  onClick={() => (isMinimized ? openWindow(id) : openWindow(id))}
                  className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 hover:scale-110 relative overflow-hidden ${
                    isOpen && !isMinimized
                      ? "bg-white/20 text-white shadow-lg ring-2 ring-white/30"
                      : "bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {isOpen && !isMinimized && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                  )}
                </Button>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  {config.title}
                </div>
              </div>
            )
          })}
        </div>

        {/* System Tray */}
        <div className="flex items-center space-x-3">
          {/* System Icons */}
          <div className="flex items-center space-x-2">
            {/* WiFi Icon */}
            <div className="w-5 h-5 text-white/70 hover:text-white cursor-pointer transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,21L15.6,16.2C14.6,15.45 13.35,15 12,15C10.65,15 9.4,15.45 8.4,16.2L12,21M12,3C7.95,3 4.21,4.34 1.2,6.6L3,9C5.5,7.12 8.62,6 12,6C15.38,6 18.5,7.12 21,9L22.8,6.6C19.79,4.34 16.05,3 12,3M12,9C9.3,9 6.81,9.89 4.8,11.4L6.6,13.8C8.1,12.67 9.97,12 12,12C14.03,12 15.9,12.67 17.4,13.8L19.2,11.4C17.19,9.89 14.7,9 12,9Z" />
              </svg>
            </div>
            
            {/* Volume Icon */}
            <div className="w-5 h-5 text-white/70 hover:text-white cursor-pointer transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.85 14,18.71V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
              </svg>
            </div>
            
            {/* Battery Icon */}
            <div className="w-5 h-5 text-white/70 hover:text-white cursor-pointer transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z" />
              </svg>
            </div>
          </div>
          
          {/* Separator */}
          <div className="w-px h-6 bg-white/20" />
          
          {/* Clock and Date */}
          <div className="text-right">
            <div className="text-white text-sm font-medium">
              {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
            <div className="text-white/70 text-xs">
              {currentTime.toLocaleDateString([], { month: 'short', day: 'numeric' })}
            </div>
          </div>
          
          {/* Show Desktop Button */}
          <div className="w-px h-8 bg-white/20 hover:bg-white/40 cursor-pointer transition-colors ml-2" />
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body { 
          font-family: 'Inter', sans-serif; 
          margin: 0; 
          overflow: hidden; 
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(75, 85, 99, 0.3);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(147, 51, 234, 0.5);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(147, 51, 234, 0.7);
        }
        
        @keyframes slideIn {
          from { width: 0%; }
          to { width: var(--target-width); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-10px) rotate(180deg); opacity: 1; }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-15px) rotate(-180deg); opacity: 1; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}