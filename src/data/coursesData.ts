export interface CourseItem {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnail_url: string;
  thumbnailUrl?: string;
  is_ri_cert: boolean;
  modulesCount: number;
  modules: {
    id: string;
    courseId: string;
    title: string;
    description: string | null;
    videoUrl: string | null;
    duration: number | null;
    order: number | null;
  }[];
}

export const staticCourses: CourseItem[] = [
  {
    id: "leadership-masterclass",
    title: "Rotaract Leadership Masterclass",
    category: "Leadership",
    description: "Executive leadership frameworks, public speaking, and team stewardship designed for incoming club and district leaders.",
    thumbnail_url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    is_ri_cert: true,
    modulesCount: 3,
    modules: [
      {
        id: "lm-1",
        courseId: "leadership-masterclass",
        title: "Module 1: Principles of Rotary & Rotaract Governance",
        description: "Understanding Rotary International structure, the 4-Way Test, and the role of District 3192 in the global fellowship.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        duration: 25,
        order: 1
      },
      {
        id: "lm-2",
        courseId: "leadership-masterclass",
        title: "Module 2: High-Performance Team Leadership",
        description: "How to motivate volunteer boards, delegate duties effectively, and handle conflict in civil society organizations.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        duration: 35,
        order: 2
      },
      {
        id: "lm-3",
        courseId: "leadership-masterclass",
        title: "Module 3: Strategic Planning & Impact Metrics",
        description: "Setting annual club targets, tracking KPIs, and ensuring sustainable social service outcomes.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        duration: 30,
        order: 3
      }
    ]
  },
  {
    id: "club-administration",
    title: "Strategic Club Administration & Secretarial Protocol",
    category: "Governance",
    description: "Master meeting documentation, parliamentary procedure, district reporting protocols, and compliance bylaws.",
    thumbnail_url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
    is_ri_cert: true,
    modulesCount: 2,
    modules: [
      {
        id: "ca-1",
        courseId: "club-administration",
        title: "Module 1: Secretarial Guidelines & MOM Documentation",
        description: "Standard operating procedures for maintaining club records, minutes of meetings, and RI roster updates.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        duration: 20,
        order: 1
      },
      {
        id: "ca-2",
        courseId: "club-administration",
        title: "Module 2: District Reporting & Citation Requirements",
        description: "How to document projects and report accurately on the District 3192 reporting portal.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        duration: 25,
        order: 2
      }
    ]
  },
  {
    id: "brand-and-pr",
    title: "Brand Identity & Digital PR Protocol",
    category: "Technical",
    description: "Rotary Brand Center standards, modern visual design, social media strategy, and public image amplification.",
    thumbnail_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    is_ri_cert: false,
    modulesCount: 2,
    modules: [
      {
        id: "pr-1",
        courseId: "brand-and-pr",
        title: "Module 1: Rotary International Voice & Visual Guidelines",
        description: "Usage of logos, color palettes, typography, and co-branding lockups according to RI standards.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        duration: 20,
        order: 1
      },
      {
        id: "pr-2",
        courseId: "brand-and-pr",
        title: "Module 2: Campaign Strategy & Media Outreach",
        description: "Crafting press releases, engaging local press, and building viral social campaigns for community initiatives.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        duration: 30,
        order: 2
      }
    ]
  }
];
