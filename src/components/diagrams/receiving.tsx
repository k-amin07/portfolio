import { Edge, Figure, Group, Label, Node, Svg } from "./kit";

const rows = [
  { path: "PO on the label", pathSub: "extracted, normalized", act: "Match open PO", actSub: "read-only ERP lookup" },
  { path: "Vendor, no PO", pathSub: "known sender", act: "Pick from vendor's POs", actSub: "short list, newest first" },
  { path: "Resident parcel", pathSub: "name matches directory", act: "Resolve location", actSub: "EMR is the source of truth" },
  { path: "Unknown", pathSub: "no confident match", act: "Exceptions queue", actSub: "dock keeps moving", tone: "muted" as const },
];

export function ReceivingFlow() {
  const id = "rcv-flow";
  const y = (i: number) => 40 + i * 92;
  const cy = (i: number) => y(i) + 26;
  return (
    <Figure
      minWidth={760}
      caption="One photo decides the path. Inference extracts the label and matches the recipient and sender against a directory that nightly and intraday syncs keep current. Purchase-order packages end in warehouse receiving; resident packages skip PO and inventory and go straight to a delivery run."
    >
      <Svg id={id} width={900} height={520} label="Inbound receiving flow: a label photo goes to label inference, which classifies the package into PO on label, vendor without PO, resident parcel, or unknown. PO paths go to open and verify, resident parcels to a delivery run, unknowns to an exceptions queue. Entra ID and EMR syncs keep contacts current; Business Central is queried read-only.">
        <Node x={16} y={196} w={132} h={64} title="Label photo" sub="iPad at the dock" />
        <Edge id={id} d="M148,228 H170" />
        <Node x={172} y={172} w={168} h={112} title="Label inference" sub="OCR + LLM extraction\nbest of up to 4 photos\nrecipient + sender match" tone="accent" />

        {rows.map((r, i) => (
          <g key={r.path}>
            <Edge id={id} d={`M340,228 H356 V${cy(i)} H370`} />
            <Node x={372} y={y(i)} w={150} h={52} title={r.path} sub={r.pathSub} />
            <Edge id={id} d={`M522,${cy(i)} H548`} />
            <Node x={550} y={y(i)} w={160} h={52} title={r.act} sub={r.actSub} tone={r.tone} />
          </g>
        ))}

        <Edge id={id} d={`M710,${cy(0)} H736`} />
        <Edge id={id} d={`M710,${cy(1)} H736`} />
        <Node x={738} y={40} w={146} h={144} title="Open & verify" sub="count vs packing slip\nand PO lines\nroute by line type:\ninventory or not" />
        <Edge id={id} d={`M710,${cy(2)} H736`} />
        <Node x={738} y={y(2)} w={146} h={52} title="Delivery run" sub="proof at handoff" />

        <Group x={16} y={430} w={868} h={74} label="Kept in sync" />
        <Node x={32} y={442} w={264} h={50} title="Entra ID → employees" sub="Microsoft Graph, nightly" />
        <Node x={318} y={442} w={264} h={50} title="EMR file → residents" sub="SFTP drop, about 3× a day" />
        <Node x={604} y={442} w={264} h={50} title="Business Central → POs" sub="queried live, never written" />
        <Edge id={id} d="M164,442 V408 H256 V286" dashed />
        <Edge id={id} d="M450,442 V408 H256" dashed arrow="none" />
        <Label x={266} y={402} anchor="start">
          contacts for matching
        </Label>
      </Svg>
    </Figure>
  );
}
