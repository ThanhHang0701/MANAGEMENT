import React from 'react'
import {Redirect} from 'react-router'
export default class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    componentDidCatch(error, info) {
      this.setState({ hasError: true });
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <Redirect to="/NotFound" />
      }
      return this.props.children;
    }
}