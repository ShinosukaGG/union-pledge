export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username } = req.body;
  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'Invalid username' });
  }

  // This is where you'd normally store to a DB or JSON
  // For now, just log the pledge (works on Vercel serverless logs)
  console.log("New pledge:", {
    username: username.trim().replace(/^@/, ""),
    timestamp: new Date().toISOString(),
  });

  return res.status(200).json({ success: true });
}
