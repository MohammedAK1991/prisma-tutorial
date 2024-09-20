import prisma from '@/lib/prisma';

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { numberOfLikes } = await req.json();
  console.log('--------------------------------');

  console.log('numberOfLikes', JSON.stringify(numberOfLikes));
  console.log('params: ', JSON.stringify(params));

  const reduceLikes = prisma.post.update({
    where: {
      id: +params.id,
    },
    data: {
      likeNum: {
        decrement: numberOfLikes,
      },
    },
  });
  const increaseLikes = prisma.post.update({
    where: {
      id: +params.id,
    },
    data: {
      likeNum: {
        increment: numberOfLikes,
      },
    },
  });

  const [res] = await prisma.$transaction([reduceLikes, increaseLikes]);
  return new Response(JSON.stringify(res));
}
