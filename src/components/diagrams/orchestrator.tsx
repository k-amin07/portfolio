import { Edge, Figure, Group, Label, Node, Svg } from "./kit";

const sessions = [
  { t: "Platform engineering", s: "own branch, own worktree" },
  { t: "Workflow builder", s: "writes drafts, never publishes" },
  { t: "Ticket triage", s: "reads code for context" },
];

export function OrchestratorArchitecture() {
  const id = "orch";
  return (
    <Figure
      minWidth={720}
      caption="Everything goes through the agent CLI, so a session started from the phone, the browser or a terminal is the same session. Each open browser tab gets its own pty running an attach; closing the tab ends only that attach, never the agent."
    >
      <Svg id={id} width={900} height={360} label="Architecture: a phone or browser talks to a small Node.js control server over HTTP and WebSocket with a token. The server drives the agent CLI to start, attach, read logs, stop and respawn sessions. Sessions run per profile, each platform session in its own git worktree.">
        <Node x={16} y={132} w={150} h={84} title="Phone / browser" sub="list · start · attach\nlogs · stop · respawn" />
        <Edge id={id} d="M166,174 H212" arrow="both" />
        <Label x={189} y={164}>
          WS
        </Label>

        <Node x={214} y={112} w={200} h={124} title="Control server" sub="Node.js, no build step\nHTTP API + WebSocket\none token, rotate by delete\npty per open tab" tone="accent" />
        <Edge id={id} d="M414,174 H460" />

        <Node x={462} y={132} w={150} h={84} title="Agent CLI" sub="--bg, attach, logs\nstop, respawn, resume" />
        <Edge id={id} d="M612,174 H632 V72 H652" />
        <Edge id={id} d="M632,174 H652" />
        <Edge id={id} d="M632,174 V276 H652" />

        <Group x={644} y={30} w={240} h={290} label="Sessions, by profile" />
        {sessions.map((s, i) => (
          <Node key={s.t} x={654} y={46 + i * 102} w={220} h={52} title={s.t} sub={s.s} align="left" />
        ))}

        <Node x={214} y={272} w={200} h={52} title="Profiles file" sub="cwd, model, rules per type" tone="muted" />
        <Edge id={id} d="M314,272 V238" dashed />
        <Node x={462} y={272} w={150} h={52} title="Worktree helper" sub="one per branch" tone="muted" />
        <Edge id={id} d="M537,272 V218" dashed />
      </Svg>
    </Figure>
  );
}
