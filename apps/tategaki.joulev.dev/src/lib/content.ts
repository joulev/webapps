import type { Character, RawParagraph } from "$lib/types";
import rawContent from "./article.md?raw";

const FURIGANA_START = "<";
const FURIGANA_END = ">";

const [rawTitle, ...content] = rawContent.split("\n\n");

export const title = rawTitle.substring(1).trim();

export const rawParagraphs = content.map((p) => {
  const characters: RawParagraph = [];
  for (let i = 0; i < p.length; i++) {
    const cur: Character = { char: p[i], furigana: null };
    if (i < p.length - 1 && p[i + 1] === FURIGANA_START) {
      const end = p.indexOf(FURIGANA_END, i + 2);
      cur.furigana = p.substring(i + 2, end);
      i = end;
    }
    characters.push(cur);
  }
  return characters;
});

export const srParagraphs = content.map((p) => {
  let characters = "";
  for (let i = 0; i < p.length; i++) {
    characters += p[i];
    if (i < p.length - 1 && p[i + 1] === FURIGANA_START) i = p.indexOf(FURIGANA_END, i + 2);
  }
  return characters;
});

/* Example: this is paragraphs[4]
[
  { char: 'あ', furigana: null },
  { char: 'あ', furigana: null },
  { char: '、', furigana: null },
  { char: '妹', furigana: 'いもうと' },
  { char: 'と', furigana: null },
  { char: '会', furigana: 'あ' },
  { char: 'い', furigana: null },
  { char: 'た', furigana: null },
  { char: 'い', furigana: null },
  { char: 'ん', furigana: null },
  { char: 'で', furigana: null },
  { char: 'す', furigana: null },
  { char: '！', furigana: null }
]
*/
