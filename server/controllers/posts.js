import { db } from '../index.js';

export const getPosts = (req, res) => {
  try {
    const posts = db.prepare(`
      SELECT 
        p.*,
        json_group_array(
          json_object(
            'id', r.id,
            'content', r.content,
            'timestamp', r.timestamp
          )
        ) as replies
      FROM posts p
      LEFT JOIN replies r ON p.id = r.post_id
      GROUP BY p.id
      ORDER BY p.timestamp DESC
    `).all();

    // Parse replies JSON string and filter out null values
    const formattedPosts = posts.map(post => ({
      ...post,
      replies: JSON.parse(post.replies).filter(reply => reply.id !== null)
    }));

    res.json(formattedPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPost = (req, res) => {
  const { id, content } = req.body;
  
  try {
    const result = db.prepare(`
      INSERT INTO posts (id, content, timestamp)
      VALUES (?, ?, ?)
    `).run(id, content, Date.now());

    res.status(201).json({ id, content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPost = (req, res) => {
  const { id } = req.params;

  try {
    const post = db.prepare(`
      SELECT 
        p.*,
        json_group_array(
          json_object(
            'id', r.id,
            'content', r.content,
            'timestamp', r.timestamp
          )
        ) as replies
      FROM posts p
      LEFT JOIN replies r ON p.id = r.post_id
      WHERE p.id = ?
      GROUP BY p.id
    `).get(id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.replies = JSON.parse(post.replies).filter(reply => reply.id !== null);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createReply = (req, res) => {
  const { id: postId } = req.params;
  const { id, content } = req.body;

  try {
    const result = db.prepare(`
      INSERT INTO replies (id, post_id, content, timestamp)
      VALUES (?, ?, ?, ?)
    `).run(id, postId, content, Date.now());

    res.status(201).json({ id, content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};