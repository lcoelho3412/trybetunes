import React, { Component } from 'react';
import {Spinner} from "@nextui-org/react";

class Loading extends Component {
  render() {
    return (
      <div >
        <Spinner label='carregando' size="lg" />
      </div>
    );
  }
}

export default Loading;
