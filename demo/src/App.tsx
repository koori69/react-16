import './App.css';

import * as React from 'react';

import Button from './components/concepts/Button';
import Condition from './components/concepts/Condition';
import Input from './components/concepts/Input';
import Label from './components/concepts/Label';
import List from './components/concepts/List';
import ContextHook from './components/hook/ContextHook';
import Count from './components/hook/Count';
import ImperativerHook from './components/hook/ImperativerHook';
import ReducerHook from './components/hook/ReduceHook';
import RefHook from './components/hook/RefHook';
import Cat from './components/senior/Cat';
// import Column from './components/senior/Column';
import CustomInputText from './components/senior/CustomTextInput';
import CustomInputText1 from './components/senior/CustomTextInput1';
import ErrorBoundary from './components/senior/ErrorBoundary';
import FancyButton from './components/senior/FancyButton';
import FancyButton2 from './components/senior/FancyButton2';
import Lazy from './components/senior/Lazy';
import Mouse from './components/senior/Mouse';
import Navigator from './components/senior/Navigator';
import logo from './logo.svg';
import { logPropsRef } from './utils/log-props';

const ref: React.RefObject<HTMLButtonElement> = React.createRef()
const ref3: React.RefObject<HTMLButtonElement> = React.createRef()
const ref2 = React.createRef<FancyButton2>()
const HOCButton = logPropsRef(FancyButton2)

class App extends React.Component {
  public render() {
    return (
      <Mouse render={this.cat}>
        <div className='App'>
          <header className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <h1 className='App-title'>Welcome to React</h1>
          </header>
          <p className='App-intro'>
            To get started, edit <code>src/App.tsx</code> and save to reload.
          </p>
          <Button onClick={this.buttonClick}>Button Component</Button>
          <Label>Label Component</Label>
          <Input />
          <Condition />
          <List />
          <button onClick={this.buttonClick2}>Test Hook</button>
          <Lazy />
          <br />
          <ErrorBoundary>
            <Navigator />
          </ErrorBoundary>
          <FancyButton ref={ref}>FancyButton</FancyButton>
          <HOCButton ref={ref2} label='FancyButton2' onClick={this.hocClick} />
          {/* <table>
          <tr>
            <Column />
          </tr>
          <tbody />
        </table> */}
          <CustomInputText />
          <CustomInputText1 />
          <div>
            <h1>移动鼠标</h1>
            {/* <Mouse render={this.cat} /> */}
          </div>

          <div>
            <h2>Hook</h2>
            <Count />
            <ContextHook />
            <ReducerHook count={1} />
            <RefHook />
            <ImperativerHook ref={ref3}>FancyButton</ImperativerHook>
          </div>
        </div>
      </Mouse>
    )
  }

  private cat = (mouse: any) => <Cat mouse={mouse} />

  private buttonClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e)
    console.log(ref.current)
    const b = ref.current
    b!.focus()
  }
  private buttonClick2 = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e)
    console.log(ref3.current)
    const b = ref3.current
    b!.focus()
  }
  private hocClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e)
    console.log(ref2.current)
    const b = ref2.current
    b!.myRef.current!.focus()
    b!.myRef.current!.disabled = true
  }
}

export default App
