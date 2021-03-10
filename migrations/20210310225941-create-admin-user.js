module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    await db.collection('users').insert({
      name: 'Admin',
      lastName: 'Zzz',
      email: 'xxx@gmail.com',
      password: '$argon2i$v=19$m=4096,t=3,p=1$70wxxlxvCHZZ9lms7zFERA$9Jb6ips1bq5j3nquz/ZLK8ls6mCtrmfcL8k/E4UHoFk',
      createdAt : new Date().toISOString(),
      updatedAt : new Date().toISOString(),
    });
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
