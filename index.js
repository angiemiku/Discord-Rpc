const express = require('express');
const config = require('./config.json');
const { Client, RichPresence } = require('discord.js-selfbot-v13');

const client = new Client({
  readyStatus: false,
  checkUpdate: false,
});

const app = express();

client.on('ready', async () => {
  console.log(`Logged In as @${client.user.username}!`);
  
  const r = new RichPresence(client)
    .setType(config.TYPE || 'PLAYING');

  if (config.APPLICATION_ID) r.setApplicationId(config.APPLICATION_ID);
  if (config.URL) r.setURL(config.STREAM_URL);
  if (config.NAME) r.setName(config.NAME);
  if (config.DETAILS) r.setDetails(config.DETAILS);
  if (config.STATE) r.setState(config.STATE);
  if (config.LARGE_IMAGE_URL) r.setAssetsLargeImage(config.LARGE_IMAGE_URL);
  if (config.LARGE_IMAGE_TEXT) r.setAssetsLargeText(config.LARGE_IMAGE_TEXT);
  if (config.SMALL_IMAGE_URL) r.setAssetsSmallImage(config.SMALL_IMAGE_URL);
  if (config.SMALL_IMAGE_TEXT) r.setAssetsSmallText(config.SMALL_IMAGE_TEXT);
  if (config.PLATFORM) r.setPlatform(config.PLATFORM);
  if (config.BUTTON1_TEXT && config.BUTTON1_URL) r.addButton(config.BUTTON1_TEXT, config.BUTTON1_URL);
  if (config.BUTTON2_TEXT && config.BUTTON2_URL) r.addButton(config.BUTTON2_TEXT, config.BUTTON2_URL);
    
    // .setParty({ max: 8, current: 1, })
    // .setStartTimestamp(Date.now())
  
  client.user.setPresence({
    activities: [r],
    status: config.STATUS || 'online'
  });
});

const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Meow!'));
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

client.login(config.TOKEN || process.env.TOKEN);
