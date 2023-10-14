import { url, options } from "./constants.js";
import { renderCards } from "./ui.js";

// API
export class API {
  constructor() {
    this.songs = [];
  }
  // get popular musics from API
  async getPopular() {
    try {
      const res = await fetch(url, options);
      const data = await res.json();
      this.songs = data.tracks;
    } catch (err) {
      console.log("There is an error when getting data", err);
    }
  }

  // get data from search
  async searchMusic(query) {
    const res = await fetch(
      `https://shazam.p.rapidapi.com/search?term=${query}%20the%20rain&locale=en-US&offset=0&limit=5`,
      options
    );

    const data = await res.json();

    const newData = data.tracks.hits.map((song) => ({
      ...song.track,
    }));

    renderCards(newData);
  }
}
