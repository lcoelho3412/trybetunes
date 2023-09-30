import React from "react";
import Loading from "../Pages/Loading";
import { Link } from "react-router-dom";

function SearchResult({ loadingScreen, searchResults, name }) {
  return (
    <>
      <p className="uppercase text-2xl mt-8 py-12 flex items-center justify-center gap-4 font-bold">Melhor resultado</p>
      <div className="grid md:grid-cols-4 lg:grid-cols-6 gap-2 justify-items-center">
        {loadingScreen ? (
          <Loading />
        ) : (
          searchResults.map((artist, index) => (
            <Link to={`/album/${artist.collectionId}`} key={index} className=" ">
              <div className="overflow-hidden rounded-lg w-40 h-40 mt-4 mb-4 shadow-[0_3px_10px_#2f855a]">
                <div className="flex items-center justify-center gap-4 mt-4">
                  <img
                    src={artist.artworkUrl100}
                    className="aspect-square rounded-full"
                    alt=""
                  />
                </div>
                <div className="p-4 flex-col gap-2 flex items-center justify-center truncate">
                  <div className="text-xs">{artist.collectionName}</div>
                  <h3 className="text-xl font-semibold">{artist.artistName}</h3>
                  <div className="text-sm">
                    <p></p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
}

export default SearchResult;
