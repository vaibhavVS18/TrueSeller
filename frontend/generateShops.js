import fs from "fs";

const categories = [
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
  "laptops",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "mobile-accessories",
  "motorcycle",
  "skin-care",
  "smartphones",
  "sports-accessories",
  "sunglasses",
  "tablets",
  "tops",
  "vehicle",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches",
];

const cities = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Pune",
  "Hyderabad",
  "Chennai",
  "Jaipur",
  "Ahmedabad",
  "Kolkata",
  "Surat",
];

const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const colors = [
  "2E86C1", // blue
  "1ABC9C", // teal
  "9B59B6", // purple
  "E67E22", // orange
  "F1C40F", // yellow
  "E74C3C", // red
  "16A085", // green
  "34495E", // dark gray
];

const SHOP_OWNER_ID = "68ddbcd1ec4add59e0bc6f7a"; // replace with your real owner _id

const shops = categories.map((cat) => {
  const city = randomElement(cities);
  const bgColor = randomElement(colors);
  const shopName =
    `${cat.charAt(0).toUpperCase() + cat.slice(1).replace("-", " ")} Hub`;

  // always-valid logo image URL
  const logo = `https://placehold.co/200x200/${bgColor}/FFFFFF?text=${encodeURIComponent(shopName)}`;

  return {
    owner: SHOP_OWNER_ID,
    shopname: shopName,
    city,
    address: `Shop No. ${Math.floor(Math.random() * 200 + 1)}, Main Market, ${city}`,
    description: `Your one-stop destination for premium ${cat.replace("-", " ")} products.`,
    logo,
    category: cat,
    contactEmail: `${cat.replace(/[^a-z]/gi, "")}@gmail.com`,
    contactPhone: `${Math.floor(7000000000 + Math.random() * 2000000000)}`, // 10-digit number
    products: [],
    verified: Math.random() > 0.5,
    isActive: true,
    rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
  };
});

fs.writeFileSync("./shops.json", JSON.stringify(shops, null, 2));
console.log("✅ Saved 24 realistic shops with working logos to shops.json");
