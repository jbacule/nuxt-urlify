import prisma from "../../database";

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event);

  const url = await prisma.url.findFirst({
    where: {
      urlCode: params.code,
    },
  });
  return {
    url,
  };
});
