import type MarkdownIt from 'markdown-it';
import { AbcSvgRenderer } from './AbcSvgRenderer.js';

export class AbcBlockPlugin {
  private renderer = new AbcSvgRenderer();

  install(md: MarkdownIt) {
    md.block.ruler.before('fence', 'abc_block', this.blockRule.bind(this), {
      alt: ['paragraph', 'reference', 'blockquote'],
    });
  }

  private blockRule(
    state: any,
    startLine: number,
    endLine: number,
    silent: boolean,
  ): boolean {
    const start = state.bMarks[startLine] + state.tShift[startLine];
    const max = state.eMarks[startLine];
    const firstLine = state.src.slice(start, max);

    if (!firstLine.startsWith(':::abc')) {
      return false;
    }

    let nextLine = startLine + 1;
    let abcLines: string[] = [];

    while (nextLine < endLine) {
      const lineStart = state.bMarks[nextLine] + state.tShift[nextLine];
      const lineEnd = state.eMarks[nextLine];
      const line = state.src.slice(lineStart, lineEnd);

      if (line.trim() === ':::') {
        break;
      }

      abcLines.push(line);
      nextLine++;
    }

    if (nextLine >= endLine) {
      return false;
    }

    if (silent) {
      return true;
    }

    const abcSource = abcLines.join('\n');
    const svg = this.renderer.render(abcSource);
    const token = state.push('html_block', '', 0);
    token.block = true;
    token.content = `<div class="abc-music">${svg}</div>\n`;

    state.line = nextLine + 1;
    return true;
  }
}
