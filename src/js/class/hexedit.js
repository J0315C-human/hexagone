import autoBind from '../utils/autobind';
import hexUtils from '../utils/hexUtils';


class HexEdit {
  constructor() {
    autoBind(this);

    this.elements = {
      panel: document.getElementById('hexedit'),
      inputs: {
        type: document.getElementById('hexeditinput-type'),
        dots: document.getElementById('hexeditinput-dots'),
        delay: document.getElementById('hexeditinput-delay'),
        frozen: document.getElementById('hexeditinput-frozen'),
        directions: [
          document.getElementById('hexeditinput-dir0'),
          document.getElementById('hexeditinput-dir1'),
          document.getElementById('hexeditinput-dir2'),
          document.getElementById('hexeditinput-dir3'),
          document.getElementById('hexeditinput-dir4'),
          document.getElementById('hexeditinput-dir5'),
        ],
        pattern: document.getElementById('hexeditinput-pattern'),
        note: document.getElementById('hexeditinput-note')
      },
      btnOK: document.getElementById('hexedit-ok'),
      labels: {
        dots: document.getElementById('hexeditlabel-dots'),
        delay: document.getElementById('hexeditlabel-delay'),
      },
      containers: {
        dots: document.getElementById('hexedititem-dots'),
        delay: document.getElementById('hexedititem-delay'),
        pattern: document.getElementById('hexedititem-pattern'),
        directions: document.getElementById('hexedititem-directions'),
      }
    };
    this.hex = undefined;
    this.hexDef = undefined;
    this.setListeners();
  }
  // show the panel at a specific position
  show(x = 0, y = 0) {
    const { panel: p } = this.elements;
    p.style.display = "flex";
    p.style.transform = `translate(${x}px,${y}px)`;
  }

  hide() {
    this.elements.panel.style.display = "none";
    this.hex = undefined;
  }

  hideOption(option) {
    const element = this.elements.containers[option];
    element.style.display = "none";
  }

  showOption(option) {
    const element = this.elements.containers[option];
    element.style.display = "flex";
  }
  resetOptions() {
    this.showOption('dots');
    this.showOption('delay');
    this.showOption('pattern');
    this.showOption('directions');
  }

  setEditorType(type) {
    this.resetOptions();
    switch (type) {
      case 'buffer':
        this.elements.inputs.type.value = 'buffer';
        this.hideOption('delay');
        this.hideOption('pattern');
        break;
      case 'pattern':
        this.elements.inputs.type.value = 'pattern';
        this.hideOption('delay');
        this.hideOption('dots');
        this.hideOption('directions');
        break;
      case 'normal':
      default:
        this.elements.inputs.type.value = 'normal';
        this.hideOption('directions');
        this.hideOption('pattern');
    }
  }

  setHex(hex) {
    this.hex = hex;
    this.setEditorType(hex.type || 'normal');
    const { dots, delay } = this.elements.labels;
    const { dots: dotsIn, delay: delayIn, frozen: frozenIn } = this.elements.inputs;
    switch (hex.type) {
      case 'buffer':
        dots.textContent = hex.timing.delay;
        dotsIn.value = hex.timing.delay;
        break;
      case 'pattern':
        this.elements.inputs.pattern.value = hex.timing.pattern;
        break;
      default:
        dots.textContent = hex.timing.interval;
        dotsIn.value = hex.timing.interval;
        delay.textContent = hex.timing.delay;
        delayIn.value = hex.timing.delay;
    }
    if (hex.frozen) frozenIn.checked = true;
    else frozenIn.checked = false;
    this.hexDef = hex.getHexDef();
    this.elements.inputs.directions.forEach((el, n) => {
      if (this.hexDef.dir && this.hexDef.dir.includes(n)) {
        el.checked = true;
      } else {
        el.checked = false;
      }
    })
  }
  // really shitty way to keep the new hex's event handles
  // referencing the board object.
  setHexBoardData(boardData, hexIdx){
    this.hexBoardData = boardData;
    this.hexIdx = hexIdx;
  }

  hexReplace(){
    console.log(this.hexDef);
    this.hex.replaceWith(this.hexDef);
    hexUtils.updateMouseEvents(this.hex, this.hexBoardData, this.hexIdx);
    this.setHex(this.hex);
  }

  setListeners() {
    const { inputs, btnOK } = this.elements;

    btnOK.onclick = this.hide;

    inputs.type.onchange = this.onChangeType;
    inputs.dots.onchange = this.onChangeDots;
    inputs.delay.onchange = this.onChangeDelay;
    inputs.frozen.onchange = this.onChangeFrozen;
    inputs.pattern.onchange = this.onChangePattern;
    inputs.note.onchange = this.onChangeNote;
    inputs.directions.forEach((el, n) =>
      el.onchange = () => this.onChangeDirection(n))
  }

  onChangeType(e) {
    const type = e.srcElement.value;
    this.setEditorType(type);
    const h = this.hexDef;
    switch(type){
      case 'buffer':
        h.timing = { 
          delay: h.timing.interval || 3
        };
        h.type = 'buffer';
        h.dir = [0];
        break;
      case 'pattern':
        h.timing = {
          pattern: '....'
        };
        h.type = 'pattern';
        h.dir = undefined;
        break;
      case 'normal':
      default:
        h.timing= {
          interval: h.timing.delay || 3,
          delay: 0
        };
        h.dir = undefined;
        h.type = undefined;
    }
    this.hexReplace();
  }

  onChangeDots(e) {
    const val = parseInt(e.srcElement.value);
    const h = this.hexDef;
    switch (h.type) {
      case 'buffer':
        h.timing.delay = val;
        break;
      default:
        h.timing.delay = h.timing.delay % val;
        h.timing.interval = val;
    }
    this.hexReplace();
  }

  onChangeDelay(e) {
    const h = this.hexDef;
    const val = parseInt(e.srcElement.value) % h.timing.interval;
    h.timing.delay = val;
    this.hexReplace();
  }
  onChangeFrozen() {
    const h = this.hexDef;
    h.frozen = !h.frozen;
    this.hexReplace();
  }
  onChangePattern(e) {
    const val = e.srcElement.value;
    const h = this.hexDef;
    h.timing.pattern = val;
    this.hexReplace();
  }
  onChangeDirection(dir) {
    const h = this.hexDef;
    if (h.dir.includes(dir)) {
      h.dir = h.dir.filter(d => d !== dir);
    } else {
      h.dir = h.dir.concat(dir);
    }
    this.hexReplace();
  }
  onChangeNote(e) {
    const val = e.srcElement.value;
    console.log('note needs to be moved');
  }
}

const hexEdit = new HexEdit();

export default hexEdit;