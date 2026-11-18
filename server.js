
const express = require("express");
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Video Downloader API çalışıyor!");
});

app.post("/api/check", (req, res) => {
  const { url } = req.body || {};

  try {
    const video = new URL(url);

    if (!["http:", "https:"].includes(video.protocol)) {
      throw new Error();
    }

    const supported = /\.(mp4|webm|mov|m4v)$/i.test(video.pathname);

    if (!supported) {
      return res.status(400).json({
        success: false,
        message: "Bu bağlantı doğrudan video dosyası değil."
      });
    }

    res.json({
      success: true,
      downloadUrl: video.href,
      message: "Video bağlantısı hazır."
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Geçersiz video bağlantısı."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Sunucu çalışıyor: " + PORT);
});
