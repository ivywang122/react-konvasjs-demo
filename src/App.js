import React, { Component } from 'react';
import styled from 'styled-components';
import Konva from 'konva';
import { Stage, Layer, Line, Image, Text } from 'react-konva';
import classNames from 'classnames';
import CircleDot from './components/CircleDot';
import ImgSelectBox from './components/ImgSelectBox';

import {
  FaMapPin,
  FaPaintBrush,
  FaReply,
  FaShare,
  FaPalette,
  FaSave,
  FaRegImage,
  FaEraser,
  FaFont,
  FaTrashAlt
} from 'react-icons/fa';

const colorSet = {
  red: '#E83015',
  blue: '#005CAF',
  yellow: '#FFC408',
  orange: '#F05E1C',
  green: '#1B813E',
  purple: '#6F3381',
  white: '#ffffff',
  gray: '#707C74',
  black: '#000000'
};

class App extends Component {
  constructor(props) {
    super(props);
    this.onMouseDown = this._onMouseDown.bind(this);
    this.onMouseMove = this._onMouseMove.bind(this);
    this.onMouseUp = this._onMouseUp.bind(this);
    this.onToolChange = this._onToolChange.bind(this);
    this.onImgSelect = this._onImgSelect.bind(this);
    this.onStageClick = this._onStageClick.bind(this);
    this.onTextChange = this._onTextChange.bind(this);
    this.onTextEnter = this._onTextEnter.bind(this);
    this.onColorSelect = this._onColorSelect.bind(this);
    this.onUndo = this._onUndo.bind(this);
    this.onRedo = this._onRedo.bind(this);
    this.onShowImgBox = this._onShowImgBox.bind(this);
    this.onCloseImgBox = this._onCloseImgBox.bind(this);
    this.onDownload = this._onDownload.bind(this);
    this.onAllClear = this._onAllClear.bind(this);
    this.downloadURI = this._downloadURI.bind(this);

    this.state = {
      lines: [],
      lineColors: [],
      eraseImgs: [],
      dots: [],
      texts: [],
      text: '',
      tX: 0,
      tY: 0,
      color: 'red',
      isDrawing: false,
      isErasing: false,
      toolState: 0, // 0.點點 1.筆刷 2.文字 3.選色 4.橡皮擦
      isShowText: false,
      isShowImgSelectBox: false,
      historyStep: 0,
      history: [],
      imgurl: '',
      isBgImg: false,
      imgId: undefined
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  // shouldComponentUpdate(newProps, newState) {
  //   return this.state !== newState
  // }

  render() {
    const {
      toolState,
      dots,
      lines,
      lineColors,
      eraseImgs,
      texts,
      isShowImgSelectBox,
      isShowText,
      tX,
      tY,
      color
    } = this.state;
    return (
      <div className="App">
        {isShowImgSelectBox ? (
          <ImgSelectBox
            onImgSelect={this.onImgSelect}
            onCloseImgBox={this.onCloseImgBox}
          />
        ) : null}

        <StageContainer>
          <div className="frame">
            <TopTools>
              <div className="left">
                <div
                  className={classNames('icon-wrapper', {
                    active: toolState === 0
                  })}
                  onClick={() => this.onToolChange(0)}
                >
                  <FaMapPin />
                </div>
                <div
                  className={classNames('icon-wrapper', {
                    active: toolState === 1
                  })}
                  onClick={() => this.onToolChange(1)}
                >
                  <FaPaintBrush />
                </div>
                <div
                  className={classNames('icon-wrapper', {
                    active: toolState === 2
                  })}
                  onClick={() => this.onToolChange(2)}
                >
                  <FaFont />
                </div>
                <div className="icon-wrapper" onClick={this.onShowImgBox}>
                  <FaRegImage />
                </div>
                <div
                  className={classNames('icon-wrapper', {
                    active: toolState === 3
                  })}
                  onClick={() => this.onToolChange(3)}
                >
                  <FaPalette />
                </div>
                {toolState === 3 ? (
                  <ColorSelectWrapper>
                    <ColorSelect
                      color={colorSet.red}
                      isSelected={color === 'red'}
                      onClick={() => this.onColorSelect('red')}
                    />
                    <ColorSelect
                      color={colorSet.orange}
                      isSelected={color === 'orange'}
                      onClick={() => this.onColorSelect('orange')}
                    />
                    <ColorSelect
                      color={colorSet.yellow}
                      isSelected={color === 'yellow'}
                      onClick={() => this.onColorSelect('yellow')}
                    />
                    <ColorSelect
                      color={colorSet.green}
                      isSelected={color === 'green'}
                      onClick={() => this.onColorSelect('green')}
                    />
                    <ColorSelect
                      color={colorSet.blue}
                      isSelected={color === 'blue'}
                      onClick={() => this.onColorSelect('blue')}
                    />
                    <ColorSelect
                      color={colorSet.purple}
                      isSelected={color === 'purple'}
                      onClick={() => this.onColorSelect('purple')}
                    />
                    <ColorSelect
                      color={colorSet.gray}
                      isSelected={color === 'gray'}
                      onClick={() => this.onColorSelect('gray')}
                    />
                    <ColorSelect
                      color={colorSet.white}
                      isSelected={color === 'white'}
                      onClick={() => this.onColorSelect('white')}
                    />
                    <ColorSelect
                      color={colorSet.black}
                      isSelected={color === 'black'}
                      onClick={() => this.onColorSelect('black')}
                    />
                  </ColorSelectWrapper>
                ) : (
                  <ColorSelectWrapper>
                    <ColorShow color={color} />
                  </ColorSelectWrapper>
                )}
              </div>

              <div className="right">
                <div className="icon-wrapper" onClick={this.onAllClear}>
                  <FaTrashAlt />
                </div>
                <div
                  className={classNames('icon-wrapper', {
                    active: toolState === 4
                  })}
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

            <div style={{ position: 'relative' }}>
              {toolState === 2 && isShowText ? (
                <Textarea
                  ref={el => (this.textRef = el)}
                  left={tX}
                  top={tY}
                  color={color}
                  onChange={this.onTextChange}
                  onKeyPress={this.onTextEnter}
                />
              ) : null}
              <Stage
                ref={node => (this.stageRef = node)}
                width={800}
                height={600}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                onMouseMove={this.onMouseMove}
                onTouchStart={this.onMouseDown}
                onTouchEnd={this.onMouseUp}
                onTouchMove={this.onMouseMove}
                onClick={this.onStageClick}
              >
                <Layer ref={node => (this.layerRef = node)}>
                  {/* {imgurl !== '' ? (
                  <SelectedImage
                    posX={0}
                    posY={0}
                    imgurl={imgurl}
                    opacity={opacity}
                  />
                ) : null} */}

                  {dots.length > 0
                    ? dots.map((dot, index) => (
                        <CircleDot
                          key={'dot-' + index}
                          posX={dot.posX}
                          posY={dot.posY}
                          color={color}
                        />
                      ))
                    : null}

                  {lines.length > 0
                    ? lines.map((line, index) => (
                        <Line
                          key={'line' + index}
                          lineJoin="round"
                          lineCap="round"
                          strokeWidth={5}
                          points={line}
                          stroke={lineColors[index]}
                        />
                      ))
                    : null}

                  {texts.length > 0
                    ? texts.map((t, index) => (
                        <Text
                          key={'text-' + index}
                          x={t.posX}
                          y={t.posY}
                          text={t.text}
                          fill={t.color}
                          fontSize={16}
                        />
                      ))
                    : null}

                  {eraseImgs.length > 0
                    ? eraseImgs.map((img, index) => (
                        <Image
                          key={'img' + index}
                          ref={node => (this.imageRef = node)}
                          x={img.x}
                          y={img.y}
                          width={10}
                          height={10}
                          stroke="blue"
                          fill="red"
                          globalCompositeOperation="destination-out"
                        />
                      ))
                    : null}
                </Layer>
              </Stage>
            </div>
          </div>
        </StageContainer>
      </div>
    );
  }

  _onMouseDown() {
    let { toolState, lines, lineColors, color } = this.state;
    if (toolState === 1) {
      this.setState({
        isDrawing: true,
        lines: [...lines, []],
        lineColors: [...lineColors, color]
      });
    } else if (toolState === 4) {
      this.setState({ isErasing: true });
    }
  }

  _onMouseMove(ele) {
    let {
      toolState,
      isDrawing,
      isErasing,
      lines,
      eraseImgs,
      color
    } = this.state;
    const stage = this.stageRef.getStage();
    const point = stage.getPointerPosition();

    if (toolState === 1) {
      if (!isDrawing) {
        return;
      }
      let lastLine = lines[lines.length - 1];
      lastLine = lastLine.concat([point.x, point.y]);
      lines.splice(lines.length - 1, 1, lastLine);
      this.setState({ lines: lines });
    } else if (toolState === 4) {
      if (!isErasing) {
        return;
      }
      let ersPos = { x: point.x, y: point.y };
      eraseImgs = [...eraseImgs, ersPos];
      this.setState({ eraseImgs });
    }
  }

  _onMouseUp() {
    this.setState({ isDrawing: false, isErasing: false });
  }

  _onToolChange(type) {
    this.setState({ toolState: type });
  }

  _onImgSelect(imgurl) {
    if (this.layerRef.getChildren()[0]) {
      // this.layerRef.getChildren()[0].destroy();
      // this.layerRef.draw();
      let imgs = this.layerRef.getChildren(n => n.getClassName() === 'Image');
      for (let i = 0; i < imgs.length; i++) {
        if (imgs[i]._id === this.state.imgId) {
          imgs[i].destroy();
          this.layerRef.draw();
          break;
        }
      }

      // console.log(this.layerRef.getChildren(n => n.getClassName() === 'Image'))
    }

    const canvas = this.layerRef.getCanvas()._canvas;
    canvas.setAttribute('style', 'background: url(' + imgurl + ')');

    this.setState({ imgurl, isShowImgSelectBox: false, isBgImg: true });
  }

  _onStageClick(ele) {
    let { toolState, dots } = this.state;
    let dot = {};
    let posX = ele.evt.offsetX,
      posY = ele.evt.offsetY;
    if (toolState === 0) {
      dot = { posX: posX, posY: posY };
      dots = [...dots, dot];
    } else if (toolState === 2) {
      this.setState({ isShowText: true, tX: posX, tY: posY }, () =>
        this.textRef.focus()
      );
    }

    this.setState({ dots });
  }

  _onTextChange(event) {
    this.setState({ text: event.target.value });
  }

  _onTextEnter(event) {
    if (event.key === 'Enter') {
      let { texts, tX, tY, text, color } = this.state;
      texts = [
        ...texts,
        { text: text, posX: tX + 6, posY: tY + 9, color: color }
      ];
      this.setState({ texts, isShowText: false, tX: 0, tY: 0 });
    }
  }

  _onColorSelect(color) {
    this.setState({ color });
  }

  _onUndo() {}

  _onRedo() {}

  _onAllClear() {
    this.setState({ dots: [], lines: [], eraseImgs: [], texts: [] });
  }

  _onShowImgBox() {
    this.setState({ isShowImgSelectBox: true });
  }

  _onCloseImgBox() {
    this.setState({ isShowImgSelectBox: false });
  }

  _onDownload() {
    let { imgurl, isBgImg } = this.state;
    if (isBgImg) {
      let imageObj = new window.Image();
      // -- images from other domain -- //
      imageObj.setAttribute('crossOrigin', 'anonymous');
      imageObj.src = imgurl;
      imageObj.width = 800;
      imageObj.height = 600;

      imageObj.onload = () => {
        let bgImage = new Konva.Image({
          x: 0,
          y: 0,
          image: imageObj,
          opacity: 1,
          globalCompositeOperation: 'destination-over'
        });

        // console.log(bgImage._id)

        this.layerRef.add(bgImage);
        this.layerRef.draw();
        // console.log(this.layerRef.getChildren()[0]._id)
        this.setState({ imgId: bgImage._id });
        setTimeout(() => {
          let dataURL = this.stageRef.toDataURL();
          this.downloadURI(dataURL, 'stage.png');
        }, 100);
      };
    } else {
      setTimeout(() => {
        let dataURL = this.stageRef.toDataURL();
        this.downloadURI(dataURL, 'stage.png');
      }, 100);
    }
  }

  _downloadURI(url, name) {
    let link = document.createElement('a');
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
  .frame {
    background-color: #fff;
    box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.5);
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
  .left,
  .right {
    display: flex;
  }
  .icon-wrapper {
    text-align: center;
    line-height: 40px;
    height: 40px;
    width: 40px;
    cursor: pointer;
    &.active,
    &:hover {
      background-color: #ddd;
    }
  }
`;

const Textarea = styled.textarea`
  padding: 5px;
  font-size: 16px;
  line-height: 20px;
  color: ${props => (props.color ? props.color : 'black')};
  position: absolute;
  z-index: 10;
  background-color: transparent;
  left: ${props => (props.left ? props.left + 'px' : 0)};
  top: ${props => (props.top ? props.top + 'px' : 0)};
  border: 1px solid #007fff;
  border-radius: 3px;
  resize: none;
`;

const ColorSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;
`;

const ColorSelect = styled.div`
  width: 18px;
  height: 18px;
  border: 3px solid #fefefe;
  box-shadow: 0 0 0 1px ${props => (props.isSelected ? 'blue' : '#aaa')};
  margin-right: 8px;
  border-radius: 50%;
  background-color: ${props => (props.color ? props.color : 'gray')};
`;

const ColorShow = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${props => props.color};
  border: 1px solid gray;
`;

export default App;
