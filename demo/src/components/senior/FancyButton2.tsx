import * as React from 'react';

export default class FancyButton2 extends React.Component<any> {
  public myRef = React.createRef<HTMLButtonElement>()

  public render() {
    const { label, onClick } = this.props
    return (
      <button ref={this.myRef} onClick={onClick}>
        {label}
      </button>
    )
  }
}
