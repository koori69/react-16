import * as React from 'react';

interface State {
  x: number
  y: number
}

interface Props {
  render: (state: State) => any
  children?: React.ReactNode
}
export default class Mouse extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = { x: 0, y: 0 }
  }

  private handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // console.log('mouse:', e)
    this.setState({ x: e.clientX, y: e.clientY })
  }

  public render() {
    return (
      <div
        style={{ height: '100%', width: '100%', background: '#F596AA' }}
        onMouseMove={this.handleMouseMove}
      >
        {this.props.render(this.state)}
        {this.props.children}
      </div>
    )
  }
}
