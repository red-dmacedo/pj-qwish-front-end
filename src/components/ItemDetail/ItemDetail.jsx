import { useState } from "react";

const ItemDetails = () => {
  const [item, setItem] = useState();
};

if (!item) return <main>Loading...</main>;
return (
  <main>
    <section>
      <header>
        <h1>{item.title}</h1>
      </header>
    </section>
  </main>
)




export default ItemDetails;
