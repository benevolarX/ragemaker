import { h, render, Component } from 'preact'
// DEV :
import Konva from 'konva'
const Rect = Konva.Rect
const Image = Konva.Image
const Text = Konva.Text
/*
// PROD :
import Konva from 'konva/lib/Core'
import { Rect } from 'konva/lib/shapes/Rect'
import { Image } from 'konva/lib/shapes/Image'
import { Text } from 'konva/lib/shapes/Text'
*/
const LAYOUT_WIDTH = 325
const LAYOUT_HEIGHT = 240

export class Kanvas extends Component {

  stage: Konva.Stage | null = null
  layer: Konva.Layer | null = null
  bg: Konva.Group | null = null
  cases: Konva.Group | null = null

  // visible: false
  // box.show() / box.hide() + layer.draw()

  componentDidMount() {
    const self = this
    this.stage = new Konva.Stage({
      container: 'canvas',
      width: 2 * LAYOUT_WIDTH,
      height: 0
    })
    // add canvas element
    this.layer = new Konva.Layer()
    this.stage.add(this.layer)

    this.bg = new Konva.Group()
    this.layer.add(this.bg)

    this.cases = new Konva.Group()
    this.layer.add(this.cases)

    // create shape
    for (let i = 0; i < 2; i++) {
      self.addLine()
    }

    let simpleText = new Text({
      x: this.stage.width() / 2,
      y: 15,
      text: 'What are you doed ?',
      fontSize: 30,
      fontFamily: 'Calibri',
      fill: '#e33',
      draggable: true
    })
    self.addBoxToLayer(simpleText)

    Image.fromURL('./assets/cereal_newspaper/BeerGuy.png', (box: any) => {
      box.setAttrs({
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        draggable: true
      });
      self.addBoxToLayer(box)
      self.layer?.batchDraw();
    });

    this.layer.draw()
  }

  addBoxToLayer(box: any) {
    box.on('mouseover', () => {
      document.body.style.cursor = 'pointer'
      box.setAttrs({
        stroke: '#000',
        strokeWidth: 1
      })
      this.layer?.batchDraw()
    })
    box.on('mouseout', () => {
      document.body.style.cursor = 'default'
      box.setAttrs({
        stroke: undefined,
        strokeWidth: 0
      })
      this.layer?.batchDraw()
    })
    this.cases?.add(box)
  }

  addLine() {
    const y = Math.trunc((this.stage?.height() ?? 0))
    for (let i = 0; i < 2; i++) {
      let box = new Rect({
        x: i * LAYOUT_WIDTH,
        y: y,
        width: LAYOUT_WIDTH,
        height: LAYOUT_HEIGHT,
        fill: '#fff',
        stroke: '#000',
        strokeWidth: 1,
        draggable: false
      })
      this.bg?.add(box)
    }
    this.setHeight((this.stage?.height() ?? 0) + LAYOUT_HEIGHT)
  }

  removeLine() {
    let old = this.stage?.height() ?? 0
    if (old > LAYOUT_HEIGHT) {
      this.setHeight((this.stage?.height() ?? 0) - LAYOUT_HEIGHT)
    }
  }

  setHeight(height: number) {
    this.stage?.setSize({
      width: this.stage?.width(),
      height
    })
    this.layer?.draw()
  }

  render() {

    return <div className="canvas">
      <div id="canvas"></div>
      <div>
        <p>
          <button onClick={() => this.addLine()}>add+</button>
        </p>
        <hr />
        <p>
          <button onClick={() => this.removeLine()} >del-</button>
        </p>
      </div>
    </div>
  }
}
