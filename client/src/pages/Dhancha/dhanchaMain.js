import { useState, useEffect, useRef } from 'react';
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
    const lastScrollYRef = useRef(0);
    const entriesPerPage = 25;

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsVisible(currentScrollY < lastScrollYRef.current || currentScrollY < 100);
            lastScrollYRef.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const addGoogleTranslateScript = () => {
            if (window.google?.translate) {
                window.googleTranslateElementInit();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.async = true;
            script.onload = () => {
                setTimeout(() => {
                    if (window.google?.translate) {
                        window.googleTranslateElementInit();
                    }
                }, 500);
            };
            document.body.appendChild(script);
        };

        window.googleTranslateElementInit = () => {
            const translateContainer = document.getElementById('google_translate_element');
            if (!translateContainer) return;

            new window.google.translate.TranslateElement(
                {
                    pageLanguage: 'en',
                    includedLanguages: 'hi',
                    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
                },
                'google_translate_element'
            );
        };

        addGoogleTranslateScript();

        return () => {
            delete window.googleTranslateElementInit;
            document.querySelectorAll("script[src*='translate.google.com']").forEach(script => script.remove());
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(scraped_data);
                if (!response.ok) throw new Error("Failed to load CSV file");

                const reader = response.body.getReader();
                const { value } = await reader.read();
                if (!value) throw new Error("CSV file is empty or unreadable");

                const decoder = new TextDecoder('utf-8');
                const csvData = decoder.decode(value);
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
            } catch (error) {
                console.error("Error fetching CSV data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);
}
