import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const Detail = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [article, setArticle] = useState(null);
  const path = pathname.split("/");
  const finalpath = Number(path[1]) - 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://65841ac24d1ee97c6bcefd4e.mockapi.io/hotellistings");
        const data = await response.json();
        setArticle(data[finalpath]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [finalpath]);

  return (
    <div className="flex justify-center container mx-auto p-4">
      {article ? (
        <div className="bg-white border p-4 shadow-md rounded-md">
          <img src={article.imageURL} alt={article.name} className="w-full h-40 object-cover mb-4" />
          <div className="text-gray-800">
            <h2 className="text-xl font-bold mb-2">{article.name}</h2>
            <p className="text-sm mb-2">{article.description}</p>
            <p className="text-gray-700 mb-2">Listed By: {article.listedBy}</p>
            <p className="text-gray-700 mb-2">Zipcode: {article.zipcode}</p>
            <p className="text-blue-500 font-bold">Price: ${article.price}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

