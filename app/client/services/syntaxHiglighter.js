import { sanitize } from 'dompurify';

const replaceChars = { '<': 'lt', '>': 'gt' };
const htmlSafe = text => text.replace(/[<>]/g, chr => `&${replaceChars[chr]};`);

// Rules
const rules = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g;

export const higlightSyntax = (code) => {
  const syntax = htmlSafe(code)
    .replace(rules, (match) => {
      let cls = 'sh-number';

      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'sh-key';
        } else {
          cls = 'sh-string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'sh-bool';
      } else if (/null/.test(match)) {
        cls = 'sh-null';
      }

      return `<span class="${cls}">${match}</span>`;
    });

  return {
    __html: sanitize(syntax),
  };
};
