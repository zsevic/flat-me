import validator from "validator";

// eslint-disable-next-line consistent-return
export default function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "Email is missing",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Email is not valid",
      });
    }

    return res.status(200).end();
  }
}
