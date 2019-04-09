import React, { Component } from 'react';
import styled from 'styled-components';
import { Stage, Layer, Line, Image, Text } from 'react-konva';
import Konva from 'konva';
import classNames from 'classnames';
import CircleDot from './components/CircleDot';
import ImgSelectBox from './components/ImgSelectBox';
import SelectedImage from './components/SelectedImage';
import { FaMapPin, FaPaintBrush, FaReply, FaShare, FaPalette, FaSave, FaRegImage, FaEraser, FaFont, FaTrashAlt } from 'react-icons/fa';


class App extends Component {
  constructor(props) {
    super(props);
    this.onMouseDown = this._onMouseDown.bind(this);
    this.onMouseMove = this._onMouseMove.bind(this);
    this.onMouseUp = this._onMouseUp.bind(this);
    this.onToolChange = this._onToolChange.bind(this);
    this.onImgSelect = this._onImgSelect.bind(this);
    this.onStageClick = this._onStageClick.bind(this);
    this.renderDots = this._renderDots.bind(this);
    this.onUndo = this._onUndo.bind(this);
    this.onRedo = this._onRedo.bind(this);
    this.onShowImgBox = this._onShowImgBox.bind(this);
    this.onCloseImgBox = this._onCloseImgBox.bind(this);
    this.onDownload = this._onDownload.bind(this);
    this.onAllClear = this._onAllClear.bind(this);

    this.state = {
      lines: [],
      eraseImgs: [],
      dots: [],
      posX: 0,
      posY: 0,
      isDrawing: false,
      isErasing: false,
      toolState: 0, // 0.點點 1.筆刷 2.文字 3.選色 4.橡皮擦
      isShowImgSelectBox: false,
      historyStep: 0,
      history: [],
      imgurl: ''
    }
    
  }
 

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    const { toolState, dots, isShowImgSelectBox, imgurl, lines, eraseImgs } = this.state;
    return (
      <div className="App">
        {isShowImgSelectBox ? <ImgSelectBox onImgSelect={this.onImgSelect} onCloseImgBox={this.onCloseImgBox} /> : null}
      
        <StageContainer>
          <div className="frame">
            <TopTools>
              <div className="left">
                <div className={classNames('icon-wrapper', { 'active': toolState === 0 })}
                  onClick={() => this.onToolChange(0)}
                  > 
                  <FaMapPin />
                </div>
                <div className={classNames('icon-wrapper', { 'active': toolState === 1 })}
                  onClick={() => this.onToolChange(1)}
                  >
                  <FaPaintBrush />
                </div>
                <div className={classNames('icon-wrapper', { 'active': toolState === 2 })}
                  onClick={() => this.onToolChange(2)}
                  >
                  <FaFont />
                </div>
                <div className='icon-wrapper'
                  onClick={this.onShowImgBox}
                  >
                  <FaRegImage />
                </div>
                <div className={classNames('icon-wrapper', { 'active': toolState === 3 })}
                  onClick={() => this.onToolChange(3)}
                  >                
                  <FaPalette />
                </div>
              </div>
              <div className="right">
                <div className="icon-wrapper" onClick={this.onAllClear}>
                  <FaTrashAlt />
                </div>
                <div className={classNames('icon-wrapper', { 'active': toolState === 4 })}
                  onClick={() => this.onToolChange(4)}
                  >
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
            <Stage
              ref={node => { this.stageRef = node }} 
              width={800} height={600}
              onMouseDown={this.onMouseDown}
              onMouseMove={this.onMouseMove}
              onMouseUp={this.onMouseUp}
              onClick={this.onStageClick}>
              <Layer>
                {imgurl !== '' ? <SelectedImage posX={0} posY={0} imgurl={imgurl} /> : null}
                
                {dots.length > 0? dots.map((dot, index) => { return this.renderDots(dot, index)} ) : null}
                {lines.length > 0 ? lines.map((line, index) => (
                  <Line key={'line' + index} lineJoin="round" lineCap="round" strokeWidth={5} points={line} stroke="gold" />
                )) : null}
                {eraseImgs.length > 0 ? eraseImgs.map((img, index) => (
                  <Image key={'img' + index} ref={node => (this.imageRef = node)} x={img.x} y={img.y} width={10} height={10} stroke="blue" fill="red" globalCompositeOperation="destination-out" />
                )) : null}
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
    let { toolState, isDrawing, isErasing, lines, eraseImgs } = this.state;
    const stage = this.stageRef.getStage();
    const point = stage.getPointerPosition();

    if (toolState === 0) {
      this.setState({ posX: ele.evt.offsetX, posY: ele.evt.offsetY })
    } else if (toolState === 1) {
      if (!isDrawing) {
        return;
      }
      let lastLine = lines[lines.length - 1];
      lastLine = lastLine.concat([point.x, point.y]);
      lines.splice(lines.length - 1, 1, lastLine);
      this.setState({ lines: lines.concat() });
    } else if (toolState === 4) {
      if(!isErasing) {
        return;
      }

      let imgPoints = { x: point.x, y: point.y }
      eraseImgs = [...eraseImgs, imgPoints];
      this.setState({ eraseImgs })
    }
  }

  _onMouseDown() {
    let { toolState, lines } = this.state;
    if(toolState === 1) {
      this.setState({ isDrawing: true, lines: [...lines, []] })
    } else if (toolState === 4) {
      this.setState({ isErasing: true })
    }
  }

  _onMouseUp() {
    this.setState({ isDrawing: false, isErasing: false })
  }

  _onToolChange(type) {
    this.setState({ toolState: type })
  }

  _onImgSelect(imgurl) {
    this.setState({ imgurl, isShowImgSelectBox: false });
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

  _onAllClear() {
    this.setState({ dots: [], lines: [], eraseImgs: [] })
  }

  _onShowImgBox() {
    this.setState({ isShowImgSelectBox: true });
  }
  
  _onCloseImgBox() {
    this.setState({ isShowImgSelectBox: false });
  }

  _onDownload() {
    let dataURL = this.stageRef.getStage().toDataURL();
    // console.log(dataURL)
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
