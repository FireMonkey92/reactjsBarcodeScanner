import React, { Component } from "react";
import Quagga from "quagga";

class Scanner extends Component {
  constructor(props) {
    super(props);
  }

  onDetected(result) {
    Quagga.stop();
    this.props.onDetected(result);
  }
  componentDidMount() {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          constraints: {
            width: 640,
            height: 480,
            facingMode: "environment" // or user
          }
        },
        locator: {
          patchSize: "medium",
          halfSample: true
        },
        numOfWorkers: 2,
        decoder: {
          readers: [
            "ean_reader",
            "ean_8_reader",
            "code_39_reader",
            "code_39_vin_reader",
            "codabar_reader",
            "upc_reader",
            "upc_e_reader"
          ]
        },
        locate: true
      },
      function(err) {
        if (err) {
          return console.log(err);
        }
        Quagga.start();
      }
    );
    Quagga.onDetected(res => this.onDetected(res));
  }
  componentWillUnmount() {
    Quagga.offDetected(this.onDetected);
  }
  render() {
    return <div id="interactive" className="viewport" />;
  }
}
export default Scanner;
