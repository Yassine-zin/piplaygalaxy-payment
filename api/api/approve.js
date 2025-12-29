export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { paymentId } = req.body;

  console.log("Approve payment:", paymentId);

  // Pi Testnet: نوافق مباشرة
  res.status(200).json({ approved: true });
}
