import { Edge, Figure, Group, Label, Node, Svg } from "./kit";

const systems = ["NetSuite", "Shopify", "Business Central", "Carriers", "Onfleet", "Entra ID"];
const flows = ["Pick, pack & ship", "Inbound receiving", "Cycle counts", "Will call", "Order lookup"];
const modules = [
  { t: "Fulfillments", s: "manifests · parcels" },
  { t: "Items", s: "UoM · assemblies" },
  { t: "Assets", s: "full lifecycle" },
  { t: "Audits", s: "cycle counting" },
  { t: "Cloud printing", s: "stations · jobs" },
  { t: "Documents", s: "PDF templates" },
  { t: "Imports", s: "batches v2" },
  { t: "Vision inference", s: "shipping labels" },
];

export function PlatformLayers() {
  const id = "plat-layers";
  return (
    <Figure
      minWidth={720}
      caption="Clients keep their systems of record. Workflows give each team a small app for its exact job; underneath, the same platform APIs do the work, and a client can also use the platform on its own. Highlighted modules are ones I built or owned."
    >
      <Svg id={id} width={900} height={430} label="Three layers: client systems at the top, workflows in the middle as small per-use-case apps, and PackageX platform API modules at the bottom, on MySQL, Redis and GCP. Clients can also use the platform directly.">
        <Group x={16} y={30} w={868} h={70} label="Client systems stay where they are" />
        {systems.map((s, i) => (
          <Node key={s} x={32 + i * 141} y={46} w={129} h={38} title={s} />
        ))}

        <Edge id={id} d="M330,100 V136" arrow="both" />
        <Label x={340} y={123} anchor="start">
          proxies own auth, retries, idempotency
        </Label>

        <Group x={16} y={152} w={640} h={70} label="Workflows: one small app per use case" />
        {flows.map((f, i) => (
          <Node key={f} x={32 + i * 124} y={168} w={114} h={38} title={f} />
        ))}
        <Node x={676} y={152} w={208} h={70} title="Or use it directly" sub="portal and public API" tone="muted" />

        <Edge id={id} d="M330,222 V258" arrow="both" />
        <Edge id={id} d="M780,222 V258" arrow="both" />

        <Group x={16} y={274} w={868} h={100} label="PackageX platform APIs" />
        {modules.map((m, i) => (
          <Node
            key={m.t}
            x={32 + i * 106.5}
            y={292}
            w={98}
            h={64}
            title={m.t}
            sub={m.s}
            tone={m.t === "Vision inference" ? "default" : "accent"}
          />
        ))}
        <Label x={450} y={404}>
          Node.js · Prisma · MySQL · Redis · GCP Cloud Functions
        </Label>
      </Svg>
    </Figure>
  );
}

export function LeaseSequence() {
  const id = "lease";
  const A = 120;
  const R = 450;
  const B = 780;
  const msg = (y: number, from: number, to: number, text: string, accent = false) => (
    <g>
      <Edge id={id} d={`M${from},${y} H${to > from ? to - 4 : to + 4}`} accent={accent} />
      <Label x={(from + to) / 2} y={y - 7} tone={accent ? "accent" : "muted"}>
        {text}
      </Label>
    </g>
  );
  return (
    <Figure
      minWidth={680}
      caption="Two parallel requests asking for the next order number. A short lease in Redis serialises them, the TTL means a crashed holder blocks nobody for long, and a unique constraint in MySQL backs it all up."
    >
      <Svg id={id} width={900} height={400} label="Sequence diagram: request A acquires a Redis lease with SET NX EX, request B fails and waits, A reads and increments the counter then deletes the lease, B then acquires the lease and gets the next number.">
        {[
          { x: A, t: "Request A" },
          { x: R, t: "Redis" },
          { x: B, t: "Request B" },
        ].map((l) => (
          <g key={l.t}>
            <Node x={l.x - 70} y={16} w={140} h={36} title={l.t} tone={l.t === "Redis" ? "accent" : "default"} />
            <path d={`M${l.x},52 V384`} style={{ stroke: "var(--line-strong)", strokeDasharray: "2 4" }} />
          </g>
        ))}
        {msg(88, A, R, "SET lease NX EX 5 → OK", true)}
        {msg(124, B, R, "SET lease NX EX 5 → nil")}
        <Label x={B - 12} y={150} anchor="end">
          lease held: poll every 100 ms
        </Label>
        {msg(184, A, R, "GET counter → ORD-1041")}
        {msg(220, A, R, "SET counter ORD-1042")}
        {msg(256, A, R, "DEL lease")}
        {msg(300, B, R, "SET lease NX EX 5 → OK", true)}
        {msg(336, B, R, "GET → ORD-1042 · SET ORD-1043 · DEL")}
        <Label x={A} y={378} tone="fg">
          gets ORD-1042
        </Label>
        <Label x={B} y={378} tone="fg">
          gets ORD-1043
        </Label>
      </Svg>
    </Figure>
  );
}
