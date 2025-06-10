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