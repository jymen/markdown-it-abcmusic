import { JSDOM } from 'jsdom';
import abcjs from 'abcjs';

export class AbcSvgRenderer {
  private dom: JSDOM;

  constructor() {
    this.dom = new JSDOM(
      `<!DOCTYPE html><html><body><div id="paper"></div></body></html>`,
      { pretendToBeVisual: true },
    );

    (global as any).window = this.dom.window;
    (global as any).document = this.dom.window.document;
    (global as any).HTMLElement = this.dom.window.HTMLElement;
    (global as any).SVGElement = this.dom.window.SVGElement;
  }

  render(abcSource: string): string {
    const document = this.dom.window.document;
    const paper = document.getElementById('paper')!;

    paper.innerHTML = '';

    abcjs.renderAbc(paper, abcSource, {
      scale: 1.0,
    });

    const svg = paper.querySelector('svg');
    if (!svg) {
      throw new Error('abcjs failed to produce SVG');
    }

    return svg.outerHTML;
  }
}
