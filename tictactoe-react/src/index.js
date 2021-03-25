import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

//class Square extends React.Component {
  /*
  // In JavaScript classes, you need to always call super when defining 
  // the constructor of a subclass. All React component classes that have
  // a constructor should start with a super(props) call.
  // Removed since Square no longer keeps track of the game’s state, board does.
  // All React component classes that have a constructor should start with a super(props) call.
  constructor(props) {
    super(props);
    this.state = {
      value:null,
    };
  }
  */

  // In React, function components are a simpler way to write components that only 
  // contain a render method and don’t have their own state. Instead of defining 
  // a class which extends React.Component, we can write a function that takes 
  // props as input and returns what should be rendered.
function Square(props) {
  // The component receives the argument as a "props" object
  // onClick={() => alert('click')}, we’re passing a function as the onClick prop
  // Later it was simplified to what it is now.
  return (
    <button className="square" onClick= {props.onClick}>   
      {props.value}  
    </button>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    // Passing value from array in Board to square.
    // Parenthesis after return so JavaScript does not add a semicolon.
    // We’re passing down 2 props from Board to Square: value and onClick
    return (
      <Square 
        value={this.props.squares[i]} 
        onClick={() => this.props.onClick(i)}
      />
    ); 
  }

  render() {
    return (
      <div>
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
  constructor(props) {
    super(props);
    this.state = {
      // array of arrays (array that contains all the turns)
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    // We call .slice() to create a copy of the squares array to modify instead of modifying the existing array.
    // We are not mutating the original squares array (changing the underlying data directly)
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    // return early (ignore click) if someone won already or sqaure is already filled
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";

    // When the Board’s state changes, the Square components re-render automatically.
    this.setState({
      // .concat does not mutate history (making a copy).
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 
        "Go to move #" + move :
        "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;

    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}



// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
