import React, { useEffect, useState } from "react";
import { Card } from "./Card";

export const Detail = () => {
    const [articles, setArticles] = useState([]);
    const [selectedArticle,setSelectedArticle] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://65841ac24d1ee97c6bcefd4e.mockapi.io/hotellistings");
                const data = await response.json();
                console.log(data[0].name)
                setArticles(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    return (
        <div>

        </div>
    )
}