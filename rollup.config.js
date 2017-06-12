import babel       from "rollup-plugin-babel"
import builtins    from "rollup-plugin-node-builtins"
import commonjs    from "rollup-plugin-commonjs"
import nodeResolve from "rollup-plugin-node-resolve"
import nodeGlobals from "rollup-plugin-node-globals"
import replace     from "rollup-plugin-replace"
import json        from "rollup-plugin-json"

// NOTE: I have commented out a few lines in this file.
// I added those lines while trying to address several errors but wanted to disable them in case they were
// interfering with the build process in an unwanted manner.

export default {
  plugins: [
    replace({
      "global.setTimeout": "window.setTimeout",
      "global.clearTimeout": "window.clearTimeout",
      "global.performance": "window.performance",
      "process.env.NODE_ENV": JSON.stringify( process.env.NODE_ENV )
    } ),
    replace( {
      include: '**/node_modules/formidable/lib/**',
      values: { 'global.GENTLY': 'false'
              } // added for formidable (auth0 / superagent dependency)
    } ),
    json(), // this plugin was added for auth0-js
    builtins(),
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
        ]
      }
    }),
    babel(),
    nodeGlobals() // added for superagent (auth0 dependency)
  ].filter(x => x)
}
