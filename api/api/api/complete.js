export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { paymentId, txid } = req.body;

  console.log("Payment completed:", paymentId, txid);

  res.status(200).json({ completed: true });
}
