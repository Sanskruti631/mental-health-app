import prisma from "./prisma";

// Re-export prisma as the default export to maintain compatibility
// while transitioning from mysql2 to Prisma
export default prisma;