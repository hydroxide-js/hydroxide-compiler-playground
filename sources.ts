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
    <div class="container">
      <input type="range" bind-value={count} />
      <h1> {count()} is </h1>
      <p if={count() % 15 === 0}> FizzBuzz </p>
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

export const sources = [counter, components, FizzBuzz, List];
