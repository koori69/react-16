import * as React from 'react';

import Button from './Button';
import Label from './Label';

export default class Condition extends React.Component {
  constructor(props: any) {
    super(props)
  }
  private isButton = true
  private buttonClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e)
  }
  public render() {
    let button: React.ReactNode
    if (this.isButton) {
      button = <Button onClick={this.buttonClick}>Condition Component</Button>
    } else {
      button = <Label>Condition Component</Label>
    }
    return (
      <div>
        {button}
        <br />
        {this.isButton && (
          <Button onClick={this.buttonClick}>Condition Component</Button>
        )}
        {this.isButton ? (
          <Button onClick={this.buttonClick}>Condition Component</Button>
        ) : (
          <Label>Condition Component</Label>
        )}
      </div>
    )
  }
}
