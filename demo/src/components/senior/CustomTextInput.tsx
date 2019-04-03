import * as React from 'react';

export default class CustomTextInput extends React.Component {
  private textInput = React.createRef<HTMLInputElement>()
  private focusTextInput = () => {
    this.textInput.current!.focus()
  }

  public render() {
    return (
      <div>
        <input type='text' ref={this.textInput} />
        <input
          type='button'
          value='Focus the text input'
          onClick={this.focusTextInput}
        />
      </div>
    )
  }
}
