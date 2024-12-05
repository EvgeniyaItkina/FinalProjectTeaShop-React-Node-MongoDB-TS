db = connect("mongodb://localhost:27017/admin");
db.auth(process.env.MONGODB_ROOT_USER, process.env.MONGODB_ROOT_PASSWORD);
const appDb = db.getSiblingDB(process.env.MONGODB_DATABASE);
appDb.updateUser(process.env.MONGODB_USERNAME, {roles: [{ role: "readWrite", db: process.env.MONGODB_DATABASE }]});
appDb.testCollection.insertOne({ initialized: true });
