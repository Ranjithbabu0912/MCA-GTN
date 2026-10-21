const mongoose = require('mongoose');
require('dotenv').config();

const Announcement = require('./models/Announcement');
const Achievement = require('./models/Achievement');
const Gallery = require('./models/Gallery');
const Event = require('./models/Event');
const Faculty = require('./models/Faculty');

const { mcaAnnouncements } = require('./js/announcements');
const { mcaAchievementsData } = require('./js/data/achievements');
const { mcaGalleryItems } = require('./js/gallery');
const { mcaEventsData } = require('./js/data/events');
const { facultyMembers } = require('./js/faculty');

async function migrateAllToMongo() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB Atlas.');

  // 1. Migrate Announcements
  for (const ann of mcaAnnouncements) {
    await Announcement.findOneAndUpdate(
      { id: ann.id },
      { $set: ann },
      { upsert: true, returnDocument: 'after' }
    );
  }
  console.log('Announcements upserted! Total now:', await Announcement.countDocuments());

  // 2. Migrate Achievements
  for (const ach of mcaAchievementsData) {
    // Preserve any custom image that was already saved in Atlas if existing has custom upload
    const existing = await Achievement.findOne({ id: ach.id }).lean();
    const updateData = { ...ach };
    if (existing && existing.image && existing.image !== 'assets/images/placeholder.jpg') {
      updateData.image = existing.image;
    }
    await Achievement.findOneAndUpdate(
      { id: ach.id },
      { $set: updateData },
      { upsert: true, returnDocument: 'after' }
    );
  }
  console.log('Achievements upserted! Total now:', await Achievement.countDocuments());

  // 3. Migrate Gallery
  for (const gal of mcaGalleryItems) {
    if (!gal.caption) gal.caption = gal.title;
    if (!gal.description) gal.description = gal.caption;
    if (!gal.categoryLabel) gal.categoryLabel = gal.category;
    const existing = await Gallery.findOne({ id: gal.id }).lean();
    const updateData = { ...gal };
    if (existing && existing.image && existing.image !== 'assets/images/placeholder.jpg') {
      updateData.image = existing.image;
    }
    await Gallery.findOneAndUpdate(
      { id: gal.id },
      { $set: updateData },
      { upsert: true, returnDocument: 'after' }
    );
  }
  console.log('Gallery upserted! Total now:', await Gallery.countDocuments());

  // 4. Migrate Events
  for (const evt of mcaEventsData) {
    const existing = await Event.findOne({ id: evt.id }).lean();
    const updateData = { ...evt };
    if (existing && existing.image && existing.image !== 'assets/images/placeholder.jpg') {
      updateData.image = existing.image;
    }
    await Event.findOneAndUpdate(
      { id: evt.id },
      { $set: updateData },
      { upsert: true, returnDocument: 'after' }
    );
  }
  console.log('Events upserted! Total now:', await Event.countDocuments());

  // 5. Migrate Faculty
  for (const fac of facultyMembers) {
    const existing = await Faculty.findOne({ id: fac.id }).lean();
    const updateData = { ...fac };
    if (existing && existing.image) {
      updateData.image = existing.image;
    }
    await Faculty.findOneAndUpdate(
      { id: fac.id },
      { $set: updateData },
      { upsert: true, returnDocument: 'after' }
    );
  }
  console.log('Faculty upserted! Total now:', await Faculty.countDocuments());

  console.log('==============================================');
  console.log('ALL LOCAL DATA SUCCESSFULLY MIGRATED TO ATLAS!');
  console.log('==============================================');

  await mongoose.disconnect();
}

migrateAllToMongo().catch(err => {
  console.error('Migration error:', err);
  process.exit(1);
});
