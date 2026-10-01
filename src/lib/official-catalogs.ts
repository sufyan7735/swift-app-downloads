// الكتالوجات الرسمية الأصلية للمصنّع (بدون أي هوية لأكتس).
// النسخ متعددة الموديلات مُظلّل فيها قيم الموديل المعروض فقط، والعربية بنفس التنسيق مع إبقاء الرموز الفنية بالإنجليزية.
import type { Product } from "./products-data";

const HIGHLIGHTED = new Set([
  "deye-sun-14-20k-sg05lp3--16k", "deye-sun-14-20k-sg05lp3--20k", "deye-sun-29-9-50k-sg01hp3--30k",
  "deye-sun-29-9-50k-sg01hp3--50k", "deye-sun-3-6k-sg04lp1--6k-sm2", "deye-sun-60-80k-sg02hp3--80k",
  "deye-sun-7-6-12k-sg02lp1--12k", "deye-sun-7-6-12k-sg02lp1--8k", "solis-s6-eh2p-5-8k--6k",
  "solis-s6-eh2p-5-8k--8k", "solis-s6-eh3p-12-20k-h--12k", "solis-s6-eh3p-12-20k-h--20k",
  "solis-s6-eh3p-29-9-50k-h--30k", "solis-s6-eh3p-29-9-50k-h--50k", "solis-s6-eh3p-75-125k--125k",
  "solis-s6-eh3p-75-125k--80k", "suntech-stp595s-c72-nsh", "suntech-stp720s-d66-nsh",
]);

export function officialCatalogUrl(product: Product, lang: "en" | "ar"): string | null {
  const src = product.files.find((f) => f.kind === "Datasheet" || f.kind === "Catalog")?.url;
  if (!src) return null;
  const dir = lang === "en" ? "/catalogs/official" : "/catalogs/official-ar";
  if (HIGHLIGHTED.has(product.id)) return `${dir}/${product.id}.pdf`;
  if (lang === "en") return src;
  return `${dir}/${src.split("/").pop()}`;
}
