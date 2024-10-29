import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Database from 'better-sqlite3';

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, 'database.sqlite'));
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Initialize database tables
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    timestamp INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS replies (
    id TEXT PRIMARY KEY,
    post_id TEXT NOT NULL,
    content TEXT NOT NULL,
    timestamp INTEGER NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts (id)
  );

  CREATE TABLE IF NOT EXISTS communities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    members INTEGER DEFAULT 0
  );
`);

// Routes
import postsRouter from './routes/posts.js';
import communitiesRouter from './routes/communities.js';

app.use('/api/posts', postsRouter);
app.use('/api/communities', communitiesRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export { db };