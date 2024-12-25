import React, { useContext, useState } from 'react'
import axios from "axios";
import "./Disguise.css"
import ScrapedContext from './contexts/scraped_context';
import { useNavigate } from 'react-router-dom';

function Disguise() {
    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {data, setData} = useContext(ScrapedContext)
    const navigate = useNavigate()

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const result = await axios(`http://localhost:5001/scrape?url=${encodeURIComponent(url)}`);
            setData(result.data);
            // console.log(data);
            navigate("vscode")
        } catch (error) {
            console.error("Error fetching data:", error);
            setData([]);
        } finally {
        setIsLoading(false);
        }
    };
    return (
        <div id="disguise-div">
            <div>
                <input
                id="website-input"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter website to disguise"
                />
                <button
                onClick={fetchData}
                disabled={isLoading}
                >
                {isLoading ? "Loading..." : "Disguise"}
                </button>
            </div>
        </div>
    )
}

export default Disguise