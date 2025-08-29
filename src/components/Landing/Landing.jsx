import styles from "./Landing.module.scss";

const Landing = () => {
  return (
    <main className={styles.container}>
      <div className={styles.bodyText}>
        <h1>Qwish</h1>
        <h2>Making gift-giving easy, fun, and stress-free.</h2>
        <h2>Why use it?</h2>

        <h4>No more awkward gifts</h4>
        <p>Share exactly what you want. No more guessing needed!</p>

        <h4>Save Time</h4>
        <p>Friends and family will know exactly what to buy.</p>

        <h4>Collaborate on lists</h4>
        <p>Add items together for weddings, holidays, or birthdays.</p>

        <h4>No more returns</h4>
        <p>Get gifts you'll actually keep and love.</p>

        <h4>Better for the environment</h4>
        <p>Reduce waste from unwanted gifts.</p>

        <h2>How it Works</h2>
        <ol>
          <p>(3 step visual with screenshots)</p>
          <li>Create your wishlist</li>
          <li>Add items from anywhere</li>
          <li>Share with friends and family to purchase.</li>
        </ol>

        {/* Wait to show the Newsletter until it it complete */}
        {/* <h2>Newsletter Signup</h2>
        <p>(Newsletter signup form)</p> */}
      </div>
    </main>
  );
};

export default Landing;
