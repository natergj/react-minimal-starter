import React from "react";
import fetchOpts from "./fetchOpts";

const GitHubUserHooks = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [userInputValue, setUserInputValue] = React.useState("natergj");
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    setIsLoading(true);
    const username = userInputValue;
    const resp = await fetch(`https://api.github.com/users/${username}`, fetchOpts);
    const body = await resp.json();
    setIsLoading(false);
    setUser(body);
  };

  const onInputChange = (e) => {
    setUserInputValue(e.target.value);
  }

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      Fetch User (With Hooks):
      <input type="text" value={userInputValue} onChange={onInputChange} />
      <button onClick={fetchUser}>Fetch User</button>
      <br />
      {user ? (
        <table>
          <tbody>
            <tr>
              <td>avatar</td>
              <td>
                <img src={user.avatar_url} height={48} width={48} />
              </td>
            </tr>
            <tr>
              <td>email</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>company</td>
              <td>{user.company}</td>
            </tr>
            <tr>
              <td>login</td>
              <td>{user.login}</td>
            </tr>
            <tr>
              <td>name</td>
              <td>{user.name}</td>
            </tr>
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default GitHubUserHooks;
