import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";
import * as diagrams from "@/components/diagrams";
import { Callout } from "@/components/callout";

// Components available in every .mdx file without importing them.
const components: MDXComponents = {
  a: ({ href = "", ...props }: ComponentPropsWithoutRef<"a">) => {
    const external = /^https?:\/\//.test(href);
    return <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} {...props} />;
  },
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="table-wrap">
      <table {...props} />
    </div>
  ),
  Callout,
  ...diagrams,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
