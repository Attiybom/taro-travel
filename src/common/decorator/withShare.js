const withShare = (opts) => {
  // 返回react高阶组件
  /**
   * WrapperComponent withShare包裹的组件
   * @{param}
   */
  return (WrapperComponent) => {
    class MyComponent extends WrapperComponent {
      onShareAppMessage() {
        console.log(this.props);
        return {
          ...opts,
          path: `/${this.props.tid}`,
        };
      }
    }

    return MyComponent;
  };
};

export default withShare;
