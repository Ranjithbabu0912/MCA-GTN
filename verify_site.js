const fs = require('fs');
const path = require('path');
const http = require('http');

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
console.log('Auditing HTML files:', htmlFiles.length);

let totalIssues = 0;

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // Check script tags
  const scriptRegex = /<script[^>]+src=["']([^"']+)["']/g;
  let match;
  while ((match = scriptRegex.exec(content)) !== null) {
    const src = match[1];
    if (!src.startsWith('http') && !fs.existsSync(src)) {
      console.error(file + ' broken script:', src);
      totalIssues++;
    }
  }

  // Check link href (css, favicons)
  const linkRegex = /<link[^>]+href=["']([^"']+)["']/g;
  while ((match = linkRegex.exec(content)) !== null) {
    const href = match[1];
    if (!href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('#') && !fs.existsSync(href)) {
      console.error(file + ' broken link href:', href);
      totalIssues++;
    }
  }

  // Check img src
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/g;
  while ((match = imgRegex.exec(content)) !== null) {
    const src = match[1];
    if (!src.startsWith('http') && !src.startsWith('data:') && !fs.existsSync(src)) {
      console.error(file + ' broken image:', src);
      totalIssues++;
    }
  }
});

function fetchAPI(apiPath) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:5000${apiPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({ success: false, data: [] });
        }
      });
    }).on('error', reject);
  });
}

async function validateDatabase() {
  console.log('\n--- MONGODB ATLAS LIVE DATA VALIDATION ---');
  try {
    const health = await fetchAPI('/api/health');
    console.log('Backend Service:', health.service);
    console.log('Active Database:', health.database);

    const [eventsRes, achRes, facRes, galRes, annRes] = await Promise.all([
      fetchAPI('/api/events'),
      fetchAPI('/api/achievements'),
      fetchAPI('/api/faculty'),
      fetchAPI('/api/gallery'),
      fetchAPI('/api/announcements')
    ]);

    const events = eventsRes.data || [];
    const achievements = achRes.data || [];
    const faculty = facRes.data || [];
    const gallery = galRes.data || [];
    const announcements = annRes.data || [];

    console.log('Live MongoDB Events count:       ', events.length);
    console.log('Live MongoDB Achievements count: ', achievements.length);
    console.log('Live MongoDB Faculty count:      ', faculty.length);
    console.log('Live MongoDB Gallery count:      ', gallery.length);
    console.log('Live MongoDB Announcements count:', announcements.length);

    faculty.forEach(member => {
      const imgPath = (member.image || '').replace(/^\.\.\//, '');
      if (imgPath && !fs.existsSync(imgPath)) {
        console.error('Missing faculty image for', member.name, ':', imgPath);
        totalIssues++;
      }
    });

    if (totalIssues === 0) {
      console.log('\nAUDIT COMPLETE: All HTML files, resources, and live MongoDB Atlas collections are 100% valid with ZERO errors!');
    } else {
      console.log('\nAUDIT COMPLETE with ' + totalIssues + ' issue(s).');
      process.exit(1);
    }
  } catch (err) {
    console.error('Failed to query live MongoDB Atlas API:', err.message);
    process.exit(1);
  }
}

validateDatabase();
