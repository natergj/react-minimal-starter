"Classes are hard"

React.useState
  local state management
  initial state can be function

React.useEffect
  run effects on prop or state changes
  return value of useEffect to cleanup before unmount

React.useLayoutEffect
  synchronous React.useEffect
  useful to mock React.useEffect with React.useLayoutEffect in tests

React.useContext
  get a context object
  useful for things like themes or global state

React.useReducer
  React.useState for complex state objects

React.useMemo
  memoized return values
  good for computationaly intensive tasks

React.useCallback
  different syntax for React.useMemo

React.useRef
  equivalent to React.createRef
  can be used for more than just html elements

React.useDebugValue
  adds label in React DevTools for state items

React.useImperativeHandle
  customizes instance values exposed to parent items via ref

Rules of hooks: https://reactjs.org/docs/hooks-rules.html
  Hook placement
    Hook declaration can only exist at root of component; no conditional hooks.
  React expects hooks to be called in same order on each render; no condition hooks

re-useable hooks do not share state they are their own instance

`getSnapshotBeforeUpdate` and `componentDidCatch` are not implemented

reference: https://reactjs.org/docs/hooks-intro.html