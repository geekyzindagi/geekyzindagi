
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("--- Community Data Check ---");
  
  const userCount = await prisma.user.count();
  console.log("Total Users:", userCount);

  const users = await prisma.user.findMany({
    select: {
      email: true,
      role: true,
      memberTier: true,
      status: true
    }
  });
  console.log("User Details:", JSON.stringify(users, null, 2));

  const ideasCount = await prisma.ideaSubmission.count();
  console.log("Total Ideas:", ideasCount);

  const ideas = await prisma.ideaSubmission.findMany({
    select: {
      title: true,
      email: true,
      status: true,
      convertedUserId: true
    }
  });
  console.log("Idea Details:", JSON.stringify(ideas, null, 2));

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
