import React, { Component } from 'react';
import { Image } from 'react-konva';
class SelectedImage extends Component {
  constructor(props) {
    super(props);
    this.handleLoad = this._handleLoad.bind(this);

    this.state = {
      imgobj: null
    };
  }
  componentDidMount() {
    this.loadImage();
  }

  componentWillUnmount() {
    this.imgobj.removeEventListener('load', this.handleLoad);
  }
  componentDidUpdate(prevProp, prevState) {
    if (prevProp.imgurl !== this.props.imgurl) {
      this.loadImage();
    }
  }
  // shouldComponentUpdate(newProps, newState) {
  //   return this.state !== newState
  // }
  render() {
    return (
      <Image
        x={this.props.posX}
        y={this.props.posY}
        image={this.imgobj}
        opacity={this.props.opacity}
        ref={node => {
          this.imageNode = node;
        }}
      />
    );
  }

  _handleLoad() {
    this.setState({ imgobj: this.imgobj });
  }

  loadImage() {
    this.imgobj = new window.Image();
    this.imgobj.setAttribute('crossOrigin', 'anonymous');
    this.imgobj.src = this.props.imgurl;
    this.imgobj.addEventListener('load', this.handleLoad);
    // console.log(this.imgobj)
  }
}
export default SelectedImage;
