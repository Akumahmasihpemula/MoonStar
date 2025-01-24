const axios = require('axios');
const cheerio = require('cheerio');

async function animebatchsearch(text) {
    try {
        const response = await axios.get("https://www.animebatch.id/?s=" + encodeURIComponent(text));
        const $ = cheerio.load(response.data);
        const data = [];
        $('.post').each((index, element) => {
            const title = $(element).find('.title').text().trim();
            const link = $(element).find('a').attr('href');
            const score = $(element).find('.score').text().trim();
            const image = $(element).find('img').attr('src');
            const type = $(element).find('.type').text().trim();
            let Data = {
                judul: title,
                url: link,
                skor: score,
                img: image,
                tipe: type // perbaiki typo dari 'tepe' menjadi 'tipe'
            };
            data.push(Data); // tambahkan data ke array
        });
        return {
            status: true,
            creator: 'Kenz',
            result: data,
        };
    } catch (error) {
        console.error(error);
        return null; // kembalikan null jika terjadi error
    }
}
async function animeBatchdl(url) {
try {
const res = await axios.get(url);
const $ = cheerio.load(res.data);
// Mengambil data yang diperlukan dari halaman
const title = $('h1.entry-title').text().trim();
const image = $('meta[property="og:image"]').attr('content');
const Genre = $('span.Genrex a').map((i, el) => $(el).text()).get().join(', ').trim();
const tipe = $('span:contains("Series")').text().replace('Series', '').trim();
const status = $('span:contains("Status Anime")').text().replace('Status Anime', '').trim();
const episode = $('span.Episodex').text().replace('Jumlah Episode', '').trim();
const score = $('span.Scorex').text().replace('Skor', '').trim();
const lihat = $('span:contains("Dilihat")').text().replace('Dilihat', '').trim();
const musimRilis = $('span:contains("Musim Rilis")').text().replace('Musim Rilis', '').trim();
const tanggalRilis = $('span:contains("Tanggal Rilis")').text().replace('Tanggal Rilis', '').trim();
const studio = $('span.Studiox').text().replace('Studio', '').trim();
const durasi = $('span:contains("Durasi per Episode")').text().replace('Durasi per Episode', '').trim();
const downloadLinks = {};
$('.dlx ul').each((i, el) => {
const episodeTitle = $(el).prev('h4').text().trim();
const links = [];
$(el).find('li').each((j, li) => {
const quality = $(li).find('strong').text().trim();
const linkElements = $(li).find('a');
// Mengambil link dan quality
const linkArray = linkElements.map((k, link) => ({
quality: quality,
link: $(link).attr('href'),
episodeTitle: episodeTitle
})).get();
const filteredLinks = linkArray.filter(v => v.link.includes('drive.google.com'));
if (filteredLinks.length > 0) {
links.push(...filteredLinks); // Menambahkan ke array links
}
});
if (links.length > 0) {
downloadLinks[episodeTitle] = links.map(v => ({
title: v.episodeTitle,
quality: v.quality,
link: v.link
}));
}
});
return {
title: title || "INFO SEDANG TIDAK TERSEDIA",
Genre: Genre || "INFO SEDANG TIDAK TERSEDIA",
tipe: tipe || "INFO SEDANG TIDAK TERSEDIA",
status: status || "INFO SEDANG TIDAK TERSEDIA",
episode: episode || "INFO SEDANG TIDAK TERSEDIA",
score: score || "INFO SEDANG TIDAK TERSEDIA",
lihat: lihat || "INFO SEDANG TIDAK TERSEDIA",
musimRilis: musimRilis || "INFO SEDANG TIDAK TERSEDIA",
tanggalRilis: tanggalRilis || "INFO SEDANG TIDAK TERSEDIA",
studio: studio || "INFO SEDANG TIDAK TERSEDIA",
durasi: durasi || "INFO SEDANG TIDAK TERSEDIA",
download: downloadLinks,
img: image, 
};
} catch (error) {
const erorrr = {
status: false,
creator: 'Kenz',
result: "fitur ini sedang rusak tunggu di perbaiki",
massage: error.message,
};
return erorrr;
}
}    

module.exports = { 
animebatchsearch, 
animeBatchdl
}