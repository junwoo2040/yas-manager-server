import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.record.deleteMany({});
  await prisma.task.deleteMany({});
  await prisma.shift.deleteMany({});
  await prisma.joinUserTask.deleteMany({});
  await prisma.joinUserEvent.deleteMany({});

  await prisma.user.create({
    data: {
      email: "isy.junny@gmail.com",
      firstName: "Jun Woo",
      lastName: "Baek",
      username: "jun2040",
      password: "1234",
      records: {
        create: [
          {
            amount: 10.0,
          },
          {
            amount: 20.0,
          },
        ],
      },
      tasks: {
        create: [
          {
            task: {
              create: {
                title: "code",
              },
            },
          },
          {
            task: {
              create: {
                title: "study",
              },
            },
          },
        ],
      },
      events: {
        create: [
          {
            event: {
              create: {
                name: "ABCDE",
                start: new Date(),
                end: new Date(),
                path: "abcde",
                shifts: {
                  create: [
                    {
                      start: new Date(),
                      end: new Date(),
                      volunteers: {
                        create: [
                          {
                            user: {
                              connect: {
                                email: "isy.junny@gmail.com",
                              },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    },
  });

  await prisma.user.create({
    data: {
      email: "24tani@isyedu.org",
      firstName: "Isabel",
      lastName: "Tan",
      username: "tanyx06",
      password: "1234",
      records: {
        create: [
          {
            amount: 5.0,
          },
          {
            amount: 35.0,
          },
        ],
      },
      tasks: {
        create: [
          {
            task: {
              create: {
                title: "uni app",
              },
            },
          },
          {
            task: {
              connect: {
                title: "study",
              },
            },
          },
        ],
      },
      events: {
        create: [
          {
            event: {
              connect: {
                name: "ABCDE",
              },
            },
          },
        ],
      },
    },
  });
}

main().then(() => {
  console.log("Data seeded");
});
