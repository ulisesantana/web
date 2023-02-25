import React from 'react';
import ReactDOM from 'react-dom/client';
import { JavaScriptRepl } from './JavaScriptRepl';
import reactToWebComponent from "react-to-webcomponent"

const WebJavaScriptRepl = reactToWebComponent(
  JavaScriptRepl,
  React,
  ReactDOM,
  { dashStyleAttributes: true }
)

customElements.define("js-repl", WebJavaScriptRepl)


