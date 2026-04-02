export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  try {
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbz4W7tSb2VfE5j3__Kzy-XpSSIuTiQWs8SwGA27kziKdzIGzACgvZiWL_ppRs8eQxPp/exec',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(req.body),
      }
    );

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { ok: false, message: text || 'Invalid response from Apps Script' };
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message || 'Proxy request failed',
    });
  }
}
