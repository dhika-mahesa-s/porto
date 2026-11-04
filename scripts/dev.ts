import { createServer } from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { POST as contactHandler } from '../api/contact.js';

const PORT = 3000;
const publicDir = path.resolve(process.cwd(), 'public');

// Initial build
console.log('Running initial development build...');
try {
  execSync('npm run build:pages', { stdio: 'inherit' });
  execSync('npm run build:css', { stdio: 'inherit' });
  execSync('npm run build:cv', { stdio: 'inherit' });
  execSync('npm run build:seo', { stdio: 'inherit' });
} catch (e) {
  console.error('Initial build warning:', e);
}

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.ico': 'image/x-icon'
};

const server = createServer(async (req, res) => {
  const urlPath = req.url?.split('?')[0] || '/';

  // Handle local development POST /api/contact endpoint directly
  if (urlPath === '/api/contact' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', async () => {
      try {
        const headers = new Headers();
        for (const [k, v] of Object.entries(req.headers)) {
          if (v) headers.set(k, Array.isArray(v) ? v.join(', ') : v);
        }
        const requestObj = new Request(`http://localhost:${PORT}/api/contact`, {
          method: 'POST',
          headers,
          body
        });
        const responseObj = await contactHandler(requestObj);
        const resText = await responseObj.text();
        res.writeHead(responseObj.status, {
          'Content-Type': 'application/json'
        });
        res.end(resText);
      } catch (err: unknown) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: (err as Error).message }));
      }
    });
    return;
  }

  // Static file serving from publicDir
  let filePath = path.join(publicDir, urlPath);

  // If path is a directory or has no extension, look for index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  } else if (!fs.existsSync(filePath) && !path.extname(filePath)) {
    if (fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    } else if (fs.existsSync(path.join(filePath, 'index.html'))) {
      filePath = path.join(filePath, 'index.html');
    }
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1><p><a href="/">Return to portfolio</a></p>');
  }
});

server.listen(PORT, () => {
  console.log(`\n🚀 Dev server running locally at http://localhost:${PORT}`);
  console.log(`Serving static files and /api/contact handler.\n`);
});
