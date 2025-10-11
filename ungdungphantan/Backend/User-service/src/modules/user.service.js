// src/modules/user.service.js
import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();

export const getUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });
  return users;
};
