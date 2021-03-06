import React, { Component } from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import canvas1 from '../images/canvas1.png';
import canvas2 from '../images/canvas2.png';
import canvas3 from '../images/canvas3.png';
import canvas4 from '../images/canvas4.png';

class ImgSelectBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  componentWillUnmount() {}
  componentDidUpdate(prevProp, prevState) {}
  shouldComponentUpdate(newProps, newState) {
    return this.state !== newState;
  }
  render() {
    const url1 = canvas1,
      url2 = canvas2,
      url3 = canvas3,
      url4 = canvas4;

    return (
      <ImgSelectContainer>
        <WhiteWrapper>
          <FaTimes className="fa-icon" onClick={this.props.onCloseImgBox} />
          <div className="options-container">
            <div className="options-row-wrapper">
              <OptionImage
                onClick={() => this.props.onImgSelect(url1)}
                imgurl={url1}
              />
              <OptionImage
                onClick={() => this.props.onImgSelect(url2)}
                imgurl={url2}
              />
            </div>
            <div className="options-row-wrapper">
              <OptionImage
                onClick={() => this.props.onImgSelect(url3)}
                imgurl={url3}
              />
              <OptionImage
                onClick={() => this.props.onImgSelect(url4)}
                imgurl={url4}
              />
            </div>
          </div>
        </WhiteWrapper>
      </ImgSelectContainer>
    );
  }
}
const ImgSelectContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
`;

const WhiteWrapper = styled.div`
  width: 300px;
  height: 300px;
  padding: 30px;
  position: relative;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5);
  .fa-icon {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }
  .options-container {
    width: 100%;
    height: 100%;
    .options-row-wrapper {
      display: flex;
    }
  }
`;

const OptionImage = styled.div`
  background-color: gray;
  flex: 50%;
  padding-bottom: 50%;
  box-shadow: 0 0 0 5px #fff;
  background-image: ${props =>
    props.imgurl ? 'url(' + props.imgurl + ')' : null};
  background-size: cover;
  background-position: 50% 50%;
`;

export default ImgSelectBox;
