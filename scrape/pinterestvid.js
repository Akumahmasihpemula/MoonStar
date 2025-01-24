const axios = require('axios');

async function pinvideo(text) {
    try {
        const response = await axios.get(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fvideos%2F%3Fq%3D${text}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Atrue%2C%22query%22%3A%22${text}%22%2C%22scope%22%3A%22videos%22%2C%22no_fetch_context_on_resource%22%3Atrue%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`);
        const data = response.data;
        const results = data.resource_response.data.results;
        const result = results.map((v) => ({
            video: v.videos.video_list.V_HLSV4.url,
            durasi: v.videos.video_list.V_HLSV4.duration
        }));
        const randomIndex = Math.floor(Math.random() * result.length);
        const randomResult = result[randomIndex];
        if (!randomResult.video) throw new Error("Link tidak ditemukan");
        
        const hasil = {
            status: "aktif",
            creator: "k E N Z",
            result: [randomResult]
        };
        return hasil;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return `Error: ${error.message}`;
    }
}


module.exports = { pinvideo };