import React, { useEffect, useState } from 'react'

function QuizComponent() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.jsonserve.com/Uw5CrX');
                if (!response.ok) {
                    throw new Error('Error while connecting');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className='flex items-center justify-center w-screen h-screen'><h1 className='text-4xl font-bold'>Loading...</h1></div>;
    if (error) return <div className='flex items-center justify-center w-screen h-screen'><h1 className='text-4xl font-bold text-red-500'>Error: {error.message}</h1></div>;

    return (
        <div>
            <h1>Fetched Data</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}

export default QuizComponent
