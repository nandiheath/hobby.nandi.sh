import { chromium } from 'playwright';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

async function captureScreenshots() {
  const screenshotsDir = path.join(process.cwd(), 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  console.log('Starting Vite development server...');
  const devServer = spawn('npm', ['run', 'dev'], { shell: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport to a common size
  await page.setViewportSize({ width: 1280, height: 800 });

  const baseUrl = 'http://localhost:5173';
  const routes = [
    '/', '/portfolio', '/references',
    '/en', '/en/portfolio', '/en/references'
  ];

  try {
    // Wait for the dev server to be ready
    let attempts = 0;
    while (attempts < 20) {
      try {
        await page.goto(baseUrl);
        console.log('Dev server ready.');
        break;
      } catch {
        attempts++;
        await new Promise(r => setTimeout(r, 1000));
      }
    }

    for (const route of routes) {
      const url = `${baseUrl}${route}`;
      const fileName = route.replace(/\//g, '_') || 'index';
      console.log(`Capturing ${url}...`);
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.screenshot({ path: path.join(screenshotsDir, `${fileName}.png`), fullPage: true });
    }

    // Capture DOM snapshot for element inspection
    const domSnapshot = await page.content();
    fs.writeFileSync(path.join(screenshotsDir, 'dom_snapshot.html'), domSnapshot);
    console.log('DOM snapshot saved.');

  } catch (error) {
    console.error('Error during screenshot capture:', error);
  } finally {
    await browser.close();
    devServer.kill();
    process.exit(0);
  }
}

captureScreenshots();
