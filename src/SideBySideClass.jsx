import React from "react";

class SideBySideClass extends React.Component {
  state = {
    renderCount: 0
  };

  static getDerivedStateFromProps(props, state) {
    return {
      renderCount: state.renderCount + 1
    };
  }

  render() {
    return (
      <div>
        isChecked: {`${this.props.isChecked}`}
        <br />
        renderCount: {this.state.renderCount}
      </div>
    );
  }
}

export default SideBySideClass;
