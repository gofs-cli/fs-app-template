let sheets: undefined | CSSStyleSheet[];

export function getGlobalStyleSheets(): CSSStyleSheet[]{
  if (sheets === undefined){
    sheets = [];
    for(let i = 0; i < document.styleSheets.length; i++){
      const domSheet = document.styleSheets.item(i);
      const sheet = new CSSStyleSheet();
      let css = "";
      for(let j = 0; j < domSheet!.cssRules.length; j++){
        css += domSheet!.cssRules.item(j)!.cssText;
      }
      sheet.replaceSync(css);
      sheets.push(sheet);
    }
  }

  return sheets;
}