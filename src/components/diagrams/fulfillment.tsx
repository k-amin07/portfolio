import { Edge, Figure, Group, Label, Node, Svg } from "./kit";

const workflows = [
  { t: "Pick, Pack & Stage", s: "391 blocks", tone: "accent" as const },
  { t: "Will Call", s: "customer pickup" },
  { t: "Order Lookup", s: "service console, cancel & refund" },
  { t: "Delivery reverse sync", s: "webhook" },
  { t: "Inventory Adjustment", s: "vendor returns" },
  { t: "Assembly Build / Unbuild", s: "production" },
  { t: "Cycle Count Weekly Sync", s: "scheduled" },
  { t: "View Transactions", s: "read-only" },
];

const proxies = [
  { t: "ERP proxy", s: "SuiteQL + REST records", sys: "NetSuite", sysSub: "ERP: items, inventory, builds" },
  { t: "Storefront proxy", s: "Admin GraphQL", sys: "Shopify", sysSub: "orders, refunds, fulfillment" },
  { t: "Delivery proxy", s: "deduped task creates", sys: "Onfleet", sysSub: "last-mile delivery" },
  { t: "Subscriptions proxy", s: "all HTTP verbs", sys: "Ordergroove", sysSub: "subscription skips" },
];

export function FulfillmentArchitecture() {
  const id = "ful-arch";
  const rowY = (i: number) => 56 + i * 50;
  const proxyY = (i: number) => 56 + i * 62;
  return (
    <Figure
      minWidth={760}
      caption="Hub and spoke. Business workflows never hold credentials or call an outside system directly: every call goes through one proxy workflow per system, which reads a cached token and refreshes it when it is close to expiry."
    >
      <Svg id={id} width={900} height={560} label="Architecture: eight business workflows call four proxy workflows, which own authentication and call NetSuite, Shopify, Onfleet and Ordergroove. Token workflows keep tokens in a shared cache. All workflows also call PackageX APIs directly.">
        <Group x={16} y={40} w={268} h={420} label="Business workflows" />
        {workflows.map((w, i) => (
          <g key={w.t}>
            <Node x={32} y={rowY(i)} w={236} h={40} title={w.t} sub={w.s} tone={w.tone} align="left" />
            <Edge id={id} d={`M268,${rowY(i) + 20} H304`} arrow="none" />
          </g>
        ))}
        <Edge id={id} d={`M304,${rowY(0) + 20} V${rowY(7) + 20}`} arrow="none" />

        <Group x={324} y={40} w={260} h={420} label="Integration layer" />
        {proxies.map((p, i) => (
          <g key={p.t}>
            <Edge id={id} d={`M304,${proxyY(i) + 24} H338`} />
            <Node x={340} y={proxyY(i)} w={228} h={48} title={p.t} sub={p.s} />
            <Edge id={id} d={`M568,${proxyY(i) + 24} H638`} />
            <Node x={640} y={proxyY(i)} w={228} h={48} title={p.sys} sub={p.sysSub} align="left" />
          </g>
        ))}
        <Edge id={id} d="M454,330 V294" dashed />
        <Label x={462} y={322} anchor="start">
          token, refreshed if &lt; 120 s left
        </Label>
        <Node x={340} y={332} w={228} h={48} title="Token workflows" sub="scheduled, plus on-demand refresh" />
        <Edge id={id} d="M454,380 V398" />
        <Node x={340} y={400} w={228} h={48} title="Shared cache" sub="tokens · reason codes · dedupe keys" tone="muted" />

        <Group x={624} y={40} w={260} h={266} label="Client systems" />

        <Edge id={id} d="M150,460 V488" />
        <Label x={160} y={479} anchor="start">
          direct
        </Label>
        <Node
          x={16}
          y={490}
          w={868}
          h={52}
          title="PackageX APIs"
          sub="fulfillments · shipments · parcels · audits · locations · items · print stations · PDF templates"
        />
      </Svg>
    </Figure>
  );
}

export function OrderLifecycle() {
  const id = "ful-life";
  return (
    <Figure
      minWidth={680}
      caption="One order, end to end. The storefront owns the order, PackageX owns the warehouse work, the delivery provider owns the last mile, and a webhook closes the loop in both systems."
    >
      <Svg id={id} width={880} height={290} label="Order lifecycle: order placed in Shopify, picked and packed in PackageX, shipped and printed, dispatched to Onfleet, delivered, then a webhook reverse sync marks Shopify delivered and completes PackageX.">
        <Node x={20} y={40} w={240} h={72} title="1 · Order placed" sub="storefront" />
        <Edge id={id} d="M260,76 H318" />
        <Node x={320} y={40} w={240} h={72} title="2 · Pick & pack" sub="scan-verified (EAN-13, UPC, GTIN)\nparcels created in PackageX" />
        <Edge id={id} d="M560,76 H618" />
        <Node x={620} y={40} w={240} h={72} title="3 · Ship & print" sub="cheapest rate, label bought\nwork-order PDF to a cloud printer" />
        <Edge id={id} d="M740,112 V188" />
        <Node x={620} y={190} w={240} h={72} title="4 · Dispatch" sub="delivery task with PackageX ids\ndeduped so retries are safe" />
        <Edge id={id} d="M620,226 H562" />
        <Node x={320} y={190} w={240} h={72} title="5 · Delivered" sub="driver completes the task" />
        <Edge id={id} d="M320,226 H262" accent />
        <Label x={291} y={218} tone="accent">
          webhook
        </Label>
        <Node x={20} y={190} w={240} h={72} title="6 · Reverse sync" sub="storefront marked delivered\nPackageX fulfillment completed" tone="accent" />
      </Svg>
    </Figure>
  );
}
