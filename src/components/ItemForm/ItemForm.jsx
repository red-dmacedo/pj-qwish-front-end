import { useState } from "react";
import { useParams } from "react-router";
import { search as walmartSearch } from "../../services/walmartService";
import styles from "./ItemForm.module.scss";

const ItemForm = ({ handleAddItem }) => {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const { listId } = useParams();
  const [itemSelected, setItemSelected] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const itemData = {
      product_id: productId,
      name,
      img,
      description,
      price: price ? Number(price) : null,
      quantity: quantity ? Number(quantity) : null,
      listId,
    };

    /*const success =*/
    await handleAddItem(itemData);
  };

  const showSuggestions = () => {
    setLoading(true);
    walmartSearch(search).then((e) => {
      setLoading(false);
      setSearchResults(e.organic_results);
    });
  };

  const handleSelect = (item) => {
    setProductId(item.product_id);
    setName(item.title);
    setImg(item.thumbnail);
    setDescription(item.link);
    setPrice(item.extracted_price);
    setQuantity(1);
    setSearch("");
    setSearchResults([]);
    setItemSelected(true);
  }

  const handleCancel = () => {
    setProductId("");
    setName("");
    setImg("");
    setDescription("");
    setPrice("");
    setQuantity(1);
    setItemSelected(false); // Reset item selected state
  };

  return (
    <section
      className={styles.container}
      style={{ display: "flex", gap: "90px" }}
    >
      {itemSelected && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.input}>
            <label className={styles.label}>Product Id: </label>
            <input
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
            />
          </div>
          <div className={styles.input}>
            <label className={styles.label}>Name: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.input}>
            <label className={styles.label}>Image URL: </label>
            <input
              type="text"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
          </div>
          <div className={styles.input}>
            <label className={styles.label}>Description: </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={styles.input}>
            <label className={styles.label}>Price: </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className={styles.input}>
            <label className={styles.label}>Quantity: </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <button type="submit">Add Item</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      )}

      {/* Search for Walmart items */}
      <div className={styles.search_form}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder="Search product on Walmart"
        />
        <button className={styles.search_Btn} onClick={showSuggestions}>Search</button>
        <div className={styles.flex_container}>
          {Array.isArray(searchResults) ? (
            searchResults.map((item, idx) => (
              <div key={idx} className={styles.walmart_item}>
                <div>
                  <h3>{item.title}</h3>
                  <p>Rating: {item.rating}</p>
                  <h4>{item.price}</h4>
                </div>
                <div>
                  <img src={item.thumbnail} alt={item.title} />
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    Walmart Link
                  </a>
                  <br />
                  <button onClick={() => handleSelect(item)}>Select</button>
                </div>
              </div>
            ))
          ) : loading ? (
            <img src="/loading.svg" />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ItemForm;
