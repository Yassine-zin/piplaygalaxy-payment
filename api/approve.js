// Vercel Serverless Function - Payment Approval

export default async function handler(req, res) {
  
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { paymentId } = req.body;

    if (!paymentId) {
      return res.status(400).json({ error: 'Payment ID required' });
    }

    console.log('Approving payment:', paymentId);

    // Get Pi API Key from environment variables
    const API_KEY = process.env.PI_API_KEY;
    
    if (!API_KEY) {
      console.error('PI_API_KEY not configured');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Approve the payment (Testnet)
    const response = await fetch(`https://api.testnet.minepi.com/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log('Approval response:', data);

    if (response.ok) {
      return res.status(200).json({ success: true, data });
    } else {
      console.error('Approval failed:', data);
      return res.status(400).json({ error: 'Approval failed', details: data });
    }

  } catch (error) {
    console.error('Approval error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}

