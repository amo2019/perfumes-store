export interface Product {
    id: number;
    title: string;
    price: number;
    size?: string;
    image: string;
    category?: string;
    type: string;
    description: string;
  }
  
  const products: Product[] = 
  [
    { 
      "id": 1,
      "title":"Ponita-White", 
      "price": 110,
      "size": "10ml",
      "image": "Ponita-white.png",
      "category": "feminine",
      "type": "Minty Floral",
      "description":"A fresh and uplifting Ponita fragrance, Ponita WHI  TE is a sultry white. Love is in the air with notes of Lemongrass, Lavender and White Flowers. Infused with Eucalyptus and Sandalwood, WHITE is perfectly relaxing, in the cool of winter or in the heat of summer."
    },
    { 
      "id": 2,
      "title":"Ponita-Perfume", 
      "price":92,
      "size": "50ml",
      "image": "Ponita-perfume.png",
      "category": "feminine",
      "type": "Warm, spicy",
      "description":"Hand made Gold Leaf bottle with ruby cap and decorated with swarovski crystals design. Perfume notes include: cinnamon, cardamom, damask rose, egyptian jasmine and incense."
    },
    { 
      "id": 3,
      "title":"Ponita-Men", 
      "price": 100,
      "size": "100ml",
      "image": "Ponita-men.png",
      "category":"masculine",
      "type": "Citrus, Spicy",
      "description":"California Citrus, white flowers and Green notes. Dry down: Leather, Cognac, Sandalwood and Musk."
    },
    { 
      "id": 4,
      "title":"Ponita-Men II", 
      "price": 100,
      "size": "100ml",
      "image": "Ponita-men-two.png",
      "category":"masculine",
      "type": "Citrus/Fresh/Oriental Woody",
      "description":"Fresh Greens, Tea Leaves and Leather gently blend with notes of Cardamom, Peppercorn and Thyme. Bottom notes of Amber and Sandalwood create an inviting dry-down."
    },
    { 
      "id": 5,
      "title":"Ponita Incense - unisex", 
      "price": 22,
      "size": "150ml",
      "image": "Ponita-incense.png",
      "category":"masculine",
      "type": "Woody, dark",
      "description":"Woody notes of Incense and Amber are brightened with wildberries, lavender and rose, while deep notes of black pepper and Oud blend with sprinkles of Cassia and Clove."
    },
    { 
      "id": 6,
      "title":"Ponita Oud", 
      "price": 135,
      "size": "50ml",
      "image": "Ponita-oud.png",
      "category":"masculine",
      "type": "Sensual, Warm",
      "description":"As the incense burning in ancient temples, Ponita Oud carries exotic notes of rose woods and borrowed cardamom from Ponita Classic, to develop a sensuous veil of sandalwoods with warm amber and hints of vetiver."
    },
    { 
      "id": 7,
      "title":"Ponita Oud Black", 
      "price": 130,
      "size": "50ml",
      "image": "Ponita-oud-black.png",
      "category":"masculine",
      "type": "Woody Floral",
      "description":"With hints of deep red Roses and precious Agarwood, Oud Black is richly scented with woody notes in veils of Vanilla, Sandalwood and Incense. Exotic florals and sensuous woods provide for an alluring trail."
    },
    { "id": 8,
    "title":"Vie d'Amour MEN", 
    "price":100,
    "size": "100ml",
    "image": "Ponita-amour-men.png",
    "category":"masculine",
    "type": "Citrus/Fresh",
    "description":"Fresh, energizing and envigorating, Vie d'Amour MEN captures the romance and spirit of man. Crisp top notes of lime, ginger, and fresh greens blend into an exhilarating fusion of Bergamot, Pear and Almond. A fresh and sensuous base of cedarwood and sandalwood embrace a dry-down of tonka bean and vanilla bourbon."
  },
  { 
    "id": 9,
    "title":"Ponita Black", 
    "price": 100,
    "size": "50ml",
    "image": "Ponita-black.png",
    "category":"masculine",
    "type": "Sensual, Warm",
    "description":"Capturing the dramatic allure of an Arabian Wedding, Ponita Black represents the sensuality of love's warm embrace. In notes of Oud, wrapped in Amber, emotions are ignited in this lover's scents of Sandalwood and Incense."
  },
  ]
  
  
  export default products;
  