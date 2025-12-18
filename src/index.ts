import type MarkdownIt from 'markdown-it';
import { AbcBlockPlugin } from './AbcBlockPlugin.js';
declare const __PKG_VERSION__: string;
export const VERSION = __PKG_VERSION__;

export function printVersion() {
  console.log(`markdown-it-abcmusic v${VERSION}`);
}

export default function markdownItAbcMusic(md: MarkdownIt) {
  const plugin = new AbcBlockPlugin();
  plugin.install(md);
  console.log(printVersion());
}
