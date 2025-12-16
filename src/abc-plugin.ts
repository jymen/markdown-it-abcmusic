import { Plugin } from 'markdown-it';

export const abcPlugin: Plugin = (md) => {
  md.renderer.rules.abc = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const abc = token.content;
    //const { svg } = parse(abc);
    //    return `<div class="abc">${svg}</div>`;
    //
    return '';
  };
};
