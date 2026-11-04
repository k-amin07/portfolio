export const site = {
  name: "Khizar Amin",
  role: "Forward Deployed Engineer",
  focus: "Backend & AI",
  company: { name: "PackageX", url: "https://packagex.io" },
  location: "Lahore, Pakistan",
  availability: "Open to remote roles and relocation",
  url: "https://khizaramin.com",

  /** The big sentence at the top of the home page. */
  headline:
    "I build backend and AI systems that seamlessly connect the tools companies already run.",

  /** Short intro under the headline. */
  intro: [
    "Forward Deployed Engineer at PackageX. I sit with client operations teams, map how their work actually happens, and ship it as workflows wired into their ERP, storefront, delivery and identity systems.",
    "Before that I spent two years building the platform's backend those workflows run on, and two years as lead backend engineer at a logistics startup.",
  ],

  email: "khizaramin95@gmail.com",

  /**
   * /resume is an in-site viewer for public/resume.pdf with download and
   * email buttons. To update the résumé, replace public/resume.pdf and
   * redeploy. No code changes.
   */
  resume: "/resume",
  resumePdf: "/resume.pdf",

  socials: [
    { label: "GitHub", href: "https://github.com/k-amin07" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/k-amin07" },
    { label: "Medium", href: "https://medium.com/@khizaramin95" },
  ],

  /** "Off the clock" section. One string per paragraph; [text](url) makes a link. */
  about: [
    "I'm the person who reads the changelog before the release notes. If something is new and shiny (a model that dropped this morning, a kernel flag, a tiling window manager) I have probably installed it, broken my machine with it, and written down how I fixed it.",
    "Some of those write-ups ended up with more stars than my code. I run Arch, by the way.",
    "Away from the keyboard I take boxing lessons for fun, then undo all of it with baking. My Basque cheesecake is the most reliable thing I ship: burnt on top, creamy inside, zero bug reports. The recipe is [Joshua Weissman's](https://www.joshuaweissman.com/recipes/basque-cheese-cake-recipe); the deployment is mine.",
  ],

  skills: [
    {
      group: "Backend",
      items: ["Node.js", "TypeScript", "Go", "Python", "REST", "GraphQL", "Prisma"],
    },
    {
      group: "Data",
      items: ["MySQL", "PostgreSQL", "Neo4j", "Redis", "Elasticsearch"],
    },
    {
      group: "AI & agents",
      items: [
        "Claude API",
        "Claude Code",
        "LangGraph",
        "LangChain",
        "RedisVL semantic caching",
        "Vision extraction",
        "Multi-agent systems",
        "Guardrails",
      ],
    },
    {
      group: "Integrations",
      items: [
        "NetSuite (SuiteQL, REST)",
        "Shopify Admin GraphQL",
        "Business Central",
        "Microsoft Graph / Entra ID",
        "Onfleet",
        "Ordergroove",
        "OAuth 2.0 / JWT",
        "SFTP",
      ],
    },
    {
      group: "Infra",
      items: [
        "AWS (EC2, S3, Lambda, SQS, CloudFormation)",
        "GCP Cloud Functions",
        "GitHub Actions",
        "Docker",
        "Vercel",
        "Sentry",
        "Linux",
      ],
    },
  ],
} as const;
