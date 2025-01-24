let axios = require('axios');

const YouTube = {
ytmp3:async function (txt) {
  try {
    const respon = await axios.get("https://ytdl.axeel.my.id/api/download/audio?url=" + txt, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = {
      id: respon.data.metadata.videoId, 
      title: respon.data.metadata.title, 
      views: respon.data.metadata.views,
      image: respon.data.metadata.thumbnail.url,
      url: respon.data.metadata.url, 
      dl: respon.data.downloads.url,
      size: respon.data.downloads.size,
      type: respon.data.downloads.mimetype
    };      

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
},
ytmp4:async function (txt) {
  try {
    const respon = await axios.get("https://ytdl.axeel.my.id/api/download/video?url=" + txt, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = {
      id: respon.data.metadata.videoId, 
      title: respon.data.metadata.title, 
      views: respon.data.metadata.views,
      image: respon.data.metadata.thumbnail.url,
      url: respon.data.metadata.url, 
      dl: respon.data.downloads.url,
      size: respon.data.downloads.size,
      type: respon.data.downloads.mimetype
    };      

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
   }
  }
}

module.exports = YouTube