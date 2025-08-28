import { useState } from "react";
import { useNavigate } from "react-router";
import { search as walmartSearch } from "../../services/walmartService";
import styles from "./ItemForm.module.scss";

const ItemForm = ({ existingItem, handleAddItem, handleUpdateItem }) => {
  const [name, setName] = useState(existingItem?.name || null);
  const [img, setImg] = useState(existingItem?.img || null);
  const [description, setDescription] = useState(existingItem?.description || null);
  const [price, setPrice] = useState(existingItem?.price || null);
  const [quantity, setQuantity] = useState(existingItem?.quantity || null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const itemData = {
      name,
      img,
      description,
      price: price === "" ? null : Number(price),
      quantity: quantity === "" ? null : Number(quantity),
    };

    if (existingItem) {
      await handleUpdateItem(existingItem._id, itemData);
      navigate("/items");
    } else {
      await handleAddItem(itemData);
      navigate("/items");
    }
  };
  
  // other contributor additions 
  function showSuggestions() {
    walmartSearch(search).then((e) => setSearchResults(e.organic_results));
  }
  function handleSelect(item){
    setName(item.title)
    setImg(item.thumbnail)
    setDescription(item.link)
    setPrice(item.extracted_price)
    setQuantity(1)
    setSearch('')
    setSearchResults([])
  }
//=================================

  return (
    <section className={styles.container} style={{ display: "flex", gap: "90px" }}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name || ""}
            onChange={(e) => setName(e.target.value || null)}
            required
          />
        </div>
        <div>
          <label>Image URL: </label>
          <input
            type="text"
            value={img || ""}
            onChange={(e) => setImg(e.target.value || null)}
          />
        </div>
        <div>
          <label>Description: </label>
          <textarea
            value={description || ""}
            onChange={(e) => setDescription(e.target.value || null)}
          />
        </div>
        <div>
          <label>Price: </label>
          <input
            type="number"
            value={price || ""}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Quantity: </label>
          <input
            type="number"
            value={quantity || ""}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <button 
        type="submit">
          {existingItem ? "Update Item" : "Add Item"}
        </button>
      </form>

      {/* //other contributor additions */}
      <div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder="search product on walmart"
        />
        <button onClick={showSuggestions}>Search</button>
        <div className="flex-container">
          {searchResults.map((item, idx) => (
            <div key={idx} className="walmart_item" >
              <div>
                <h3>{item.title}</h3>
                <h4>{item.price}</h4>
              </div>
              <div>
                <img src={item.thumbnail} alt={item.title} />
                <a href={item.link} target="_blank">
                  Walmart Link
                </a><br/>
                <button onClick={()=>handleSelect(item)}>Select</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ItemForm;
