import { Lightning, Utils } from "@lightningjs/sdk"

export default class TheLastOfUsScreen extends Lightning.Component {
  static _template() {
    return {
      Background: {
        w: 1920,
        h: 1080,
        src: Utils.asset('images/background.png'),
      },
      Slider: {
        w: 800,
        h: 350,
        x: 480,
        y: 350,
        mount: 0.5,
        Wrapper: {

        }
      },
      Logo: {
        mount: 0.5,
        x: 120,
        y: 50,
        text: {
          text: "WHPlay",
          fontFace: 'Bold',
          fontSize: 30,
          textColor: 0xffffffff,
        },
      },
      Tile: {
        mount: 0.5,
        x: 150,
        y: 130,
        text: {
          text: "The Last Of Us",
          fontFace: 'Regular',
          fontSize: 25,
          textColor: 0xffffffff,
        },
      },
    }
  }

  _init() {
    this.index = 0;
    this.dataLength = 2;
    const buttons = [];

    for (let i = 0; i < this.dataLength; i++) {
      buttons.push(
        { type: Tile, x: i * (300 + 30), item: { label: `Train`, src: Utils.asset(`images/thumbnail${i + 1}.jpg`) } },
      );
    }

    this.tag('Wrapper').children = buttons;
  }

  repositionWrapper() {
    const wrapper = this.tag('Wrapper');
    const sliderW = this.tag('Slider').w;
    const currentWrapperX = wrapper.transition('x').targetvalue || wrapper.x;
    const currentFocus = wrapper.children[this.index];
    const currentFocusX = currentFocus.x + currentWrapperX;
    const currentFocusOuterWidth = currentFocus.x + currentFocus.w;

    if (currentFocusX < 0) {
      wrapper.setSmooth('x', - currentFocus.x);
    }
    else if (currentFocusOuterWidth > sliderW) {
      wrapper.setSmooth('x', sliderW - (currentFocusOuterWidth));
    }
  }

  _handleLeft() {
    if (this.index === 0) {
      this.index = this.dataLength - 1;
    }
    else {
      this.index -= 1;
    }
    this.repositionWrapper();
  }

  _handleRight() {
    if (this.index === this.dataLength - 1) {
      this.index = 0;
    }
    else {
      this.index += 1;
    }
    this.repositionWrapper();
  }

  _getFocused() {
    return this.tag('Slider.Wrapper').children[this.index];
  }
}

class TheLastOfUs extends Lightning.Component {
  static _template() {
    return {
      w: 300,
      h: 450,
      Image: {
        w: w => w, h: h => h - 50,
      },
    }
  }

  set item(obj) {
    const { label, src } = obj;
    this.patch({
      Image: { src },
    })
  }

  _focus() {
    this.patch({
      smooth: { color: 0xff005500, scale: 1.1 },
    });
  }

  _unfocus() {
    this.patch({
      smooth: { color: 0xffffffff, scale: 1.0 },
    });
  }
}
