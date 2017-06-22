import babel       from "rollup-plugin-babel"
import commonjs    from "rollup-plugin-commonjs"
import nodeResolve from "rollup-plugin-node-resolve"
import nodeGlobals from "rollup-plugin-node-globals"
import json        from "rollup-plugin-json"

// NOTE: I have commented out a few lines in this file.
// I added those lines while trying to address several errors but wanted to disable them in case they were
// interfering with the build process in an unwanted manner.

export default {
  plugins: [
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
        ]
      }
    }),
    babel(),
    nodeGlobals() // added for superagent (auth0 dependency)
  ].filter(x => x)
}
