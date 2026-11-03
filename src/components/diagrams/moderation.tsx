import { Edge, Figure, Group, Label, Node, Svg } from "./kit";

export function ModerationPipeline() {
  const id = "mod";
  return (
    <Figure
      minWidth={720}
      caption="A comment is embedded first. If a close enough comment from the same community has already been judged, its verdict is reused; only misses reach the agents. The cache is scoped per community because the same sentence can break one subreddit's rules and be fine in another."
    >
      <Svg id={id} width={900} height={330} label="Moderation pipeline: a comment is embedded, looked up in a per-community semantic cache; a hit returns the cached verdict, a miss goes to LangGraph agents for rule classification, enforcement and a guardrail check, and the verdict is written back to the cache.">
        <Node x={16} y={40} w={140} h={64} title="Comment" sub="+ community rules" />
        <Edge id={id} d="M156,72 H190" />
        <Node x={192} y={40} w={170} h={64} title="Embed" sub="all-mpnet-base-v2" />
        <Edge id={id} d="M362,72 H396" />
        <Node x={398} y={30} w={190} h={84} title="Semantic cache" sub="RedisVL, per community\nsimilarity threshold\ntuned on held-out data" tone="accent" />
        <Edge id={id} d="M588,58 H700" accent />
        <Label x={644} y={50} tone="accent">
          hit
        </Label>
        <Node x={702} y={34} w={182} h={48} title="Cached verdict" sub="no model call" />

        <Edge id={id} d="M493,114 V168" />
        <Label x={503} y={146} anchor="start">
          miss
        </Label>
        <Group x={176} y={184} w={640} h={92} label="LangGraph agents" />
        <Node x={192} y={202} w={180} h={56} title="Rule classifier" sub="which rule, if any" />
        <Edge id={id} d="M372,230 H402" />
        <Node x={404} y={202} w={180} h={56} title="Enforcer" sub="remove or keep" />
        <Edge id={id} d="M584,230 H614" />
        <Node x={616} y={202} w={184} h={56} title="Guardrail check" sub="catches rogue outputs" />
        <Edge id={id} d="M800,230 H850 V140 H560 V118" />
        <Label x={705} y={133}>
          store verdict
        </Label>
        <Label x={450} y={308}>
          evaluated against human moderator decisions: agreement, cost and latency per model
        </Label>
      </Svg>
    </Figure>
  );
}
