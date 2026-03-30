"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const adminEmail = "admin@sportshub.com";
    const adminPassword = await bcryptjs_1.default.hash("admin123", 10);
    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: {
            name: "Admin User",
            email: adminEmail,
            password: adminPassword,
            role: client_1.Role.ADMIN,
        },
    });
    await prisma.cart.upsert({
        where: { userId: admin.id },
        update: {},
        create: { userId: admin.id },
    });
    const categoryNames = ["Footwear", "Apparel", "Equipment"];
    const categories = await Promise.all(categoryNames.map((name) => prisma.category.upsert({
        where: { name },
        update: {},
        create: { name },
    })));
    const samples = [
        {
            name: "Velocity Pro Trainer",
            description: "Versatile training footwear designed for gym sessions, track drills, and everyday movement.",
            price: 8999,
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
            stock: 50,
            availableSizes: [6, 7, 8, 9, 10],
            categoryId: categories[0].id,
        },
        {
            name: "Elite Match Jersey",
            description: "Breathable training jersey with lightweight fabric built for match day and daily workouts.",
            price: 7499,
            image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2",
            stock: 35,
            availableSizes: [4, 5, 6, 7, 8, 9],
            categoryId: categories[1].id,
        },
    ];
    for (const product of samples) {
        await prisma.product.create({
            data: product,
        });
    }
    // eslint-disable-next-line no-console
    console.log("Seed complete. Admin login: admin@sportshub.com / admin123");
}
main()
    .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map