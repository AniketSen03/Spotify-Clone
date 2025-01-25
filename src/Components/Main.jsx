import React, { useState, useEffect } from "react";

const Main = () => {
    const [artists, setArtists] = useState([]); // State to store artist data

    const searchForArtists = async (artistNames) => {
        const token = "BQB4lBQ5ZuWPcUrRz8OnwNzj6LYHCipn9hd1OvyiJJRbfKRtvc0fDVvk1Mt01e2zhoSDaM4UpWQLxn0j7iqlLZoVpLXm5VbftQo6jnE7--rV3QLlhpw";

        try {
            // Fetch details for all artists in parallel
            const results = await Promise.all(
                artistNames.map(async (artistName) => {
                    const response = await fetch(
                        `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    const data = await response.json();
                    return data.artists.items[0]; // Take the first result for each artist
                })
            );

            setArtists(results); // Set the fetched artist data into the state
        } catch (error) {
            console.error("Error fetching artist data:", error);
        }
    };

    useEffect(() => {
        // Provide artist names to fetch their details
        searchForArtists(["Arijit Singh", "Kishore Kumar", "Lata Mangeshkar","Pritam", "Adele", "Taylor Swift"]);
    }, []); // Run once when the component loads

    return (
        <div className="bg-primary mx-5 text-white">
            <h1 className="text-3xl my-4 mx-5">Popular Artists</h1>
            <div className="flex flex-wrap justify-evenly bg-blue-600">
                {artists.map((artist) => (
                    artist && ( // Ensure artist data exists
                        <div key={artist.id} className="m-5 flex flex-col items-center">
                            <img
                                src={artist.images?.[0]?.url || "https://via.placeholder.com/150"} // Use placeholder if no image
                                className="h-36 w-36 rounded-full"
                                alt={artist.name}
                            />
                            <h1 className="text-lg font-bold">{artist.name}</h1>
                            <h1 className="text-sm">Followers: {artist.followers?.total.toLocaleString()}</h1>
                            <h1 className="text-sm">Genres: {artist.genres.slice(0, 2).join(", ") || "N/A"}</h1>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default Main;
