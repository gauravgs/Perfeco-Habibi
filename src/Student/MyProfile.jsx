import React, { Component } from "react";
class MyProfile extends Component {
  state = { list: [], lis: [] };
  sa = async () => {
    const { accounts, contract } = this.props;
    const response = await contract.methods.getOwners(accounts[0]).call();

    this.setState({ owner1: response[0] });
    this.setState({ owner2: response[1] });

    const response2 = await contract.methods
      .getUploadReqList(accounts[0])
      .call();

    this.setState({ lis: response2 });

    const response3 = await contract.methods.getAadhar().call();

    this.setState({ aadhar: response3 });

    console.log("aa", response3);
  };

  render() {
    return (
      <div>
        <div>
          <button onClick={this.sa}>Check</button>
          <h4>owner1 :{this.state.owner1}</h4>
          <h4>owner2:{this.state.owner2}</h4>
          <hr />
        </div>

        <div>Upload Request List</div>

        {this.state.lis.map(lis => {
          return (
            <div>
              <h4>{lis} </h4>
            </div>
          );
        })}
        <hr />
        <div>
          <h3>Aadhar : {this.state.aadhar}</h3>
        </div>
        <div />
      </div>
    );
  }
}

export default MyProfile;
