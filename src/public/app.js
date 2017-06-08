function web(app) {
  const isProd = process.env.NODE_ENV === "production"
  const bust = isProd ? `?ts=${new Date().getTime()}` : ""

  app.get("/*", (req, res) => {

    res.setHeader("X-UA-Compatible", "IE=edge")
    res.send(`<!DOCTYPE html>
<html lang="fi">
  <head>
    <link rel="icon" href="https://avatars1.githubusercontent.com/u/17234211">
    <link rel="stylesheet" href="/public/generated/bundle.css${bust}">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=EDGE">
  </head>
  <body>
    <div id="app-view">${isProd ? app : ""}</div>
    <script type="text/javascript" src="/public/generated/bundle.js${bust}" async></script>
  </body>
</html>`)
  })
}

export default app => {
  if (process.env.NODE_ENV !== "production") {
    app.get("/test", (req, res) => {
      res.send(JSON.stringify(req.query))
    })
  }

  web(app)
}
