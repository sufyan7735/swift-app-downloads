import { l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { t as createServerRpc } from "./createServerRpc-CxD4EZ5P.mjs";
import { createHash, timingSafeEqual } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/store.functions-D-wJmEln.js
function matches(input, expected) {
	const a = createHash("sha256").update(input, "utf8").digest();
	const b = createHash("sha256").update(expected, "utf8").digest();
	return timingSafeEqual(a, b);
}
function checkAdmin(password) {
	const expected = process.env["ADMIN_PASSWORD"];
	if (!expected || !password || !matches(password, expected)) throw new Error("Unauthorized");
}
async function db() {
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	return supabaseAdmin;
}
var nowIso = () => (/* @__PURE__ */ new Date()).toISOString();
/** الإدارة: جلب كل الطلبات والإشعارات. */
var adminPullStore_createServerFn_handler = createServerRpc({
	id: "b915ed3b735fd4ffa3da18643efadf5687851a8804c9afb3084d1664c9f58ff5",
	name: "adminPullStore",
	filename: "src/lib/store.functions.ts"
}, (opts) => adminPullStore.__executeServer(opts));
var adminPullStore = createServerFn({ method: "POST" }).inputValidator((data) => ({ password: String(data?.password ?? "") })).handler(adminPullStore_createServerFn_handler, async ({ data }) => {
	checkAdmin(data.password);
	const supabase = await db();
	const [ordersRes, notifsRes] = await Promise.all([supabase.from("orders").select("id, payload").limit(2e3), supabase.from("notifications").select("id, payload").limit(5e3)]);
	if (ordersRes.error) throw new Error(ordersRes.error.message);
	if (notifsRes.error) throw new Error(notifsRes.error.message);
	return {
		orders: (ordersRes.data ?? []).map((row) => row.payload),
		notifs: (notifsRes.data ?? []).map((row) => row.payload)
	};
});
var adminPushStore_createServerFn_handler = createServerRpc({
	id: "2d207b844a9c57001719652c2c6981c59691e29b4dfcda0c1a081dbc3f12292f",
	name: "adminPushStore",
	filename: "src/lib/store.functions.ts"
}, (opts) => adminPushStore.__executeServer(opts));
var adminPushStore = createServerFn({ method: "POST" }).inputValidator((data) => ({
	password: String(data?.password ?? ""),
	orders: Array.isArray(data?.orders) ? data.orders.slice(0, 2e3) : [],
	notifs: Array.isArray(data?.notifs) ? data.notifs.slice(0, 5e3) : []
})).handler(adminPushStore_createServerFn_handler, async ({ data }) => {
	checkAdmin(data.password);
	const supabase = await db();
	if (data.orders.length) {
		const res = await supabase.from("orders").upsert(data.orders.map((order) => ({
			id: String(order["id"]),
			payload: order,
			updated_at: nowIso()
		})));
		if (res.error) throw new Error(res.error.message);
	}
	if (data.notifs.length) {
		const res = await supabase.from("notifications").upsert(data.notifs.map((item) => ({
			id: String(item["id"]),
			payload: item,
			updated_at: nowIso()
		})));
		if (res.error) throw new Error(res.error.message);
	}
	return { ok: true };
});
var pushClientOrder_createServerFn_handler = createServerRpc({
	id: "b2e10a134ede1d6479a51018d504c0f33bf9615b8ca8204e8ee8e32643f34fc4",
	name: "pushClientOrder",
	filename: "src/lib/store.functions.ts"
}, (opts) => pushClientOrder.__executeServer(opts));
var pushClientOrder = createServerFn({ method: "POST" }).inputValidator((data) => ({
	order: data?.order ?? {},
	notifs: Array.isArray(data?.notifs) ? data.notifs.slice(0, 200) : []
})).handler(pushClientOrder_createServerFn_handler, async ({ data }) => {
	const order = data.order;
	const id = String(order["id"] ?? "");
	const token = String(order["accessToken"] ?? "");
	if (!id || !token) return {
		ok: false,
		error: "missing_fields"
	};
	const supabase = await db();
	const existing = await supabase.from("orders").select("payload").eq("id", id).maybeSingle();
	if (existing.error) throw new Error(existing.error.message);
	if (existing.data) {
		const storedToken = String(existing.data.payload?.["accessToken"] ?? "");
		if (!storedToken || storedToken !== token) return {
			ok: false,
			error: "forbidden"
		};
	}
	const up = await supabase.from("orders").upsert({
		id,
		payload: order,
		updated_at: nowIso()
	});
	if (up.error) throw new Error(up.error.message);
	const ownNotifs = data.notifs.filter((item) => String(item?.["orderId"] ?? "") === id && item?.["id"]);
	if (ownNotifs.length) {
		const res = await supabase.from("notifications").upsert(ownNotifs.map((item) => ({
			id: String(item["id"]),
			payload: item,
			updated_at: nowIso()
		})));
		if (res.error) throw new Error(res.error.message);
	}
	return { ok: true };
});
var pullClientOrders_createServerFn_handler = createServerRpc({
	id: "6a18dcdeddb7c633411bc6912f5f03b560db2c52977d2e41de5a4e1158958fc6",
	name: "pullClientOrders",
	filename: "src/lib/store.functions.ts"
}, (opts) => pullClientOrders.__executeServer(opts));
var pullClientOrders = createServerFn({ method: "POST" }).inputValidator((data) => ({
	items: Array.isArray(data?.items) ? data.items.slice(0, 100).map((item) => ({
		id: String(item?.id ?? ""),
		token: String(item?.token ?? "")
	})) : [],
	phone: String(data?.phone ?? "").trim()
})).handler(pullClientOrders_createServerFn_handler, async ({ data }) => {
	const supabase = await db();
	const byId = /* @__PURE__ */ new Map();
	if (data.phone) {
		const phoneRes = await supabase.from("orders").select("id, payload").eq("payload->>clientPhone", data.phone).limit(500);
		if (phoneRes.error) throw new Error(phoneRes.error.message);
		(phoneRes.data ?? []).forEach((row) => byId.set(String(row.id), row.payload));
	}
	const items = data.items.filter((item) => item.id && item.token);
	if (items.length) {
		const ordersRes = await supabase.from("orders").select("id, payload").in("id", items.map((item) => item.id));
		if (ordersRes.error) throw new Error(ordersRes.error.message);
		const tokenById = new Map(items.map((item) => [item.id, item.token]));
		(ordersRes.data ?? []).forEach((row) => {
			const stored = String(row.payload?.["accessToken"] ?? "");
			if (stored && stored === tokenById.get(row.id)) byId.set(String(row.id), row.payload);
		});
	}
	if (!byId.size) return {
		orders: [],
		notifs: []
	};
	const orders = Array.from(byId.values());
	const orderIds = new Set(orders.map((order) => String(order["id"])));
	const notifsRes = await supabase.from("notifications").select("id, payload").limit(5e3);
	if (notifsRes.error) throw new Error(notifsRes.error.message);
	return {
		orders,
		notifs: (notifsRes.data ?? []).map((row) => row.payload).filter((payload) => orderIds.has(String(payload?.["orderId"] ?? "")))
	};
});
//#endregion
export { adminPullStore_createServerFn_handler, adminPushStore_createServerFn_handler, pullClientOrders_createServerFn_handler, pushClientOrder_createServerFn_handler };
