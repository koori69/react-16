import * as React from 'react';

interface State {
  count: number
}

interface Action {
  type: string
}

interface Props {
  count: number
}
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      throw new Error()
  }
}

const init = (count: number): State => {
  return { count }
}

const ReducerHook: React.FunctionComponent<Props> = props => {
  const [state, dispatch] = React.useReducer(reducer, props.count, init)

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  )
}

export default ReducerHook
