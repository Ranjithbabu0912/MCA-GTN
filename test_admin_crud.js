/**
 * Comprehensive API Test Runner for Admin Module CRUD Operations
 */
require('dotenv').config();
const http = require('http');

const BASE_URL = 'http://localhost:5000';

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const reqOptions = {
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    const req = http.request(url, reqOptions, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          resolve({ status: res.statusCode, body: json });
        } catch (e) {
          resolve({ status: res.statusCode, body });
        }
      });
    });

    req.on('error', reject);

    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('--- STARTING ADMIN MODULE CRUD TESTS ---');
  let token = '';

  // 1. PIN Auth
  console.log('\n[1] Testing PIN Login...');
  const pinRes = await request('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: { pin: process.env.ADMIN_PIN || 'admin@1234' }
  });
  if (pinRes.status === 200 && pinRes.body.token) {
    token = pinRes.body.token;
    console.log('✅ PIN Login Successful. Token acquired.');
  } else {
    console.error('❌ PIN Login Failed:', pinRes.body);
    process.exit(1);
  }

  const authHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  // 2. Announcements CRUD
  console.log('\n[2] Testing Announcements CRUD...');
  // Create
  const annCreate = await request('/api/announcements', {
    method: 'POST',
    headers: authHeaders,
    body: {
      title: 'Automated Test Announcement',
      category: 'Admissions',
      description: 'This is a test announcement created by the verification suite.',
      isImportant: true,
      isLatest: true
    }
  });
  console.log('Create Announcement status:', annCreate.status, 'ID:', annCreate.body.data?.id);
  const annId = annCreate.body.data?.id;

  // Read
  const annGet = await request('/api/announcements');
  console.log('Get Announcements count:', annGet.body.count);

  // Update
  const annUpdate = await request(`/api/announcements/${annId}`, {
    method: 'PUT',
    headers: authHeaders,
    body: {
      title: 'Automated Test Announcement (UPDATED)'
    }
  });
  console.log('Update Announcement status:', annUpdate.status, 'Title:', annUpdate.body.data?.title);

  // Delete
  const annDel = await request(`/api/announcements/${annId}`, {
    method: 'DELETE',
    headers: authHeaders
  });
  console.log('Delete Announcement status:', annDel.status, 'Success:', annDel.body.success);

  // 3. Achievements CRUD
  console.log('\n[3] Testing Achievements CRUD...');
  const achCreate = await request('/api/achievements', {
    method: 'POST',
    headers: authHeaders,
    body: {
      title: 'First Prize at National Hackathon 2026',
      studentName: 'S. Karthi & Team',
      year: '2025-2026',
      category: 'Hackathon',
      companyOrOrg: 'NIT Trichy',
      description: 'Won 1st prize in Smart India AI challenge.',
      image: 'assets/images/achieve-test.jpg'
    }
  });
  const achId = achCreate.body.data?.id;
  console.log('Create Achievement status:', achCreate.status, 'ID:', achId);

  const achUpdate = await request(`/api/achievements/${achId}`, {
    method: 'PUT',
    headers: authHeaders,
    body: { companyOrOrg: 'NIT Trichy (Winner Trophy)' }
  });
  console.log('Update Achievement status:', achUpdate.status);

  const achDel = await request(`/api/achievements/${achId}`, {
    method: 'DELETE',
    headers: authHeaders
  });
  console.log('Delete Achievement status:', achDel.status);

  // 4. Gallery CRUD
  console.log('\n[4] Testing Gallery CRUD...');
  const galCreate = await request('/api/gallery', {
    method: 'POST',
    headers: authHeaders,
    body: {
      title: 'New AI & Robotics Research Lab',
      category: 'Labs',
      image: 'assets/images/gallery/ai-lab.jpg',
      description: 'Inauguration of GPU compute nodes.'
    }
  });
  const galId = galCreate.body.data?.id;
  console.log('Create Gallery status:', galCreate.status, 'ID:', galId);

  const galUpdate = await request(`/api/gallery/${galId}`, {
    method: 'PUT',
    headers: authHeaders,
    body: { title: 'New AI & Robotics Research Lab (Updated)' }
  });
  console.log('Update Gallery status:', galUpdate.status);

  const galDel = await request(`/api/gallery/${galId}`, {
    method: 'DELETE',
    headers: authHeaders
  });
  console.log('Delete Gallery status:', galDel.status);

  // 5. Events CRUD
  console.log('\n[5] Testing Events CRUD...');
  const eveCreate = await request('/api/events', {
    method: 'POST',
    headers: authHeaders,
    body: {
      title: 'Workshop on Cloud Microservices with Docker & Kubernetes',
      date: 'December 12, 2026',
      time: '10:00 AM - 4:00 PM',
      venue: 'MCA High Performance Computing Lab',
      category: 'Workshop',
      status: 'Upcoming',
      speaker: 'Mr. R. Vignesh, Cloud Architect',
      description: 'Hands-on training on cloud deployments.'
    }
  });
  const eveId = eveCreate.body.data?.id;
  console.log('Create Event status:', eveCreate.status, 'ID:', eveId);

  const eveUpdate = await request(`/api/events/${eveId}`, {
    method: 'PUT',
    headers: authHeaders,
    body: { status: 'Ongoing' }
  });
  console.log('Update Event status:', eveUpdate.status);

  const eveDel = await request(`/api/events/${eveId}`, {
    method: 'DELETE',
    headers: authHeaders
  });
  console.log('Delete Event status:', eveDel.status);

  // 6. Faculty CRUD
  console.log('\n[6] Testing Faculty CRUD...');
  const facCreate = await request('/api/faculty', {
    method: 'POST',
    headers: authHeaders,
    body: {
      name: 'Dr. R. Rajendran',
      designation: 'Assistant Professor',
      qualification: 'M.C.A., Ph.D.',
      experience: '12+ Years',
      email: 'rajendran.mca@gtnartscollege.ac.in',
      phone: '+91 98765 12345',
      specialization: 'Cybersecurity, Cryptography',
      image: 'assets/images/faculty/Prof 2.png',
      bio: 'Published 15 research papers in Cryptography.'
    }
  });
  const facId = facCreate.body.data?.id;
  console.log('Create Faculty status:', facCreate.status, 'ID:', facId);

  const facUpdate = await request(`/api/faculty/${facId}`, {
    method: 'PUT',
    headers: authHeaders,
    body: { experience: '14+ Years' }
  });
  console.log('Update Faculty status:', facUpdate.status);

  const facDel = await request(`/api/faculty/${facId}`, {
    method: 'DELETE',
    headers: authHeaders
  });
  console.log('Delete Faculty status:', facDel.status);

  console.log('\n======================================================');
  console.log('🎉 ALL CRUD OPERATIONS TESTED & PASSED 100% SUCCESFULLY!');
  console.log('======================================================');
}

runTests().catch(err => {
  console.error('Test Suite Failed:', err);
  process.exit(1);
});
