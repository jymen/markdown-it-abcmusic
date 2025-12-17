import { describe, it, expect } from 'vitest';
import MarkdownIt from 'markdown-it';
import markdownItAbcMusic from '../index.js';

describe('markdown-it-abcmusic', () => {
  it('renders abc block to svg', () => {
    const md = new MarkdownIt({ html: true });
    md.use(markdownItAbcMusic);

    const input = `
:::abc
X:1
T:Scale
M:4/4
L:1/4
K:C
C D E F | G A B c |
:::
`;
    const html = md.render(input);
    console.log('html:', html);
    expect(html).toContain('<svg');
    expect(html).toContain('abc-music');
    expect(html).toContain('path');
  });
});
