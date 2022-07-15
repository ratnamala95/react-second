import React from 'react';
import ReactDOM from 'react-dom/client';

class Square extends React.Component{
// we do not want to manage state in square 
// we want to manage it in board, therefore:
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         value: null,
    //     }
    // }

    render(){
        return(
            <button className='square' 
                onClick={() => this.props.onClick()}
            >
                {this.props.value}
            </button>
        );
    }
}


class Board extends React.Component{


    renderSquare(i){
        return <Square value={this.props.squares[i]}
            onClick={()=> this.props.onClick(i)}  
        />
    }

    render(){
        return(
            <div>
                {/* <div className='status'>{this.state.status}</div> */}
                <div className='board-row'>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true,
        };
    }

    handleClick(i){
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if(calculateWinner(squares) || squares[i]){
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares : squares
            }]),
            xIsNext: !this.state.xIsNext,
        })
    }


    render(){
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step,move)=>{
            const desc = move ? 
            'Go to move# '+move:
            'Go to game start';
// moves are not being changed in any way, not being moved, inserted in middle
// or deleted from middle hencevthey hav unique ids and can be used as keys in li
            return(
                <li key={move}>
                    <button onClick={()=>this.jumpTo(move)}>{desc}</button>
                </li>
            );
        })

        let status;

        if(winner){
            status = 'Winner ' + winner;
        }else{
            status = 'Next Player: '+ (this.state.xIsNext ? 'X':'O');
        }

        return(
            <div>
                <div className='game'>
                <Board 
                    squares = {current.squares}
                    onClick = {(i) => this.handleClick(i)}
                />
            </div>
            <div className='game-info'>
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
            </div>
        );
    }
}

function calculateWinner(squares){
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
    for(let i=0; i<lines.length;i++){
       const [a,b,c] = lines[i];
       if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
        return squares[a];
       }
    }
    return null;
}

const root  = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game />);