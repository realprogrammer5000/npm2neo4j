const rimraf = require("rimraf");
const rmrf = folder => new Promise((resolve, reject) => rimraf(folder, {}, err => err ? reject(err) : resolve()));
const fscache = require("./fscache.js");
const fetch = require("node-fetch");

const {AbortController} = require("abort-controller");

const controller = new AbortController();
const timeout = setTimeout(
	() => { controller.abort(); },
	150,
);


(async () => {

	// fetch("http://httpbin.org/delay/10", { signal: controller.signal })
	// 	.then(res => res.json())
	// 	.then(
	// 		data => {
	// 			useData(data)
	// 		},
	// 		err => {
	// 			if (err.name === "AbortError") {
	// 				// request was aborted
	// 			}
	// 		},
	// 	)
	// 	.finally(() => {
	// 		clearTimeout(timeout);
	// 	});


	await rmrf("cache");

	console.time("init");
	await fscache.init();
	console.timeEnd("init");

	console.time("write");
	await fscache.writeJSON("test", {hello: "world"});
	console.timeEnd("write");

	console.time("read");
	console.log(await fscache.readJSON("test"));
	console.timeEnd("read");

	console.time("first download");
	console.log("\n\n", await fscache.getModule("node-fetch"));
	console.timeEnd("first download");

	console.time("second download");
	console.log("\n\n", await fscache.getModule("node-fetch"));
	console.timeEnd("second download");

	console.time("third download");
	console.log("\n\n", await fscache.getModule("node-fetch"));
	console.timeEnd("third download");
})();
