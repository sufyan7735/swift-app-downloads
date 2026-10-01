import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import { buildSld } from "@/lib/sld-engine";
import { cableCalcs } from "@/lib/sld-annotations";
import { SldSvg } from "@/components/sld-diagram";
import fs from "fs";

const cases: Record<string, any> = {
  i20t52: { panel: { model: "STP720S", wp: 720, voc: 46, vmp: 38, imp: 18, isc: 19 }, inv: { model: "Deye SUN-20K", kwac: 20, vbat: 51.2 }, bat: { model: "UF5000", kwh: 16.076 }, nStr: 4, perStr: 13, nPan: 52, nInv: 1, nBat: 4, phase3: true, mpptPerInv: 2, sysLabel: "Commercial Hybrid" },
  big125x6: { panel: { model: "STP720S", wp: 720, voc: 46, vmp: 38, imp: 18, isc: 19 }, inv: { model: "Solis S6-125K", kwac: 125, vbat: 512 }, bat: { model: "Optimus", kwh: 35.5 }, nStr: 60, perStr: 17, nPan: 1020, nInv: 6, nBat: 12, phase3: true, mpptPerInv: 10, sysLabel: "Industrial" },
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
