import { useState, useEffect } from "react";
import { useParams } from "react-router";
import styles from "./QwishForm.module.scss";

import * as qwishService from "../../services/qwishService";

const QwishForm = (props) => {
  const { listId } = useParams();

  useEffect(() => {
    const fetchList = async () => {
      const listData = await qwishService.show(listId);
      setFormData({
  ...listData, closeDate: listData.closeDate.split("T")[0],
      });
    };
    if (listId) fetchList();

    return () =>
      setFormData({
        name: "",
        description: "",
        closeDate: new Date().toLocaleDateString("en-CA"),
      });
  }, [listId]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    closeDate: new Date().toISOString().split("T")[0],
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (listId) {
      props.handleUpdateList(listId, formData);
    } else {
      props.handleAddList(formData);
    }
  };

  return (
    <main className={styles.container}>
      <h2 className={styles.dynapuff}>{listId ? "Edit List" : "Add a New Qwishlist"}</h2>
      <form onSubmit={handleSubmit}>
      <label htmlFor="">Event Name</label>
        <input
          required
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          />
        <label htmlFor="">Event Description</label>
        <textarea
          type="text"
          value={formData.description}
          name="description"
          onChange={handleChange}
          />
        <label htmlFor="">List Closing Date</label>
        <input
          type="date"
          name="closeDate"
          value={formData.closeDate}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </main>
  );
};

export default QwishForm;