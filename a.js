const axios = require('axios');

module.exports = {
  config: {
    name: "album",
    version: "2.0",
    role: 0,
    author: "xnil",
    description: "Video album",
    category: "media",
    premium: true,
    guide: "{pn}",
    countDown: 15,
  },
  
  onStart: async function({ message, event, args, api }) {
    if (!args[0]) {
      try {
        const xx = await axios.get(`https://albumapi.vercel.app/album?all=list`);
        const d = xx.data;
        const msg = `
    📂ᴀᴠᴀɪʟᴀʙʟᴇ ᴠɪᴅᴇᴏ ᴄᴀᴛᴇɢᴏʀʏ📂
ᴇxᴀᴍᴘʟᴇ ᴀᴅᴅ - ʀᴇᴘʟʏ ᴠɪᴅᴇᴏ /ᴀʟʙᴜᴍ ᴀᴅᴅ

-------------------ᴬᴸᴮᵁᴹ--------------------------------

         SL.        Category             Total Videos
--------------------------------------------
         1        𝐀𝐍𝐈𝐌𝐄 𝐕𝐢𝐝𝐞𝐨            ${d.categories.anime}
         2        𝐋𝐎𝐕𝐄 𝐕𝐢𝐝𝐞𝐨             ${d.categories.love}
         3        𝐅𝐮𝐧𝐧𝐲 𝐕𝐢𝐝𝐞𝐨             ${d.categories.funny} 
         4        𝐈𝐬𝐥𝐚𝐦𝐢𝐜 𝐕𝐢𝐝𝐞𝐨            ${d.categories.islamic}
         5        𝐒𝐚𝐝 𝐕𝐢𝐝𝐞𝐨               ${d.categories.sad}
         6        𝐋𝐨𝐅𝐈 𝐕𝐢𝐝𝐞𝐨              ${d.categories.lofi}
         7        𝐀𝐭𝐭𝐢𝐭𝐮𝐝𝐞 𝐕𝐢𝐝𝐞𝐨           ${d.categories.attitude}
         8        𝐇𝐨𝐫𝐧𝐲 𝐕𝐢𝐝𝐞𝐨             ${d.categories.horny}
         9        𝐂𝐨𝐮𝐩𝐥𝐞 𝐕𝐢𝐝𝐞𝐨            ${d.categories.couple}
         10       𝐁𝐢𝐤𝐞 & 𝐂𝐚𝐫 𝐕𝐢𝐝𝐞𝐨        ${d.categories.bike}  

-------------------ᴬᴸᴮᵁᴹ---------------------------------

𝙿𝚕𝚎𝚊𝚜𝚎 𝚎𝚗𝚝𝚎𝚛 𝚊 𝚟𝚊𝚕𝚒𝚍 𝚗𝚞𝚖𝚋𝚎𝚛 𝚘𝚏 𝚊𝚕𝚋𝚞𝚖. 
`;
        return api.sendMessage(msg, event.threadID, (error, info) => {
          if (error) return console.error(error);
          global.GoatBot.onReply.set(info.messageID, {
            commandName: module.exports.config.name,
            type: "reply",
            messageID: info.messageID,
            author: event.senderID
          });
        }, event.messageID);
      } catch (error) {
        console.error(error);
        return api.sendMessage("❌ Error fetching categories. Please try again.", event.threadID, event.messageID);
      }
    }
    
    if (args[0].toLowerCase() === "add") {
      if (!event.messageReply || !event.messageReply.attachments || event.messageReply.attachments.length === 0) {
        return api.sendMessage("⚠️ Please reply to a video to add it to an album.", event.threadID, event.messageID);
      }
      
      const category = args[1];
      const allowedCategories = ["anime", "love", "funny", "islamic", "sad", "lofi", "attitude", "horny", "couple", "bike"];
      
      if (!category || !allowedCategories.includes(category.toLowerCase())) {
        return api.sendMessage("⚠️ Invalid category. Please provide a valid category.\n\nAllowed categories: " + allowedCategories.join(", "), event.threadID, event.messageID);
      }
      
      const videoUrl = event.messageReply.attachments[0].url;
      try {
        const url = await global.utils.shortenURL(videoUrl);
        const res = await axios.get(`https://albumapi.vercel.app/album?add=${encodeURIComponent(url)}&category=${category}`);
        
        if (res.data.message) {
          return api.sendMessage(`✅ Video added successfully to category: ${category}`, event.threadID, event.messageID);
        } else {
          return api.sendMessage("❌ Failed to add the video. Please try again.", event.threadID, event.messageID);
        }
      } catch (error) {
        console.error(error);
        return api.sendMessage(`❌ Error: ${error.message}`, event.threadID, event.messageID);
      }
    }
  },
  
  onReply: async function({ message, event, args, Reply, api }) {
    try {
      if (!Reply || event.senderID !== Reply.author) return;
      const selection = parseInt(event.body);
      if (isNaN(selection)) return api.sendMessage("⚠️ Invalid input. Please enter a number.", event.threadID, event.messageID);
      
      let apiUrl;
      switch (selection) {
        case 1:
          apiUrl = "https://albumapi.vercel.app/album?link=anime";
          break;
        case 2:
          apiUrl = "https://albumapi.vercel.app/album?link=love";
          break;
          case 3:
          apiUrl = "https://albumapi.vercel.app/album?link=funny";
          break;
          case 4:
          apiUrl = "https://albumapi.vercel.app/album?link=Islamic";
          break;
          case 5:
          apiUrl = "https://albumapi.vercel.app/album?link=sad";
          break;
          case 6:
          apiUrl = "https://albumapi.vercel.app/album?link=lofi";
          break;
          case 7:
          apiUrl = "https://albumapi.vercel.app/album?link=attitude";
          break;
          case 8:
          apiUrl = "https://albumapi.vercel.app/album?link=horny";
          break;
          case 9:
          apiUrl = "https://albumapi.vercel.app/album?link=couple";
          break;
          case 10:
          apiUrl = "https://albumapi.vercel.app/album?link=bike";
          break;
        default:
          return api.sendMessage("⚠️ Invalid selection. Please enter a valid number from the album.", event.threadID, event.messageID);
      }
      
      const res = await axios.get(apiUrl);
      if (!res.data || !res.data.link) return api.sendMessage("❌ No video found for this category.", event.threadID, event.messageID);
      
      const videoUrl = res.data.link;
      const videoStream = await axios({ url: videoUrl, responseType: 'stream' });
      
      return api.sendMessage({
        body: "✅ Successfully sent your album video from the selected category!",
        attachment: videoStream.data
      }, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      return api.sendMessage(`❌ Error: ${error.message}`, event.threadID, event.messageID);
    }
  }
};
