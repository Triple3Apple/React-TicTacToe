import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Square extends React.Component {
  /*
  // In JavaScript classes, you need to always call super when defining 
  // the constructor of a subclass. All React component classes that have
  // a constructor should start with a super(props) call.
  // Removed since Square no longer keeps track of the game’s state, board does.
  constructor(props) {
    super(props);
    this.state = {
      value:null,
    };
  }
  */

  render() {
    return (
      // The component receives the argument as a "props" object
      // onClick={() => alert('click')}, we’re passing a function as the onClick prop
      <button 
        className="square" 
        onClick= {() => this.props.onClick() }
      >   
        {this.props.value}  
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  renderSquare(i) {
    // Passing value from array in Board to square.
    // Parenthesis after return so JavaScript does not add a semicolon.
    // We’re passing down 2 props from Board to Square: value and onClick
    return (
      <Square 
        value={this.state.squares[i]} 
        onClick={() => this.handleClick(i)}
      />
    ); 
  }

  render() {
    const status = "Next player: X";

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
