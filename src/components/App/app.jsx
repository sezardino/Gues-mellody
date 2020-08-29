import React, { Component } from "react";

class App extends Component {
  render() {
    const { renderScreen } = this.props;

    return renderScreen();
  }
}

export default App;
