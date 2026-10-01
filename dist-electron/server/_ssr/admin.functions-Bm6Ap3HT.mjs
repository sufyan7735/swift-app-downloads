import { l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { t as createServerRpc } from "./createServerRpc-CxD4EZ5P.mjs";
import { createHash, timingSafeEqual } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.functions-Bm6Ap3HT.js
function matches(input, expected) {
	const a = createHash("sha256").update(input, "utf8").digest();
	const b = createHash("sha256").update(expected, "utf8").digest();
	return timingSafeEqual(a, b);
}
var verifyAdminPassword_createServerFn_handler = createServerRpc({
	id: "64d9edb191fcc72a0f2036e0d7f8cab40791da1b07c4403a57bd93992139252f",
	name: "verifyAdminPassword",
	filename: "src/lib/admin.functions.ts"
}, (opts) => verifyAdminPassword.__executeServer(opts));
var verifyAdminPassword = createServerFn({ method: "POST" }).inputValidator((data) => ({ password: String(data?.password ?? "") })).handler(verifyAdminPassword_createServerFn_handler, async ({ data }) => {
	const expected = process.env["ADMIN_PASSWORD"];
	if (!expected) return { ok: false };
	if (!data.password) return { ok: false };
	return { ok: matches(data.password, expected) };
});
//#endregion
export { verifyAdminPassword_createServerFn_handler };
