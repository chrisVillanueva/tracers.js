import { Tracer } from './modules';
import sandbox from './sandbox';

self.importScripts('https://unpkg.com/babel-standalone@6/babel.min.js');

onmessage = e => { // TODO: stop after the first wait() on the initial run
  const lines = e.data.split('\n').map((line, i) => line.replace(/(.+\. *wait *)(\( *\))/g, `$1(${i})`));
  const { code } = Babel.transform(lines.join('\n'), { presets: ['es2015'] });
  sandbox(code);
  postMessage(Tracer.traces);
};