const API_URL = 'http://localhost:3000/api';

export async function fetchPosts() {
  const response = await fetch(`${API_URL}/posts`);
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
}

export async function createPost(content: string) {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: crypto.randomUUID(),
      content
    })
  });
  if (!response.ok) throw new Error('Failed to create post');
  return response.json();
}

export async function createReply(postId: string, content: string) {
  const response = await fetch(`${API_URL}/posts/${postId}/replies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: crypto.randomUUID(),
      content
    })
  });
  if (!response.ok) throw new Error('Failed to create reply');
  return response.json();
}

export async function fetchCommunities() {
  const response = await fetch(`${API_URL}/communities`);
  if (!response.ok) throw new Error('Failed to fetch communities');
  return response.json();
}

export async function joinCommunity(id: number) {
  const response = await fetch(`${API_URL}/communities/${id}/join`, {
    method: 'POST'
  });
  if (!response.ok) throw new Error('Failed to join community');
  return response.json();
}