import kledgeImg from '../assets/kledge.png'
import luminImg from '../assets/lumin.png'
import nubuiltImg from '../assets/nubuilt.png'
import orbitImg from '../assets/orbit.png'
import autoopsImg from '../assets/autoops.png'

export const projectsData = [
  {
    id: 'kl-edge',
    title: 'KL Edge',
    tagline: 'Student utility platform built to simplify ERP usage and attendance tracking.',
    description: 'Student utility platform built to simplify ERP usage and attendance tracking.',
    image: kledgeImg,
    imageAspectRatio: '16:10',
    imageResolution: '2560x1600',
    tech: ['React.js', 'FastAPI', 'Vite'],
    client: 'K L University Students',
    industry: 'Education / Student Utility',
    timeline: '4 Weeks',
    technologies: 'React.js, FastAPI, CSS3, Local Storage',
    liveLink: 'https://kl-edge.netlify.app/',
    overview: 'KL Edge is a modern student utility platform built to simplify K L University ERP attendance calculations, timetable lookups, classroom maps, grade evaluations, and synchronization directly from student devices without intermediate servers.',
    role: [
      'UI & Frontend Design using React',
      'ERP Synchronization Integration',
      'Timetable & Attendance Calculator engineering'
    ],
    techStack: [
      { label: 'Frontend', value: 'React.js, HTML5, CSS3, Vite' },
      { label: 'Backend', value: 'FastAPI (Python)' },
      { label: 'Storage', value: 'Browser Local Storage' }
    ],
    features: [
      'Secure ERP sync & CAPTCHA validation flow',
      'Subject attendance calculator & shortage prediction',
      'Timetable and Exam Seating locator'
    ],
    structure: `KL-Edge/
│
├── backend/
│   ├── api/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── main.py
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── styles/
│   │   └── App.js
│   │
│   └── package.json
│
├── assets/
├── README.md
└── requirements.txt`,
    structureBullets: [
      'Decoupled architecture with FastAPI backend and client-side React',
      'Direct local session credentials storage'
    ],
    challenges: [
      {
        challenge: 'Handling student login validation securely without server storage',
        solution: 'Configured local storage session persistence so credentials stay exclusively on the student browser'
      }
    ]
  },
  {
    id: 'auto-ops',
    title: 'AutoOps',
    tagline: 'DevOps automation platform to simplify container management, system monitoring, and workflows.',
    description: 'DevOps automation platform designed to simplify infrastructure management, monitoring, and workflows.',
    image: autoopsImg,
    imageAspectRatio: '16:10',
    imageResolution: '2560x1600',
    tech: ['React.js', 'Node.js', 'Express', 'Docker'],
    client: 'Internal DevOps & Engineering Teams',
    industry: 'DevOps / Infrastructure Automation',
    timeline: '6 Weeks',
    technologies: 'React.js, Node.js, Express, Docker API, System Metrics APIs, CSS3',
    liveLink: 'https://github.com/harsha08-2k6/AutoOps',
    overview: 'AutoOps is a DevOps-focused automation platform designed to simplify infrastructure management, monitoring, and deployment workflows. It integrates container orchestration, live performance tracking, script execution pipelines, and centralized logs into a unified, user-friendly control center. It helps developers and engineers reduce manual overhead and improve pipeline efficiency.',
    role: [
      'Architected and built the centralized dashboard using React',
      'Engineered backend APIs in Node.js/Express to query and stream Docker container and system resource metrics',
      'Developed shell execution handlers with parameter sanitization for automated script tasks'
    ],
    techStack: [
      { label: 'Frontend', value: 'React.js, HTML5, CSS3, Vite' },
      { label: 'Backend', value: 'Node.js, Express' },
      { label: 'Containerization', value: 'Docker API / Docker SDK' },
      { label: 'Monitoring', value: 'System Metrics APIs' }
    ],
    features: [
      'Container Management: Monitor and manage Docker containers, start/stop/restart services, and inspect health status',
      'System Monitoring: Real-time telemetry tracking CPU, Memory, disk, and network resource usage metrics',
      'Automation Engine: Execute scripts and predefined workflows to reduce repetitive tasks',
      'Centralized Logs & Debugging: Direct access to container standard output and error logs for rapid system diagnosis'
    ],
    structure: `AutoOps/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   │   ├── containerController.js
│   │   ├── metricsController.js
│   │   └── workflowController.js
│   ├── routes/
│   ├── services/
│   │   ├── dockerService.js
│   │   └── monitorService.js
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContainerManager.jsx
│   │   │   ├── MetricsDashboard.jsx
│   │   │   └── WorkflowEngine.jsx
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── App.jsx
│   └── package.json
│
└── Dockerfile`,
    structureBullets: [
      'Clean monolithic Express backend executing shell workflows and direct container API hooks',
      'Modular client-side React views rendering status monitors and shell consoles'
    ],
    challenges: [
      {
        challenge: 'Securing the execution of dynamic workflows and scripts against command-injection exploits',
        solution: 'Implemented strict tokenized parameters, command-level validation, and isolated non-root execution rules.'
      },
      {
        challenge: 'Handling real-time high-throughput Docker container log streams without clogging main event loops',
        solution: 'Integrated lightweight Server-Sent Events (SSE) combined with throttle-controlled rendering on the React side.'
      }
    ]
  },
  {
    id: 'lumin-studio',
    title: 'Lumin Studio',
    tagline: 'Elegance meets typography in a modern agency design showcase.',
    description: 'Elegance meets typography in a modern agency design showcase.',
    image: luminImg,
    imageAspectRatio: '16:10',
    imageResolution: '2560x1600',
    tech: ['HTML5 & Tailwind CSS', 'React', 'Vite'],
    client: 'LuminStudio Co',
    industry: 'Creative Agency',
    timeline: '4 Weeks',
    technologies: 'HTML5 & Tailwind CSS, React, Vite',
    liveLink: '#',
    overview: 'Lumin Studio is a premium creative agency template tailored for content-heavy visual assets, smooth transition animations, and dark-mode aesthetic layout styles.',
    role: [
      'Lead UI Design Integration',
      'Custom page transition profiling',
      'State-driven portfolio filter layout'
    ],
    techStack: [
      { label: 'Frontend', value: 'React.js, Tailwind CSS, Vite' },
      { label: 'State', value: 'React Context API' },
      { label: 'Animations', value: 'Custom CSS & Framer Motion' }
    ],
    features: [
      'Fluid custom layout and page animations',
      'High-performance image load optimizations',
      'Clean contact form with interactive triggers'
    ],
    structure: `/components
   /Layout.jsx
   /Header.jsx
   /ProjectGrid.jsx
/hooks
   /useLazyLoad.js`,
    structureBullets: [
      'Optimized media assets and loading flow',
      'Centralized layout state management'
    ],
    challenges: [
      {
        challenge: 'Heavy load times from high-resolution project assets',
        solution: 'Developed progressive image loading using browser Intersection Observers'
      }
    ]
  },
  {
    id: 'nubuilt',
    title: 'Nubuilt',
    tagline: 'Architectural portfolio template focusing on scale, geometry, and grids.',
    description: 'Architectural portfolio template focusing on scale, geometry, and grids.',
    image: nubuiltImg,
    imageAspectRatio: '16:10',
    imageResolution: '2560x1600',
    tech: ['HTML5', 'CSS', 'GSAP'],
    client: 'Nubuilt Group',
    industry: 'Architecture / Construction',
    timeline: '2 Weeks',
    technologies: 'HTML5, CSS, GSAP',
    liveLink: '#',
    overview: 'Nubuilt is a geometry-driven portfolio for architecture firms. It highlights structural scales and details with smooth scroll-linked timeline reveal animations.',
    role: [
      'Core Frontend Developer',
      'GSAP ScrollTrigger timeline implementation',
      'Responsive design styling'
    ],
    techStack: [
      { label: 'Core', value: 'HTML5, CSS3, ES6 JS' },
      { label: 'Animation', value: 'GSAP, ScrollTrigger' },
      { label: 'Build', value: 'Vite' }
    ],
    features: [
      'Scroll-triggered timeline text & image reveals',
      'Architectural slider viewport transitions',
      'Clean modern lines and geometric hover effects'
    ],
    structure: `/css
   /main.css
/js
   /main.js
   /animations.js
/index.html`,
    structureBullets: [
      'Pure CSS Grid layout patterns',
      'Performant vanilla script trigger bindings'
    ],
    challenges: [
      {
        challenge: 'Scroll jumps on mobile browsers due to toolbar height shifts',
        solution: 'Implemented dynamic custom properties to lock heights relative to viewport size'
      }
    ]
  },
  {
    id: 'design-orbit',
    title: 'Design orbit',
    tagline: 'Dynamic agency portfolio featuring interactive mouse canvas backgrounds.',
    description: 'Dynamic agency portfolio featuring interactive mouse canvas backgrounds.',
    image: orbitImg,
    imageAspectRatio: '16:10',
    imageResolution: '2560x1600',
    tech: ['HTML5 & CSS', 'GSAP', 'Vite'],
    client: 'Orbit Agency',
    industry: 'Design Agency',
    timeline: '3 Weeks',
    technologies: 'HTML5 & CSS, GSAP, Vite',
    liveLink: '#',
    overview: 'Design orbit is a high-converting website template for creative designers, complete with responsive canvas backdrops, typography contrast, and magnetic hover components.',
    role: [
      'Creative Canvas Developer',
      'Interaction prototyping & micro-elements',
      'Theme switching implementation'
    ],
    techStack: [
      { label: 'Frontend', value: 'HTML5, CSS3, ES6 JS' },
      { label: 'Animation', value: 'GSAP Animations' },
      { label: 'Tools', value: 'Vite, PostCSS' }
    ],
    features: [
      'Interactive vector canvas particles backdrop',
      'High-contrast layout themes',
      'Magnetic cursor interaction triggers'
    ],
    structure: `/components
   /ParticleBg.js
   /MagneticButton.js
/css
   /variables.css`,
    structureBullets: [
      'Optimized dynamic canvas rendering cycles',
      'Highly responsive css custom variables'
    ],
    challenges: [
      {
        challenge: 'Canvas particle loop impacting CPU rendering metrics',
        solution: 'Throttled frame processing speeds on non-focused browser views'
      }
    ]
  }
];
