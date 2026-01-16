export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { paymentId, txid } = req.body;

  if (!paymentId || !txid) {
    return res.status(400).json({ error: "Missing data" });
  }

  return res.status(200).json({
    completed: true,
    paymentId,
    txid,
  });
}
