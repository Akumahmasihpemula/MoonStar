const axios = require('axios');
const cheerio = require('cheerio');

async function searchSpotify(query) {
    try {
        const access_token = await getAccessToken();
        const response = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        const data = response.data;
        const tracks = data.tracks.items.map(item => ({
            name: item.name,
            artists: item.artists.map(artist => artist.name).join(', '),
            popularity: item.popularity,
            link: item.external_urls.spotify,
            image: item.album.images[0].url,
            duration_ms: item.duration_ms,
        }));
        return {Status:true,Creator:nameown, DaTa:tracks}
    } catch (error) {
        console.error('Error searching Spotify:', error);
        throw 'An error occurred while searching for songs on Spotify.';
    }
}

async function getAccessToken() {
    try {
        const client_id = 'acc6302297e040aeb6e4ac1fbdfd62c3';
        const client_secret = '0e8439a1280a43aba9a5bc0a16f3f009';
        const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
        const response = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
            headers: {
                Authorization: `Basic ${basic}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const data = response.data;
        return data.access_token;
    } catch (error) {
        console.error('Error getting Spotify access token:', error);
        throw 'An error occurred while obtaining Spotify access token.';
    }
}
async function spotifydl(url) {
    try {
        // Mendapatkan informasi download
        let downloadResponse = await axios.post("https://spotymate.com/api/download-track", { url });
        let download = downloadResponse.data;

        // Mendapatkan metadata
        let infoResponse = await axios.post("https://spotymate.com/api/get-metadata", { url });
        let info = infoResponse.data.apiResponse.data[0];

        // Menghapus informasi yang tidak diperlukan
        delete info.statusCode;
        delete info.success;
        delete info.isrc;

        // Menambahkan informasi download ke metadata
        info.download = download;

        // Menyusun respons akhir
        const response_nya = {
            album: info.album,
            name: info.album_name,
            artist: info.artist,
            image: info.cover_url,
            upload: info.releaseDate,
            dl_url: info.download.file_url
        };

        return response_nya;
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
        throw new Error("Gagal mendapatkan informasi dari Spotify");
    }
}

module.exports = {
spotifydl, 
searchSpotify
}