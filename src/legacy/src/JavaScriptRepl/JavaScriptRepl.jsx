import React, {useState, useEffect} from "react"
import Repl from "./JavaScriptRepl.view"
import prettyFormat from "pretty-format"
import PropTypes from "prop-types"

// Forked from https://github.com/seveibar/react-repl
function generateREPL() {
  function replEval(script) {
    const parsedScript = script
      .trim()
      .replace(/^var /, "")
      .replace(/^let /, "")
      .replace(/^const /, "")
    return new Function(`return (${parsedScript})`)()
  }

  function execAndGetLine(execLine){
    if (!execLine.trim()) {
      return {type: "output", value: 'Nothing to process. Empty command received.'}
    }
    try {
      const evalOutput = replEval(execLine)
      return {type: "output", value: prettyFormat(evalOutput)}
    } catch (e) {
      return {type: "error", value: e instanceof Error ? e.toString() : `Unknown error: ${e}`}
    }
  }

  function loadScope(expressions) {
    expressions.map(replEval)
  }

  function generateLinesFromStrings(expressions) {
    const lines = []
    for (const execLine of expressions) {
      lines.push({type: 'input', value: execLine})
      lines.push(execAndGetLine(execLine))
    }
    return lines
  }

  return {
    execAndGetLine,
    generateLinesFromStrings,
    loadScope
  }
}

export const JavaScriptRepl = ({
 title = 'REPL',
 loadToScope = [],
 init = [],
 height
}) => {
  init = typeof init === 'string' ? eval(init) : init
  loadToScope = typeof loadToScope === 'string' ? eval(loadToScope) : loadToScope
  const repl = generateREPL()
  const initializeLines = () => {
    repl.loadScope(loadToScope)
    return repl.generateLinesFromStrings(init)
  }
  const [lines, setLines] = useState(initializeLines())
  const onClear = () => setLines(initializeLines())
  const onSubmit = async (execLine) => {
    if (execLine.trim()) {
      repl.generateLinesFromStrings(loadToScope)
      setLines(
        lines
          .concat([{type: "input", value: execLine}])
          .concat([repl.execAndGetLine(execLine)])
      )
    }
  }

  useEffect(() => {
    (initializeLines)()
  }, [])
  return (
    <Repl
      title={title}
      onSubmit={onSubmit}
      height={init?.length > 0 ? 'auto' : height ?? 300}
      lines={lines}
      onClear={onClear}
    />
  )
}

JavaScriptRepl.propTypes = {
    /**
     * Title showed at the terminal top right corner
     * @default REPL
     */
    title: PropTypes.string.isRequired,
    /**
     * Initial commands
     * @default []
     */
    init: PropTypes.arrayOf(PropTypes.string),
    /**
     * Loads functions or variables to the scope without showing it on the REPL
     * @default []
     */
    loadToScope: PropTypes.arrayOf(PropTypes.string),
    /**
     * Terminal height in pixels
     * @default 300
     */
    height: PropTypes.number
}

export default JavaScriptRepl
