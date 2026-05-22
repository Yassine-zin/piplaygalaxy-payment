// Vercel Serverless Function - Payment Completion

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
    const { paymentId, txid, userId } = req.body;

    if (!paymentId || !txid) {
      return res.status(400).json({ error: 'Payment ID and TXID required' });
    }

    console.log('Completing payment:', paymentId, 'TXID:', txid, 'User:', userId);

    // Get Pi API Key from environment variables
    const API_KEY = process.env.PI_API_KEY;
    
    if (!API_KEY) {
      console.error('PI_API_KEY not configured');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Complete the payment (Testnet)
    const response = await fetch(`https://api.testnet.minepi.com/v2/payments/${paymentId}/complete`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ txid })
    });

    const data = await response.json();
    console.log('Completion response:', data);

    if (response.ok) {
      // Here you can save to database
      console.log(`Premium activated for user: ${userId}`);
      
      return res.status(200).json({ 
        success: true, 
        data,
        message: 'Premium activated successfully'
      });
    } else {
      console.error('Completion failed:', data);
      return res.status(400).json({ error: 'Completion failed', details: data });
    }

  } catch (error) {
    console.error('Completion error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}

