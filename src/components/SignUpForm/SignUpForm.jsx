import { useState } from "react";
import { signUp } from "../../api/controller";
import { useNavigate } from "react-router";

const SignUp = ({ setAuthenticated }) => {
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
    const token = await signUp(formState);
    if (token) {
      //store the token
      localStorage.setItem("token", token);
      setAuthenticated(token);
      navigate("/lists");
    }
  }

  return (
    <section>
      <h1>Register</h1>
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
        <button>register</button>
      </form>
    </section>
  );
};

export default SignUp;
