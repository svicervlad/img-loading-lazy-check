const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const DOMAIN = 'https://next.topmba.com';

async function getUrls() {
    const response = await fetch(DOMAIN);
    const src = await response.text();
    let dom = await new JSDOM(src);
    let document = dom.window.document
    let links = await document.querySelectorAll('a');
    let allow_links = [];
    for (let link of links.values()) {
        //  If link is not relative, skip it
        if (link.href.indexOf('http') !== -1) {
            continue;
        }
        //  if trimmed href is empty, skip it
        if (link.href.trim() === '') {
            continue;
        }
        if (link.href.indexOf('mailto') !== -1) {
            continue;
        }
        if (link.href.indexOf('about:blank') !== -1) {
            continue;
        }
        if (link.href.indexOf('javascript') !== -1) {
            continue;
        }
        if (link.href.indexOf('tel') !== -1) {
            continue;
        }
        if (link.href.indexOf('/signup') !== -1) {
            continue;
        }
        // if link not start with /, skip it
        if (link.href.indexOf('/') !== 0) {
            continue;
        }
        // process.stdout.write(link.href.toString() + '\n');
        allow_links.push(DOMAIN + link.href);
    }
    return allow_links;
}

async function getPageDom (url) {
    const response = await fetch(url);
    const src = await response.text();
    let dom = await new JSDOM(src);
    let document = dom.window.document
    return document;
}

// [{'link': '/sdfhksdhf/sjfhsdkjf', 'src': '/jkshdfkj/sdkjfhkhjsdf.jpg'}, {'link': '/sdfhksdhf/sjfhsdkjf', 'src': '/jkshdfkj/sdkjfhkhjsdf.jpg'}]

(async function main () {
    let urls = await getUrls();
    let results = [];
    for (let url of urls) {
        let dom = await getPageDom(url);
        // Get all img tags
        let imgs = await dom.querySelectorAll('img');
        for (let img of imgs.values()) {
            // Check if img tag has src attribute
            if (!img.hasAttribute('src')) {
                continue;
            }
            // Check if img src not empty
            if (img.src.trim() === '') {
                continue;
            }
            // Check if img tag loading="lazy"
            if (img.hasAttribute('loading') && img.getAttribute('loading') === 'lazy') {
                continue;
            }
            results.push({'link': url, 'src': img.src});
            process.stdout.write(url + ':  ' + img.src.toString() + '\n');
        }
    }
    // Write results to file
    let fs = require('fs');
    fs.writeFile('results.json', JSON.stringify(results), function (err) {
        if (err) throw err;
        console.log('Saved!');
    })
})()
