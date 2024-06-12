const wav = require('wav');
const fs = require('fs');
const path = require('path');

const wavUtil = {
  makeWav(vibrationData, filePath) {
    return new Promise(async (resolve, reject) => {
      try {
        // 샘플링 속도 (예: 4000Hz)
        const sampleRate = 4000;

        // 데이터 정규화 (일반적으로 WAV 파일의 범위는 -1.0에서 1.0)
        // const maxVal = Math.max(...vibrationData.map(Math.abs));
        // const normalizedData = vibrationData.map(value => value / maxVal);
        const normalizedData = await vibrationData.map(value => {
          if (value > 1.0) {
            return 1.0;
          } else if (value < -1.0) {
            return -1.0;
          } else {
            return value;
          }
        });

        // 디렉토리가 없으면 생성
        const directory = path.dirname(filePath);
        if (!fs.existsSync(directory)) {
          fs.mkdirSync(directory, { recursive: true });
        }

        // 빈 파일 생성
        fs.writeFileSync(filePath, Buffer.alloc(0));


        // 데이터 버퍼 생성 및 쓰기
        const buffer = Buffer.alloc(normalizedData.length * 2);
        for (let i = 0; i < normalizedData.length; i++) {
          buffer.writeInt16LE(normalizedData[i] * 32767, i * 2); // 16비트 정수로 변환
        }

        // WAV 파일 작성
        const writer = new wav.FileWriter(filePath, {
          channels: 1,
          sampleRate: sampleRate,
          bitDepth: 16
        });


        writer.write(buffer);
        writer.end();

        writer.on('done', () => {
          console.log(`WAV 파일 생성 완료: ${filePath}`);
          resolve(filePath); // 파일 작성이 완료되면 Promise를 resolve합니다.
        });

        writer.on('error', (err) => {
          console.log(`WAV 파일 생성 오류: ${err.message}`);
          reject(err); // 오류가 발생하면 Promise를 reject합니다.
        });
      } catch (err) {
        console.log(`wavUtil error: ${err.message}`);
        reject(err);
      }
    });
  }
}

module.exports = wavUtil;