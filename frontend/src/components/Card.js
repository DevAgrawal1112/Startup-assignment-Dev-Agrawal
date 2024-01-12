import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { API_KEY } from "./Apikey";
import { Backend_Url } from "./BackendUrl";

export const Card = () => {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedArticleId, setSelectedArticleId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const articlesPerPage = 4;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(Backend_Url);
                const data = await response.json();
                setArticles(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const customRectangleIcon = {
        path: 'M -10 -5 L -10 5 L 10 5 L 10 -5 Z',
        fillColor: 'orange',
        fillOpacity: 1,
        strokeColor: 'black',
        strokeWeight: 1,
        scale: 3,
      };

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleArticleClick = (articleId) => {
        navigate(`/${articleId}`);
        setSelectedArticleId(articleId);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const filteredArticles = articles.filter(article =>
        article.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const containerStyle = {
        width: '1000px',
        height: '650px'
      };
    const center = {
        lat: -3.745,
        lng: -38.523
    };
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_KEY,
      })

    return (
        <div className="flex border-b-2 border-black">
            <div className="flex border-r-2 border-black w-7/12">
                {isLoaded &&(
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={1}
                    >
                    {filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle).map((article) => (
                        <Marker
                        key={
                            article.id
                        }
                        position={{
                          lat: parseFloat(article.latitude),
                          lng: parseFloat(article.longitude),
                        }}
                        label={
                            `$ ${article.price}`
                        }
                        icon={
                            customRectangleIcon
                        }
                        title={
                            article.name
                        }
                        >
                      </Marker>
                    ))}           
                    </GoogleMap>
                )}
            </div>
            <div className="w-5/12">
                <div className=" pt-4 flex justify-center">
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="p-2 border rounded"
                    />
                </div>
                <div className="border-b-2 border-black flex flex-wrap">
                    {filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle).map(article => (
                        <div key={article.id} className="w-1/2 p-4">
                            <div className={`bg-white border rounded p-4 shadow cursor-pointer ${selectedArticleId === article.id ? 'border-blue-500' : ''}`} onClick={() => handleArticleClick(article.id)}>
                                <img src={article.imageURL} alt={article.name} className="w-full h-32 object-cover mb-4" />
                                <h3 className="text-lg font-bold mb-2">{article.name}</h3>
                                <p className="text-blue-500 font-bold">Price:  $ {article.price}</p>
                                <p className="text-gray-600">Listed By: {article.listedBy}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-2 mr-10 pb-2 flex justify-center">
                    <button
                        className={`mx-1 px-4 py-2 ${currentPage === 1 ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <button
                        className={`mx-1 px-4 py-2 ${currentPage + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => paginate(currentPage + 1)}
                    >
                        {currentPage}
                    </button>
                    <button
                        className={`mx-1 px-4 py-2 ${currentPage === Math.ceil(filteredArticles.length / articlesPerPage) ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === Math.ceil(filteredArticles.length / articlesPerPage)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};
