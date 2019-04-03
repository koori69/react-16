import * as React from 'react';

interface State {
  x: number
  y: number
}

interface Props {
  mouse?: State
  children?: React.ReactNode
}

const Cat: React.FunctionComponent<Props> = (props: Props) => (
  <div
    style={{
      background: '#B5CAA0',
      position: 'absolute',
      color: 'white',
      left: props.mouse!.x + 10,
      top: props.mouse!.y + 10
    }}
  >
    Cat
  </div>
)

export default Cat
