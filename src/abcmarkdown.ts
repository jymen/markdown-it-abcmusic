import MarkdownIt from 'markdown-it';
import { JSDOM } from 'jsdom';
import abcjs from 'abcjs';

class AbcMarkdownPlugin {
  constructor() {}

  /**
   * external entry point
   * @param md
   * @param options
   */
  plugin(md: MarkdownIt, options: any): MarkdownIt {
    return md;
  }
}

const abcPlugin = new AbcMarkdownPlugin();

export const abcMarkdownPlugin = abcPlugin.plugin;
