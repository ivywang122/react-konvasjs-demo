import React, { Component } from 'react'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
class ImgSelectBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
    return(
      <ImgSelectContainer>
        <WhiteWrapper>
          <FaTimes className="fa-icon" onClick={this.props.onCloseImgBox} />

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
  background-color: rgba(0,0,0, 0.7);
`;
const WhiteWrapper = styled.div`
  width: 300px;
  height: 300px;
  padding: 20px;
  position: relative;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 0 20px 0 rgba(0,0,0,.5);
  .fa-icon{
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }
`;

export default ImgSelectBox