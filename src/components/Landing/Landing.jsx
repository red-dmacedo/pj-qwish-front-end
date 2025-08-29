import styles from "./Landing.module.scss";

const Landing = () => {
  return (
    <main className={styles.container}>
      <h1 className={styles.dynapuffH1}>Qwish</h1>
      <h2>Making gift-giving easy, fun, and stress-free.</h2>

      <h2 className={styles.dynapuffH1}>Why use it?</h2>

      <div className={styles.why}>
      <div className={styles.container}>
      <h1 className={styles.dynapuffH1}>1.</h1>
      <div className={styles.whyGrid}>
      <p><b>No more awkward gifts</b><br />
      Share exactly what you want. No more guessing needed!</p>
      </div>
      </div>

      <div className={styles.container}>
      <h1 className={styles.dynapuffH1}>2.</h1>
      <div className={styles.whyGrid}>
      <p><b>Stay organized</b><br />
      Qwish keeps all your lists in one spot! No need for notes, screenshots, or random links.</p>
      </div>
      </div>

      <div className={styles.container}>
      <h1 className={styles.dynapuffH1}>3.</h1>
      <div className={styles.whyGrid}>
      <p><b>Save time</b><br />
      Friends and family will know exactly what to buy instead of shopping for hours.</p>
      </div>
      </div>

      <div className={styles.container}>
      <h1 className={styles.dynapuffH1}>4.</h1>
      <div className={styles.whyGrid}>
      <p><b>Collaborate on lists</b>
      <br />Add items together for weddings, holidays, or birthdays.</p>
      </div>
      </div>

       <div className={styles.container}>
      <h1 className={styles.dynapuffH1}>5.</h1>
      <div className={styles.whyGrid}>
      <p><b>No more returns</b><br />
      Get gifts you'll actually keep and love.</p>
      </div>
      </div>

      <div className={styles.container}>
      <h1 className={styles.dynapuffH1}>6.</h1>
      <div className={styles.whyGrid}>
      <p><b>Better for the environment</b><br />
      Reduce waste from unwanted gifts.</p>
      </div>
      </div>
      </div>

      <h2 className={styles.dynapuffH1}>How it Works</h2>
      <p>(3 step visual with screenshots)</p>
      <p>1. Create your wishlist <br />
      2. Add items from anywhere <br />
      3. Share with friends and family to purchase.</p>

      <h2 className={styles.dynapuff}>Subscribe to our Newsletter</h2>
      <form action="">
        <input type="email" 
        value="Your email"/>
        <button>Subscribe</button>
      </form>
    </main>
  );
};

export default Landing;
