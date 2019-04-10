import React from "react";
import fetchOpts from "./fetchOpts";

class GitHubUserClass extends React.Component {
  state = {
    isLoading: false,
    userInputValue: "natergj",
    user: null
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({ isLoading: true });
    const username = this.state.userInputValue;
    const resp = await fetch(`https://api.github.com/users/${username}`, fetchOpts);
    const body = await resp.json();
    this.setState({ user: body, isLoading: false })
  };

  onInputChange = (e) => {
    this.setState({
      userInputValue: e.target.value,
    });
  }

  render() {
    if (this.state.isLoading) return <div>Loading...</div>
    return (
      <div>
        Fetch User (With Class):
        <input type="text" value={this.state.userInputValue} onChange={this.onInputChange} />
        <button onClick={this.fetchUser}>Fetch User</button>
        <br />
        {this.state.user ? (
          <table>
            <tbody>
              <tr>
                <td>avatar</td>
                <td>
                  <img src={this.state.user.avatar_url} height={48} width={48} />
                </td>
              </tr>
              <tr>
                <td>email</td>
                <td>{this.state.user.email}</td>
              </tr>
              <tr>
                <td>company</td>
                <td>{this.state.user.company}</td>
              </tr>
              <tr>
                <td>login</td>
                <td>{this.state.user.login}</td>
              </tr>
              <tr>
                <td>name</td>
                <td>{this.state.user.name}</td>
              </tr>
            </tbody>
          </table>
        ) : null}
      </div>
    );
  }
}

export default GitHubUserClass;
