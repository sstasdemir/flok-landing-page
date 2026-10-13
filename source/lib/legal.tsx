import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import type { ReactNode } from "react";

import { getDictionary, type Locale, type PageKey } from "@/lib/i18n";

export type LegalPageKey = Exclude<PageKey, "home">;

type Block =
  | { kind: "h2" | "h3" | "p"; text: string }
  | { kind: "ul"; items: string[] };

export type LegalDoc = {
  title: string;
  updated: string;
  blocks: Block[];
};

export async function readLegalDoc(locale: Locale, page: LegalPageKey): Promise<LegalDoc> {
  const source = await readFile(path.join(process.cwd(), "content/legal", locale, `${page}.md`), "utf8");
  const updatedPrefix = getDictionary(locale).legal.updatedLabel;
  const chunks = source.trim().split(/\n{2,}/);
  let title = "";
  let updated = "";
  const blocks: Block[] = [];

  for (const chunk of chunks) {
    if (chunk.startsWith("<!--")) continue; // editorial notes (e.g. legal review flags), never rendered
    if (chunk.startsWith("# ")) title = chunk.slice(2).trim();
    else if (chunk.startsWith(updatedPrefix)) updated = chunk.slice(updatedPrefix.length).trim();
    else if (chunk.startsWith("### ")) blocks.push({ kind: "h3", text: chunk.slice(4).trim() });
    else if (chunk.startsWith("## ")) blocks.push({ kind: "h2", text: chunk.slice(3).trim() });
    else if (chunk.startsWith("- ")) blocks.push({ kind: "ul", items: chunk.split("\n").map((line) => line.replace(/^- /, "")) });
    else blocks.push({ kind: "p", text: chunk.replace(/\n/g, " ") });
  }

  return { title, updated, blocks };
}

const inlinePattern = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;

export function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  for (const match of text.matchAll(inlinePattern)) {
    const index = match.index ?? 0;
    if (index > cursor) nodes.push(text.slice(cursor, index));
    const [, bold, label, href] = match;
    if (bold) nodes.push(<strong key={index} className="font-semibold text-ink">{bold}</strong>);
    else if (href.startsWith("/")) nodes.push(<Link key={index} href={href} className={linkClass}>{label}</Link>);
    else nodes.push(<a key={index} href={href} className={linkClass}>{label}</a>);
    cursor = index + match[0].length;
  }
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

const linkClass = "font-medium text-forest underline decoration-mint decoration-2 underline-offset-4 hover:decoration-forest";
