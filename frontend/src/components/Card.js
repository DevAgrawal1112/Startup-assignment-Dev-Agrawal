import React, { useEffect, useState } from "react";
import styled from 'styled-components';

export const Card = () => {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://65841ac24d1ee97c6bcefd4e.mockapi.io/hotellistings");
                const data = await response.json();
                console.log(data[0].name);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            
        </div>
    );
};