import { useState, useEffect } from "react";

const ItemDetails = () => {
  const [item, setItem] = useState(null);


useEffect(() => {
    const fetchItem = async () => {
      const itemData = await itemService.show(itemId);
      setItem(itemData);
    };
    fetchItem();
  }, [itemId]);

// if (!item) return <main>Loading...</main>;

return (
  <main>
    <section>
      <header>
        <p>{item.img}</p>
        <h2>{item.title}</h2>
        <p>{item.details}</p>
      </header>
    </section>
  </main>
)

};

export default ItemDetails;
