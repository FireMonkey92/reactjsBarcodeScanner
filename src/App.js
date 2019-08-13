import React, { Component } from "react";
import Scanner from "./components/Scanner";
import Result from "./components/Result";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scanning: false,
      results: []
    };
  }
  scan() {
    this.setState((prevState, props) => {
      return { scanning: !prevState.scanning };
    });
  }

  onDetected(result) {
    console.log(result);
    // this.setState({ results: this.state.results.concat([result]) });
    this.setState((prevState, props) => {
      return { scanning: !prevState.scanning };
    });
  }

  render() {
    console.log(this.state.scanning);

    return (
      <div>
        <button onClick={() => this.scan()}>
          {this.state.scanning ? "Stop" : "Start"}
        </button>
        <ul className="results">
          {this.state.results.map(result => (
            <Result key={result.codeResult.code} result={result} />
          ))}
        </ul>
        {this.state.scanning ? (
          <Scanner onDetected={result => this.onDetected(result)} />
        ) : null}
      </div>
    );
  }
}

export default App;
