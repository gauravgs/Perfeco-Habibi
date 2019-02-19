import React, { Component } from "react";
class NewRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  newRequestCreator = async () => {
    const { accounts, contract } = this.props;

    await contract.methods
      .NewRequest(this.state.stud)
      .send({ from: accounts[0] });
  };

  render() {
    return (
      <div>
        NEW REQUEST
        <br />
        <input
          onChange={r => {
            this.setState({ stud: r.target.value });
          }}
        />
        <button onClick={this.newRequestCreator}>Click</button>
      </div>
    );
  }
}

export default NewRequest;
