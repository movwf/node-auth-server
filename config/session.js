import MongoStore from "connect-mongo";

export const sessionOptions = {
  secret: ["bulldozer", "trekking", "lightyogurt"],
  saveUninitialized: false, // don't create session until something stored
  resave: false,
  cookie: {
    httpOnly: true,
    maxAge: 2 * 60 * 60 * 1000,
  },
  store: MongoStore.create({
    mongoUrl: process.env.DB_URL,
    ttl: 24 * 60 * 60 * 1000,
  }),
};
