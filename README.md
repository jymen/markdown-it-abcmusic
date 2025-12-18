# markdown-it-abcmusic

Render ABC music blocks in markdown using abcjs SVG.

## Usage

```ts
import MarkdownIt from 'markdown-it';
import markdownItAbcMusic from 'markdown-it-abcmusic';

const md = new MarkdownIt({ html: true });
md.use(markdownItAbcMusic);
```
