import { db } from '../index.js';

export const getCommunities = (req, res) => {
  try {
    const communities = db.prepare('SELECT * FROM communities').all();
    res.json(communities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCommunity = (req, res) => {
  const { name } = req.body;

  try {
    const result = db.prepare(`
      INSERT INTO communities (name, members)
      VALUES (?, 0)
    `).run(name);

    res.status(201).json({ id: result.lastInsertRowid, name, members: 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const joinCommunity = (req, res) => {
  const { id } = req.params;

  try {
    const result = db.prepare(`
      UPDATE communities
      SET members = members + 1
      WHERE id = ?
    `).run(id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Community not found' });
    }

    const community = db.prepare('SELECT * FROM communities WHERE id = ?').get(id);
    res.json(community);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};