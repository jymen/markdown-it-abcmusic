import MarkdownIt from 'markdown-it';
import { AbcBlockPlugin } from './AbcBlockPlugin.js';

export default function markdownItAbcMusic(md: MarkdownIt) {
  const plugin = new AbcBlockPlugin();
  plugin.install(md);
}
