// Mock meal data with timing ranges
const mealData = {
  "high-fiber": {
    title: "High Fiber Diet",
    description: "Rich in dietary fiber to support digestion and gut health",
    icon: <Leaf className="h-6 w-6" />,
    timings: {
      Breakfast: "7:00 AM - 9:00 AM",
      Lunch: "12:30 PM - 2:00 PM",
      Dinner: "7:00 PM - 8:30 PM",
      Snacks: "10:30 AM & 4:30 PM"
    },
    meals: {
      "Breakfast": [
        ["Oats porridge with chia seeds", "Banana", "Badam milk"],
        ["Vegetable upma", "Nariyal chutney", "Nimbu pani"],
        ["Bajra roti with methi sabzi", "Dahi", "Papaya"]
      ],
      "Lunch": [
        ["Brown rice", "Rajma curry", "Kobi salad"],
        ["Jowar roti", "Mix veg sabzi", "Kakdi raita"],
        ["Bajra roti", "Chana masala", "Chukandar salad"]
      ],
      "Dinner": [
        ["Dalia khichdi with veggies", "Pudina chutney", "Chaas"],
        ["Missi roti", "Lauki ki sabzi", "Moong dal"],
        ["Vegetable oats", "Gajar sabzi", "Mattha"]
      ],
      "Snacks": [
        ["Bhuna chana", "Apple", "Tulsi chai"],
        ["Multigrain khakhra", "Amrood", "Nariyal pani"],
        ["Makhana", "Orange", "Ajwain water"]
      ]
    }
  },

  "high-protein": {
    title: "High Protein Diet",
    description: "Protein-rich meals to support muscle growth and repair",
    icon: <Wheat className="h-6 w-6" />,
    timings: {
      Breakfast: "7:30 AM - 9:00 AM",
      Lunch: "1:00 PM - 2:00 PM",
      Dinner: "7:30 PM - 8:30 PM",
      Snacks: "11:00 AM & 5:00 PM"
    },
    meals: {
      "Breakfast": [
        ["Moong dal chilla with paneer", "Pudina chutney", "Kali chai"],
        ["Sprouts chaat", "Boiled Eggs", "Nimbu shikanji"],
        ["Soya bhurji", "Multigrain toast", "Soya milk"]
      ],
      "Lunch": [
        ["Tandoori chicken", "Quinoa pulao", "Palak soup"],
        ["Paneer tikka", "Brown rice", "Masoor dal"],
        ["Soya chunks curry", "Bajra roti", "Mix veg"]
      ],
      "Dinner": [
        ["Egg curry", "Vegetable soup", "Phulka"],
        ["Soya bhurji", "Matar-gajar sabzi", "Roti"],
        ["Tofu curry", "Palak dal", "Gobhi sabzi"]
      ],
      "Snacks": [
        ["Bhuna soya", "Chaas", "Mungfali chikki"],
        ["Greek dahi", "Akhrot", "Gajar sticks"],
        ["Boiled Eggs", "Sprout chaat", "Nimbu pani"]
      ]
    }
  },

  "hydration-focused": {
    title: "Hydration Focused Diet",
    description: "Fluid-rich meals to maintain optimal hydration",
    icon: <Apple className="h-6 w-6" />,
    timings: {
      Breakfast: "7:00 AM - 8:30 AM",
      Lunch: "12:30 PM - 1:30 PM",
      Dinner: "7:00 PM - 8:00 PM",
      Snacks: "10:00 AM & 4:00 PM"
    },
    meals: {
      "Breakfast": [
        ["Tarbuj juice", "Poha", "Nariyal pani"],
        ["Kheera sandwich", "Pudina chai", "Seb"],
        ["Vegetable dalia", "Mosambi juice", "Curd"]
      ],
      "Lunch": [
        ["Moong dal", "Lauki ki sabzi", "Kakdi raita"],
        ["Steamed rice", "Kadhi", "Tamatar-pyaaz salad"],
        ["Jeera rice", "Pudina chutney", "Nariyal pani"]
      ],
      "Dinner": [
        ["Vegetable stew", "Curd rice", "Pudina chutney"],
        ["Khichdi", "Lauki curry", "Fruit chaat"],
        ["Clear soup", "Congee", "Lassi"]
      ],
      "Snacks": [
        ["Nariyal pani", "Orange", "Kheera sticks"],
        ["Chaas", "Watermelon", "Nimbu pani"],
        ["Papita", "Ananas", "Herbal tea"]
      ]
    }
  },

  "low-carb": {
    title: "Low Carb Diet",
    description: "Reduced carbohydrate intake for metabolic health",
    icon: <Leaf className="h-6 w-6" />,
    timings: {
      Breakfast: "8:00 AM - 9:00 AM",
      Lunch: "1:00 PM - 2:00 PM",
      Dinner: "7:00 PM - 8:00 PM",
      Snacks: "11:00 AM & 4:00 PM"
    },
    meals: {
      "Breakfast": [
        ["Besan chilla", "Pudina chutney", "Green tea"],
        ["Uble hue ande", "Avocado", "Black coffee"],
        ["Tofu bhurji", "Tamatar salad", "Herbal tea"]
      ],
      "Lunch": [
        ["Grilled paneer", "Sauteed veggies", "Lettuce salad"],
        ["Grilled fish", "Palak", "Patta gobhi salad"],
        ["Chicken tikka", "Gobhi rice", "Broccoli sabzi"]
      ],
      "Dinner": [
        ["Gobhi rice", "Palak paneer", "Methi soup"],
        ["Bharwa shimla mirch", "Tomato rasam", "Turai sabzi"],
        ["Zucchini noodles", "Paneer cubes", "Palak soup"]
      ],
      "Snacks": [
        ["Mixed nuts", "Kheera sticks", "Green tea"],
        ["Kaddu ke beej", "Nariyal", "Nimbu pani"],
        ["Avocado", "Roasted makhana", "Tulsi tea"]
      ]
    }
  },

  "low-fat": {
    title: "Low Fat Diet",
    description: "Reduced fat intake for digestive health",
    icon: <Apple className="h-6 w-6" />,
    timings: {
      Breakfast: "7:30 AM - 8:30 AM",
      Lunch: "12:30 PM - 1:30 PM",
      Dinner: "7:30 PM - 8:30 PM",
      Snacks: "10:30 AM & 4:30 PM"
    },
    meals: {
      "Breakfast": [
        ["Oats porridge with toned milk", "Apple slices", "Green tea"],
        ["Vegetable idli", "Sambar (low oil)", "Herbal tea"],
        ["Moong dal chilla", "Tamatar chutney", "Nimbu pani"]
      ],
      "Lunch": [
        ["Steamed brown rice", "Mix veg curry (light oil)", "Kakdi salad"],
        ["Chapati (no ghee)", "Lauki ki sabzi", "Tomato rasam"],
        ["Vegetable pulao (minimal oil)", "Boiled moong dal", "Gajar sticks"]
      ],
      "Dinner": [
        ["Khichdi (low oil)", "Steamed veggies", "Chaas"],
        ["Grilled fish (no skin)", "Steamed broccoli", "Pudina chutney"],
        ["Vegetable soup", "Chapati (no oil)", "Fruit chaat"]
      ],
      "Snacks": [
        ["Bhuna chana", "Fresh fruits", "Green tea"],
        ["Low-fat dahi", "Kheera slices", "Herbal tea"],
        ["Air-popped popcorn (no butter)", "Apple slices", "Nimbu pani"]
      ]
    }
  },

  "low-fiber": {
    title: "Low Fiber Diet",
    description: "Easily digestible meals for sensitive digestion",
    icon: <Wheat className="h-6 w-6" />,
    timings: {
      Breakfast: "8:00 AM - 9:00 AM",
      Lunch: "1:00 PM - 2:00 PM",
      Dinner: "7:30 PM - 8:30 PM",
      Snacks: "11:00 AM & 5:00 PM"
    },
    meals: {
      "Breakfast": [
        ["White bread toast", "Scrambled eggs", "Black coffee"],
        ["Suji upma", "Nariyal chutney", "Herbal tea"],
        ["Poha (lightly cooked)", "Dahi", "Apple juice"]
      ],
      "Lunch": [
        ["White rice", "Boiled chicken", "Gajar puree"],
        ["Maida roti", "Paneer curry (low fiber)", "Kheera slices"],
        ["Pasta with white sauce", "Boiled veggies", "Chaas"]
      ],
      "Dinner": [
        ["Chicken soup", "Mashed aloo", "Steamed zucchini"],
        ["Boiled fish", "Rice noodles", "Kheera salad"],
        ["Egg custard", "White bread", "Fruit jelly"]
      ],
      "Snacks": [
        ["Marie biscuit", "Uble hue ande", "Apple juice"],
        ["Plain dahi", "Kela", "Herbal tea"],
        ["Cheese slices", "White bread toast", "Nimbu pani"]
      ]
    }
  },

  "low-protein": {
    title: "Low Protein Diet",
    description: "Reduced protein for specific health conditions",
    icon: <Leaf className="h-6 w-6" />,
    timings: {
      Breakfast: "7:30 AM - 8:30 AM",
      Lunch: "12:30 PM - 1:30 PM",
      Dinner: "7:00 PM - 8:00 PM",
      Snacks: "10:30 AM & 4:00 PM"
    },
    meals: {
      "Breakfast": [
        ["Fruit smoothie", "White bread toast", "Herbal tea"],
        ["Vegetable upma", "Apple slices", "Nimbu pani"],
        ["Poha with milk", "Kela", "Green tea"]
      ],
      "Lunch": [
        ["Steamed rice", "Vegetable curry", "Kakdi salad"],
        ["Chapati", "Mix veg sabzi", "Gajar sticks"],
        ["Vegetable pulao", "Boiled aloo", "Tamatar soup"]
      ],
      "Dinner": [
        ["Vegetable stew", "White bread", "Fruit chaat"],
        ["Khichdi (more rice)", "Boiled veggies", "Dahi"],
        ["Mashed aloo", "Steamed gajar", "Apple slices"]
      ],
      "Snacks": [
        ["Fresh fruits", "Rice cakes", "Herbal tea"],
        ["Vegetable sticks", "Apple slices", "Nimbu pani"],
        ["Air-popped popcorn", "Fruit juice", "Kheera sticks"]
      ]
    }
  },

  "low-sodium": {
    title: "Low Sodium Diet",
    description: "Reduced salt intake for cardiovascular health",
    icon: <Apple className="h-6 w-6" />,
    timings: {
      Breakfast: "7:00 AM - 8:30 AM",
      Lunch: "12:30 PM - 1:30 PM",
      Dinner: "7:00 PM - 8:00 PM",
      Snacks: "10:00 AM & 4:00 PM"
    },
    meals: {
      "Breakfast": [
        ["Oats with kela", "Shahad", "Dalchini chai"],
        ["Steamed idli", "Dhania chutney (no salt)", "Nariyal pani"],
        ["Vegetable dalia", "Seb", "Nimbu pani"]
      ],
      "Lunch": [
        ["Steamed rice", "No-salt moong dal", "Steamed gajar-beans"],
        ["Lauki ki sabzi", "Chapati (no salt)", "Chukandar salad"],
        ["Khichdi", "Pudina raita", "Amrood"]
      ],
      "Dinner": [
        ["Vegetable khichdi", "Lauki curry", "Kakdi salad"],
        ["Oats upma", "No-salt sambar", "Kaddu mash"],
        ["Mix veg stew", "Plain rice", "Fruit chaat"]
      ],
      "Snacks": [
        ["Unsalted popcorn", "Chaas", "Ananas"],
        ["Apple slices with mungfali butter", "Pudina chai", "Gajar sticks"],
        ["Fruit chaat (no salt)", "Nariyal pani", "Makhana"]
      ]
    }
  },

  "low-sugar": {
    title: "Low Sugar Diet",
    description: "Reduced sugar for metabolic health",
    icon: <Wheat className="h-6 w-6" />,
    timings: {
      Breakfast: "7:30 AM - 8:30 AM",
      Lunch: "12:30 PM - 1:30 PM",
      Dinner: "7:00 PM - 8:00 PM",
      Snacks: "10:30 AM & 4:30 PM"
    },
    meals: {
      "Breakfast": [
        ["Vegetable upma", "Uble hue anda", "Chini-free chai"],
        ["Tofu bhurji", "Multigrain toast", "Dalchini water"],
        ["Sprouted moong", "Bhuna mungfali", "Herbal tea"]
      ],
      "Lunch": [
        ["Bajra roti", "Tinda ki sabzi", "Kakdi salad"],
        ["Masoor dal", "Lauki ki sabzi", "Ragi roti"],
        ["Karela sabzi", "Mix veg soup", "Chapati"]
      ],
      "Dinner": [
        ["Vegetable soup", "Chapati", "Turai ki sabzi"],
        ["Paneer tikka", "Palak curry", "Zucchini mash"],
        ["Boiled moong salad", "Tamatar soup", "Bhindi sabzi"]
      ],
      "Snacks": [
        ["Roasted makhana", "Unsweetened chaas", "Amrood"],
        ["Bhuna badam", "Green tea", "Kheera sticks"],
        ["Papita cubes", "Herbal water", "Alsi seeds"]
      ]
    }
  }
}


export default mealData;