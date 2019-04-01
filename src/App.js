import React, { Component } from 'react';
import styled from 'styled-components';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';
import classNames from 'classnames';
import CircleDot from './components/CircleDot';
import ImgSelectBox from './components/ImgSelectBox';
import { FaMapPin, FaPaintBrush, FaReply, FaShare, FaPalette, FaSave, FaRegImage, FaEraser } from 'react-icons/fa';

class App extends Component {
  constructor(props) {
    super(props);
    this.onMouseMove = this._onMouseMove.bind(this);
    this.onStageClick = this._onStageClick.bind(this);
    this.renderDots = this._renderDots.bind(this);
    this.onUndo = this._onUndo.bind(this);
    this.onRedo = this._onRedo.bind(this);
    this.onShowImgBox = this._onShowImgBox.bind(this);
    this.onCloseImgBox = this._onCloseImgBox.bind(this);
    this.onDownload = this._onDownload.bind(this);

    this.state = {
      toolState: 0, // 0.點點 1.筆刷 2.放圖片 3.選色
      posX: 0,
      posY: 0,
      dots: [],
      historyStep: 0,
      history: [],
      isShowImgSelectBox: true
    }
    
  }
 

  componentDidMount() {

  }

  render() {
    const { toolState, dots, isShowImgSelectBox } = this.state;
    return (
      <div className="App">
        {isShowImgSelectBox ? <ImgSelectBox onCloseImgBox={this.onCloseImgBox} /> : null}
      
        <StageContainer>
          <div className="frame">
            <TopTools>
              <div className="left">
                <div className={classNames('icon-wrapper', { 'active': toolState === 0 })}>
                  <FaMapPin />
                </div>
                <div className={classNames('icon-wrapper', { 'active': toolState === 1 })}>
                  <FaPaintBrush />
                </div>
                <div 
                  className={classNames('icon-wrapper', { 'active': toolState === 2 })}
                  onClick={this.onShowImgBox}
                  >
                  <FaRegImage />
                </div>
                <div className={classNames('icon-wrapper', { 'active': toolState === 3 })}>                
                  <FaPalette />
                </div>
              </div>
              <div className="right">
                <div className="icon-wrapper">
                  <FaEraser />
                </div>
                <div className="icon-wrapper" onClick={this.onRedo}>
                  <FaShare />
                </div>
                <div className="icon-wrapper" onClick={this.onUndo}>
                  <FaReply />
                </div>
                <div className="icon-wrapper" onClick={this.onDownload}>
                  <FaSave />
                </div>
              </div>
              
              
            </TopTools>
            <Stage ref={node => { this.stageRef = node }} width={800} height={600} onMouseMove={this.onMouseMove} onClick={this.onStageClick}>
              <Layer>
                {dots.length > 0? dots.map((dot, index) => { return this.renderDots(dot, index)} ) : null}
              </Layer>
            </Stage>
          </div>
        </StageContainer>
      </div>
    );
  }

  _renderDots(dot, index) {
    return <CircleDot key={'dot-'+index} posX={dot.posX} posY={dot.posY} />
  }
    
  _onMouseMove(ele) {
    let { toolState } = this.state;
    if (toolState === 0) {
      this.setState({ posX: ele.evt.offsetX, posY: ele.evt.offsetY })
    }
  }

  _onStageClick() {
    let { toolState, posX, posY, dots } = this.state;
    let dot = {};
    if (toolState === 0) {
      dot = { posX: posX, posY: posY };
      dots = [...dots, dot];
    }

    this.setState({ dots });
  }

  _onUndo() {


  }

  _onRedo() {

  }

  _onShowImgBox() {
    this.setState({ isShowImgSelectBox: true });
  }
  
  _onCloseImgBox() {
    this.setState({ isShowImgSelectBox: false });
  }

  _onDownload() {
    let dataURL = this.stageRef.getStage().toDataURL();
    this.downloadURI(dataURL, 'stage.png');
  }

  downloadURI(url, name) {
    let link = document.createElement("a");
    link.download = name;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

const StageContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: goldenrod;
  display: flex;
  justify-content: center;
  align-items: center;
  .frame{
    background-color: #fff;
    box-shadow: 0 12px 40px 0 rgba(0,0,0,.5);
  }
`;

const TopTools = styled.div`
  width: 100%;
  height: 40px;
  font-size: 18px;
  color: #1a1a1a;
  background-color: #efefef;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  .icon-wrapper{
    display: inline-block;
    text-align: center;
    line-height: 40px;
    height: 40px;
    width: 40px;
    cursor: pointer;
    &.active, &:hover{
      background-color: #ddd;
    }
    
  }
`;

export default App;
