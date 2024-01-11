import React, { useEffect, useState } from "react";

export const Card = ({setselectedArticleId}) => {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedArticleId, setSelectedArticleId] = useState(null);
    const articlesPerPage = 4;
    const fixedSize = 10;

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

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleArticleClick = (articleId) => {
        setSelectedArticleId(articleId);
    };

    return (
        <div>
            <div className="flex flex-wrap">
                {currentArticles.map(article => (
                    <div key={article.id} className="w-1/2 p-4">
                        <div className={`bg-white border rounded p-4 shadow cursor-pointer ${selectedArticleId === article.id ? 'border-blue-500' : ''}`} onClick={() => handleArticleClick(article.id)}>
                            <img src={article.imageURL} alt={article.name} className="w-full h-32 object-cover mb-4" />
                            <h3 className="text-lg font-bold mb-2">{article.name}</h3>
                            <p className="text-gray-700 mb-2">{article.description}</p>
                            <p className="text-blue-500 font-bold">Price: {article.price}</p>
                            <p className="text-gray-600">Listed By: {article.listedBy}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex justify-center">
                <button
                    className={`mx-1 px-4 py-2 ${currentPage === 1 ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {Array.from({ length: Math.min(articles.length / articlesPerPage, fixedSize) }, (_, index) => (
                    <button
                        key={index}
                        className={`mx-1 px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => paginate(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className={`mx-1 px-4 py-2 ${currentPage === Math.ceil(articles.length / articlesPerPage) ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(articles.length / articlesPerPage)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};
