import * as React from 'react';

export function logProps(WrappedComponent: React.ComponentType<any>) {
  class LogProps extends React.Component<any> {
    public componentDidUpdate(prevProps: any) {
      console.log('old props:', prevProps)
      console.log('new props:', this.props)
    }

    public render() {
      return <WrappedComponent {...this.props} />
    }
  }
  return LogProps
}

export function logPropsRef<
  T extends React.Component,
  OriginalProps extends {}
>(WrappedComponent: React.ComponentClass<OriginalProps>) {
  interface RefProps {
    forwardedRef?: React.RefObject<T>
  }
  type Props = OriginalProps & RefProps

  class LogProps extends React.Component<Props> {
    public componentDidUpdate(prevProps: any) {
      console.log('old props:', prevProps)
      console.log('new props:', this.props)
    }

    public render() {
      const { forwardedRef, ...restProps } = this.props as RefProps
      const rest = restProps as OriginalProps
      return <WrappedComponent ref={forwardedRef} {...rest} />
    }
  }
  const RefFactory: any = (props: Props, ref: T) => (
    <LogProps {...props} forwardedRef={ref} />
  )
  const name = WrappedComponent.displayName || WrappedComponent.name
  RefFactory.displayName = `logProps(${name})`
  return React.forwardRef<T, OriginalProps>(RefFactory as any)
}
