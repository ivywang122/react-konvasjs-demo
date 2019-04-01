import React, { Component } from 'react'
import { Circle } from 'react-konva';
class CircleDot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posX: this.props.posX,
      posY: this.props.posY,
      fillColor: 'gold'
    }
  }
  componentDidMount() {

  }
  componentWillUnmount() {
  }
  componentDidUpdate(prevProp, prevState) {
  }
  shouldComponentUpdate(newProps, newState) {
    return this.state !== newState

  }

  render() {
    const { posX, posY, fillColor } = this.state;
    return(
      <Circle x={posX} y={posY} radius={5} fill={fillColor} />
    );
  }
}
export default CircleDot