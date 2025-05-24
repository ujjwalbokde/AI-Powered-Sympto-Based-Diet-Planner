"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { BackToTop } from "@/components/back-to-top"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { motion } from "framer-motion"
import { Utensils, ArrowLeft, Coffee, UtensilsCrossed, Cookie, Leaf, Wheat, Apple, Clock } from "lucide-react"

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
    color: "from-amber-500 to-yellow-600",
    Breakfast: {
      timing: "7:00 AM - 8:30 AM",
      options: [
        ["Oats porridge with fruits", "Whole grain toast with avocado", "Green tea"],
        ["Ragi dosa with sambar", "Mixed fruit bowl", "Buttermilk"],
        ["Whole wheat upma with vegetables", "Sprouts salad", "Lemon water"],
      ],
    },
    Lunch: {
      timing: "12:30 PM - 2:00 PM",
      options: [
        ["Brown rice with dal", "Mixed vegetable curry", "Cucumber raita", "Salad"],
        ["Whole wheat roti", "Rajma curry", "Spinach poriyal", "Buttermilk"],
        ["Multigrain khichdi", "Kadhi", "Beetroot poriyal", "Vegetable salad"],
      ],
    },
    Dinner: {
      timing: "7:00 PM - 8:30 PM",
      options: [
        ["Multigrain roti", "Vegetable curry", "Dal", "Salad"],
        ["Barley soup", "Vegetable khichdi", "Cucumber raita"],
        ["Whole wheat dosa", "Vegetable curry", "Sprouts salad"],
      ],
    },
    Snacks: {
      timing: "10:30 AM & 4:30 PM",
      options: [
        ["Roasted chana", "Fresh fruits"],
        ["Vegetable soup", "Multigrain crackers"],
        ["Fruit smoothie with flax seeds", "Nuts"],
      ],
    },
  },

  "low-carb": {
    title: "Low Carb Diet",
    description: "Reduced carbohydrate intake for metabolic health",
    icon: <Leaf className="h-6 w-6" />,
    color: "from-green-500 to-emerald-600",
    Breakfast: {
      timing: "7:00 AM - 8:30 AM",
      options: [
        ["Paneer bhurji", "Vegetable omelette", "Green tea"],
        ["Sprouts salad", "Boiled eggs", "Buttermilk"],
        ["Vegetable upma with less rice", "Coconut chutney", "Herbal tea"],
      ],
    },
    Lunch: {
      timing: "12:30 PM - 2:00 PM",
      options: [
        ["Grilled paneer", "Vegetable curry", "Cucumber salad"],
        ["Tandoori chicken", "Palak paneer", "Raita"],
        ["Fish curry", "Cauliflower rice", "Mixed vegetable salad"],
      ],
    },
    Dinner: {
      timing: "7:00 PM - 8:30 PM",
      options: [
        ["Stir-fried vegetables", "Grilled fish", "Cucumber raita"],
        ["Chicken soup", "Vegetable salad with paneer", "Buttermilk"],
        ["Egg curry", "Stir-fried vegetables", "Cucumber salad"],
      ],
    },
    Snacks: {
      timing: "10:30 AM & 4:30 PM",
      options: [
        ["Roasted peanuts", "Cucumber sticks"],
        ["Paneer tikka", "Coconut water"],
        ["Boiled eggs", "Vegetable soup"],
      ],
    },
  },
  balanced: {
    title: "Balanced Diet",
    description: "A well-balanced diet with all essential nutrients for overall health.",
    icon: <Apple className="h-6 w-6" />,
    color: "from-blue-500 to-cyan-600",
    Breakfast: {
      timing: "7:00 AM - 8:30 AM",
      options: [
        ["Idli with sambar", "Coconut chutney", "Fresh fruits"],
        ["Vegetable poha", "Sprouts salad", "Buttermilk"],
        ["Paratha with curd", "Vegetable curry", "Fresh fruit juice"],
      ],
    },
    Lunch: {
      timing: "12:30 PM - 2:00 PM",
      options: [
        ["Rice", "Dal", "Vegetable curry", "Curd", "Salad"],
        ["Roti", "Chicken curry", "Vegetable poriyal", "Buttermilk"],
        ["Rice", "Sambar", "Vegetable curry", "Raita", "Papad"],
      ],
    },
    Dinner: {
      timing: "7:00 PM - 8:30 PM",
      options: [
        ["Roti", "Dal", "Vegetable curry", "Salad"],
        ["Vegetable pulao", "Raita", "Papad"],
        ["Roti", "Fish curry", "Vegetable poriyal", "Buttermilk"],
      ],
    },
    Snacks: {
      timing: "10:30 AM & 4:30 PM",
      options: [
        ["Fresh fruits", "Nuts"],
        ["Vegetable sandwich", "Buttermilk"],
        ["Dhokla", "Green chutney", "Herbal tea"],
      ],
    },
  },
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