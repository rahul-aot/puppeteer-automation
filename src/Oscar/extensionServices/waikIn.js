const WebSocket = require('ws');
const { waitAndClick } = require('../utils/utils');
const { editDectection, generateSoapNote } = require('../utils/helper');

async function walkinFunction(page, name, number, selector) {
    console.log('Executed walk-in action...');
    await waitAndClick(page, selector);
    const ws = new WebSocket(process.env.WEBSOCKET_URL); //web socket connection url
    await new Promise((resolve, reject) => {
      ws.on('open', () => {
        console.log('WebSocket connected');
        resolve();
      });
      ws.on('error', (err) => {
        console.error('WebSocket error:', err);
        reject(err);
      });
    });
  
    await new Promise(resolve => setTimeout(resolve, 5000));
  
    await waitAndClick(page, 'button#clinic-recording-button');
    console.log('Clicked on clinic-recording-button');
  
    const dataToSend = {
      name: name,
      number: number,
      action: 'recordingStarted',
      timestamp: new Date().toISOString()
    };
    ws.send(JSON.stringify(dataToSend));
    console.log('Data sent to WebSocket:', dataToSend);
    ws.on('message', (message) => {
      console.log('Received message from WebSocket server:', message);
    });
    ws.on('close', () => {
      console.log('WebSocket connection closed');
    });
    await new Promise(resolve => setTimeout(() => {
      console.log('Audio duration finished, closing WebSocket...');
      ws.close(); // Close the WebSocket after the audio duration
      resolve(); // Resolve the promise once the WebSocket is closed
    }, 10 * 1000)); // use exact audio duration (70)
    await waitAndClick(page, 'button[aria-label="Stop Recording"]');
    await new Promise(resolve => setTimeout(resolve, 10000));
    await editDectection(page);
    await generateSoapNote(page);
    await new Promise(resolve => setTimeout(resolve, 5000));
  }

  module.exports = { walkinFunction };