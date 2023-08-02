import prisma from "../../../lib/prisma";

// PUT /api/publish/:id
export default async function handle(req, res) {
  const { title, line1, line2, line3 } = req.body;

  const postId = req.query.id;
  const post = await prisma.post.update({
    where: { id: postId },
    data: {
      title,
      line1,
      line2,
      line3,
      published: true,
    },
  });
  res.json(post);
}
