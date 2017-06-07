import babel       from "rollup-plugin-babel"
import builtins    from "rollup-plugin-node-builtins"
import commonjs    from "rollup-plugin-commonjs"
import nodeResolve from "rollup-plugin-node-resolve"
import replace     from "rollup-plugin-replace"
import json        from "rollup-plugin-json"
import uglify      from "rollup-plugin-uglify"

export default {
  plugins: [
    replace({
      "global.setTimeout": "window.setTimeout",
      "global.clearTimeout": "window.clearTimeout",
      "global.performance": "window.performance",
      "process.env.NODE_ENV": JSON.stringify( process.env.NODE_ENV ),
      "global.GENTLY": "false" // this line is for auth0-js / formidable
    } ),
    replace( { // this replace was added for auth0-js / superagent
      include: '**/superagent/lib/request-base.js',
      values: { ' clearTimeout': ' window.clearTimeout' }
    } ),
    builtins(),
    json(), // this plugin was added for auth0-js
    nodeResolve(),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        "node_modules/react-dom/index.js": [
          "render",
        ],
        "node_modules/react/react.js": [
          "Component",
          "createElement"
        ],
        "node_modules/kefir/dist/kefir.js": [
          "Observable",
          "Property",
          "Stream",
          "combine",
          "concat",
          "constant",
          "constantError",
          "fromEvents",
          "interval",
          "later",
          "merge",
          "never",
          "stream"
        ]
      }
    }),
    babel(),
    process.env.NODE_ENV === "production" &&
      uglify()
  ].filter(x => x)
}
