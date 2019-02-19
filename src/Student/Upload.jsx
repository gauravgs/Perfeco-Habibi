import React, { Component } from "react";
import SimpleStorageContract from "../contracts/SimpleStorage.json";
import getWeb3 from "../utils/getWeb3";
import "../App.css";
import ipfs from "../ipfs";
import { Grid, Typography, Card, Button, Link } from "@material-ui/core";
class Upload extends Component {
  state = {
    aadhar: ""
  };

  captureFile = event => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      // this.setState({ buffer: Buffer(reader.result) });
      //   console.log("buffer", Buffer(reader.result));

      this.hj(Buffer(reader.result));
    };
  };
  hih = async () => {
    const { accounts, contract } = this.props;

    await contract.methods
      .uploadAadhar(this.state.aadhar)
      .send({ from: accounts[0] });
    const response = await contract.methods.getAadhar().call();

    this.setState({ response: response });
    console.log(this.state);
  };

  hj = async a => {
    await ipfs.add(a, (err, ipfsHash) => {
      console.log(err, ipfsHash);

      this.setState({ aadhar: ipfsHash[0].hash });
    });
  };
  newUpload = async () => {
    const { accounts, contract } = this.props;

    await await contract.methods
      .createUploadRequestbyUser(true, this.state.aadhar)
      .send({ from: accounts[0] });
  };

  runExample = async () => {
    // const { accounts, contract } = this.state;
    // // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });
    // // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();
    // // Update state with the result.
    // this.setState({ storageValue: response });
  };
  handleClick = e => {
    this.refs.myFileInput.chooseFile();
  };
  handleFileSelect(e, files) {
    console.log(e, files);
  }

  us = async () => {
    const { accounts, contract } = this.state;
    console.log(contract);
    await contract.methods
      .createNewMultiSigbyUser(accounts[0])
      .send({ from: accounts[0] });
  };
  render() {
    return (
      <div className="App">
        <div>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Card
                style={{
                  padding: "5px",
                  marginTop: "5px"
                }}
              >
                <Grid container>
                  <Grid item md={6}>
                    <h4> Aadhar</h4>
                  </Grid>
                  <Grid item md={3}>
                    <Button
                      onClick={() => {
                        if (this.state.aadhar.length > 0) {
                          window.open(
                            `https://gateway.ipfs.io/ipfs/${this.state.aadhar}`
                          );
                        } else {
                          window.alert("NULL");
                        }
                      }}
                      newUpload>
                      View{" "}
                    </Button>
                  </Grid>
                  <Grid item md={3}>
                    <Button>
                      <input onChange={this.captureFile} type="file" />{" "}
                    </Button>
                  </Grid>
                </Grid>

                <Button onClick={this.newUpload}>
                  Create A New Document Change/Upload Request
                </Button>
              </Card>
            </Grid>
          </Grid>
        </div>{" "}
      </div>
    );
  }
}

export default Upload;
