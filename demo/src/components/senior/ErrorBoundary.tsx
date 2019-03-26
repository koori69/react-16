import * as React from 'react';

interface IErrorBoundryState {
  error?: any
}

export default class ErrorBoundary extends React.Component<
  {},
  IErrorBoundryState
> {
  constructor(props: any) {
    super(props)
    this.state = { error: null }
  }

  public static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { error }
  }

  public componentDidCatch(error: any) {
    // You can also log the error to an error reporting service
    this.setState({
      error
    })
  }

  public render() {
    if (this.state.error) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error.stack}
          </details>
        </div>
      )
    }
    // Normally, just render children
    return this.props.children
  }
}
