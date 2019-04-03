import * as React from 'react';

import { logProps } from '../../utils/log-props';

interface Props {
  onClick(e: React.MouseEvent<HTMLElement>): void
}

const Button: React.FunctionComponent<Props> = ({
  onClick: handleClick,
  children
}) => <button onClick={handleClick}>{children}</button>
// export default Button
export default logProps(Button)
