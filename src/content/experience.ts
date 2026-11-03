import type { Degree, Job } from "./types";

/**
 * Work history, newest first.
 *
 * New job:        add a Job object at the top of `jobs`.
 * Leaving a job:  set `end` on its current Position (e.g. end: "2027-02").
 * Promotion:      add a new Position at the top of that job's `positions`
 *                 and set `end` on the previous one.
 */
export const jobs: Job[] = [
  {
    company: "PackageX",
    url: "https://packagex.io",
    location: "Islamabad, Pakistan",
    blurb:
      "Logistics and inventory platform. Clients keep their ERP and storefront; PackageX connects them and runs the warehouse floor.",
    caseStudies: [
      "fulfillment-operations",
      "inbound-receiving",
      "operations-platform",
      "agent-orchestrator",
    ],
    positions: [
      {
        title: "Forward Deployed Engineer (Backend & AI)",
        start: "2026-04",
        end: null,
        highlights: [
          "Map client operations into PackageX Workflows (modular, block-based flows) and ship them for $250K+ ARR accounts.",
          "Built the integration layer and 20 production workflows for a multi-location fresh pet-food brand: NetSuite, Shopify, Onfleet and Ordergroove behind proxy workflows that own auth, caching and idempotency.",
          "Designed and shipped AI-assisted inbound receiving for a residential care provider: a label photo is read by vision inference and routed to a PO, a person or an exceptions queue, backed by Entra ID, EMR and Business Central syncs.",
          "Built a remote orchestrator for Claude Code agents: parallel sessions in isolated git worktrees, a live terminal in the browser, steerable from a phone.",
        ],
      },
      {
        title: "Senior Node.js Developer",
        start: "2024-01",
        end: "2026-04",
        highlights: [
          "Built core SaaS APIs in Node.js and Prisma on MySQL: fulfillments, manifests, parcels, items, audits and cycle counts, documents, imports and batches.",
          "Owned the asset management module end to end: lifecycle, assignment, maintenance and warranty states, imports, and lock-contention fixes on the write path.",
          "Engineered lease-based Redis coordination, after the leases in Facebook's Memcache paper, for safe idempotent writes under high-concurrency MySQL workloads.",
          "Built cloud printing APIs and the PDF template engine; made label-sheet generation about 3.5× faster by deduplicating and prefetching image fetches.",
          "Connected NetSuite and legacy client systems (sales orders, partial fulfillments, tax, purchase orders) and maintained CI/CD with GitHub Actions.",
        ],
      },
    ],
    stack: ["Node.js", "TypeScript", "Prisma", "MySQL", "Redis", "GCP", "Claude", "Workflows"],
  },
  {
    company: "Bridgelinx",
    url: "https://www.bridgelinxpk.com",
    location: "Lahore, Pakistan",
    blurb: "Digital freight platform; the first Pakistani startup to raise a $10M seed round.",
    positions: [
      {
        title: "Lead Backend Engineer",
        start: "2022-02",
        end: "2024-01",
        highlights: [
          "Led a team of two engineers building the backend for 9 web and mobile apps on Node.js, Apollo GraphQL and Neo4j.",
          "Migrated more than 95% of legacy, unstructured Firebase data into a unified Neo4j/GraphQL schema with minimal loss.",
          "Ran AWS infrastructure and CI/CD: CloudFormation stacks, push-to-deploy pipelines from GitHub, EC2, S3, Lambda and SQS. Cut deployment overhead by 50%.",
        ],
      },
    ],
    stack: ["Node.js", "GraphQL", "Neo4j", "Redis", "AWS", "CloudFormation"],
  },
  {
    company: "Eastman Enterprises",
    location: "Lahore, Pakistan",
    positions: [
      {
        title: "Software Engineer",
        start: "2021-08",
        end: "2022-01",
        highlights: ["Built backend APIs and managed third-party integrations."],
      },
    ],
    stack: ["Node.js"],
  },
  {
    company: "LUMS",
    url: "https://lums.edu.pk",
    location: "Lahore, Pakistan",
    blurb: "Research with Dr. Ihsan Ayyub Qazi and Dr. Zartash Uzmi.",
    positions: [
      {
        title: "Research Assistant",
        start: "2019-03",
        end: "2021-08",
        highlights: [
          "Worked on Advention, a system that picks low-latency Tor circuits and serves relevant ads to Tor users.",
          "Prototyped LasTor- and NavigaTor-style path selection for latency before settling on power-of-d-choices circuit selection.",
          "Built measurement tooling to study how GDPR affected page load times.",
        ],
      },
    ],
    stack: ["Python", "Tor", "Measurement"],
  },
];

export const education: Degree[] = [
  {
    school: "Lahore University of Management Sciences (LUMS)",
    degree: "MS Computer Science",
    start: "2022-08",
    end: "2025-05",
    location: "Lahore, Pakistan",
    notes: [
      "Thesis: cost-effective content moderation using LLMs, advised by Dr. Ihsan Ayyub Qazi and Dr. Zafar Qazi.",
      "Merit scholarship: 60% fee waiver (2023–2024).",
      "Coursework: Distributed Systems, Reinforcement Learning, Information Retrieval, Design & Analysis of Algorithms, Topics in Internet Research.",
    ],
  },
  {
    school: "FAST National University (NUCES)",
    degree: "BS Computer Science",
    start: "2014-08",
    end: "2019-01",
    location: "Lahore, Pakistan",
    notes: ["President of SOFTEC 2018: led a 200+ person team to run Pakistan's largest IT event."],
  },
];
