const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();

const users = JSON.parse(fs.readFileSync("users.json", "utf8"));
const products = JSON.parse(fs.readFileSync("products.json", "utf8"));
const categories = JSON.parse(fs.readFileSync("categories.json", "utf8"));

async function main() {
  console.log(`Start seeding ...`);
  for (const u of users) {
    const user = await prisma.user.create({
      data: {
        name: u.name,
        email: u.email,
        email_verified_at: u.email_verified_at
          ? new Date(u.email_verified_at)
          : null,
        password: u.password,
        role: u.role,
        remember_token: u.remember_token,
        created_at: new Date(u.created_at),
        updated_at: new Date(u.updated_at),
      },
    });
    console.log(`Created user with id: ${user.id}`);
  }

  for (const c of categories) {
    const category = await prisma.category.create({
      data: {
        name: c.name,
        slug: c.slug,
        details: c.details,
        created_at: new Date(c.created_at),
        updated_at: new Date(c.updated_at),
      },
    });
    console.log(`Created Category with id: ${category.id}`);
  }

  for (const p of products) {
    const product = await prisma.product.create({
      data: {
        category_id: parseInt(p.category_id),
        name: p.name,
        slug: p.slug,
        details: p.details,
        image: p.image,
        images: p.images,
        price: parseInt(p.price),
        quantity: parseInt(p.quantity),
        description: p.description,
      },
    });
    console.log(`Created product with id: ${product.id}`);
  }

  console.log(`Seeding finished.`);
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
