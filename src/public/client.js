import * as React    from "react"
import * as ReactDOM from "react-dom"
import superagent    from "superagent/lib/client"

// This line throws an error in the browser when rollup-plugin-node-globals is called
// in rollup.config.js
superagent.get( 'http://example.com' ).end( ( ...x ) => console.log( ...x ) )

ReactDOM.render(
  <div>
    Welcome!
  </div>
  , document.getElementById( 'app-view' )
)
