const cheerio = require("cheerio");
const axios = require("axios");

const Sokuja = {
  latest: async function latest() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get("https://x1.sokuja.uk");
        const $ = cheerio.load(response.data);
        let array = [];
        $(".seventh").each((index, element) => {
          array.push({
            title: $(element).find(".main-seven a").attr("title"),
            type: $(element).find(".main-seven .limit .bt .type").text(),
            thumbnail: $(element).find(".main-seven .limit img").attr("src"),
            episode: $(element).find(".main-seven .limit .epin").text(),
            url: $(element).find(".main-seven a").attr("href"),
          });
        });
        resolve(array);
      } catch (error) {
        reject(error);
      }
    });
  },
  
  search: async function search(q) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get("https://x1.sokuja.uk?s=" + encodeURIComponent(q));
        const $ = cheerio.load(response.data);
        let array = [];
        $(".listupd .bs .bsx").each((index, element) => {
          array.push({
            title: $(element).find("a").attr("title"),
            type: $(element).find("a .limit .typez").text(),
            thumbnail: $(element).find("a .limit img").attr("src"),
            status: $(element).find("a .limit .status").text(),
            url: $(element).find("a").attr("href"),
          });
        });
        resolve(array);
      } catch (error) {
        reject(error);
      }
    });
  },
  
  detail: async function detail(url) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        let array = {
          metadata: {},
          episode: [],
        };
        $(".infox").each((index, element) => {
          array.metadata.title = $(element).find("h1").text();
          $(element).find(".info-content .spe span").each((b, d) => {
            let name = $(d).find("span b").text();
            let key = $(d).text().replace(name, "").trim();
            array.metadata[name.toLowerCase().split(":")[0].split(" ").join("_")] = key;
          });
          array.metadata.thumbnail = $(".thumb img").attr("src");
          array.metadata.sinopsis = $(".entry-content p").eq(1).text().trim();
        });
        $(".eplister ul li").each((index, element) => {
          array.episode.push({
            title: $(element).find(".epl-title").text(),
            release: $(element).find(".epl-date").text(),
            url: $(element).find("a").attr("href"),
          });
        });
        resolve(array);
      } catch (error) {
        reject(error);
      }
    });
  },
  
  episode: async function episode(url) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        let array = {
          metadata: {},
          downloads: {},
        };
        array.metadata.title = $(".title-section h1").text();
        array.metadata.thumbnail = $(".tb img").attr("src");
        array.metadata.updated = $(".lm .updated").text();
        $(".mirror option").each((index, element) => {
          let exec = cheerio.load(atob($(element).attr("value")));
          let mimetype = exec("source").attr("type");
          let quality = $(element).text().trim().split(" ")[1];
          let url = exec("source").attr("src");
          if (!url) return;
          array.downloads[quality] = {
            quality,
            mimetype,
            url,
          };
        });
        resolve(array);
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = Sokuja;