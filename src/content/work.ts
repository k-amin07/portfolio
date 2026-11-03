import type { CaseStudy } from "./types";

/**
 * Case studies, in the order they appear on the home page.
 * Each `slug` needs a matching src/content/work/<slug>.mdx for the body.
 * Clients are anonymized by design; name the systems, not the customer.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "fulfillment-operations",
    title: "Fulfillment operations for a fresh pet-food brand",
    summary:
      "20 workflows that put the ERP, storefront, subscriptions and last-mile delivery behind one integration layer. The largest runs pick → pack → ship → dispatch in 391 blocks.",
    kind: "Forward deployed",
    context: "Multi-location fresh pet-food brand",
    role: "Forward Deployed Engineer",
    period: "2026",
    stack: ["PackageX Workflows", "NetSuite SuiteQL", "Shopify Admin GraphQL", "Onfleet", "Ordergroove", "OAuth 2.0 / JWT"],
    facts: [
      { value: "20", label: "production workflows" },
      { value: "900+", label: "blocks across them" },
      { value: "4", label: "external systems behind proxies" },
      { value: "0", label: "credentials inside business flows" },
    ],
  },
  {
    slug: "inbound-receiving",
    title: "AI-assisted inbound receiving for a residential care provider",
    summary:
      "Photograph a label at the dock and the package finds its way: matched to a purchase order, routed to a resident, or parked for a human. The dock never stops for an unknown box.",
    kind: "Forward deployed",
    context: "Multi-site residential care and education provider",
    role: "Forward Deployed Engineer",
    period: "2026",
    stack: ["Vision label inference", "Business Central API", "Microsoft Graph", "Entra ID", "SFTP", "PackageX Workflows"],
    facts: [
      { value: "6", label: "workflows, dock to handoff" },
      { value: "3", label: "intake paths decided by one photo" },
      { value: "3", label: "client systems synced or queried" },
      { value: "0", label: "writes to the client's ERP" },
    ],
  },
  {
    slug: "operations-platform",
    title: "A platform that bridges instead of replacing",
    summary:
      "Two years on the backend underneath: fulfillments, items, assets, printing, documents and imports, plus Memcache-style leases for writes that stay correct under concurrency.",
    kind: "Platform",
    context: "PackageX",
    role: "Senior Node.js Developer",
    period: "2024 – 2026",
    stack: ["Node.js", "TypeScript", "Prisma", "MySQL", "Redis", "GCP Cloud Functions"],
    facts: [
      { value: "1,600+", label: "commits to the platform" },
      { value: "8", label: "API domains built or owned" },
      { value: "3.5×", label: "faster PDF label sheets" },
      { value: "SET NX EX", label: "leases, after Memcache at Facebook" },
    ],
  },
  {
    slug: "agent-orchestrator",
    title: "A control plane for parallel coding agents",
    summary:
      "A small server that starts, watches and steers Claude Code sessions, each in its own git worktree, with a live terminal in the browser and a phone-sized UI.",
    kind: "AI tooling",
    context: "Internal tool",
    role: "Sole author",
    period: "2026",
    stack: ["Node.js", "WebSockets", "node-pty", "xterm.js", "git worktrees", "Claude Code"],
    facts: [
      { value: "3", label: "agent profiles, each with its own rules" },
      { value: "1", label: "worktree per branch, never shared" },
      { value: "0", label: "build steps" },
      { value: "Drafts", label: "only: humans publish" },
    ],
  },
  {
    slug: "llm-content-moderation",
    title: "Cost-effective content moderation with LLMs",
    summary:
      "MS thesis: can LLMs enforce a community's own rules the way its human moderators do, and how cheaply? A LangGraph multi-agent pipeline with community-aware semantic caching.",
    kind: "Research",
    context: "MS thesis, LUMS",
    role: "Researcher",
    period: "2024 – 2025",
    stack: ["Python", "LangGraph", "LangChain", "RedisVL", "all-mpnet-base-v2", "OpenAI Batch API"],
    facts: [
      { value: "LangGraph", label: "multi-agent moderation pipeline" },
      { value: "RedisVL", label: "semantic cache per community" },
      { value: "4o-mini", label: "fine-tuned as a cheaper judge" },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
