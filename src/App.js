import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./utils/getWeb3";
import MultiSig from "./Student/MultiSig.jsx";
import Upload from "./Student/Upload.jsx";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  BrowserRouter
} from "react-router-dom";
import NewRequest from "./Institute/NewRequest.jsx";
import MyRequest from "./Student/MyRequest.jsx";
import Routes from "./Routes/Routes.jsx";
import MyRequestInst from "./Institute/MyRequestInst.jsx";
import MyProfile from "./Student/MyProfile.jsx";
import MyInstitute from "./Institute/MyInstitute.jsx";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const web3 = await getWeb3();

    // Use web3 to get the user's accounts.
    const y = await web3.eth;

    // // Stores a given value, 5 by default.
    // await contract.methods.set(120).send({ from: accounts[0] });

    // // // Get the value from the contract to prove it worked.

    // // Update state with the result.

    // await contract.methods
    //   .createNewMultiSigbyUser(accounts[0])
    //   .send({ from: accounts[0] });

    // await contract.methods.uploadAadhar("PURE").send({ from: accounts[0] });

    // var res = await contract.methods.getAadhar().call();
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <BrowserRouter>
          <div style={{ margin: "50px", height: "100px" }}>
            {" "}
            <Routes />
            <Switch>
              <Route
                path="/create"
                component={() => (
                  <MultiSig
                    accounts={this.state.accounts}
                    contract={this.state.contract}
                  />
                )}
              />
              <Route
                path="/upload"
                component={() => (
                  <Upload
                    accounts={this.state.accounts}
                    contract={this.state.contract}
                  />
                )}
              />{" "}
              <Route
                path="/my"
                component={() => (
                  <MyProfile
                    accounts={this.state.accounts}
                    contract={this.state.contract}
                  />
                )}
              />{" "}
              <Route
                path="/myi"
                component={() => (
                  <MyInstitute
                    accounts={this.state.accounts}
                    contract={this.state.contract}
                  />
                )}
              />{" "}
              {/* <Route
                path="/new"
                component={() => (
                  <NewRequest
                    accounts={this.state.accounts}
                    contract={this.state.contract}
                  />
                )}
              />{" "}
              <Route
                path="/my"
                component={() => (
                  <MyRequest
                    accounts={this.state.accounts}
                    contract={this.state.contract}
                  />
                )}
              />{" "}
              <Route
                path="/myi"
                component={() => (
                  <MyRequestInst
                    accounts={this.state.accounts}
                    contract={this.state.contract}
                  />
                )}
              />{" "}
              */}{" "}
            </Switch>{" "}
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
