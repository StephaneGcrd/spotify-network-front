import React from "react";

const Build = () => {
  return (
    <React.Fragment>
      <div className="col-1-4 padded">
        <h5>Spotify Data</h5>
        <hr />
        To build our network, we used the <b>Spotify API</b>. The first step was
        retrieving a lot of us hip-hop artists names. We did so by looking for
        around 20 US Rap playlists. From these playlists, we scrapped the name
        of more than 900 artists.
        <br />
        <br />
        Then, with this name list, we could retrieve each album from these
        artists, and from these albums, each songs. We built a dataset on a JSON
        file consisting of an object of artists, where each key is the name of
        the artist and the value is the list of the song produced by the artist.
        <br />
        <br /> Then a song object contains many informations such as the artists
        that collaborated on the song.
      </div>
      <div className="col-4-6 padded">
        <h5>Lyrics</h5> <hr />
        Rap Genius
      </div>
      <div className="col-1-6 padded datalink">
        <h5>Download datasets</h5>
        <hr />
        <a href="artistssongdataset.json">Artist dataset (JSON)</a>
        <a href="lyrics_final.zip">Songs dataset (Compressed)</a>
        <a href="rapGraph.json">Network (JSON)</a>
        <a href="song_info.csv">Song List (CSV)</a>
      </div>
      <div className="col-1-6 padded ">
        <h5>Notebook</h5>
        <hr />
        <iframe
          title="static_html"
          className="pythonFrame col-1-6"
          src="GetArtists_cleaned.html"
        ></iframe>
      </div>
    </React.Fragment>
  );
};

export default Build;
