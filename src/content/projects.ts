import type { Project } from "./types";

/** Side projects and coursework. Order here is the order on the page. */
export const projects: Project[] = [
  {
    title: "Raft consensus and a replicated key-value store",
    summary:
      "Raft in Go from the paper: leader election, log replication, the current-term commit rule and persistent state, then a key-value service on top that survives crashes, split votes and network partitions.",
    year: "2024",
    stack: ["Go", "Distributed systems"],
    links: [],
    note: "Course code (LUMS Distributed Systems), shared on request. Every test ran 10× with and without -race.",
    featured: true,
  },
  {
    title: "Distributed Postgres",
    summary:
      "Sharding playground: three Dockerized Postgres shards behind a Go routing proxy that hashes a shard key on a ring, co-locates each tenant's tables and broadcasts reference data to every shard.",
    year: "2026",
    stack: ["Go", "PostgreSQL", "Docker"],
    links: [{ label: "Code", href: "https://github.com/k-amin07/distributed-postgres" }],
    featured: true,
  },
  {
    title: "Expenses",
    summary:
      "A personal expense tracker's backend in Go, replacing a Google Sheet: JWT auth middleware, accounts, categories, multi-line transactions, DTO mapping and table-driven tests.",
    year: "2026",
    stack: ["Go", "REST", "JWT"],
    links: [{ label: "Code", href: "https://github.com/k-amin07/expenses" }],
    featured: true,
  },
  {
    title: "Understanding the hidden data costs of YouTube Shorts",
    summary:
      "Extends 'Uncovering the Hidden Data Costs of Mobile YouTube Video Ads' (WWW '24) to Shorts. Measured data use on rooted Android with mitmproxy (past SSL pinning) and OCR over 'stats for nerds': replayed Shorts re-fetch the whole video, and ad sequences add heavy overhead.",
    year: "2024",
    stack: ["Python", "mitmproxy", "Tesseract OCR", "Android"],
    links: [
      { label: "Code", href: "https://github.com/k-amin07/YoutubeShorts" },
      { label: "Report", href: "https://www.overleaf.com/read/fpznftpwxvps#da384a" },
      { label: "Original paper", href: "https://dl.acm.org/doi/10.1145/3589334.3645496" },
    ],
    featured: true,
  },
  {
    title: "4×4×4 tic-tac-toe with deep Q-learning",
    summary:
      "Two self-play agents learn a 3D board with a neural Q-function plus a tactical override for immediate wins and blocks. One agent learned to set up forks, and we then trained it against the competition-winning DP agent.",
    year: "2023",
    stack: ["Python", "TensorFlow / Keras", "Reinforcement learning"],
    links: [{ label: "Code", href: "https://github.com/k-amin07/tict-tac-toe-dprl" }],
    featured: true,
  },
  {
    title: "Neo4j GraphQL OGM transactions",
    summary: "A minimal example of wrapping @neo4j/graphql-ogm writes in a transaction so a failed step rolls everything back.",
    year: "2023",
    stack: ["Node.js", "Neo4j", "GraphQL"],
    links: [{ label: "Code", href: "https://github.com/k-amin07/neo4j-graphql-ogm-transactions" }],
    featured: false,
  },
  {
    title: "Compiler construction",
    summary:
      "A compiler for a small C-like language in Java: lexer, parser, three-address code, machine code generation and a virtual machine to run it.",
    stack: ["Java", "Lex"],
    links: [{ label: "Code", href: "https://github.com/k-amin07/Project---Compiler-Construction" }],
    featured: false,
  },
  {
    title: "Cloud-based ransomware detection",
    summary: "Detects ransomware by profiling user activity and reporting anomalies.",
    year: "2020",
    stack: ["Python"],
    links: [
      {
        label: "Code",
        href: "https://github.com/k-amin07/Cloud-Based-Ransomware-Detection-and-Prevention-System",
      },
    ],
    featured: false,
  },
];
