
import {Link} from 'react-router'

const ItemList = () => {
  return (
    <main>
      {props.items.map((item) => (
        <p key={item._id}>{item.title}</p>
      )
    )}
    </main>
  ) 
};

export default ItemList;