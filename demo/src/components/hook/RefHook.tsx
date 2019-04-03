import * as React from 'react';

const RefHook: React.FunctionComponent = () => {
  const ref = React.useRef<HTMLInputElement>(null)
  const handleClick = () => {
    ref.current!.focus()
  }
  return (
    <>
      <input ref={ref} type='text' />
      <button onClick={handleClick}>Focus the input</button>
    </>
  )
}
export default RefHook
