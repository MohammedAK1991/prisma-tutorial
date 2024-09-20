import prisma from '@/lib/prisma';

export async function GET() {
  // const users = await prisma.user.findMany({
  //   where: {
  //     OR: [
  //       {
  //         id: {
  //           not: {
  //             gte: 3,
  //           },
  //         },
  //       },
  //       {
  //         email: {
  //           contains: 'prisma.io',
  //         },
  //       },
  //     ],
  //   },
  //   include: {
  //     posts: {
  //       where: {
  //         published: true,
  //       },
  //     },
  //   },
  // });
  const users = await prisma.user.findMany({
    where: {
      posts: {
        none: {
          published: false,
        },
      },
    },
    include: { posts: true },
  });
  return new Response(JSON.stringify(users));
}
