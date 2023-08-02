import React, { Component } from 'react'
type Props = any
interface IErrorBoundaryState {
  hasError: Boolean
}
export default class ErrorBoundary extends Component<
  Props,
  IErrorBoundaryState
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }
  componentDidCatch(error: Error, errorInfo: any) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo)
    console.log(error, errorInfo)
  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="w-full h-full flex items-center justify-center text-red-500">
          An Error Occured!
        </div>
      )
    }
    return this.props.children
  }
}
