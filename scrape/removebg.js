const fetch = require("node-fetch");
async function removebg(url) {
  let dsc = await fetch(`https://ai.xterm.codes/api/tools/image-removebg?url=${url}&key=Bell409`)
  .then(response => response.json());
  return dsc.data.url
}

module.exports = { removebg };