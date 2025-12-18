# markdown-it-abcmusic

Render ABC music blocks in markdown using abcjs SVG.

## Example

Write ABC music notation in your markdown:

````markdown
:::abc
X:1
T:Simple Melody
M:4/4
L:1/4
K:C
C D E F | G A B c |
:::
````

It renders as beautiful sheet music:

![Example of rendered ABC music notation](https://raw.githubusercontent.com/jymen/markdown-it-abcmusic/main/example.png)

## Usage

```ts
import MarkdownIt from 'markdown-it';
import markdownItAbcMusic from 'markdown-it-abcmusic';

const md = new MarkdownIt({ html: true });
md.use(markdownItAbcMusic);
```
