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

const products: Product[] = [
  { 
    "id": 1,
    "title":"Fleur de Bonita", 
    "price": 110,
    "size": "10ml",
    "image": "assets/Fleur-de-Bonita.png",
    "category": "feminine",
    "type": "Minty Floral",
    "description":"Fleur de Bonita 1969 is a perfume by Bonita for women. The release year is unknown. The scent is fresh-spicy. It is being marketed by ars Parfum."
  },
  { 
    "id": 2,
    "title":"bonita Men Le Bleu", 
    "price":92,
    "size": "50ml",
    "image": "assets/bonita-Men-Le-Bleu.png",
    "category": "masculine",
    "type": "Warm, spicy",
    "description":"Bonita Men - Le Bleu is a perfume by Bonita for men and was released in 2015. It is being marketed by ars Parfum."
  },
  { 
    "id": 3,
    "title":"Day Light", 
    "price": 100,
    "size": "100ml",
    "image": "assets/bonita-day-light.png",
    "category":"feminine",
    "type": "Citrus, Spicy",
    "description":"Day Light is a perfume by Bonita for women. The release year is unknown. It is still available to purchase."
  },
  { 
    "id": 4,
    "title":"Belle de Jour", 
    "price": 100,
    "size": "100ml",
    "image": "assets/bonita-men-selection.png",
    "category":"feminine",
    "type": "Citrus/Fresh/Oriental Woody",
    "description":"Belle de Jour is a perfume by Bonita for women and was released in 2017. It is still available to purchase."
  },
  { 
    "id": 5,
    "title":"Rose Glow", 
    "price": 22,
    "size": "150ml",
    "image": "assets/bonita-rose-glow.png",
    "category":"masculine",
    "type": "Woody, dark",
    "description":"Rose Glow is a perfume by Bonita for women. The release year is unknown. It is still available to purchase."
  },
  { 
    "id": 6,
    "title":"Fleur de Bonita No. II", 
    "price": 135,
    "size": "50ml",
    "image": "assets/fleur-de-bonita-no-ii.png",
    "category":"feminine",
    "type": "Sensual, Warm",
    "description":"Fleur de Bonita No. II is a perfume by Bonita for women. The release year is unknown. It is being marketed by ars Parfum."
  },
  { 
    "id": 7,
    "title":"Bonita Deluxe", 
    "price": 130,
    "size": "50ml",
    "image": "assets/bonita-deluxe.png",
    "category":"masculine",
    "type": "Woody Floral",
    "description":"Bonita Deluxe is a perfume by Bonita for women. The release year is unknown. It is being marketed by ars Parfum."
  },
  { "id": 8,
  "title":"Bonita Deluxe No. II", 
  "price":100,
  "size": "100ml",
  "image": "assets/bonita_deluxe_no_ii.png",
  "category":"feminine",
  "type": "Citrus/Fresh",
  "description":"Bonita Deluxe No. II is a perfume by Bonita for women. The release year is unknown. It was last marketed by ars Parfum."
},
];

export default products;


