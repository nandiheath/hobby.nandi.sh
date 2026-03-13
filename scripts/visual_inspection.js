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
  await page.setViewportSize({ width: 1920, height: 1080 });

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
      // Extra wait to ensure content is rendered
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(screenshotsDir, `${fileName}.png`), fullPage: true });

      // If we are on references or portfolio, open the specific item to capture the modal
      if (route.includes('references') || route.includes('portfolio')) {
        console.log(`Opening specific item on ${route} to capture modal...`);
        // Wait for cards to be loaded
        await page.waitForSelector('.card', { timeout: 15000 }).catch(() => null);
        
        // Find the "Imperial Fists", "Instagram Reel Showcase" or "Imperial Fists Showcase" card if on references
        let targetCard;
        if (route.includes('references')) {
            // Find a card containing the text "Imperial Fists", "Instagram Reel" or "帝國之拳"
            targetCard = await page.locator('.card', { hasText: /Instagram Reel|Imperial Fists|帝國之拳/ }).first();
        } else {
            targetCard = await page.locator('.card').first();
        }
        
        let clicked = false;
        if (await targetCard.isVisible()) {
            console.log(`Clicking target card...`);
            await targetCard.click();
            clicked = true;
        } else {
            console.log('Target card not found, fallback to first card...');
            targetCard = await page.locator('.card').first();
            if (await targetCard.isVisible()) {
                await targetCard.click();
                clicked = true;
            }
        }

        if (clicked) {
          console.log('Clicked card, waiting for modal...');
          
          try {
            // Wait for modal to be visible - check for any element that looks like a modal
            await page.waitForSelector('.modal-dialog, .modal-content, [role="dialog"]', { state: 'visible', timeout: 15000 });
            await page.waitForTimeout(3000); // Wait for modal animation and images
            await page.screenshot({ path: path.join(screenshotsDir, `modal_${fileName}.png`) });
            
            // Capture the modal's DOM snapshot specifically
            const modalContent = await page.locator('.modal-content, .modal-dialog, [role="dialog"]').first().innerHTML();
            fs.writeFileSync(path.join(screenshotsDir, `modal_${fileName}_snapshot.html`), modalContent);
          } catch (e) {
            console.log(`Modal did not appear or was not captured: ${e.message}`);
          }

          // Close modal to proceed
          await page.keyboard.press('Escape');
          await page.waitForTimeout(1000);
        } else {
          console.log('No clickable card found');
        }
      }
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
