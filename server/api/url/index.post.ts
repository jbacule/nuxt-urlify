import { urlSchema } from "~/schemas/url.schema";
import prisma from "~/server/database";
import generateCode from "~~/server/util/generateCode";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const body = await readBody(event);
  const schema = await urlSchema.parse(body);

  // validate url

  // generate code
  let urlCode = await generateCode(6);

  // check if code exist
  let codeExist = await prisma.url.findFirst({
    where: {
      urlCode,
    },
  });

  // generate a second code if exist
  if (codeExist) {
    urlCode = await generateCode(6);
  }

  await prisma.url.create({
    data: {
      longUrl: schema.longUrl,
      urlCode,
    },
  });
  return {
    message: "Short URL created!",
    shortUrl: `${config.baseURL}/${urlCode}`,
  };
});
