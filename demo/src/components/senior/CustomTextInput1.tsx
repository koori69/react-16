import * as React from 'react';

export default class CustomTextInput extends React.Component {
  private textInput: HTMLInputElement
  private setTextRef = (element: HTMLInputElement) => {
    this.textInput = element
  }
  private focusTextInput = () => {
    this.textInput.focus()
  }

  public render() {
    return (
      <div>
        <input type='text' ref={this.setTextRef} />
        <input
          type='button'
          value='Focus the text input'
          onClick={this.focusTextInput}
        />
      </div>
    )
  }
}
