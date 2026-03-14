export const products = [
  {
    id: "C1",
    categoryName: 'night-lights',
    products: [
      {
        id: "C1P1",
        name: "Bunny Dreams Silicone Glow",
        price: 999,
        salePrice: 549,
        image: ["https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180441/Silicon_Rabbit_1_u46yxx.jpg",
          "https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180441/Silicon_Rabbit_2_adnapr.jpg",
          "https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180441/Silicon_Rabbit_3_g2n47d.jpg"
        ],
        description: "Adorable silicone rabbit night lamp with soft glow, perfect for bedside comfort and gentle illumination.",
        isOutOfStock: false,
        reviews: [
          { user: "Priya S.", rating: 5, comment: "Bohot hi pyara lamp hai! Mere bete ko bohot pasand aaya. Quality kaafi acchi hai.", verified: true },
          { user: "Amit R.", rating: 5, comment: "Value for money product. Delivery bhi fast thi. Highly recommended!", verified: true }
        ]
      },
      {
        id: "C1P2",
        name: "Dreamy Duck Companion",
        price: 999,
        salePrice: 699,
        image: ["https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180443/Slipping_Duck_3_kri17g.jpg",
          "https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180441/Slipping_Duck_1_cdnty7.jpg"
        ],
        description: "Cute duck-themed night light with a playful design, adding charm and warmth to any room.",
        isOutOfStock: false,
        reviews: [
          { user: "Neha G.", rating: 4, comment: "Duck ka design bohot cute hai. Squishy material hai toh bacche bhi khush.", verified: true },
          { user: "Vikas L.", rating: 5, comment: "Sahi me mast product hai. Gift dene ke liye perfect choice.", verified: true }
        ]
      },
      {
        id: "C1P3",
        name: "Cuddle Panda Night Glow",
        price: 999,
        salePrice: 649,
        image: ["https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180435/Cute_Panda_light_1_mc1ms6.jpg",
          "https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180441/PandaLamp_bsgoir.jpg",
          "https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180437/Cute_Panda_light_3_kbyy48.jpg",
          "https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180436/Cute_Panda_light_2_vvdbbn.jpg",
          "https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180441/PandaLamp2_ra5lw4.jpg",
        ],
        description: "Charming panda-shaped night lamp that creates a cozy atmosphere for peaceful nights.",
        isOutOfStock: false,
        reviews: [
          { user: "Ananya D.", rating: 5, comment: "Panda toh ekdum real lagta hai. Warm light bohot sukoon deti hai.", verified: true },
          { user: "Rohan S.", rating: 5, comment: "Premium feel hai. Price ke hisab se top quality.", verified: true }
        ]
      },
      {
        id: "C1P4",
        name: "Cosmic Explorer Night Light",
        price: 999,
        salePrice: 699,
        image: ["https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180448/Astronaut_Lamp_owpj4j.jpg",
          "https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180438/Astronaut_Lamp2_t8drtx.jpg",
          "https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180449/Astronaut_Lamp1_qe6okt.jpg"
        ],
        description: "Space-themed astronaut silicone night light, perfect for dreamers and space enthusiasts.",
        isOutOfStock: false,
        reviews: [
          { user: "Siddharth K.", rating: 5, comment: "Duniya se alag design! Night light ka light bohot subtle hai, eyes ko chubhta nahi.", verified: true }
        ]
      }
    ]
  },
  {
    id: "C2",
    categoryName: 'string-lights',
    products: [
      {
        id: "C2P1",
        name: "Memory Lane Photo String Lights",
        price: 499,
        salePrice: 249,
        image: ["https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180440/LED_clip_2_ggardg.jpg",
          "https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180439/LED_clip_1_dnwqyd.jpg"
        ],
        description: "Versatile LED string lights with clips, perfect for hanging photos and creating a warm, personalized display.",
        isOutOfStock: false,
        reviews: [
          { user: "Swati P.", rating: 4, comment: "Memories ko sjane ke liye best thing. Clips bhi strong hain.", verified: true }
        ]
      }
    ]
  },
  {
    id: "C3",
    categoryName: 'table-lamps',
    products: [
      {
        id: "C3P1",
        name: "Blossom Tulip Table Lamp",
        price: 699,
        salePrice: 449,
        image: ["https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180443/Tulip_Lamp_3_w3eaao.jpg",
          "https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180443/Tulip_Lamp_wijy02.jpg",
          "https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180445/Tulip_Lamp1_gdjlgk.jpg"
        ],
        description: "Elegant tulip-inspired lamp that brings a touch of nature and sophistication to your living space.",
        isOutOfStock: false,
        reviews: [
          { user: "Ishani R.", rating: 5, comment: "Beautiful design, room ka look hi badal gaya. Aesthetic lover ke liye must buy.", verified: true }
        ]
      },
      {
        id: "C3P2",
        name: "Diamond Sparkle Luxury Lamp",
        price: 699,
        salePrice: 499,
        image: [
          "https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180440/Crystal-Lamp1_fembtf.jpg",
          "https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180436/CrystalLamp2_xzddrf.jpg"
        ],
        description: "Stunning crystal diamond-shaped table lamp that adds luxury and sparkle to any room decor.",
        isOutOfStock: false,
        reviews: [
          { user: "Karan W.", rating: 5, comment: "Ekdm luxury feel hai. Crystal reflections bohot mast lagte hain walls pe.", verified: true }
        ]
      }
    ]
  },
  {
    id: "C4",
    categoryName: '3d-crystal-lamps',
    products: [
      {
        id: "C4P1",
        name: "Lunar Glow Crystal Ball",
        price: 599,
        salePrice: 349,
        image: ["https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180446/3D_moon_1_vpzpm6.jpg",
          "https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180447/3D_moon_3_aftsfu.jpg"
        ],
        description: "Mesmerizing 3D crystal ball featuring a detailed moon design, creating magical illumination.",
        isOutOfStock: false,
        reviews: [
          { user: "Megha S.", rating: 5, comment: "Moon bohot clear dikhta hai. Table pe rakha hua bohot sundar lagta hai.", verified: true }
        ]
      },
      {
        id: "C4P2",
        name: "Galactic Journey Crystal Ball",
        price: 599,
        salePrice: 349,
        image: ["https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180447/3D_solar_system_1_oqn21b.jpg",
          "https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180445/3D_crystal_Ball_night_Lamp_1_ze8mhp.jpg",
          "https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180446/3D_crystal_Ball_night_Lamp_3_sgzwqi.jpg",
          "https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180449/3D_crystal_Ball_night_Lamp_2_zcznrs.jpg",
          "https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180448/3D_solar_system_2_djd2fw.jpg"
        ],
        description: "Captivating 3D crystal ball showcasing the solar system, perfect for astronomy lovers.",
        isOutOfStock: false,
        reviews: [
          { user: "Arjun B.", rating: 5, comment: "Solar system lovers ke liye jannat hai ye. Best gift idea for kids.", verified: true }
        ]
      },
      {
        id: "C4P3",
        name: "Enchanted Crystal Sphere",
        price: 599,
        salePrice: 349,
        image: ["https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180446/3D_moon_2_xrkdj4.jpg"],
        description: "Beautiful 3D crystal ball lamp with intricate designs that illuminate with enchanting patterns.",
        isOutOfStock: false,
        reviews: [
          { user: "Tanya M.", rating: 4, comment: "Magic spheres! Light on hote hi pura vibe change ho jata hai.", verified: true }
        ]
      }
    ]
  },
  {
    id: "C5",
    categoryName: 'projection-lights',
    products: [
      {
        id: "C5P1",
        name: "Stargazer Astronaut Projector",
        price: 999,
        salePrice: 699,
        image: ["https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180439/Astronaut1_z7popc.jpg",
          "https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180438/Astronaut2_dbmnhs.jpg",
          "https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180441/Astronaut3_ougxkq.jpg"
        ],
        description: "Innovative astronaut-shaped projector that fills your room with stunning starry night displays.",
        isOutOfStock: false,
        reviews: [
          { user: "Rahul T.", rating: 5, comment: "Astronaut projector mast hai! Stars and galaxy bohot realistic lagte hain.", verified: true }
        ]
      },
      {
        id: "C5P2",
        name: "Ocean Waves Projection Light",
        price: 599,
        salePrice: 399,
        image: ["https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180445/Water_Ripple_Night_Lamp_yhhamu.jpg",
          "https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180444/Water_Ripple_Night_Lamp_3_badgod.jpg",
          "https://res.cloudinary.com/dyyxwwn7g/image/upload/v1771180444/Water_Ripple_Night_Lamp_2_hp1ulq.jpg"
        ],
        description: "Soothing water ripple projection light that creates calming wave patterns for relaxation.",
        isOutOfStock: false,
        reviews: [
          { user: "Snehal J.", rating: 5, comment: "Thak kar aao aur ye chala lo... bohot hi soothing ripple effect hai.", verified: true }
        ]
      }
    ]
  }
];
