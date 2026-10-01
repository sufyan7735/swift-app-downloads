import { r as __toESM } from "../_runtime.mjs";
import { _ as createFileRoute, b as useRouter, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRouteWithContext, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as stringType, i as objectType, n as enumType } from "../_libs/zod.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { l as applyWaqf, n as ClickSoundRuntime, p as diacritizeNumberWords, r as LanguageRuntime } from "./click-sound-D3DEea4k.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CJIuq8Ef.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-C3ujuwIh.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset?.();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$3 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "ACTES — حلول الطاقة" },
			{
				name: "description",
				content: "منصة أكتس لحلول أنظمة الطاقة الشمسية."
			},
			{
				name: "author",
				content: "ACTES"
			},
			{
				property: "og:title",
				content: "ACTES — حلول الطاقة"
			},
			{
				property: "og:description",
				content: "منصة أكتس لحلول أنظمة الطاقة الشمسية."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "theme-color",
				content: "#e30613"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-title",
				content: "ACTES"
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "default"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "stylesheet",
				href: "/fonts/fonts.css"
			},
			{
				rel: "icon",
				href: "/favicon.png",
				type: "image/png"
			},
			{
				rel: "manifest",
				href: "/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/apple-touch-icon.png"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "ar",
		dir: "rtl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$3.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageRuntime, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClickSoundRuntime, {})
		]
	});
}
var $$splitComponentImporter = () => import("./routes-C-LzWi8U.mjs");
var Route$2 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "ACTES — حلول أنظمة الطاقة الشمسية" },
		{
			name: "description",
			content: "منصة أكتس لتصميم منظومات الطاقة الشمسية وإعداد عروض الأسعار ودراسات الأداء والمخططات."
		},
		{
			property: "og:title",
			content: "ACTES — حلول أنظمة الطاقة الشمسية"
		},
		{
			property: "og:description",
			content: "صمّم منظومتك واحصل على عرض سعر ودراسة أداء ومخطط واضح."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var Body = objectType({
	text: stringType().min(1).max(900),
	lang: enumType([
		"ar",
		"en",
		"zh"
	]).default("ar")
});
var INSTRUCTIONS = {
	ar: "اقرأ النص العربي التالي بالفصحى بأسلوب معلق مؤسسي راقٍ لكبرى شركات الطاقة العالمية، نبرة رجالية دافئة ورخيمة وواثقة، فصاحة متقنة ومخارج حروف واضحة ومريحة للأذن. التزم بالتشكيل المكتوب على كل حرف حرفياً. قف على أواخر الكلمات بالسكون قبل علامات الترقيم وفي نهاية الجملة، ولا تُشبع الحركة الأخيرة أبداً. لا تترجم ولا تضف أي كلام:",
	en: "Say the following text in English only, in a warm, rich, confident corporate male narrator voice for a global energy company, with polished diction and natural pacing. Do not add anything else:",
	zh: "请用标准普通话以国际能源企业官方男声旁白的风格朗读以下文字，声音温暖浑厚、自信清晰，语速自然，不要添加任何其他内容："
};
var Route$1 = createFileRoute("/api/tts")({ server: { handlers: { POST: async ({ request }) => {
	const key = process.env["LOVABLE_API_KEY"];
	if (!key) return new Response("Missing key", { status: 500 });
	const parsed = Body.safeParse(await request.json().catch(() => null));
	if (!parsed.success) return new Response("Bad request", { status: 400 });
	const { lang } = parsed.data;
	const text = lang === "ar" ? applyWaqf(diacritizeNumberWords(parsed.data.text)) : parsed.data.text;
	const upstream = await fetch("https://ai.gateway.lovable.dev/v1/audio/speech", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${key}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			model: "google/gemini-3.1-flash-tts-preview",
			contents: [{
				role: "user",
				parts: [{ text: `${INSTRUCTIONS[lang]} ${text}` }]
			}],
			generationConfig: {
				responseModalities: ["AUDIO"],
				speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Enceladus" } } }
			},
			stream_format: "audio"
		})
	});
	if (!upstream.ok) return new Response(await upstream.text(), { status: upstream.status });
	return new Response(upstream.body, { headers: {
		"Content-Type": upstream.headers.get("Content-Type") || "audio/wav",
		"Cache-Control": "private, max-age=86400"
	} });
} } } });
async function getDb() {
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	return supabaseAdmin;
}
/**
* نقطة استقبال قرار الإدارة (تأكيد/إلغاء الفاتورة).
* POST/GET  /api/public/wa-invoice
* body/query: { action: "confirm" | "cancel", ref: "<orderId | quoteNumber | transferRef>" }
* أو: { buttonId: "invoice_confirm:<ref>" }
*/
var CONFIRM_CLIENT_MESSAGE = "تم تأكيد فاتورتك، وسيتواصل بك مسؤول المبيعات خلال لحظات.";
var REJECT_CLIENT_MESSAGE = "عذراً، رقم الحوالة أو رقم مرجع العملية غير صحيح. يرجى إعادة إدخال رقم الحوالة أو رقم مرجع العملية.";
var PAYMENT_KINDS = [
	"transfer",
	"payment_proof",
	"cod",
	"purchase_confirmed",
	"payment_resubmitted"
];
var schema = objectType({
	action: enumType(["confirm", "cancel"]).optional(),
	ref: stringType().max(120).optional(),
	orderId: stringType().max(120).optional(),
	buttonId: stringType().max(200).optional(),
	text: stringType().max(400).optional()
});
function parseIntent(input) {
	let action = input.action ?? null;
	let ref = input.ref || input.orderId || "";
	const button = input.buttonId || "";
	if (button.startsWith("invoice_confirm:")) {
		action = "confirm";
		ref = ref || button.slice(16);
	} else if (button.startsWith("invoice_cancel:")) {
		action = "cancel";
		ref = ref || button.slice(15);
	}
	if (!action && input.text) {
		const t = input.text;
		if (/تأكيد|تاكيد|confirm|✅/i.test(t)) action = "confirm";
		else if (/إلغاء|الغاء|cancel|رفض|❌/i.test(t)) action = "cancel";
		if (!ref) ref = (t.match(/(ord-[a-z0-9]+)/i)?.[1] ?? t.match(/\b(\d{4,})\b/)?.[1] ?? "").trim();
	}
	return {
		action,
		ref: ref.trim()
	};
}
function uid(prefix) {
	return `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}
async function handle(input) {
	const { action, ref } = parseIntent(input);
	if (!action) return Response.json({
		ok: false,
		error: "missing_action"
	}, { status: 400 });
	if (!ref) return Response.json({
		ok: false,
		error: "missing_ref"
	}, { status: 400 });
	const supabaseAdmin = await getDb();
	let order = null;
	const byId = await supabaseAdmin.from("orders").select("id, payload").eq("id", ref).maybeSingle();
	if (byId.data) order = byId.data.payload;
	if (!order) {
		const match = ((await supabaseAdmin.from("orders").select("id, payload").order("created_at", { ascending: false }).limit(300)).data ?? []).find((row) => row.payload?.["quoteNumber"] === ref || row.payload?.["transferRef"] === ref || String(row.payload?.["transferRef"] || "").replace(/\D/g, "") === ref.replace(/\D/g, ""));
		if (match) order = match.payload;
	}
	if (!order) return Response.json({
		ok: false,
		error: "order_not_found",
		ref
	}, { status: 404 });
	const now = Date.now();
	const status = action === "cancel" ? "cancelled" : order["method"] === "cod" ? "confirmed" : "payment_verified";
	const next = {
		...order,
		status,
		needsPaymentFix: action === "cancel",
		history: [...order["history"] ?? [], {
			status,
			at: now
		}]
	};
	await supabaseAdmin.from("orders").upsert({
		id: String(next["id"]),
		payload: next,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	});
	const notifRows = (await supabaseAdmin.from("notifications").select("id, payload").limit(1e3)).data ?? [];
	const related = notifRows.filter((row) => row.payload?.["orderId"] === next["id"] && row.payload?.["audience"] === "admin" && PAYMENT_KINDS.includes(String(row.payload?.["kind"])));
	if (related.length) await supabaseAdmin.from("notifications").upsert(related.map((row) => ({
		id: row.id,
		payload: {
			...row.payload,
			state: action === "confirm" ? "confirmed" : "cancelled"
		},
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	})));
	const kind = action === "confirm" ? "purchase_confirmed" : "invoice_rejected";
	const label = action === "confirm" ? "شراء مؤكد" : "إلغاء الفاتورة";
	if (!(action === "confirm" && notifRows.some((row) => row.payload?.["orderId"] === next["id"] && row.payload?.["audience"] === "client" && row.payload?.["kind"] === "purchase_confirmed"))) {
		const clientNotif = {
			id: uid("n"),
			audience: "client",
			kind,
			orderId: next["id"],
			title: `${label} — ${next["quoteNumber"] || next["id"]}`,
			body: action === "confirm" ? CONFIRM_CLIENT_MESSAGE : REJECT_CLIENT_MESSAGE,
			state: "sent",
			createdAt: now
		};
		await supabaseAdmin.from("notifications").upsert({
			id: clientNotif.id,
			payload: clientNotif,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		});
	}
	const adminNotif = {
		id: uid("n"),
		audience: "admin",
		kind: action === "confirm" ? "purchase_confirmed" : "invoice_rejected",
		orderId: next["id"],
		title: `${action === "confirm" ? "تم تأكيد فاتورة" : "تم إلغاء فاتورة"} — ${next["quoteNumber"] || next["id"]}`,
		body: action === "confirm" ? "تم تأكيد الفاتورة وإشعار العميل داخل التطبيق." : "تم إلغاء الفاتورة وطُلب من العميل إعادة إدخال رقم الحوالة.",
		state: action === "confirm" ? "confirmed" : "cancelled",
		createdAt: now
	};
	await supabaseAdmin.from("notifications").upsert({
		id: adminNotif.id,
		payload: adminNotif,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	});
	return Response.json({
		ok: true,
		action,
		orderId: next["id"],
		status
	});
}
var Route = createFileRoute("/api/public/wa-invoice")({ server: { handlers: {
	GET: async ({ request }) => {
		const url = new URL(request.url);
		return handle(schema.parse(Object.fromEntries(url.searchParams.entries())));
	},
	POST: async ({ request }) => {
		let raw = {};
		try {
			raw = await request.json();
		} catch {
			raw = {};
		}
		const parsed = schema.safeParse(raw);
		if (!parsed.success) return Response.json({
			ok: false,
			error: "bad_input"
		}, { status: 400 });
		return handle(parsed.data);
	},
	OPTIONS: async () => new Response(null, { status: 204 })
} } });
var rootRouteChildren = {
	IndexRoute: Route$2.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$3
	}),
	ApiTtsRoute: Route$1.update({
		id: "/api/tts",
		path: "/api/tts",
		getParentRoute: () => Route$3
	}),
	ApiPublicWaInvoiceRoute: Route.update({
		id: "/api/public/wa-invoice",
		path: "/api/public/wa-invoice",
		getParentRoute: () => Route$3
	})
};
var routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
