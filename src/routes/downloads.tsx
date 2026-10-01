import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";

export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title: "تحميل تطبيق ACTES لويندوز" },
      {
        name: "description",
        content:
          "تحميل تطبيق ACTES Desktop لنظام ويندوز — يعمل بالكامل دون اتصال بالإنترنت، مع كل الفيديوهات والكتالوجات.",
      },
      { property: "og:title", content: "تحميل تطبيق ACTES لويندوز" },
      {
        property: "og:description",
        content:
          "تطبيق سطح مكتب يعمل دون إنترنت: الفيديوهات والصور والكتالوجات مضمّنة بالكامل.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DownloadsPage,
});

type Status = "idle" | "downloading" | "done" | "error";

function fmtMB(bytes: number) {
  return (bytes / 1024 / 1024).toFixed(0);
}

function DownloadsPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [received, setReceived] = useState(0);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  const start = useCallback(async () => {
    setStatus("downloading");
    setReceived(0);
    setError("");
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      const manifestRes = await fetch("/downloads/manifest.json", {
        signal: ctrl.signal,
      });
      if (!manifestRes.ok) throw new Error("تعذّر قراءة بيانات التحميل");
      const manifest = (await manifestRes.json()) as {
        name: string;
        size: number;
        partSize: number;
        parts: number;
        prefix: string;
      };

      // Preferred path: stream straight to disk (no memory pressure).
      let writable: FileSystemWritableFileStream | null = null;
      const picker = (
        window as unknown as {
          showSaveFilePicker?: (opts: unknown) => Promise<FileSystemFileHandle>;
        }
      ).showSaveFilePicker;
      if (picker) {
        const handle = await picker({
          suggestedName: manifest.name,
          types: [
            {
              description: "ZIP",
              accept: { "application/zip": [".zip"] },
            },
          ],
        });
        writable = await handle.createWritable();
      }
      const blobs: ArrayBuffer[] = [];

      const partName = (i: number) =>
        `${manifest.prefix}${String(i).padStart(3, "0")}`;

      for (let i = 0; i < manifest.parts; i++) {
        if (ctrl.signal.aborted) throw new DOMException("", "AbortError");
        let res = await fetch(partName(i), { signal: ctrl.signal });
        if (!res.ok) {
          // one retry per part
          res = await fetch(partName(i), { signal: ctrl.signal });
        }
        if (!res.ok || !res.body)
          throw new Error(`فشل تحميل الجزء ${i + 1} من ${manifest.parts}`);
        const reader = res.body.getReader();
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          if (writable) await writable.write(value);
          else blobs.push(value.slice().buffer as ArrayBuffer);
          setReceived((r) => r + value.byteLength);
        }
      }

      if (ctrl.signal.aborted) throw new DOMException("", "AbortError");

      if (writable) {
        await writable.close();
      } else {
        const blob = new Blob(blobs, { type: "application/zip" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = manifest.name;
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 60_000);
      }
      setStatus("done");
    } catch (e) {
      if ((e as Error).name === "AbortError") {
        setStatus("idle");
        setReceived(0);
      } else {
        setError((e as Error).message || "حدث خطأ أثناء التحميل");
        setStatus("error");
      }
    }
  }, []);

  const cancel = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const pct = Math.min(100, Math.round((received / 747842769) * 100));

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-background text-foreground flex items-center justify-center p-6"
    >
      <div className="w-full max-w-xl bg-card border border-border rounded-3xl p-8 sm:p-10 shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <img
            src="/brand/app-icon.png"
            alt="ACTES"
            className="w-16 h-16 rounded-2xl"
          />
          <div>
            <h1 className="text-2xl font-bold">تطبيق ACTES لويندوز</h1>
            <p className="text-sm text-muted-foreground mt-1">
              نسخة سطح المكتب — 64 بت
            </p>
          </div>
        </div>

        <ul className="space-y-2 text-sm text-muted-foreground mb-8">
          <li>• يعمل بالكامل دون اتصال بالإنترنت — لا يحتاج تثبيت.</li>
          <li>• كل الفيديوهات والصور والكتالوجات والخطوط مضمّنة داخله.</li>
          <li>• الحجم الإجمالي: 713 ميغابايت (77 جزءًا تُدمج تلقائيًا).</li>
        </ul>

        {status === "idle" && (
          <button
            onClick={start}
            className="w-full rounded-xl bg-energy text-white font-bold py-4 text-lg hover:opacity-90 transition"
          >
            تحميل التطبيق
          </button>
        )}

        {status === "downloading" && (
          <div>
            <div className="h-3 rounded-full bg-muted overflow-hidden mb-3">
              <div
                className="h-full bg-energy transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
              <span>
                {fmtMB(received)} / 713 ميغابايت ({pct}%)
              </span>
              <span>لا تغلق الصفحة…</span>
            </div>
            <button
              onClick={cancel}
              className="w-full rounded-xl border border-border py-3 font-semibold hover:bg-muted/40 transition"
            >
              إلغاء
            </button>
          </div>
        )}

        {status === "done" && (
          <div className="text-center py-4">
            <div className="text-3xl mb-2">✅</div>
            <p className="font-bold text-lg mb-1">تم التحميل بنجاح</p>
            <p className="text-sm text-muted-foreground mb-4">
              فُكّ ضغط الملف ثم شغّل <span className="font-mono">ACTES.exe</span>
            </p>
            <button
              onClick={() => {
                setStatus("idle");
                setReceived(0);
              }}
              className="rounded-xl border border-border px-6 py-2.5 font-semibold hover:bg-muted/40 transition"
            >
              تحميل مرة أخرى
            </button>
          </div>
        )}

        {status === "error" && (
          <div className="text-center">
            <p className="text-red-500 font-semibold mb-4">{error}</p>
            <button
              onClick={start}
              className="rounded-xl bg-energy text-white px-6 py-2.5 font-bold hover:opacity-90 transition"
            >
              إعادة المحاولة
            </button>
          </div>
        )}

        <p className="text-xs text-muted-foreground mt-6 leading-relaxed">
          ملاحظة: يفضل استخدام متصفح Chrome أو Edge. عند أول ضغطة على زر
          التحميل سيطلب المتصفح مكان حفظ الملف، ثم تُدمج الأجزاء تلقائيًا في ملف
          واحد.
        </p>
      </div>
    </main>
  );
}
