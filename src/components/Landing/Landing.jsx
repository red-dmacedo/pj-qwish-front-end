import styles from "./Landing.module.scss";

const Landing = () => {
  return (
    <main className={styles.container}>
      <h1>Qwish</h1>
      <h2>Making gift-giving easy, fun, and stress-free.</h2>

      <h2>Why use it?</h2>
      <p><b>No more awkward gifts</b><br />
      Share exactly what you want. No more guessing needed!</p>

      <p><b>Save time</b><br />
      Friends and family will know exactly what to buy.</p>

      <p><b>Collaborate on lists</b>
      <br />Add items together for weddings, holidays, or birthdays.</p>

      <p><b>No more returns</b><br />
      Get gifts you'll actually keep and love.</p>
      <p><b>Better for the environment</b><br />
      Reduce waste from unwanted gifts.</p>

      <h2>How it Works</h2>
      <p>(3 step visual with screenshots)</p>
      <p>1. Create your wishlist <br />
      2. Add items from anywhere <br />
      3. Share with friends and family to purchase.</p>

      <h2>Newsletter Signup</h2>
      <p>(Newsletter signup form)</p>
    </main>
  );
};

export default Landing;
