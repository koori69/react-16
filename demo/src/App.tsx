import './App.css';

import * as React from 'react';

import Button from './components/concepts/Button';
import Condition from './components/concepts/Condition';
import Input from './components/concepts/Input';
import Label from './components/concepts/Label';
import List from './components/concepts/List';
import ErrorBoundary from './components/senior/ErrorBoundary';
import Lazy from './components/senior/Lazy';
import Navigator from './components/senior/Navigator';
import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
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
        <Lazy />
        <br />
        <ErrorBoundary>
          <Navigator />
        </ErrorBoundary>
      </div>
    )
  }
  private buttonClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e)
  }
}

export default App
