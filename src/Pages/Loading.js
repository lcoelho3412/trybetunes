import React, { Component } from "react";

class Loading extends Component {
  render() {
    return (
      <div className="loader bw flex items-center justify-center">
        <div className="bar-shake-y" />
      </div>
    );
  }
}

export default Loading;
