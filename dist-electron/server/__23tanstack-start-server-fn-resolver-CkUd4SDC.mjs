//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-CkUd4SDC.js
var manifest = {
	"1cec649a0df7c8e30c4169bb52ecc81c5a8848f789ea9920e0589d54e02cd688": {
		functionName: "notifyInvoiceDecision_createServerFn_handler",
		importer: () => import("./_ssr/notify.functions-2lCAqgFJ.mjs")
	},
	"2d207b844a9c57001719652c2c6981c59691e29b4dfcda0c1a081dbc3f12292f": {
		functionName: "adminPushStore_createServerFn_handler",
		importer: () => import("./_ssr/store.functions-D-wJmEln.mjs")
	},
	"64d9edb191fcc72a0f2036e0d7f8cab40791da1b07c4403a57bd93992139252f": {
		functionName: "verifyAdminPassword_createServerFn_handler",
		importer: () => import("./_ssr/admin.functions-Bm6Ap3HT.mjs")
	},
	"6a18dcdeddb7c633411bc6912f5f03b560db2c52977d2e41de5a4e1158958fc6": {
		functionName: "pullClientOrders_createServerFn_handler",
		importer: () => import("./_ssr/store.functions-D-wJmEln.mjs")
	},
	"b2e10a134ede1d6479a51018d504c0f33bf9615b8ca8204e8ee8e32643f34fc4": {
		functionName: "pushClientOrder_createServerFn_handler",
		importer: () => import("./_ssr/store.functions-D-wJmEln.mjs")
	},
	"b915ed3b735fd4ffa3da18643efadf5687851a8804c9afb3084d1664c9f58ff5": {
		functionName: "adminPullStore_createServerFn_handler",
		importer: () => import("./_ssr/store.functions-D-wJmEln.mjs")
	},
	"c9971c19a138a739e4526377fe48f72d69e538c59580c27607c86dbc8c549fc0": {
		functionName: "notifyAdminWhatsapp_createServerFn_handler",
		importer: () => import("./_ssr/notify.functions-2lCAqgFJ.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ??= await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
