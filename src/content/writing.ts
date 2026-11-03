import type { WritingItem } from "./types";

/** Articles and guides, newest first within each kind. */
export const writing: WritingItem[] = [
  {
    title: "Unleashing the power of graphs, part 2: custom mutations and transactions",
    href: "https://medium.com/@khizaramin95/unleashing-the-power-of-graphs-constructing-a-robust-backend-with-apollo-graphql-node-js-1c45140b7220",
    kind: "Article",
    where: "Medium",
    date: "Jul 2023",
    summary:
      "Custom GraphQL mutations that keep roles and sensitive fields under backend control, and Neo4j transactions so failed updates roll back.",
  },
  {
    title: "Unleashing the power of graphs: a backend with Apollo GraphQL, Node.js, Neo4j and Redis",
    href: "https://medium.com/@khizaramin95/unleashing-the-power-of-graphs-constructing-a-robust-backend-with-apollo-graphql-node-js-ecb52b1f68ca",
    kind: "Article",
    where: "Medium",
    date: "Jul 2023",
    summary: "Schema design, generated CRUD and Redis-backed subscriptions on a graph database.",
  },
  {
    title: "Arch Linux on the ROG Zephyrus G14",
    href: "https://github.com/k-amin07/G14Arch",
    kind: "Guide",
    where: "GitHub",
    date: "2023",
    summary:
      "A full install guide: LUKS encryption, btrfs subvolumes with automatic pacman snapshots, the ROG kernel, NVIDIA, quiet fan curves and audio fixes.",
    badge: "95 stars",
  },
  {
    title: "GPU passthrough with VFIO",
    href: "https://gist.github.com/k-amin07/47cb06e4598e0c81f2b42904c6909329",
    kind: "Guide",
    where: "Gist",
    date: "2020",
    summary:
      "Give a Windows VM on Linux its own GPU: IOMMU groups, binding the card to vfio-pci, and libvirt/OVMF setup.",
  },
  {
    title: "Boot the same Windows install natively or in a VM",
    href: "https://gist.github.com/k-amin07/d6ea1a3626a36e2ade1a59be934a3d9e",
    kind: "Guide",
    where: "Gist",
    date: "2021",
    summary: "Point virt-manager at a real dual-boot partition so one Windows install works both ways.",
  },
  {
    title: "Miscellaneous Linux fixes",
    href: "https://gist.github.com/k-amin07/d9dff461e8c96bc3b7e67105b4d94fa8",
    kind: "Guide",
    where: "Gist",
    date: "2021",
    summary: "Small fixes worth writing down: DNS leaks, SDDM, Kvantum theming, NTFS automounts and more.",
  },
];
