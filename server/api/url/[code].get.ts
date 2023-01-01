import prisma from "../../database";

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event);

  const url = await prisma.url.findUnique({
    where: {
      id: params.code,
    },
  });
  return {
    url,
  };
});
