import QRReader from "qrcode-reader";
import fs from "fs";
import path from "path";
import jimp from "jimp";
import { fileTypeFromFile } from "file-type";

async function readQrCodeFiles(directory: string): Promise<string[]> {
  const files = fs.readdirSync(directory);
  const fileWithPaths = files.map((filename) => path.join(directory, filename));
  const promiseCallbacks = await Promise.all(
    fileWithPaths.map(async (filename) => {
      const fileType = await fileTypeFromFile(filename);
      return fileType?.mime.includes("image/");
    })
  );
  return fileWithPaths.filter((_, i) => promiseCallbacks[i]);
}

async function readQrCode(qrcodeFile: string): Promise<any> {
  const img = await jimp.read(fs.readFileSync(qrcodeFile));
  const qr = new QRReader();

  return await new Promise((resolve, reject) => {
    qr.callback = (err: any, v: any) =>
      err != null ? reject(err) : resolve(v);
    qr.decode(img.bitmap);
  });
}

(async () => {
  const qrcodeFiles = await readQrCodeFiles("qr");
  console.log(qrcodeFiles);
  for (const qrcodeFile of qrcodeFiles) {
    try {
      const result = await readQrCode(qrcodeFile);
      console.log(result.result);
    } catch (error) {
      console.log(error);
    }
  }
})();
