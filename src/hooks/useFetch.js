// import { useEffect, useState, useRef } from "react";
// import axios from "axios";
// export const useFetch = (url) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(null);
//   const [errors, setErrors] = useState(null);
//   console.log('----8998')
//   const loadData = async () => {
//     try {
//       setLoading(true);
//       setErrors(null);
//       setData(null);

//       const resp = await axios.get(url);
//       setData(resp.data);
//     } catch (err) {
//       setErrors(err.toString());
//     } finally {
//       setLoading(false);
//     }
//   };

//   const ref = useRef(null);
//   ref.current = () => {
//     loadData();
//   };
//   useEffect(() => {
//     ref.current();
//   }, [url]);

//   return [data, loading, errors];
// };
