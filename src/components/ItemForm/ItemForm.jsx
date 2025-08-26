const ItemForm = (props) => {
  return (
    <main>
      {props.items.map((item) => (
        <p key={item._id}>{item.name}</p>
      ))}
    </main>
  )
};

export default ItemForm;