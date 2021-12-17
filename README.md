# qrcode-url-checker

Decode the contents of a group of QR code image files that contain a URL,
and save screenshots when accessing that URLs.

## Usage

Put the QR code images in the `qr` directory and execute the following:

```shell
npx tsc
```

```shell
node dist/index.js
```

When the execution is completed, the screenshots will be saved in the `result`
directory.
