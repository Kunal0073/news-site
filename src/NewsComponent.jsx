import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewsApp.css';

const NewsApp = () => {
    const [articles, setArticles] = useState([]);
    const [category, setCategory] = useState('general');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=45606d6f68af4e08aa2e780b5fec6a87`;

                if (searchQuery) {
                    url = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=45606d6f68af4e08aa2e780b5fec6a87`;
                }

                const response = await axios.get(url);
                setArticles(response.data.articles);
            } catch (error) {
                setError(`Error fetching data. Please try again later.\nError :\n${error}`);
            }

            setIsLoading(false);
        };

        fetchData();
    }, [category, searchQuery]);

    const handleCategoryChange = (selectedCategory) => {
        setCategory(selectedCategory);
        setSearchQuery('');
    };

    const handleSearch = (event) => {
        event.preventDefault();
        setCategory('general');
        setSearchQuery(event.target.search.value);
    };

    return (
        <div className="news-app">
            <div className="news-app__header">
                <h1 className="news-app__title">React News App</h1>
                <form className="news-app__search-form" onSubmit={handleSearch}>
                    <input
                        type="text"
                        name="search"
                        placeholder="Search for news..."
                        className="news-app__search-input"
                    />
                    <button type="submit" className="news-app__search-button">
                        Search
                    </button>
                </form>
            </div>

            {isLoading ? (
                <p className="news-app__loading">Loading...</p>
            ) : error ? (
                <p className="news-app__error">{error}</p>
            ) : (
                <>
                    <div className="news-app__categories">
                        <button
                            className={`news-app__category ${category === 'general' ? 'active' : ''
                                }`}
                            onClick={() => handleCategoryChange('general')}
                        >
                            General
                        </button>
                        <button
                            className={`news-app__category ${category === 'sports' ? 'active' : ''
                                }`}
                            onClick={() => handleCategoryChange('sports')}
                        >
                            Sports
                        </button>
                        <button
                            className={`news-app__category ${category === 'technology' ? 'active' : ''
                                }`}
                            onClick={() => handleCategoryChange('technology')}
                        >
                            Technology
                        </button>
                        <button
                            className={`news-app__category ${category === 'business' ? 'active' : ''
                                }`}
                            onClick={() => handleCategoryChange('business')}
                        >
                            Business
                        </button>
                        <button
                            className={`news-app__category ${category === 'entertainment' ? 'active' : ''
                                }`}
                            onClick={() => handleCategoryChange('entertainment')}
                        >
                            Entertainment
                        </button>
                        <button
                            className={`news-app__category ${category === 'health' ? 'active' : ''
                                }`}
                            onClick={() => handleCategoryChange('health')}
                        >
                            Health
                        </button>
                        <button
                            className={`news-app__category ${category === 'science' ? 'active' : ''
                                }`}
                            onClick={() => handleCategoryChange('science')}
                        >
                            Science
                        </button>
                    </div>

                    <ul className="news-app__list">
                        {articles.map((article, index) => (
                            <li className="news-app__item" key={index}>
                                <img
                                    className="news-app__item-image"
                                    src={article.urlToImage || '/placeholder-image.png'}
                                    alt={article.title}
                                />
                                <div className="news-app__item-details">
                                    <h2 className="news-app__item-title">{article.title}</h2>
                                    <p className="news-app__item-description">
                                        {article.description}
                                    </p>
                                    <p className="news-app__item-source">
                                        Source: {article.source?.name || 'Unknown'}
                                    </p>
                                    <a
                                        className="news-app__item-link"
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Read More
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default NewsApp;
