import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();
const PORT = process.env.PORT || 3005;

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Set proper MIME types for different file types
app.use((req, res, next) => {
  if (req.url.endsWith('.css')) {
    res.type('text/css');
  } else if (req.url.endsWith('.js')) {
    res.type('application/javascript');
  } else if (req.url.endsWith('.png')) {
    res.type('image/png');
  } else if (req.url.endsWith('.jpg') || req.url.endsWith('.jpeg')) {
    res.type('image/jpeg');
  } else if (req.url.endsWith('.svg')) {
    res.type('image/svg+xml');
  } else if (req.url.endsWith('.gif')) {
    res.type('image/gif');
  }
  next();
});

// Serve static files
app.use(express.static(__dirname));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'products.html'));
});

app.get('/categories', (req, res) => {
  res.sendFile(path.join(__dirname, 'categories.html'));
});

app.get('/product-detail', (req, res) => {
  res.sendFile(path.join(__dirname, 'product-detail.html'));
});

app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, 'cart.html'));
});

// Add this middleware to handle image files
app.get('/images/*', (req, res) => {
  const imagePath = path.join(__dirname, req.url);
  console.log(`Attempting to serve image: ${imagePath}`);
  
  // Check if file exists
  if (fs.existsSync(imagePath)) {
    // Set the correct content type based on file extension
    const ext = path.extname(imagePath).toLowerCase();
    if (ext === '.png') {
      res.type('image/png');
    } else if (ext === '.jpg' || ext === '.jpeg') {
      res.type('image/jpeg');
    } else if (ext === '.gif') {
      res.type('image/gif');
    } else if (ext === '.svg') {
      res.type('image/svg+xml');
    }
    
    res.sendFile(imagePath);
  } else {
    console.error(`Image not found: ${imagePath}`);
    res.status(404).send('Image not found');
  }
});

// Handle 404
app.use((req, res) => {
  console.log(`404 Not Found: ${req.url}`);
  res.status(404).send(`Page not found: ${req.url}`);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Serving files from: ${__dirname}`);
  
  // Check if images directory exists
  const imagesDir = path.join(__dirname, 'images');
  if (fs.existsSync(imagesDir)) {
    console.log('✓ Images directory exists');
  } else {
    console.error('✗ Images directory MISSING - creating it now');
    try {
      fs.mkdirSync(path.join(__dirname, 'images/footwear'), { recursive: true });
      fs.mkdirSync(path.join(__dirname, 'images/people'), { recursive: true });
      console.log('✓ Created images directories');
    } catch (err) {
      console.error('Error creating directories:', err);
    }
  }
});