import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import scraped_data from '../../assets/scraped_data 2.csv';
import Navbar from '../Home/navbar';

export default function DhanchaMain() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCity, setSelectedCity] = useState('All');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
    const [cities, setCities] = useState([]);
    const [maxPrice, setMaxPrice] = useState(1000000);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const entriesPerPage = 25;

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    useEffect(() => {
        // Add custom CSS for Google Translate styling
        const style = document.createElement('style');
        style.textContent = `
            .goog-te-gadget {
                font-family: 'Inter', sans-serif !important;
            }
            .goog-te-gadget-simple {
                background-color: #3b82f6 !important;
                border: none !important;
                padding: 8px 16px !important;
                border-radius: 12px !important;
                font-size: 14px !important;
                line-height: 1.5 !important;
                color: white !important;
                box-shadow: 0 2px 10px rgba(59, 130, 246, 0.2) !important;
                transition: all 0.3s ease !important;
                margin: 8px !important;
                backdrop-filter: blur(10px) !important;
            }
            .goog-te-gadget-simple:hover {
                background-color: #2563eb !important;
                box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3) !important;
                transform: translateY(-1px) !important;
            }
            .goog-te-gadget-simple .goog-te-menu-value {
                color: white !important;
                display: flex !important;
                align-items: center !important;
                gap: 8px !important;
            }
            .goog-te-gadget-simple .goog-te-menu-value span {
                color: white !important;
                font-family: 'Inter', sans-serif !important;
            }
            .goog-te-gadget-simple .goog-te-menu-value span:first-child {
                display: none !important;
            }
            .goog-te-menu-value span + img {
                display: none !important;
            }
            .goog-te-menu-value span + img + span {
                display: none !important;
            }
            .goog-te-gadget-icon {
                display: none !important;
            }
            .goog-te-menu-frame {
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
                border-radius: 12px !important;
            }
            .VIpgJd-ZVi9od-l4eHX-hSRGPd, .VIpgJd-ZVi9od-l4eHX-hSRGPd:link, .VIpgJd-ZVi9od-l4eHX-hSRGPd:visited, .VIpgJd-ZVi9od-l4eHX-hSRGPd:hover, .VIpgJd-ZVi9od-l4eHX-hSRGPd:active {
                font-family: 'Inter', sans-serif !important;
            }
            #google_translate_element {
                transition: all 0.3s ease !important;
            }
            #google_translate_element.hidden {
                opacity: 0 !important;
                transform: translateY(-20px) !important;
                pointer-events: none !important;
            }
        `;
        document.head.appendChild(style);

        const addGoogleTranslateScript = () => {
            const script = document.createElement('script');
            script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.async = true;
            document.body.appendChild(script);
            return script;
        };

        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: 'en',
                    includedLanguages: 'hi',
                    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
                },
                'google_translate_element'
            );
        };

        const script = addGoogleTranslateScript();

        return () => {
            document.body.removeChild(script);
            document.head.removeChild(style);
            delete window.googleTranslateElementInit;
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(scraped_data);
            const reader = response.body.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder('utf-8');
            const csvData = decoder.decode(result.value);
            const parsedData = Papa.parse(csvData, { header: true }).data;
            
            const processedData = parsedData
                .filter(row => row.City && !row['Type of Angioplasty']) 
                .map(row => {
                    const costRange = row['Cost Range (INR)'] || row['Cost Range (in INR)'] || row['Cost'];
                    let avgCost = '';
                    
                    if (costRange) {
                        const numbers = costRange.match(/\d+(?:,\d+)*/g);
                        if (numbers && numbers.length >= 2) {
                            const min = parseInt(numbers[0].replace(/,/g, ''));
                            const max = parseInt(numbers[1].replace(/,/g, ''));
                            avgCost = Math.round((min + max) / 2).toLocaleString('en-IN');
                        }
                    }

                    return {
                        Treatment: row.City?.split(' cost in ')?.[0] || 'N/A',
                        City: row.City?.split(' cost in ')?.[1] || 'N/A',
                        'Cost Range': costRange || 'N/A',
                        'Average Cost (₹)': avgCost ? `₹${avgCost}` : 'N/A',
                        averageCostNumeric: avgCost ? parseInt(avgCost.replace(/,/g, '')) : 0
                    };
                })
                .filter(row => row.Treatment !== 'N/A' && row.City !== 'N/A');

            const uniqueCities = [...new Set(processedData.map(item => item.City))].sort();
            const maxAvgPrice = Math.max(...processedData.map(item => item.averageCostNumeric));

            setCities(['All', ...uniqueCities]);
            setMaxPrice(maxAvgPrice);
            setPriceRange({ min: 0, max: maxAvgPrice });
            setData(processedData);
            setLoading(false);
        };

        fetchData();
    }, []);

    const filteredData = data.filter(row => {
        const matchesSearch = Object.values(row).some(value => 
            value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
        const matchesCity = selectedCity === 'All' || row.City === selectedCity;
        const matchesPrice = row.averageCostNumeric >= priceRange.min && 
                           row.averageCostNumeric <= priceRange.max;

        return matchesSearch && matchesCity && matchesPrice;
    });

    const totalPages = Math.ceil(filteredData.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    const goToPage = (page) => {
        setCurrentPage(Math.min(Math.max(1, page), totalPages));
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        buttons.push(
            <button
                key="prev"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                ←
            </button>
        );

        if (startPage > 1) {
            buttons.push(
                <button
                    key={1}
                    onClick={() => goToPage(1)}
                    className="px-3 py-1 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-50"
                >
                    1
                </button>
            );
            if (startPage > 2) {
                buttons.push(
                    <span key="dots1" className="px-2 py-1 text-gray-500">
                        ...
                    </span>
                );
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => goToPage(i)}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                        currentPage === i
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-700 hover:bg-blue-50'
                    }`}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                buttons.push(
                    <span key="dots2" className="px-2 py-1 text-gray-500">
                        ...
                    </span>
                );
            }
            buttons.push(
                <button
                    key={totalPages}
                    onClick={() => goToPage(totalPages)}
                    className="px-3 py-1 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-50"
                >
                    {totalPages}
                </button>
            );
        }

        buttons.push(
            <button
                key="next"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                →
            </button>
        );

        return buttons;
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Google Translate Element */}
            <div 
                id="google_translate_element" 
                className={`fixed top-4 right-4 z-[9999] translate-button-container transition-all duration-300 ${!isVisible ? 'opacity-0 -translate-y-full pointer-events-none' : ''}`}
            ></div>

            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
            </div>

            <div className="relative py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                            Medical Procedures Database
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Comprehensive guide to medical treatment costs across India
                        </p>
                    </div>

                    <div className="mb-12">
                        <div className="max-w-5xl mx-auto space-y-8 backdrop-blur-sm bg-white/50 p-6 rounded-2xl shadow-lg border border-white/20">
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full px-5 py-4 rounded-xl border-2 border-blue-100 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 shadow-sm bg-white/80 backdrop-blur-sm"
                                    placeholder="Search for treatments, cities, or price ranges..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                    <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="block text-sm font-semibold text-gray-700">Filter by City</label>
                                    <select
                                        value={selectedCity}
                                        onChange={(e) => {
                                            setSelectedCity(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white/80 backdrop-blur-sm transition-all duration-200"
                                    >
                                        {cities.map(city => (
                                            <option key={city} value={city}>{city}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-3">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Price Range: {formatPrice(priceRange.min)} - {formatPrice(priceRange.max)}
                                    </label>
                                    <div className="space-y-6 px-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max={maxPrice}
                                            value={priceRange.min}
                                            onChange={(e) => {
                                                const value = parseInt(e.target.value);
                                                setPriceRange(prev => ({
                                                    ...prev,
                                                    min: Math.min(value, prev.max)
                                                }));
                                                setCurrentPage(1);
                                            }}
                                            className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                        />
                                        <input
                                            type="range"
                                            min="0"
                                            max={maxPrice}
                                            value={priceRange.max}
                                            onChange={(e) => {
                                                const value = parseInt(e.target.value);
                                                setPriceRange(prev => ({
                                                    ...prev,
                                                    max: Math.max(value, prev.min)
                                                }));
                                                setCurrentPage(1);
                                            }}
                                            className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 pt-2">
                                {selectedCity !== 'All' && (
                                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 shadow-sm transition-all duration-200 hover:bg-blue-200">
                                        City: {selectedCity}
                                        <button
                                            onClick={() => setSelectedCity('All')}
                                            className="ml-2 text-blue-600 hover:text-blue-800 transition-colors"
                                        >
                                            ×
                                        </button>
                                    </span>
                                )}
                                {(priceRange.min > 0 || priceRange.max < maxPrice) && (
                                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 shadow-sm transition-all duration-200 hover:bg-blue-200">
                                        Price: {formatPrice(priceRange.min)} - {formatPrice(priceRange.max)}
                                        <button
                                            onClick={() => setPriceRange({ min: 0, max: maxPrice })}
                                            className="ml-2 text-blue-600 hover:text-blue-800 transition-colors"
                                        >
                                            ×
                                        </button>
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 backdrop-blur-sm bg-white/80 shadow-xl rounded-2xl overflow-hidden border border-white/20">
                        {loading ? (
                            <div className="text-center py-20">
                                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
                                <p className="mt-6 text-gray-600 text-lg">Loading data...</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
                                        <tr>
                                            {Object.keys(data[0] || {}).filter(key => key !== 'averageCostNumeric').map((header, index) => (
                                                <th
                                                    key={index}
                                                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                                                >
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white/50 divide-y divide-gray-200">
                                        {currentData.map((row, rowIndex) => (
                                            <tr key={rowIndex} className="hover:bg-blue-50/50 transition-colors duration-150">
                                                {Object.entries(row)
                                                    .filter(([key]) => key !== 'averageCostNumeric')
                                                    .map(([key, cell], cellIndex) => (
                                                        <td
                                                            key={cellIndex}
                                                            className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap"
                                                        >
                                                            {cell}
                                                        </td>
                                                    ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {!loading && filteredData.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-gray-500 text-xl">No results found for the current filters</p>
                                <p className="text-gray-400 mt-3">Try adjusting your search terms or filters</p>
                            </div>
                        )}
                    </div>
                    
                    {!loading && filteredData.length > 0 && (
                        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 backdrop-blur-sm bg-white/50 p-4 rounded-xl shadow-lg border border-white/20">
                            <div className="text-sm text-gray-600">
                                Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} treatments
                            </div>
                            <div className="flex space-x-2">
                                {renderPaginationButtons()}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .bg-grid-pattern {
                    background-size: 40px 40px;
                    background-image: 
                        linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px);
                }
            `}</style>
        </div>
    );
}