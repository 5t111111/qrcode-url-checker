import QRReader from "qrcode-reader";
import fs from "fs";
import jimp from "jimp";

function readQrCodeFiles(directory: string): string[] {
  return fs.readdirSync(directory);
}

async function readQrCode(qrcodeFile: string): Promise<string> {
  const img = await jimp.read(fs.readFileSync("./qr_photo.png"));
  const qr = new QRReader();

  return await new Promise((resolve, reject) => {
    qr.callback = (err: any, v: any) =>
      err != null ? reject(err) : resolve(v);
    qr.decode(img.bitmap);
  });
}

(async () => {
  const qrcodeFiles = readQrCodeFiles("qr");
  for (const qrcodeFile of qrcodeFiles) {
    const result = await readQrCode(qrcodeFile);
    console.log(result);
  }
})();
