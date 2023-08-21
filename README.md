# Script to parse site and check that images has lazy loading attribute

## Requirements

- Node.js 16 or higher

## Installation

Clone repository:

```bash
git clone <todo>
```

Install dependencies:

```bash
npm install
```

## How to use

To change domain, change variable `DOMAIN` in `index.js` file. For example, to check images on `https://www.example.com`:

```javascript
const DOMAIN = 'https://www.example.com';
```

Run script:

```bash
npm start
```

This will create `result.json` file with results and you will see something like this in console for images without lazy loading attribute:

```bash
https://next.topmba.com/mba-rankings/2023:  //pool.admedo.com/pixel?id=136039&t=img
https://next.topmba.com/mba-rankings/2023:  /themes/custom/tu_d8/logo_tm.svg
https://next.topmba.com/mba-rankings/2023:  /themes/custom/tu_d8/images/user-icon-white.svg
https://next.topmba.com/mba-rankings/2023:  /sites/default/files/styles/350x168/public/articles/lead-images/stan325untitled.jpg.webp
https://next.topmba.com/mba-rankings/2023:  /sites/default/files/styles/350x168/public/articles/lead-images/hec_paris_lead_0.jpg.webp
https://next.topmba.com/mba-rankings/2023:  /sites/default/files/styles/350x168/public/articles/lead-images/yonsei_university_lead.jpg.webp
https://next.topmba.com/mba-rankings/2023:  /themes/custom/tu_d8/images/reg_form/logo.png
https://next.topmba.com/mba-rankings/2023:  //pool.admedo.com/pixel?id=136039&t=img
```
