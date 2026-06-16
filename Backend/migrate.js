const { MongoClient } = require('mongodb');

const SOURCE_URI = "mongodb+srv://sahilzinzuvadiya77_db_user:sahil79909@cluster0.bu7vx3j.mongodb.net/Apexa?retryWrites=true&w=majority";
const TARGET_URI = "mongodb+srv://dgp0649_db_user:5YwBtmQ5Dk5L7JrJ@cluster0.6yownri.mongodb.net/Apexa?retryWrites=true&w=majority";

async function run() {
  const sourceClient = new MongoClient(SOURCE_URI);
  const targetClient = new MongoClient(TARGET_URI);

  try {
    console.log("Connecting to Source Database...");
    await sourceClient.connect();
    console.log("Connected to Source Database.");

    console.log("Connecting to Target Database...");
    await targetClient.connect();
    console.log("Connected to Target Database.");

    const sourceDb = sourceClient.db("Apexa");
    const targetDb = targetClient.db("Apexa");

    const collections = ['cars', 'contacts', 'bookingenquiries'];

    for (const colName of collections) {
      console.log(`\nMigrating collection: ${colName}...`);
      const sourceCol = sourceDb.collection(colName);
      const targetCol = targetDb.collection(colName);

      // Fetch all docs from source
      const docs = await sourceCol.find({}).toArray();
      console.log(`Found ${docs.length} documents in source.`);

      if (docs.length > 0) {
        // Clear target collection first
        await targetCol.deleteMany({});
        console.log(`Cleared existing documents in target.`);

        // Insert into target
        const result = await targetCol.insertMany(docs);
        console.log(`Successfully inserted ${result.insertedCount} documents into target.`);
      } else {
        console.log(`No documents to migrate for ${colName}.`);
      }
    }

    console.log("\nMigration completed successfully! 🎉");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await sourceClient.close();
    await targetClient.close();
  }
}

run();
