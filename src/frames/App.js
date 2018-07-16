import React, { Component } from 'react';
import { DragDropContextProvider } from 'react-dnd';

import HTML5Backend from 'react-dnd-html5-backend';
import { Board } from '../components/Board';
import { Puzzle } from '../components/Puzzle';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <DragDropContextProvider backend={HTML5Backend}>
          <Board />
          <Puzzle id={1} />
        </DragDropContextProvider>
      </div>
    );
  }
}

export default App;
