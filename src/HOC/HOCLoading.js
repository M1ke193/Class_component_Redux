import React from "react";

const withLoadingIndicator = (WrappedComponent) => {
  // NOT ONLY ARROW FUNCTION, it can be a class component (can use lifecycle methods)
  // When using class components, ref will refer to HOC component it self, not the wrapped component, so we must use React.forwardRef-
  //-when returning
    const HOCComponent = React.forwardRef((props, ref) => {
    const { isLoading, ...passThroughProps } = props;

    if (isLoading) {
      return <p style={{ color: "blue", fontStyle: "italic" }}>LOADING...</p>;
    }

    return <WrappedComponent ref={ref} {...passThroughProps} />;
  });

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  HOCComponent.displayName = `WithLoadingIndicator(${wrappedComponentName})`;

  return HOCComponent;
};

export default withLoadingIndicator;
