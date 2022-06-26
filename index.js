const textToSpeech = require('@google-cloud/text-to-speech')

require('dotenv').config()

const fs = require('fs')

const util = require('util')

const client = new textToSpeech.TextToSpeechClient()

const yourSetting = fs.readFileSync('setting.json');

async function converTextToMp3(yourSetting){

    const [response] = await client.synthesizeSpeech(JSON.parse(yourSetting));

    const writeFile = util.promisify(fs.writeFile);

    await writeFile(JSON.parse(yourSetting).outputFileName, response.audioContent, 'binary');
    
    console.log(`Audio content written to file: ${JSON.parse(yourSetting).outputFileName}`);
}

converTextToMp3(yourSetting)

//another way to write it but couldnt figure out how to add speed

////     const text = "RONAN IS A STINKY HEAD"
// //need to figure out speechrate not working need to slow it down
//     const request = {
//         input:{text:text, speakingRate: .5},
//         voice:{languageCode:'en-US', ssmlGender:'NEUTRAL'},
//         audioConfig:{audioEncoding:'MP3'}
//     }

//     const [response] = await client.synthesizeSpeech(request)

//     const writeFile = util.promisify(fs.writeFile)

//     await writeFile("output.mp3", response.audioContent, 'binary')

//     console.log('Text to Speech has completed. Audio file has been saved')