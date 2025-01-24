const WebSocket = require("ws") 
const fs = require("fs") 

function generateRandomLetters(length) {
let result = "";
const charCode = 28;
for (let i = 0; i < length; i++) {
const random = Math.floor(Math.random() * charCode);
const char = String.fromCharCode("a".charCodeAt(0) + random);
result += char;
}
return result;
}
async function Gura(audioBuffer) {
return new Promise(async (resolve, reject) => {
const filename = Math.floor(Math.random() * 100000000000000000) + (await generateRandomLetters()) + ".mp4";
const result = {};
const sessionHash = {
fn_index: 2,
session_hash: "xyuk2cf684b"
};
const data = {
fn_index: 2,
data: [{
data: "data:audio/mpeg;base64," + audioBuffer.toString("base64"),
name: filename
}, 0, "pm", 0.5, false, "", "en-US-AnaNeural-Female"],
event_data: null,
session_hash: "xyuk2cf684b"
};
const ws = new WebSocket("https://yanzbotz-waifu-yanzbotz.hf.space/queue/join");
ws.onopen = function () {
console.log("Connected to websocket");
};
ws.onmessage = async function (event) {
const message = JSON.parse(event.data);
switch (message.msg) {
case "send_hash":
ws.send(JSON.stringify(sessionHash));
break;
case "send_data":
console.log("Processing your audio....");
ws.send(JSON.stringify(data));
break;
case "process_completed":
result.base64 = "https://yanzbotz-waifu-yanzbotz.hf.space/file=" + message.output.data[1].name;
break;
}
};
ws.onclose = function (event) {
if (event.code === 1000) {
console.log("Process completed");
} else {
reject("Err : WebSocket Connection Error:\n");
}
resolve(result);
};
});
}

module.exports = { Gura }