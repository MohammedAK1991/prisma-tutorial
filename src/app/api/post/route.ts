import prisma from '@/lib/prisma';

export async function GET() {
  // const posts = await prisma.post.findMany({
  //   where: {
  //     OR: [
  //       {
  //         title: {
  //           contains: 'github',
  //           mode: 'insensitive',
  //         },
  //       },
  //       {
  //         title: {
  //           startsWith: 'Follow',
  //         },
  //       },
  //     ],
  //   },
  //   include: {
  //     categories: true,
  //   },
  // });
  const posts = await prisma.post.findMany({
    where: {
      author: {
        is: {
          name: 'Jack',
        },
      },
    },
    include: {
      author: true,
    },
  });
  return new Response(JSON.stringify(posts));
}
