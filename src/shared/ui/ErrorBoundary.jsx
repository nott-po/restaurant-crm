import { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        if (process.env.NODE_ENV === 'development') {
            console.error('ErrorBoundary caught an error:', error, errorInfo);
        }
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="error-boundary">
                    <div className="error-boundary-content">
                        <div className="error-boundary-icon">!</div>
                        <h2 className="error-boundary-title">Something went wrong</h2>
                        <p className="error-boundary-message">
                            We're sorry, but something unexpected happened.
                            Please try refreshing the page or contact support if the problem persists.
                        </p>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="error-boundary-details">
                                <summary>Error Details</summary>
                                <pre>{this.state.error.toString()}</pre>
                                <pre>{this.state.errorInfo?.componentStack}</pre>
                            </details>
                        )}
                        <div className="error-boundary-actions">
                            <button
                                className="error-boundary-btn"
                                onClick={this.handleReset}
                            >
                                Try Again
                            </button>
                            <button
                                className="error-boundary-btn secondary"
                                onClick={() => window.location.href = '/'}
                            >
                                Go to Home
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
