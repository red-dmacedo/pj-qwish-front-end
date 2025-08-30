import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { signUp } from "../../services/authService";
import { UserContext } from "../../contexts/UserContext";
import styles from "../SignInForm/SignInForm.module.scss";
import stylesSignUp from "./SignUpForm.module.scss";
import GiftSignUp from "../../assets/images/gift-signup.png";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    passwordConf: "",
  });

  const { firstName, lastName, username, password, passwordConf } = formData;

  const handleChange = (evt) => {
    setMessage("");
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newUser = await signUp(formData);
      setUser(newUser);
      navigate("/");
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <section className={stylesSignUp.container}>
      <img src={GiftSignUp} alt="gift" />
      <main className={styles.container}>
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <p>{message}</p>
          <div>
            <input
              type="text"
              id="firstName"
              value={firstName}
              name="firstName"
              onChange={handleChange}
              required
            />
            <label htmlFor="username">First Name</label>
          </div>
          <div>
            <input
              type="text"
              id="lastName"
              value={lastName}
              name="lastName"
              onChange={handleChange}
              required
            />
            <label htmlFor="username">Last Name</label>
          </div>
          <div>
            <input
              type="text"
              id="name"
              value={username}
              name="username"
              onChange={handleChange}
              required
            />
            <label htmlFor="username">Username</label>
          </div>
          <div>
            <input
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password</label>
          </div>
          <div>
            <input
              type="password"
              id="confirm"
              value={passwordConf}
              name="passwordConf"
              onChange={handleChange}
              required
            />
            <label htmlFor="confirm">Confirm Password</label>
          </div>
          <div>
            <button disabled={isFormInvalid()}>Sign Up</button>
            <button onClick={() => navigate("/sign-in")}>Sign In</button>
          </div>
        </form>
      </main>
    </section>
  );
};

export default SignUpForm;
