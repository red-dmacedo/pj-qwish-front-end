import { useState } from "react";
import { signIn } from "../../api/controller";
import { useNavigate } from "react-router";

const SignIn = ({ setAuthenticated }) => {
  let navigate = useNavigate();

  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  function handleInput(e) {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  }
  async function handleRegister(e) {
    e.preventDefault();
    const token = await signIn(formState);
    if (token) {
      //store the token
      localStorage.setItem("token", token);
      setAuthenticated(token);
      navigate("/lists");
    }
  }

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="name"></label>
          <input
            required
            type="text"
            id="name"
            name="username"
            value={formState.username}
            onChange={handleInput}
          />
        </div>
        <div>
          <label htmlFor="password"></label>
          <input
            required
            type="password"
            id="password"
            name="password"
            value={formState.password}
            onChange={handleInput}
          />
        </div>
        <button>login</button>
      </form>
    </section>
  );
};

export default SignIn;
