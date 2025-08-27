import { useParams, Link } from 'react-router';
import { useState, useEffect } from 'react';

import * as qwishService from '../../services/qwishService';


const QwishDetails = () => {
    const [list, setList] = useState(null);
    const { listId } = useParams();

    useEffect(() => {
        const fetchList = async () => {
            const listData = await qwishService.show(listId);
            setList(listData);
        }
        fetchList();
    }, [listId]);

    if (!list) return <main>Loading...</main>;

    return (
<main>
    <section>
        <h2>{list.name} Qwishlist</h2>
        <p>{list.description}</p>
        <p>
  Close Date:{" "}
  {new Date(list.closeDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  })}
</p>
    </section>
</main>
    )
}

export default QwishDetails;