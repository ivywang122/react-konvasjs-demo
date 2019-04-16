import React, { Component } from 'react';
import { Circle } from 'react-konva';
class CircleDot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posX: this.props.posX,
      posY: this.props.posY,
      color: this.props.color
    };
  }
  componentDidMount() {}
  componentWillUnmount() {}
  componentDidUpdate(prevProp, prevState) {}
  shouldComponentUpdate(newProps, newState) {
    return this.state !== newState;
  }

  render() {
    const { posX, posY, color } = this.state;
    return <Circle x={posX} y={posY} radius={5} fill={color} />;
  }
}
export default CircleDot;
