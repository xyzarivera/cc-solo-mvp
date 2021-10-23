const functions = require("firebase-functions");
const logger = functions.logger;

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

exports.helloWorld = functions
  .region("asia-east2")
  .https.onCall((payload, context) => {
    // check if user is valid
    if (!context.auth || !context.auth.token) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "To continue, please sign in the application"
      );
    }
    const user_id = context.auth.token.uid;

    logger.info(`user ${user_id} has logged in`);
    return { code: 200, message: "Successful test." };
  });

exports.getAllStandupEntries = functions
  .region("asia-east2")
  .https.onCall(async (payload, context) => {
    // check if user is valid
    if (!context.auth || !context.auth.token) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "To continue, please sign in the application"
      );
    }
    const user_id = context.auth.token.uid;

    const db = admin.firestore();
    const entriesQuery = db.collection('standup_entries').where("user_id", "==", user_id);
    const entriesRef = await entriesQuery.get();
    let entries = []

    entriesRef.forEach((doc) => {
      entries.push(doc.data());
      console.log(doc.data())
    })


    logger.info(`user ${user_id} has accessed their entries`);
    return { code: 200, message: "Successful read.", data: entries };
  });

exports.getStandupEntry= functions
  .region("asia-east2")
  .https.onCall(async (payload, context) => {
    // check if user is valid
    if (!context.auth || !context.auth.token) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "To continue, please sign in the application"
      );
    }
    const user_id = context.auth.token.uid;

    const db = admin.firestore();
    const entryQuery = db.collection('standup_entries').doc("E8MXaOyoakaIpyTTP62W");
    const entryRef = await entryQuery.get();

    if (!entryRef.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data: exists');
    }

    logger.info(`user ${user_id} has accessed their entries`);
    return { code: 200, message: "Successful read.", data: entryRef.data() };
  });

exports.createEntry = functions
  .region("asia-east2")
  .https.onCall(async (payload, context) => {
    // check if user is valid
    if (!context.auth || !context.auth.token) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "To continue, please sign in the application"
      );
    }
    const user_id = context.auth.token.uid;
    logger.info(`user_id: ${user_id} is creating an entry`);

    const standup = {
      did: payload.standup_did,
      do: payload.standup_do,
      blocker: payload.standup_blocker,
    };
    const timestamp = new Date().toISOString();
    try {
      const write = await admin
        .firestore()
        .collection("standup_entries")
        .add({ standup: standup, timestamp: timestamp, user_id: user_id });
      logger.info({ result: `Message with ID: ${write.id} added.` });
      return { code: 200, message: "Successful entry creation." };
    } catch (err) {
      logger.error({
        code: err.code,
        message: err.message,
        details: err.details,
      });
      return { code: err.code, message: err.message, details: err.details };
    }
  });
