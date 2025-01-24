const axios = require('axios');
const cheerio = require('cheerio');

const TikTok = {
img: async function (URL) {
const regex = /(http(?:s)?:\/\/)?(?:www\.)?(?:tiktok\.com\/@[^\/]+\/video\/(\d+))|(http(?:s)?:\/\/)?vm\.tiktok\.com\/([^\s&]+)|(http(?:s)?:\/\/)?vt\.tiktok\.com\/([^\s&]+)/g;
    const prefixx = URL.trim().match(regex); // Menggunakan URL sebagai input
    if (!prefixx) return true;
    
    try {
        const res = await axios.get('https://musicaldown.com/id', {
            headers: {
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            }
        });

        const $ = cheerio.load(res.data);
        const url_name = $("#link_url").attr("name");
        const token_name = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("name");
        const token_ = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("value");
        const verify = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(3)").attr("value");

        let data = {
            [url_name]: URL,
            [token_name]: token_,
            verify: verify
        };

        // data image
        const response = await axios.request({
            url: 'https://musicaldown.com/id/download',
            method: 'post',
            data: new URLSearchParams(Object.entries(data)),
            headers: {
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                'cookie': res.headers["set-cookie"]
            }
        });

        const $$ = cheerio.load(response.data);
        const result = [];

        if (!$$('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(3)').attr('href')) {
            $$( 'body > div.welcome.section > div > div:nth-child(2) > div > div.row > div').each(function (index, element) {
                const url_img = $$(element).find('a').attr('href');
                result.push({ url_img }); // Menghapus bagian audio
            });
        }

        return  { status:false, Creators:nameown, data:result};
    } catch (e) {
  return { status:false, Creators:nameown, message:e.message 
    }
  }
}, 
// download video
tiktokdl: async function (URL) {
const regex = /(http(?:s)?:\/\/)?(?:www\.)?(?:tiktok\.com\/@[^\/]+\/video\/(\d+))|(http(?:s)?:\/\/)?vm\.tiktok\.com\/([^\s&]+)|(http(?:s)?:\/\/)?vt\.tiktok\.com\/([^\s&]+)/g;
    const prefixx = URL.trim().match(regex); // Menggunakan URL sebagai input
    if (!prefixx) return true;
    try {
        const headers = {
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
        };

        const response = await axios.get('https://musicaldown.com/id', { headers });
        const $ = cheerio.load(response.data);
        const url_name = $("#link_url").attr("name");
        const token_name = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("name");
        const token_ = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("value");
        const verify = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(3)").attr("value");

        let data = {
            [`${url_name}`]: URL,
            [`${token_name}`]: token_,
            verify: verify
        };

        const respon = await axios.request({
            url: 'https://musicaldown.com/download',
            data: new URLSearchParams(Object.entries(data)),
            method: 'post',
            headers: {
                'user-agent': headers['user-agent'],
                'cookie': response.headers["set-cookie"]
            }
        });

        const $$ = cheerio.load(respon.data);
        const resultData = [];

        // Ambil data dari elemen yang sesuai
        const aktor = $$('.video-author b').text();
        const desc = $$('.video-desc').text();        
        // Ambil link download
        const vid_mp4 = $$('.download[data-event="mp4_download_click"]').attr('href');
        const vid_hd = $$('.download[data-event="hd_download_click"]').attr('href');
        const vid_watermark = $$('.download[data-event="watermark_download_click"]').attr('href');

        resultData.push({ aktor, desc, vid_mp4, vid_hd, vid_watermark });
        
        return { status:true,creator:nameown,data:resultData}
    } catch (e) {
        return { status:true,creator:nameown,message:e.message
         }
      }
   }
};

module.exports = { TikTok };