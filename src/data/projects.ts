export type Project = {
  id: string
  title: string
  tags: string[]
  kind: "image" | "video" | "text"
  previewSrc?: string        // image or mp4
  previewPoster?: string     // poster for mp4
  previewText?: string       // for kind === "text"
  eager?: boolean            // preload top 3
}

export const projects: Project[] = [
  {
    id: "lrda-mobile",
    title: "LRDA Mobile",
    tags: ["Mobile", "React Native", "Maps"],
    kind: "video",
    previewSrc: "/previews/lrda-loop.mp4",
    previewPoster: "/previews/lrda-poster.jpg",
    eager: true
  },
  {
    id: "temple-app",
    title: "Temple App",
    tags: ["iOS", "UX"],
    kind: "image",
    previewSrc: "/previews/temple-1.png",
    eager: true
  },
  {
    id: "fintech-stocks",
    title: "Python Stocks/Fintech",
    tags: ["Python", "Data"],
    kind: "text",
    previewText: "Signal scans, risk model, fast backtests.",
    eager: true
  },
  {
    id: "lumos-stl",
    title: "Lumos STL site",
    tags: ["Web", "React"],
    kind: "image",
    previewSrc: "/previews/lumos.png"
  },
  {
    id: "portfolio-v1",
    title: "Portfolio V1",
    tags: ["Web", "React", "Three.js"],
    kind: "image",
    previewSrc: "/previews/portfolio-v1.png"
  },
  {
    id: "data-viz",
    title: "Data Visualization",
    tags: ["Python", "D3.js", "Analytics"],
    kind: "text",
    previewText: "Interactive charts and real-time dashboards."
  },
  {
    id: "mobile-game",
    title: "Mobile Game Prototype",
    tags: ["Unity", "C#", "Game Design"],
    kind: "video",
    previewSrc: "/previews/game-demo.mp4",
    previewPoster: "/previews/game-poster.jpg"
  },
  {
    id: "api-service",
    title: "REST API Service",
    tags: ["Node.js", "Express", "MongoDB"],
    kind: "text",
    previewText: "Scalable backend with authentication and real-time features."
  }
]
