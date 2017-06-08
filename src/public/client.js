import * as React    from "react"
import * as ReactDOM from "react-dom"


import auth0 from 'auth0-js'

const webAuth =
  new auth0.WebAuth(
    { domain: 'example.auth0.com'
    , clientID: ''
    , redirectUri: 'http://localhost:3000'
    , audience: 'https://example.auth0.com/userinfo'
    , responseType: 'token id_token'
    , scope: 'openid'
    }
  )




ReactDOM.render( <div>Welcome!{ console.log( 'hello' ) }</div>, document.getElementById("app-view") )
