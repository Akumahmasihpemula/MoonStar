const fetch = require("node-fetch") 
const FormData = require("form-data") 
const fileType = require('file-type');

module.exports = async buffer => {
       let { ext } = await fileType.fromBuffer(buffer);
       let bodyForm = new FormData();
       bodyForm.append("fileToUpload", buffer, "file." + ext);
       bodyForm.append("reqtype", "fileupload");
       
       let res = await fetch("https://catbox.moe/user/api.php", {
           method: "POST",
           body: bodyForm,
       });
       
       if (!res.ok) throw new Error('Error uploading file: ' + res.statusText);
       let data = await res.text();
       return data;
   }