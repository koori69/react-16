import * as React from 'react';

interface Props {
  context?: string
  key?: string
  children?: React.ReactNode
  ref?: React.RefObject<any>
}

const Label: React.FunctionComponent<Props> = props => (
  <label key={props.key}>
    {props.children}-context:{props.context}
  </label>
)
Label.defaultProps = {
  context: 'default context'
}
export default Label
