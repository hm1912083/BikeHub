import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  switch (req.method) {
    case "POST":
      const { email, password } = req.body;
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (user && user.password === password) {
          return res.status(200).json({ user });
        } else {
          return res.status(401).json({ message: "Invalid email or password" });
        }
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Something went wrong", error: error.message });
      }

    default:
      return res.status(405).end();
  }
}
