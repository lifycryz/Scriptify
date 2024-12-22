// fileUploadRouter.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const File = require("../config/schema");  // Import model File
const router = express.Router();

// Setup konfigurasi untuk penyimpanan file menggunakan Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../scriptLIB/'); // Menyimpan file di folder 'uploads/'
  },
  filename: (req, file, cb) => {
    // Memberikan nama file unik menggunakan timestamp
    cb(null, Date.now() + path.extname(file.originalname)); // nama file + ekstensi asli
  }
});

const upload = multer({ storage: storage });

// Rute untuk mengunggah file
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { name, description, category } = req.body; // Ambil data dari form
    const file = req.file;
    const user = req.user;  // Mendapatkan informasi pengguna yang sedang login

    if (!file) {
      return res.status(400).send('No file uploaded');
    }

    if (!name || !description || !category) {
      return res.status(400).send('Name, description, and category are required');
    }

    // Simpan informasi file ke MongoDB
    const newFile = new File({
      name,
      description,
      category,
      fileName: file.filename,  // Nama file yang disimpan di server
      userId: user._id,         // ID pengguna yang mengunggah
    });

    await newFile.save();

    res.status(200).json({
      message: 'File uploaded successfully!',
      file: newFile,  // Kirim kembali data file yang diunggah
    });
  } catch (error) {
    res.status(500).send('Error uploading file');
  }
});

// Edit file route
router.get("/edit/:id", async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    res.render("edit-file", { file });
  } catch (error) {
    res.status(500).send("Error fetching file.");
  }
});

// Delete file route
router.get("/delete/:id", async (req, res) => {
  try {
    const file = await File.findByIdAndDelete(req.params.id);
    res.redirect("/dashboard");
  } catch (error) {
    res.status(500).send("Error deleting file.");
  }
});

module.exports = router;