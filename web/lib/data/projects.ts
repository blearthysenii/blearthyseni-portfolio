export type Project = {
  title: string;
  description: string;
  descriptionAl: string;
  image: string;
  live: string;
  github: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    title: "SchoolBridge",
    description:
      "SchoolBridge is a platform that helps teachers identify students' learning gaps through data-driven assessments and analytics.",
    descriptionAl:
      "SchoolBridge është një platformë që ndihmon mësuesit të identifikojnë boshllëqet në të nxënit e nxënësve përmes vlerësimeve dhe analizave të të dhënave.",
    image: "/images/schoolbridge-project.png",
    live: "https://www.schoolbridge-ks.com/",
    github: "https://github.com/blearthysenii/SchoolBridge-Web",
    stack: ["React", "TypeScript", "Python", "FastAPI", "PostgreSQL"],
  },
  {
    title: "PulseForm",
    description:
      "PulseForm is a platform for creating, managing and sharing surveys through public links with a modern and intuitive interface.",
    descriptionAl:
      "PulseForm është një platformë për krijimin, menaxhimin dhe shpërndarjen e pyetësorëve përmes lidhjeve publike me një ndërfaqe moderne dhe intuitive.",
    image: "/images/pulseform-project.png",
    live: "https://www.pulseform-genpact.com/",
    github: "https://github.com/blearthysenii/PulseForm-Web",
    stack: ["React", "TypeScript", "Python", "FastAPI", "PostgreSQL"],
  },
  {
    title: "Kaya",
    description:
      "Kaya is a restaurant table reservation platform that combines AI-powered chat reservations with traditional manual booking.",
    descriptionAl:
      "Kaya është një platformë për rezervimin e tavolinave në restorante që kombinon rezervimet përmes AI Chat me rezervimet manuale.",
    image: "/images/kaya-project.png",
    live: "https://kaya.kesug.com/",
    github: "https://github.com/blearthysenii/Kaya-Repo",
    stack: ["JavaScript", "PHP", "OpenAI"],
  },
];
