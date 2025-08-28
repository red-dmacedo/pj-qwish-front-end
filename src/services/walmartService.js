// import {mock} from './mock_walmart'
const BASE_URL = `https://www.searchapi.io/api/v1/search?engine=walmart_search`;
// const BASE_URL = `https://cors-ytzt.onrender.com/api?engine=walmart_search`;



const search = async (q) => {
  try {
    if(q.length>3){

    //for testing purposes we will use mock because api only gave us 100 free requests (3 used already)
    //delete this line after development of adding items part is working
    // return mock


        const res = await fetch(`${BASE_URL}&q=${q}`, {
            headers: { Authorization: `Bearer ${import.meta.env.VITE_WALMART_SEARCH_API}` },
        });
        
        const data = await res.json();
        
        if (data.err) {
            throw new Error(data.err);
        }
        
        return data;
    }else{
        throw new Error('input should be more specific, longer then 3 letters');
    }
  } catch (err) {
    console.log(err);
    throw new Error(err);
  };
};

export {
  search
};