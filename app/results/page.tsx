"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { BackToTop } from "@/components/back-to-top"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { motion } from "framer-motion"
import { Utensils, ArrowLeft, Coffee, UtensilsCrossed, Cookie, Leaf, Wheat, Apple, Clock } from "lucide-react"
// import mealData from "@/lib/mealData"
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
        ["Oats porridge with chia seeds", "Banana", "Almond milk"],
        ["Vegetable upma", "Coconut chutney", "Lemon water"],
        ["Whole wheat spinach paratha", "Curd", "Guava slices"]
      ],
      "Lunch": [
        ["Brown rice", "Rajma", "Cabbage salad"],
        ["Whole wheat roti", "Mixed vegetable sabzi", "Cucumber raita"],
        ["Bajra roti", "Chole", "Beetroot salad"]
      ],
      "Dinner": [
        ["Dalia khichdi with vegetables", "Mint chutney", "Curd"],
        ["Whole wheat roti", "Lauki sabzi", "Moong dal"],
        ["Vegetable oats khichdi", "Carrot stir-fry", "Buttermilk"]
      ],
      "Snacks": [
        ["Roasted chana", "Apple", "Herbal tea"],
        ["Multigrain crackers", "Guava", "Coconut water"],
        ["Makhana", "Orange slices", "Lemon-infused water"]
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
        ["Moong dal chilla with paneer", "Mint chutney", "Black tea"],
        ["Sprouts salad", "Boiled eggs", "Lemon juice"],
        ["Tofu bhurji", "Multigrain toast", "Soy milk"]
      ],
      "Lunch": [
        ["Grilled chicken curry", "Quinoa", "Spinach soup"],
        ["Paneer tikka", "Brown rice", "Masoor dal"],
        ["Soyabean curry", "Whole wheat roti", "Mixed veg sabzi"]
      ],
      "Dinner": [
        ["Egg bhurji", "Vegetable soup", "Chapati"],
        ["Soyabean bhurji", "Carrot-peas stir-fry", "Roti"],
        ["Tofu curry", "Palak dal", "Cauliflower sabzi"]
      ],
      "Snacks": [
        ["Roasted soy nuts", "Buttermilk", "Peanut chikki"],
        ["Greek yogurt", "Walnuts", "Carrot sticks"],
        ["Boiled eggs", "Sprout chaat", "Lemon water"]
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
        ["Watermelon juice", "Poha", "Coconut water"],
        ["Cucumber sandwich", "Mint tea", "Apple"],
        ["Vegetable dalia", "Mosambi juice", "Curd"]
      ],
      "Lunch": [
        ["Moong dal", "Lauki curry", "Cucumber raita"],
        ["Steamed rice", "Kadhi", "Tomato-onion salad"],
        ["Jeera rice", "Mint chutney", "Coconut water"]
      ],
      "Dinner": [
        ["Vegetable stew", "Curd rice", "Mint chutney"],
        ["Khichdi", "Bottle gourd curry", "Fruit slices"],
        ["Clear soup", "Rice gruel", "Lassi"]
      ],
      "Snacks": [
        ["Coconut water", "Orange slices", "Cucumber sticks"],
        ["Buttermilk", "Watermelon cubes", "Lemon water"],
        ["Papaya", "Pineapple", "Herbal hydration tea"]
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
        ["Besan chilla", "Mint chutney", "Green tea"],
        ["Boiled eggs", "Avocado slices", "Black coffee"],
        ["Tofu scramble", "Tomato salad", "Herbal tea"]
      ],
      "Lunch": [
        ["Grilled paneer", "Stir-fried vegetables", "Lettuce salad"],
        ["Grilled fish", "Sauteed spinach", "Cabbage slaw"],
        ["Chicken tikka", "Cauliflower rice", "Broccoli stir-fry"]
      ],
      "Dinner": [
        ["Cauliflower rice", "Palak paneer", "Methi soup"],
        ["Stuffed capsicum", "Tomato rasam", "Zucchini sabzi"],
        ["Zoodles", "Paneer cubes", "Spinach soup"]
      ],
      "Snacks": [
        ["Mixed nuts", "Cucumber sticks", "Green tea"],
        ["Pumpkin seeds", "Coconut chunks", "Lemon juice"],
        ["Avocado slices", "Roasted makhana", "Tulsi tea"]
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
        ["Oats porridge with skimmed milk", "Apple slices", "Green tea"],
        ["Vegetable idli", "Sambar (low oil)", "Herbal tea"],
        ["Moong dal chilla", "Tomato chutney", "Lemon water"]
      ],
      "Lunch": [
        ["Steamed brown rice", "Mixed vegetable curry (light oil)", "Cucumber salad"],
        ["Chapati (no ghee)", "Lauki sabzi", "Tomato rasam"],
        ["Vegetable pulao (minimal oil)", "Boiled moong dal", "Carrot sticks"]
      ],
      "Dinner": [
        ["Khichdi (low oil)", "Steamed vegetables", "Buttermilk"],
        ["Grilled fish (no skin)", "Steamed broccoli", "Mint chutney"],
        ["Vegetable soup", "Whole wheat roti (no oil)", "Fruit bowl"]
      ],
      "Snacks": [
        ["Roasted chana", "Fresh fruit", "Green tea"],
        ["Low-fat yogurt", "Cucumber slices", "Herbal tea"],
        ["Air-popped popcorn (no butter)", "Apple slices", "Lemon water"]
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
        ["Semolina upma", "Coconut chutney", "Herbal tea"],
        ["Poha (lightly cooked)", "Curd", "Apple juice"]
      ],
      "Lunch": [
        ["White rice", "Boiled chicken", "Carrot puree"],
        ["Roti (refined flour)", "Paneer curry (low fiber)", "Cucumber slices"],
        ["Pasta with creamy sauce", "Boiled vegetables", "Buttermilk"]
      ],
      "Dinner": [
        ["Chicken broth soup", "Mashed potatoes", "Steamed zucchini"],
        ["Boiled fish", "Rice noodles", "Cucumber salad"],
        ["Egg custard", "White bread", "Fruit jelly"]
      ],
      "Snacks": [
        ["Saltine crackers", "Boiled eggs", "Apple juice"],
        ["Plain yogurt", "Banana", "Herbal tea"],
        ["Cheese slices", "White bread toast", "Lemon water"]
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
        ["Vegetable upma", "Apple slices", "Lemon water"],
        ["Rice flakes with milk", "Banana", "Green tea"]
      ],
      "Lunch": [
        ["Steamed rice", "Vegetable curry", "Cucumber salad"],
        ["Chapati", "Mixed vegetable sabzi", "Carrot sticks"],
        ["Vegetable pulao", "Boiled potatoes", "Tomato soup"]
      ],
      "Dinner": [
        ["Vegetable stew", "White bread", "Fruit bowl"],
        ["Khichdi (more rice, less dal)", "Boiled vegetables", "Curd"],
        ["Mashed potatoes", "Steamed carrots", "Apple slices"]
      ],
      "Snacks": [
        ["Fresh fruit", "Rice cakes", "Herbal tea"],
        ["Vegetable sticks", "Apple slices", "Lemon water"],
        ["Air-popped popcorn", "Fruit juice", "Cucumber sticks"]
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
        ["Oats with banana", "Honey drizzle", "Cinnamon tea"],
        ["Steamed idli", "Coriander chutney (no salt)", "Coconut water"],
        ["Vegetable dalia", "Apple", "Lemon water"]
      ],
      "Lunch": [
        ["Steamed rice", "No-salt moong dal", "Steamed carrot-beans"],
        ["Lauki sabzi", "Chapati (no salt)", "Beetroot salad"],
        ["Khichdi", "Mint raita", "Guava"]
      ],
      "Dinner": [
        ["Vegetable khichdi", "Bottle gourd curry", "Cucumber salad"],
        ["Oats upma", "No-salt sambhar", "Pumpkin mash"],
        ["Mixed veg stew", "Plain rice", "Fruit bowl"]
      ],
      "Snacks": [
        ["Unsalted popcorn", "Buttermilk", "Pineapple"],
        ["Apple slices with peanut butter", "Mint tea", "Carrot sticks"],
        ["Fruit chaat (no salt)", "Coconut water", "Foxnuts"]
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
        ["Vegetable upma", "Boiled egg", "Tea without sugar"],
        ["Tofu stir-fry", "Multigrain toast", "Cinnamon water"],
        ["Sprouted moong salad", "Roasted peanuts", "Herbal tea"]
      ],
      "Lunch": [
        ["Bajra roti", "Tinda sabzi", "Cucumber salad"],
        ["Masoor dal", "Lauki sabzi", "Ragi roti"],
        ["Karela sabzi", "Mixed veg soup", "Chapati"]
      ],
      "Dinner": [
        ["Vegetable soup", "Whole wheat roti", "Turai sabzi"],
        ["Paneer tikka", "Spinach curry", "Zucchini mash"],
        ["Boiled moong salad", "Tomato soup", "Stir-fried bhindi"]
      ],
      "Snacks": [
        ["Roasted makhana", "Unsweetened buttermilk", "Guava"],
        ["Roasted almonds", "Green tea", "Cucumber sticks"],
        ["Papaya cubes", "Herbal water", "Flaxseeds"]
      ]
    }
  }
}

const mealIcons = {
  Breakfast: <Coffee className="h-5 w-5" />,
  Lunch: <UtensilsCrossed className="h-5 w-5" />,
  Dinner: <Utensils className="h-5 w-5" />,
  Snacks: <Cookie className="h-5 w-5" />,
}

export default function ResultsPage() {
  const [dietType, setDietType] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const storedDietType = localStorage.getItem("dietType")

    if (!storedDietType) {
      window.location.href = "/symptoms"
      return
    }

    setDietType(storedDietType)
    setIsLoading(false)
    toast({
      title: "Diet Plan Generated",
      description: `Your personalized ${storedDietType.replace("-", " ").toLowerCase()} diet plan is ready!`,
      duration: 3000,
    })
  }, [toast])

  if (isLoading || !dietType) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your personalized diet plan...</p>
        </div>
      </div>
    )
  }

  const diet = mealData[dietType as keyof typeof mealData]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Utensils className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">AI Diet Planner</span>
        </div>
        <ModeToggle />
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/symptoms" passHref>
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Symptoms
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Personalized Diet Plan</h1>
            <p className="text-muted-foreground">
              Based on your symptoms, we recommend a <strong>{dietType.replace("-", " ")}</strong> plan.
            </p>
          </motion.div>

          <motion.div
            className="mb-12 p-6 rounded-xl text-white shadow-lg"
            style={{
              background: `linear-gradient(to right, hsl(var(--primary)), hsl(var(--primary)/0.7))`,
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-white/20 text-white">
                {diet.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{diet.title}</h2>
                <p>{diet.description}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={container} initial="hidden" animate="show" className="space-y-12">
            {Object.entries(diet.meals).map(([mealTime, options]) => (
              <motion.section key={mealTime} variants={item} className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      {mealIcons[mealTime as keyof typeof mealIcons]}
                    </div>
                    <h2 className="text-2xl font-bold">{mealTime}</h2>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground ml-9 sm:ml-0">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{diet.timings[mealTime as keyof typeof diet.timings]}</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {options.map((meal, index) => (
                    <motion.div
                      key={index}
                      className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-4 border-b">
                        <h3 className="font-medium">Option {index + 1}</h3>
                      </div>
                      <div className="p-4">
                        <ul className="space-y-2">
                          {meal.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            ))}
          </motion.div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-muted-foreground mb-4">
              This diet plan is a general recommendation based on your symptoms. For personalized medical advice,
              please consult with a healthcare professional.
            </p>
            <Link href="/">
              <Button className="rounded-full px-6">Start Over</Button>
            </Link>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} AI Diet Planner. All rights reserved.</p>
        </div>
      </footer>

      <BackToTop />
    </div>
  )
}