import styles from "./Landing.module.scss";

import Gift from '../../assets/images/gift.jpg';
import qwishForm from '../../assets/images/qwishlistForm.png';
import qwishlist from '../../assets/images/qwishlist.png';
import findFriends from '../../assets/images/findFriendsPage.png';

const Landing = () => {
  return (
    <main className={styles.container}>
      {/* Qwish intro */}
      <h1 className={styles.dynapuffH1}>Qwish</h1>
      <h2>Making gift-giving easy, fun, and stress-free.</h2>
      <img src={Gift} alt="gifts" />

      {/* Why use it? Section */}
      <h2 className={styles.dynapuffH1}>Why use Qwish?</h2>

      <div className={styles.why}>
        <div className={styles.whyContainer}>
          <div className={styles.container}>
            <h1 className={styles.dynapuffH1}>1.</h1>
            <div className={styles.whyGrid}>
              <p>
                <b>No more awkward gifts</b>
                <br />
                Share exactly what you want. Everyone gives with confidence.
                Skip guessing and fake liking a gift.
              </p>
            </div>
          </div>

          <div></div>

          <div className={styles.container}>
            <h1 className={styles.dynapuffH1}>2.</h1>
            <div className={styles.whyGrid}>
              <p>
                <b>Stay organized</b>
                <br />
                Qwish keeps all your lists in one spot! No need for notes,
                screenshots, or random links.
              </p>
            </div>
          </div>

          <div className={styles.container}>
            <h1 className={styles.dynapuffH1}>3.</h1>
            <div className={styles.whyGrid}>
              <p>
                <b>Save time</b>
                <br />
                Friends and family will know exactly what to buy instead of
                shopping for hours.
              </p>
            </div>
          </div>

          <div></div>

          <div className={styles.container}>
            <h1 className={styles.dynapuffH1}>4.</h1>
            <div className={styles.whyGrid}>
              <p>
                <b>Collaborate on lists</b>
                <br />
                Add items together for weddings, holidays, or birthdays.
              </p>
            </div>
          </div>

          <div className={styles.container}>
            <h1 className={styles.dynapuffH1}>5.</h1>
            <div className={styles.whyGrid}>
              <p>
                <b>No more returns</b>
                <br />
                Get gifts you'll actually keep and love.
              </p>
            </div>
          </div>

          <div></div>

          <div className={styles.container}>
            <h1 className={styles.dynapuffH1}>6.</h1>
            <div className={styles.whyGrid}>
              <p>
                <b>Better for the environment</b>
                <br />
                Reduce waste from unwanted gifts.
              </p>
            </div>
          </div>
        </div>
      </div>

    {/* How it Works Section */}
      <h2 className={styles.dynapuffH1}>How it Works</h2>
      <div className={styles.screenGrid}>
        <img src={qwishForm} alt="screenshot of qwish form" />
        <img src={qwishlist} alt="screenshot of qwishlist" />
        <img src={findFriends} alt="screenshot of find friends page" />
      </div>
      <ol>
        <li>Create a wishlist</li>
        <li>Add items from anywhere</li>
        <li>Share with friends and family to purchase!</li>
      </ol>

{/* Subscribe to Newsletter section */}
<div className={styles.subNewsletter}>
      <h2 className={styles.dynapuffH1}>Subscribe to our Newsletter</h2>
      <form action="">
        <input type="email" placeholder="Your email" />
        <button>Subscribe</button>
      </form>
</div>
    </main>
  );
};

export default Landing;
