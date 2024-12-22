// models/fileSchema.js
const mongoose = require('mongoose');

// Membuat schema untuk file yang diunggah
const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },        // Nama file
  description: { type: String, required: true }, // Deskripsi file
  category: { type: String, required: true },    // Kategori file
  fileName: { type: String, required: true },    // Nama file di server
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // ID pengguna yang mengunggah
}, {
  timestamps: true  // Menambahkan timestamp otomatis (createdAt, updatedAt)
});

// Membuat model berdasarkan schema
const File = mongoose.model('File', fileSchema);

// Mengekspor model File
module.exports = File;