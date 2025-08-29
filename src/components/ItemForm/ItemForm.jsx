import { useState } from "react";
import { useNavigate, useParams } from "react-router"; 
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
  const [searchResults, setSearchResults] = useState([]);
  const { listId } = useParams();

  const navigate = useNavigate();

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

    const success = await handleAddItem(itemData);

    // if (success) {
    //   navigate(`/lists/${listId}`);
    // } else {
    //   console.error("Failed to add item");
    // }
  };

  const showSuggestions = () => {
    walmartSearch(search).then((e) => setSearchResults(e.organic_results));
  };

  const handleSelect = (item) => {
    setProductId(item.product_id);
    setName(item.title);
    setImg(item.thumbnail);
    setDescription(item.link);
    setPrice(item.extracted_price);
    setQuantity(1);
    setSearch('');
    setSearchResults([]);
  };

  return (
    <section className={styles.container} style={{ display: "flex", gap: "90px" }}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Id: </label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL: </label>
          <input
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
        </div>
        <div>
          <label>Description: </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Price: </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Quantity: </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <button type="submit">Add Item</button>
      </form>

      {/* Search for Walmart items */}
      <div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder="Search product on Walmart"
        />
        <button onClick={showSuggestions}>Search</button>
        <div className="flex-container">
          {searchResults.map((item, idx) => (
            <div key={idx} className="walmart_item">
              <div>
                <h3>{item.title}</h3>
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default ItemForm;