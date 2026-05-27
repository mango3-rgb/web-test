import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Component, type ReactNode, type ReactElement } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import PublicLayout from './layouts/PublicLayout';
import site from './config/site';
import type { ErrorInfo } from 'react';

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('App error:', error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '40px 24px', fontFamily: 'monospace', maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ color: '#c00', marginBottom: '16px' }}>오류가 발생했습니다</h2>
          <pre style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '13px', whiteSpace: 'pre-wrap' }}>
            {this.state.error.message}{'\n\n'}{this.state.error.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const ShopWrapper = ({ children }: { children: ReactNode }): ReactElement =>
  site.features.shop ? <CartProvider>{children}</CartProvider> : <>{children}</>;

function App(): ReactElement {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <ToastProvider>
              <ShopWrapper>
                <Router basename={import.meta.env.BASE_URL}>
                  <div className="App">
                    <Routes>
                      <Route path="*" element={<PublicLayout />} />
                    </Routes>
                  </div>
                </Router>
              </ShopWrapper>
            </ToastProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
