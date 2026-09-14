export interface Mentor {
  id: string;
  name: string;
  role: string;
  organization: string;
  expertise: string[];
  image_url: string;
  bio: string;
}

export const staticMentors: Mentor[] = [
  {
    id: "mentor-1",
    name: "Rtn. Vikramaditya Sharma",
    role: "Past District Rotaract Representative",
    organization: "Rotary Club of Bangalore",
    expertise: ["Strategic Leadership", "Public Speaking", "Global Grants"],
    image_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    bio: "Over 12 years of leadership across Rotaract and Rotary International. Advisor on community impact programs and international district exchanges."
  },
  {
    id: "mentor-2",
    name: "Dr. Ananya Hegde",
    role: "Director of Sustainable Development",
    organization: "CSR Foundation Karnataka",
    expertise: ["Community Development", "CSR Partnerships", "Health Initiatives"],
    image_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600",
    bio: "Public health specialist and dedicated mentor guiding clubs on scalable maternal & child health service projects."
  },
  {
    id: "mentor-3",
    name: "Karthik Ramanathan",
    role: "VP of Product & Engineering",
    organization: "Tech Innovators Bengaluru",
    expertise: ["Technology Leadership", "Career Roadmaps", "Entrepreneurship"],
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
    bio: "Former Rotaractor mentoring youth on product management, software engineering careers, and startup incubation."
  },
  {
    id: "mentor-4",
    name: "Pooja Venkatesh",
    role: "Head of Corporate Communications",
    organization: "Aegis Media Global",
    expertise: ["Brand Strategy", "PR & Media", "Crisis Communication"],
    image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    bio: "Passionate about empowering young communicators with real-world storytelling, brand presence, and executive stakeholder messaging."
  }
];
