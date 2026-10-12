/* Sprite pixel art do personagem, desenhado a partir de um mapa de caracteres.
   Cada letra é uma cor da paleta; "." é transparente. Trocar a paleta = trocar a "skin". */
(function () {
  "use strict";

  const MAP = [
    "................",
    ".....kkkkkk.....",
    "....khhhhhhk....",
    "...khhhhhhhhk...",
    "...khhhhhhhhhk..",
    "...khhsssshhk...",
    "...khsssssssk...",
    "...kssesssesk...",
    "...ksssmmsssk...",
    "....kssssssk....",
    "..kwwwwggwwwwk..",
    ".kwwwwwggwwwwwk.",
    ".kwdwwwggwwwdwk.",
    ".kwdwwwggwwwdwk.",
    ".kskwwwggwwwksk.",
    "..kkwwwwwwwwkk..",
    "...kppppppppk...",
    "...kpppkkpppk...",
    "...kppk..kppk...",
    "..kbbbk..kbbbk..",
    "..kkkkk..kkkkk..",
  ];

  const SKINS = {
    default: { k: "#0d0b1f", h: "#3b2a1e", s: "#e8b48a", e: "#14112b", m: "#b5654a", w: "#7b5cff", d: "#5a3fd6", g: "#f6c453", p: "#2e2660", b: "#f4ecd8" },
    // Skin dourada (desbloqueada por um segredo)
    gold: { k: "#3a2600", h: "#8a5a00", s: "#ffe7a3", e: "#3a2600", m: "#c98a00", w: "#f6c453", d: "#c98a00", g: "#fff4cc", p: "#b07800", b: "#fff4cc" },
  };

  // Junta pixels vizinhos da mesma cor numa linha só, para o SVG ficar leve
  function rects(map, palette) {
    let out = "";
    map.forEach((row, y) => {
      let x = 0;
      while (x < row.length) {
        const c = row[x];
        let w = 1;
        while (row[x + w] === c) w++;
        if (c !== "." && palette[c]) {
          out += `<rect x="${x}" y="${y}" width="${w}" height="1" fill="${palette[c]}"/>`;
        }
        x += w;
      }
    });
    return out;
  }

  function svg({ skin = "default", viewBox, className = "", title = "" } = {}) {
    const palette = SKINS[skin] || SKINS.default;
    const vb = viewBox || `0 0 ${MAP[0].length} ${MAP.length}`;
    const label = title ? `role="img" aria-label="${title}"` : `aria-hidden="true"`;
    return `<svg class="${className}" viewBox="${vb}" shape-rendering="crispEdges" ${label} xmlns="http://www.w3.org/2000/svg">${rects(MAP, palette)}</svg>`;
  }

  window.Sprite = {
    // Corpo inteiro
    full: (opts = {}) => svg(opts),
    // Só a cabeça (logo do HUD, favicon)
    head: (opts = {}) => svg({ ...opts, viewBox: "2 0 12 11" }),
    skins: Object.keys(SKINS),
  };
})();
