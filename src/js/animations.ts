import { TimelineLite, Power2, Power4, Power1, Linear } from 'gsap';
import * as CSSRulePlugin from 'gsap/CSSRulePlugin';
import * as gsap from 'gsap';
import glob from './globals';
import Color from 'color';

const cols = {
  hex_A: '#aa6065',
  hex_A_flash: new Color('#aa6065').lighten(0.6).rgb().string(),
  hex_B: '#5392a5',
  hex_B_flash: new Color('#5392a5').lighten(0.6).rgb().string(),
  hex_C: '#9abe3a',
  hex_C_flash: new Color('#9abe3a').lighten(0.6).rgb().string(),
};

const _s: number = glob.animationScale;
const _flashRuleA = CSSRulePlugin.getRule('.hex-flash');
const _flashRuleB = CSSRulePlugin.getRule('.hex-flash.hex-buffer');
const _flashRuleC = CSSRulePlugin.getRule('.hex-flash.hex-pattern');

const _flashLength: number = glob.beat_ms - glob.preschedule_ms;
const _flashIn: number = (_flashLength * 0.1) / 1000;
const _flashOut: number = (_flashLength * 0.9) / 1000;
const _timeline: gsap.TimelineLite = new TimelineLite({ autoRemoveChildren: true });
const _altTimeline: gsap.TimelineLite = new TimelineLite({ autoRemoveChildren: true });
_altTimeline.play();
const _hexDelay: number = glob.preschedule_ms / 1000;
const _otherDelay: number = glob.preschedule_ms / 1000;

const flashHexes = () => {
  const t = _timeline.time() + _hexDelay;
  _timeline.to(_flashRuleA, _flashIn, { cssRule: { fill: cols.hex_A_flash }, ease: Linear.easeNone }, t)
    .to(_flashRuleA, _flashOut, { cssRule: { fill: cols.hex_A }, ease: Power1.easeOut }, t + _flashIn)
    .to(_flashRuleB, _flashIn, { cssRule: { fill: cols.hex_B_flash }, ease: Linear.easeNone }, t)
    .to(_flashRuleB, _flashOut, { cssRule: { fill: cols.hex_B }, ease: Power1.easeOut }, t + _flashIn)
    .to(_flashRuleC, _flashIn, { cssRule: { fill: cols.hex_C_flash }, ease: Linear.easeNone }, t)
    .to(_flashRuleC, _flashOut, { cssRule: { fill: cols.hex_C }, ease: Power1.easeOut }, t + _flashIn);
};

const killHex = (hex, tl = _timeline) => {
  if (hex.dead) return;
  const transOrig = '47% 43%';
  const scale = 1.5;
  const duration = 1.4;
  const t = tl.time() + _hexDelay;
  tl.to(hex.elements.parent, duration * _s, {
    opacity: 0,
    transformOrigin: transOrig,
    scale: scale,
    fill: '#FFF',
    ease: Power4.easeOut
  }, t)
    .add(() => {
      requestAnimationFrame(hex.clearElements);
    }, (duration + 0.2) * _s + t);
};

const fromTo = (element, x0, y0, x1, y1, duration) => {
  const t = _timeline.time();
  _timeline.to(element, 0, { x: x0, y: y0 }, t)
    .to(element, duration * _s, { x: x1, y: y1, ease: Power2.easeOut }, t);
};

const pauseAll = () => {
  if (!glob.buildmode) {
    _timeline.pause();
  }
};

const resumeAll = () => {
  _timeline.resume();
};

const setupHex = (hex, duration?) => {
  const t = _altTimeline.time() + _hexDelay;
  const dur = duration || hex.loc.i * .03 + 0.16;
  const el = hex.elements.parent;
  const x = Math.random() * glob.bg_w;
  const y = -200;
  el.style.transform = `translate(${hex.pos.x}px, ${hex.pos.y}px)`;
  el.style.opacity = 1;
  // animate in if given a duration
  if (duration !== 0) {
    _altTimeline.from(el, dur * _s, {
      x: x,
      y: y,
      ease: Power2.easeOut
    }, t);
  }
};

const clearHexes = (hexes) => {
  const dur = (500 * _s) / hexes.length;
  hexes.forEach((h, n) => {
    setTimeout(() => {
      killHex(h, _altTimeline);
    }, n * dur);
  });
};

const setupHexes = (hexes) => {
  const dur = (1000 * _s) / hexes.length;
  hexes.forEach((h, n) => {
    setTimeout(() => {
      setupHex(h);
    }, n * dur);
  });
};

const interfaceIn = () => {
  if (glob.interfaceVisible) return;
  glob.elements.interface.style.zIndex = glob.layers.interaction;

  const t = _altTimeline.time() + _otherDelay;
  _altTimeline.to(glob.elements.interface,
    0.3 * glob.animationScale,
    {
      opacity: 1,
      scale: 1,
      ease: Power1.easeOut
    }, t)
    .add(() => {
      glob.elements.interface.style.zIndex = glob.layers.interaction;
    }, t + 0.5 * glob.animationScale);
  glob.interfaceVisible = true;
};

const interfaceOut = () => {
  if (!glob.interfaceVisible) return;
  const t = _altTimeline.time() + _otherDelay;
  _altTimeline.to(glob.elements.interface,
    0.3 * glob.animationScale,
    {
      opacity: 0,
      scale: 1.5,
      ease: Power1.easeIn
    }, t)
    .add(() => {
      glob.elements.interface.style.zIndex = glob.layers.backstage;
    }, t + 0.5 * glob.animationScale);
  glob.interfaceVisible = false;
};


export default {
  flash: flashHexes,
  pauseAll,
  resumeAll,
  killHex,
  fromTo,
  setupHex,
  clearHexes,
  setupHexes,
  // for the interface:
  interfaceIn,
  interfaceOut,
};