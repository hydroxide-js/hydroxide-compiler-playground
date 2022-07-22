import Codemirror from 'codemirror';
// @ts-ignore
import * as Babel from '@babel/standalone';
import 'codemirror/mode/jsx/jsx';

import babelPluginHydroxide from 'babel-plugin-hydroxide';
import 'codemirror/addon/selection/active-line';

import './styles/lib.css';
import './styles/theme.css';
import './styles/base.css';
import './styles/select.css';
import './styles/blur.css';

import { sources } from './sources';

const sourceEl = document.querySelector('.source') as HTMLElement;
const compiledEl = document.querySelector('.compiled') as HTMLElement;

const url = new URL(window.location.href);
const show = url.searchParams.get('show');
let currentSelected = show ? Number(show) - 1 : 0;

if (currentSelected > sources.length - 1 || currentSelected < 0) {
	currentSelected = 0;
}

const sourceEditor = Codemirror(sourceEl, {
	value: sources[currentSelected],
	mode: 'jsx',
	theme: 'material',
	readOnly: false,
	styleActiveLine: { nonEmpty: true },
});

const compiledEditor = Codemirror(compiledEl, {
	value: '',
	mode: 'jsx',
	theme: 'material',
	readOnly: true,
	styleActiveLine: { nonEmpty: true },
});

function updateCompiled(source: string) {
	let code = '';
	try {
		code = Babel.transform(source, {
			plugins: [babelPluginHydroxide],
		}).code;
	} catch (error) {
		code = error.message;
	}

	compiledEditor.setValue(code);
}

// compile after the page is loaded
window.addEventListener('load', () => {
	updateCompiled(sourceEditor.getValue());
});

// recompile on change (throttled to 200ms)
let scheduled = false;
sourceEditor.on('changes', () => {
	if (scheduled) return;
	scheduled = true;
	setTimeout(() => {
		updateCompiled(sourceEditor.getValue());
		scheduled = false;
	}, 200);
});

// -----

const sourceSelector = document.querySelector('.sources select') as HTMLSelectElement;
sourceSelector.addEventListener('change', () => {
	if (sourceSelector.selectedIndex === currentSelected) return;
	currentSelected = sourceSelector.selectedIndex;
	const source = sources[currentSelected];
	sourceEditor.setValue(source);
	updateCompiled(source);
});

sourceSelector.selectedIndex = currentSelected;
