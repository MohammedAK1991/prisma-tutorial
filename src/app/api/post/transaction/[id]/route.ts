import prisma from '@/lib/prisma';

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { numberOfLikes } = await req.json();

  try {
    console.log('--------------------------------');
    console.log('numberOfLikes', JSON.stringify(numberOfLikes));
    console.log('params: ', JSON.stringify(params));

    const reduceLikes = prisma.post.update({
      where: {
        id: parseInt(params.id), // Use parseInt if id is stored as an integer in the database
      },
      data: {
        likeNum: {
          decrement: +numberOfLikes, // Assuming numberOfLikes is a number
        },
      },
    });

    const increaseLikes = prisma.post.update({
      where: {
        id: 21, // You might want to check if this ID exists, or use a dynamic ID
      },
      data: {
        likeNum: {
          increment: +numberOfLikes, // Assuming numberOfLikes is a number
        },
      },
    });

    const [first, second] = await prisma.$transaction([
      reduceLikes,
      increaseLikes,
    ]);

    return new Response(JSON.stringify({ first: first, second: second }));
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
