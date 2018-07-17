import React, { Component } from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Game } from '../components/Game';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <DragDropContextProvider backend={HTML5Backend}>
          <Game />
        </DragDropContextProvider>
      </div>
    );
  }
}

export default App;
