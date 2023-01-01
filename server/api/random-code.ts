import generateCode from "~~/server/util/generateCode";

export default defineEventHandler(async (event) => {
  const urlCode = await generateCode(6);
  return {
    urlCode,
  };
});
