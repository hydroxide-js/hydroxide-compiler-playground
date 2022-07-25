const counter = `\
import { reactive } from 'hydroxide';

function App() {
  const count = reactive(0);
  const increment = () => count.set(count() + 1)

  return (
    <div>
      <p> Counter Example </p>
      <button on-click={increment}>
        count is {count()}
      </button>
    </div>
  )
}
`;

const components = `\
function Welcome(props) {
  return <p> Hello, {props.name} ! </p>
}

function App() {
  return (
    <div>
      <Welcome name={"John"} />
    </div>
  )
}

`;

const FizzBuzz = `\
import { reactive } from "hydroxide";

function App() {
  const count = reactive(0);

  return (
    <div>
      <input type="range" bind-value={count} />
      <h1> count is {count()} </h1>
      <p if={count() % 15 === 0}> Fizz Buzz </p>
      <p elseIf={count() % 3 === 0}> Fizz </p>
      <p elseIf={count() % 5 === 0}> Buzz </p>
      <p else> Weird </p>
    </div>
  );
}
`;

const List = `\
import { reactive } from 'hydroxide'
import { List } from 'hydroxide-dom'

function App() {
  const names = reactive(['Cooper', 'Charlie', 'Gus', 'Oliver']);

  return (
    <ul>
      <List
        each={names()}
        as={name => <li> {name()} </li> }
      />
    </ul>
  )
}
`;

const JSXOnly = `\
const heading = <h1> Hello World </h1>
`;

const SVG = `\
function Icon() {
  return (
    <svg width="100" height="100">
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="yellow"
      />
    </svg>
  )
}
`;

const inputBinding = `\
import { reactive } from 'hydroxide'

export function App() {
  const input = reactive('Hello')

  return (
    <input bind-value={input} />
  )
}
`;

const attributes = `\
function Picture(props) {
  return (
    <picture>
      <source
        media="(min-width: 501px)"
        srcset={props.desktopSrc}
      />
      <source
        media="(max-width: 500px)"
        srcset={props.mobileSrc}
      />
      <img src={props.src} alt={props.alt} />
    </picture>
  )
}
`;

const refs = `\
import { onConnect } from 'hydroxide'

export function App(props) {
  const canvasRef = {}

  onConnect(() => {
    console.log('canvas element is', canvasRef.current)
  })

  return (
    <canvas ref={canvasRef}> </canvas>
  )
}
`;

const invalidNesting = `\
<p>
  <span> Hello </span>
  <hr />
  <span> World </span>
</p>
`;

export const sources = [
	counter,
	components,
	FizzBuzz,
	List,
	inputBinding,
	attributes,
	refs,
	JSXOnly,
	SVG,
	invalidNesting,
];
