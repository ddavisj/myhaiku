import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

// POST /api/post
// Optional fields in body: line1, line2, line3
export default async function handle(req, res) {
  if (req.method === "POST") {
    const { title, line1, line2, line3 } = req.body;

    const session = await getSession({ req });
    const result = await prisma.post.create({
      data: {
        title,
        line1,
        line2,
        line3,
        author: { connect: { email: session?.user?.email } },
      },
    });

    res.json(result);
  }
}
