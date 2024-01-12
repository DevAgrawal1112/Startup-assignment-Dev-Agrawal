import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Backend_Url } from "./BackendUrl";
export const Detail = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [article, setArticle] = useState(null);
  const path = pathname.split("/");
  const finalpath = Number(path[1]) - 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(Backend_Url);
        const data = await response.json();
        setArticle(data[finalpath]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [finalpath]);

  return (
    <div className="flex justify-center mt-10">
      {article ? (
        <div className="bg-white border p-4 shadow-md rounded-md ring-4 ring-blue-400">
          <img src={article.imageURL} alt={article.name} className="w-full h-40 object-cover mb-4" />
          <div className="text-gray-800">
            <h2 className="text-xl font-bold mb-2">{article.name}</h2>
            <p className="text-sm mb-2">{article.description}</p>
            <p className="text-gray-700 mb-2">Listed By: {article.listedBy}</p>
            <p className="text-gray-700 mb-2">Zipcode: {article.zipcode}</p>
            <p className="text-blue-500 font-bold">Price: ${article.price}</p>
            <button className="mt-5 text-white font-bold rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 py-2 px-6 shadow-md">Reserve</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
