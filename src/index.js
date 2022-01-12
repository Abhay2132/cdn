const exp = require("express"),
	app = exp(),
	pj = require("path").join,
	acss = require (pj(__dirname, "mods", "acss.js")),
	cors = require ("cors")

app.use(cors())
app.use(exp.static(pj(__dirname, "static", "public")))
acss.init()
app.locals.port = process.env.PORT || 9000
app.get("*", (req, res, next) => {
	console.log(req.method, req.url)
	next();
})

app.get("/", (req, res) => {
	res.sendFile(pj(__dirname, "static", "views", "index.htm"))
})

app.listen(app.locals.port , () => console.log("Server started at", app.locals.port))