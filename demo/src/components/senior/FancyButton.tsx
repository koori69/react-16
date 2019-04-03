import * as React from 'react';

// const FancyButton: React.FunctionComponent = ({ children }) => (
//   <button>{children}</button>
// )

interface Props {
  children?: React.ReactNode
}

const FancyButton = React.forwardRef(
  (props: Props, ref: React.RefObject<HTMLButtonElement>) => (
    <button ref={ref}>{props.children}</button>
  )
)
export default FancyButton
