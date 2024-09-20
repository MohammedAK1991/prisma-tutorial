import prisma from '@/lib/prisma';

export async function GET() {
  const postsAggregation = await prisma.post.aggregate({
    _count: {
      likeNum: true,
    },
  });
  return new Response(JSON.stringify(postsAggregation));
}
