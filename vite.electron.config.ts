// إعداد بناء مخصّص لنسخة سطح المكتب (ويندوز) عبر Electron.
// يبني خادم Node محليًا داخل التطبيق (nitro preset: node-server) بدل هدف السحابة،
// فيعمل التطبيق بالكامل من ملفاته المحلية دون إنترنت.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: {
    preset: "node-server",
    output: {
      dir: ".output-electron",
    },
  },
  buildExitWatchdog: { graceMs: 120000 },
});
