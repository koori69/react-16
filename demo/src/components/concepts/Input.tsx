import * as React from 'react';

import { withDefaultProps } from '../../utils/default-props';

// interface Props {
//   defaultValue?: string;
// }
const defaultProps = {
  defaultValue: 'test'
}

const initState = { value: '' }
type State = Readonly<typeof initState>

type DefaultProps = Readonly<typeof defaultProps>
type Props = { defaultValue?: string } & DefaultProps

class Input extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { value: '' }
  }

  private handleInput = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log(e.target.attributes.getNamedItem('id'))
    this.setState({ value: e.target.value })
  }

  public render() {
    return (
      <div>
        Input Component:
        <input
          id='react16'
          defaultValue={this.props.defaultValue}
          onInput={this.handleInput}
        />
        <label>{this.state.value}</label>
      </div>
    )
  }
}

export default withDefaultProps(defaultProps, Input)
