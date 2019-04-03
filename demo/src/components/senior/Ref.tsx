import * as React from 'react';

export default class Ref extends React.Component {
  constructor(props: any) {
    super(props)
  }
  private divRef = React.createRef<HTMLDivElement>()
  public render() {
    return <div ref={this.divRef}>Ref Example</div>
  }
}
