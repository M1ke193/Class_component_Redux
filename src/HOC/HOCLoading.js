import React from 'react';

const withLoadingIndicator = (WrappedComponent) => {
  // NOT ONLY ARROW FUNCTION, it can be a class component (can use lifecycle methods)
  const HOCComponent = (props) => {
    const { isLoading, ...passThroughProps } = props;

    if (isLoading) {
      return <p style={{ color: 'blue', fontStyle: 'italic' }}>LOADING...</p>;
    }

    return <WrappedComponent {...passThroughProps} />;
  };

  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  HOCComponent.displayName = `WithLoadingIndicator(${wrappedComponentName})`;

  return HOCComponent;
};

export default withLoadingIndicator;