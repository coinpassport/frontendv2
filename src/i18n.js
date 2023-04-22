const LANG_LOCALSTORAGE_KEY = 'client_lang';

const lang = {
  en: { English: 'English' },
  es: {
    English: 'Espa\u00F1ol',
    uri: 'lang/es.json'
  },
  fr: {
    English: 'Français',
    uri: 'lang/fr.json'
  },
  de: {
    English: 'Deutsch',
    uri: 'lang/de.json'
  },
  jp: {
    English: '日本語',
    uri: 'lang/jp.json'
  }
};

export async function setLanguage(langKey) {
  if(langKey) {
    if(!(langKey in lang)) return;
    localStorage[LANG_LOCALSTORAGE_KEY] = langKey;
  } else {
    langKey = localStorage[LANG_LOCALSTORAGE_KEY] || 'en';
  }
  if('uri' in lang[langKey]) {
    const resp = await fetch(lang[langKey].uri);
    const data = await resp.json();
    lang[langKey] = data;
  }
}

export function __(literalSections, ...substs) {
  const litEng = literalSections.raw.join('xxx');
  const langKey = localStorage[LANG_LOCALSTORAGE_KEY];
  let lit;

  // Use english version if not found in selected language
  if(!(langKey in lang && litEng in lang[langKey]))
    lit = literalSections.raw;
  else lit = lang[langKey][litEng].split('xxx');

  return lit.map((piece, i) =>
    piece + (substs.length > i ? substs[i] : '')).join('');
}

