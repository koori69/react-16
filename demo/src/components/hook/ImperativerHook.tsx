import React, {
    forwardRef, ReactNode, RefForwardingComponent, useImperativeHandle, useRef
} from 'react';

interface Handlers {
  focus(): void
}
interface Props {
  children?: ReactNode
}
const FancyButton: RefForwardingComponent<Handlers, Props> = (props, ref) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  useImperativeHandle(ref, () => ({
    focus: () => {
      buttonRef.current!.focus()
    }
  }))
  return <button ref={buttonRef}>{props.children}</button>
}

export default forwardRef(FancyButton)
