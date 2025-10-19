const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function main() {
  // ADMIN
  await prisma.admin.create({
    data: {
      id: "admin1",
      username: "admin1",
    },
  });
  await prisma.admin.create({
    data: {
      id: "admin2",
      username: "admin2",
    },
  });

  // CONTRIBUTOR
  console.log("Creating contributor users...");
  await prisma.contributor.create({
    data: {
      id: "contributor1",
      username: "contributor1",
    },
  });
  await prisma.contributor.create({
    data: {
      id: "contributor2",
      username: "contributor2",
    },
  });

  // DOCUMENT - Create documents with all DocType values
  const docTypes = [
    "TYPE1",
    "TYPE2",
    "TYPE3",
    "TYPE4",
    "TYPE5",
    "TYPE6",
    "TYPE7",
    "TYPE8",
  ];

  for (let i = 1; i <= 16; i++) {
    await prisma.document.create({
      data: {
        id: `document${i}`,
        title: `Document ${i}`,
        yearPublished: 2020 + (i % 5),
        docType: docTypes[(i - 1) % docTypes.length],
      },
    });
  }

  // ASSET - Create assets with all DocType values
  for (let i = 1; i <= 16; i++) {
    await prisma.asset.create({
      data: {
        id: `asset${i}`,
        title: `Asset ${i}`,
        yearPublished: 2020 + (i % 5),
        docType: docTypes[(i - 1) % docTypes.length],
      },
    });
  }

  console.log("Seeding completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
