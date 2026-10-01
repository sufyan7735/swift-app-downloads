import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import { buildSld } from "@/lib/sld-engine";
import { cableCalcs } from "@/lib/sld-annotations";
import { SldSvg } from "@/components/sld-diagram";
import fs from "fs";

const cases: Record<string, any> = {
  i20t52: { panel_w: 720, panel_qty: 52, strings: 4, per_string: 13, inverter: "Deye 20kW", inv_kw: 20, inv_qty: 1, phase3: true, bat_kwh: 16.076, bat_qty: 4, bat_vdc: 51.2, quote_items: {} },
  big125x6: { panel_w: 720, panel_qty: 1020, strings: 60, per_string: 17, inverter: "Solis 125kW", inv_kw: 125, inv_qty: 6, phase3: true, bat_kwh: 35.5, bat_qty: 12, bat_vdc: 512, quote_items: {} },
};
for (const [name, p] of Object.entries(cases)) {
  const m = buildSld(p);
  if (!m) { console.log(name, "NULL MODEL"); continue; }
  for (const real of [true, false]) {
    const svg = renderToStaticMarkup(React.createElement(SldSvg, { m, calcs: cableCalcs(m), theme: "blueprint", anim: false, real } as any));
    fs.writeFileSync(`/tmp/sldcheck/${name}-${real ? "photo" : "schem"}.html`, `<html><body style="margin:0">${svg}</body></html>`);
  }
  console.log(name, "ok");
}
