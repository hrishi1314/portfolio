// ============================================================
// PORTFOLIO DATA — Edit all personal info here
// ============================================================

export const personal = {
  name: "Hrishikesh R",
  role: "Computer Science & Engineering Student",
  university: "Lovely Professional University",
  degree: "B.Tech in Computer Science and Engineering",
  period: "2024 – Present",
  cgpa: "8.69",
  academicFocus: "Artificial Intelligence & Machine Learning",
  careerDirection: "Software Engineering + AI/ML",
  tagline: "AI/ML · Generative AI · Software Engineering · DSA",
  description:
    "Building practical applications with software, data structures, and AI technologies.",
  email: "imhrishi46@gmail.com",
  linkedin: "https://www.linkedin.com/in/hrishikeshr-",
  github: "https://github.com/hrishi1314",
  resumePath: "/resume.pdf",
};

export const theme = {
  accent: "#D08A4B",
  accentHover: "#E2A267",
};

// ============================================================
// SKILLS
// ============================================================

export type SkillCategory = {
  category: string;
  skills: string[];
};

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["C++", "Python", "Java", "JavaScript", "SQL", "C"],
  },
  {
    category: "AI / ML",
    skills: [
      "Machine Learning",
      "Generative AI",
      "LLM Applications",
      "Scikit-learn",
      "Pandas",
      "NumPy",
    ],
  },
  {
    category: "Development",
    skills: [
      "Streamlit",
      "Java Swing",
      "HTML",
      "CSS",
    ],
  },
  {
    category: "Databases",
    skills: ["MySQL", "MongoDB", "PostgreSQL"],
  },
  {
    category: "Tools",
    skills: ["Git", "GitHub", "VS Code", "Vercel", "Google Colab"],
  },
];

// ============================================================
// PROJECTS
// ============================================================

export type Project = {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  howItWorks?: string;
  problem: string;
  solution: string;
  techStack: string[];
  myContribution?: string;
  keyHighlights?: string;
  features: string[];
  isGroupProject: boolean;
  githubUrl: string;
  demoUrl?: string;
  architecture?: string;
  dataStructures?: string[];
  screenshots?: { url: string; caption?: string }[];
  flows: { name: string; steps: string[] }[];
};

export const projects: Project[] = [
  {
    id: "ai-recommender",
    title: "AI Appliance Recommender Chatbot",
    shortDescription:
      "A hybrid appliance recommendation chatbot that combines requirement-based filtering and weighted product ranking with LLM-generated personalized buying guidance.",
    fullDescription:
      "A hybrid appliance recommendation chatbot that combines requirement-based filtering and weighted product ranking with LLM-generated personalized buying guidance.",
    howItWorks:
      "Processes user requirements, filters and ranks washing machines using price, ratings, and capacity, then uses an LLM to generate personalized explanations and buying guidance.",
    problem:
      "Consumers face information overload when choosing home appliances. Comparing dozens of models across budget, capacity, and features is time-consuming and error-prone.",
    solution:
      "A conversational AI chatbot that takes structured user requirements, filters and ranks products using data-driven logic, and leverages an LLM to generate clear, personalized buying guidance and comparisons.",
    techStack: [
      "Python",
      "Streamlit",
      "Pandas",
      "Scikit-learn",
      "Groq API",
      "Ollama",
      "LLM Applications",
    ],
    keyHighlights:
      "1,056 records · 12 attributes · Hybrid Recommendation + LLM",
    features: [
      "User requirement processing (budget, family size, machine type, load type)",
      "Product filtering and deduplication across 1,056 records",
      "Weighted product ranking based on price, ratings, and capacity",
      "Personalized AI-generated recommendations",
      "AI-generated product comparisons",
      "Contextual buying guidance via LLM",
    ],
    isGroupProject: false,
    githubUrl: "https://github.com/hrishi1314/AI-Chatbot-",
    demoUrl: "[ADD_DEMO_URL]",
    screenshots: [
      {
        url: "/projects/ai-recommender/screenshot-1.jpeg",
        caption: "Recommendation Interface & Filtering",
      },
      {
        url: "/projects/ai-recommender/screenshot-2.jpeg",
        caption: "Personalized Product Guidance & Comparisons",
      },
    ],
    flows: [
      {
        name: "Recommendation Flow",
        steps: [
          "User inputs requirements (budget, family size, machine type, load type)",
          "Data preprocessing & duplicate removal applied to product dataset",
          "Filtering narrows candidates to matching products",
          "Weighted ranking scores and orders results by price, rating, and capacity",
          "LLM generates personalized recommendation narrative",
          "Chatbot presents ranked options with buying guidance",
        ],
      },
    ],
  },
  {
    id: "library-management",
    title: "Library Management System",
    shortDescription:
      "A Java-based Library Management System implementing OOP and custom data structures to manage books, members, borrowing, returns, waiting queues, fines, and borrowing history.",
    fullDescription:
      "A Java-based Library Management System implementing OOP and custom data structures to manage books, members, borrowing, returns, waiting queues, fines, and borrowing history.",
    problem:
      "Manual library operations are inefficient and error-prone — tracking borrowing history, waiting queues, and fine calculations by hand doesn't scale.",
    solution:
      "A desktop application built with Java Swing and custom data structures (HashMap, Priority Queue, Stack, Queue, ArrayList) that fully automates library operations with a clean GUI.",
    techStack: [
      "Java",
      "Java Swing",
      "Object-Oriented Programming",
      "Data Structures",
      "Priority Queue",
      "Stack",
      "HashMap",
      "Git",
      "GitHub",
    ],
    myContribution:
      "Implemented the core system engine in LibrarySystem.java, handling book/member management, catalog search, issue and return operations, fine calculation, priority-based waiting queues, automatic allocation of returned books, borrowing history, and leaderboard generation.",
    keyHighlights:
      "Custom DSA implementation · Priority-based waitlist · Automatic allocation",
    features: [
      "Book and member management",
      "Catalog search",
      "Book issue and return operations",
      "Fine calculation based on due dates",
      "Priority-based waiting queues",
      "Automatic allocation of returned books",
      "Borrowing history tracking",
      "Leaderboard generation",
    ],
    isGroupProject: true,
    githubUrl: "https://github.com/visva-dheeran06/Library-Management-System",
    architecture:
      "Model-View-Controller pattern using Java Swing for the UI layer, a core LibrarySystem engine for business logic, and in-memory data structures for state management.",
    dataStructures: [
      "HashMap — book catalog and member registry",
      "Queue — standard FIFO waiting list",
      "Priority Queue — priority-based waiting list (e.g., reserved/faculty)",
      "Stack — borrowing history (LIFO access)",
      "ArrayList — dynamic member and book collections",
    ],
    screenshots: [
      {
        url: "/projects/library-management/screenshot-1.png",
        caption: "Library Management Dashboard & Catalog",
      },
      {
        url: "/projects/library-management/screenshot-2.png",
        caption: "Book Issue & Return Interface",
      },
      {
        url: "/projects/library-management/screenshot-3.png",
        caption: "Priority Queue Waitlist & Allocation",
      },
      {
        url: "/projects/library-management/screenshot-4.png",
        caption: "Member Registry & Borrowing Records",
      },
      {
        url: "/projects/library-management/screenshot-5.png",
        caption: "Fine Calculation & Transaction History",
      },
      {
        url: "/projects/library-management/screenshot-6.png",
        caption: "Leaderboard & Reporting Engine",
      },
    ],
    flows: [
      {
        name: "Issue Flow",
        steps: [
          "Member requests a book by ID",
          "System checks catalog via HashMap lookup",
          "If available: book issued, status updated, history recorded via Stack",
          "If unavailable: member added to Priority Queue for that book",
        ],
      },
      {
        name: "Return & Fine Flow",
        steps: [
          "Member returns book",
          "System calculates fine based on due date and return date",
          "Book status updated to available in HashMap",
          "Waiting queue checked — top-priority member auto-allocated",
          "Transaction recorded in borrowing history",
        ],
      },
    ],
  },
];

// ============================================================
// CERTIFICATIONS
// ============================================================

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  filePath: string;
  fileType: "pdf" | "png" | "jpg" | "jpeg";
  verificationUrl?: string;
};

export const certifications: Certification[] = [
  {
    id: "dsa",
    title: "Data Structures and Algorithms",
    issuer: "Neocolab",
    date: "January 2026",
    filePath: "/certificates/dsa.png",
    fileType: "png",
  },
  {
    id: "dbms",
    title: "Database Management System",
    issuer: "Infosys",
    date: "July 2026",
    filePath: "/certificates/dbms.pdf",
    fileType: "pdf",
  },
  {
    id: "ai-ml",
    title: "Introduction to AI & ML",
    issuer: "Skillera",
    date: "January 2025",
    filePath: "/certificates/ai-ml.png",
    fileType: "png",
  },
  {
    id: "mongodb",
    title: "MongoDB",
    issuer: "GeeksForGeeks",
    date: "November 2024",
    filePath: "/certificates/mongodb.pdf",
    fileType: "pdf",
  },
  {
    id: "python",
    title: "Python",
    issuer: "HackerRank",
    date: "November 2024",
    filePath: "/certificates/python.pdf",
    fileType: "pdf",
  },
];

// ============================================================
// EDUCATION
// ============================================================

export const education = {
  institution: "Lovely Professional University",
  degree: "B.Tech in Computer Science and Engineering",
  period: "2024 – Present",
  cgpa: "8.69",
  focus: "Artificial Intelligence & Machine Learning",
  coursework: [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "Database Management Systems",
    "Operating Systems",
    "Artificial Intelligence",
    "Machine Learning",
    "Computer Organization",
  ],
};

// ============================================================
// ABOUT
// ============================================================

export const about = {
  paragraphs: [
    "I’m a Computer Science and Engineering student with an academic focus on Artificial Intelligence and Machine Learning. I build practical software applications and enjoy applying programming, data structures, and AI concepts to solve real-world problems.",
    "My current focus is on AI/ML, Generative AI, Data Structures & Algorithms, and building reliable software applications.",
    "My projects include an AI-powered appliance recommendation chatbot and a Java-based Library Management System, where I’ve worked with data processing, recommendation logic, LLM integration, object-oriented programming, and data structures.",
  ],
  currentFocus: [
    "AI/ML",
    "Generative AI & LLMs",
    "Software Engineering",
    "Data Structures",
  ],
};
