// @ts-check
const { test, expect } = require('@playwright/test');

test('Find console message', async ({ page }) => {
  const DOMAIN = 'https://www.topuniversities.com';
  const TARGET_MESSAGE = 'MIME Type';
  await page.goto(DOMAIN);

  // Get all a elements
  const links = await page.getByRole('link').all();
  let allow_links = [];
  // Loop through links
  for (let link of links) {
    let href = await link.getAttribute('href');
    if (href?.indexOf('http') !== -1) {
      continue;
    }
    //  if trimmed href is empty, skip it
    if (href?.trim() === '') {
        continue;
    }
    if (href?.indexOf('mailto') !== -1) {
        continue;
    }
    if (href?.indexOf('about:blank') !== -1) {
        continue;
    }
    if (href?.indexOf('javascript') !== -1) {
        continue;
    }
    if (href?.indexOf('tel') !== -1) {
        continue;
    }
    if (href?.indexOf('/signup') !== -1) {
        continue;
    }
    // if link not start with /, skip it
    if (href?.indexOf('/') !== 0) {
        continue;
    }
    allow_links.push(href);
  }

  let collect_logs = {};
  for (let link of allow_links) {
    await page.goto(DOMAIN + link);
    await page.on('console', msg => {
      if (collect_logs[link]) {
        return;
      }
      if (msg?.text()?.indexOf(TARGET_MESSAGE) === -1) {
        return;
      }
      process.stdout.write(link + '   ' + msg?.text());
      collect_logs[link] = msg?.text();
    });
  }
  console.log(collect_logs);

});
