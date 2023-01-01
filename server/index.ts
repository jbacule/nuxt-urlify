import prisma from "./database";

export default async () => {
  try {
    await prisma.$connect();
    console.log("DB connection established.");
  } catch (err) {
    console.error("DB connection failed.", err);
    await prisma.$disconnect();
  }
};
