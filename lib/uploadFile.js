const fetch = require('node-fetch');
const FormData = require('form-data');
const fileType = require('file-type');

const fileIO = async (buffer) => {
  const type = await fileType.fromBuffer(buffer);
  const ext = type ? type.ext : 'bin';
  const form = new FormData();
  form.append('file', buffer, `tmp.${ext}`);
  const res = await fetch('https://file.io/?expires=1d', {
    method: 'POST',
    body: form
  });
  const json = await res.json();
  if (!json.success) throw json;
  return json.link;
};

const api = async (buffer) => {
  const type = await fileType.fromBuffer(buffer);
  const ext = type ? type.ext : 'bin';
  const bodyForm = new FormData();
  bodyForm.append("fileToUpload", buffer, "file." + ext);
  bodyForm.append("reqtype", "fileupload");

  const res = await fetch("https://catbox.moe/user/api.php", {
    method: "POST",
    body: bodyForm,
  });

  const data = await res.text();
  return data;
};

const api2 = async (buffer) => {
  const type = await fileType.fromBuffer(buffer);
  const ext = type ? type.ext : 'bin';
  const bodyForm = new FormData();
  bodyForm.append("file", buffer, "file." + ext);
  const res = await fetch("https://file.btch.rf.gd/api/upload.php", {
    method: "post",
    body: bodyForm,
  });
  const data = await res.json();
  const resultUrl = data.result ? data.result.url : '';
  return resultUrl;
};

module.exports = async function uploadFile(inp) {
  let err = false;
  for (const upload of [api, api2, fileIO]) {
    try {
      return await upload(inp);
    } catch (e) {
      err = e;
    }
  }
  if (err) throw err;
};