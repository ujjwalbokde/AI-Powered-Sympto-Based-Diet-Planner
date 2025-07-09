"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle";
import { BackToTop } from "@/components/back-to-top";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Utensils, X, Search, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import allSymptoms from "@/app/symptoms/allSymptoms";

export default function SymptomsPage() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [age, setAge] = useState<number>(20);
  const [bmi, setBmi] = useState<number>(20);
  const [gender, setGender] = useState<string>("Male");
  const { toast } = useToast();
  const router = useRouter();

  // Filter symptoms based on search query
  const filteredSymptoms = useMemo(() => {
    if (!searchQuery.trim()) return allSymptoms;
    return allSymptoms.filter((symptom) =>
      symptom.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSymptomClick = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      // Already selected, do nothing
      return;
    }

    setSelectedSymptoms([...selectedSymptoms, symptom]);

    toast({
      title: "Symptom Added",
      description: `${symptom} has been added to your list.`,
      duration: 1500,
    });
  };

  const removeSymptom = (symptom: string) => {
    setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
  };

  const handleSubmit = async () => {
    if (selectedSymptoms.length === 0) {
      toast({
        title: "No symptoms selected",
        description: "Please select at least one symptom to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/recommend-diet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          symptoms: selectedSymptoms,
          age: age,
          bmi: bmi,
          gender: gender,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from server");
      }

      const data = await response.json();
      const dietType = data?.recommended_diet?.diet_type;

      if (!dietType) {
        throw new Error("No diet type returned from server");
      }

      // Store the diet type in localStorage
      localStorage.setItem("dietType", dietType);

      // Navigate to results page
      router.push("/results");
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description:
          "There was an error processing your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Utensils className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">AI Diet Planner</span>
        </div>
        <ModeToggle />
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 ">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-600">
              Select Your Symptoms
            </h1>
            <p className="text-muted-foreground mb-6">
              Click on the symptoms you're experiencing to get a personalized
              diet plan.
            </p>
          </motion.div>

          {/* Personal Information Section */}
          <motion.div
            className="mb-8 p-4 border rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  min="1"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={gender}
                  onValueChange={(value) => setGender(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bmi">BMI</Label>
                <Input
                  id="bmi"
                  type="number"
                  min="10"
                  max="50"
                  step="0.1"
                  value={bmi}
                  onChange={(e) => setBmi(parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
          </motion.div>

          {selectedSymptoms.length > 0 && (
            <motion.div
              className="mb-8 p-4 bg-muted rounded-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-sm font-medium">Selected Symptoms:</h2>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button
                      onClick={handleSubmit}
                      size="lg"
                      className="rounded-full px-8"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Generate Diet-Plan <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedSymptoms.map((symptom) => (
                    <div
                      key={symptom}
                      className="flex items-center bg-primary/10 text-primary rounded-full px-3 py-1 text-sm"
                    >
                      {symptom}
                      <button
                        onClick={() => removeSymptom(symptom)}
                        className="ml-2 hover:bg-primary/20 rounded-full p-1"
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {symptom}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <div className="mb-6 ">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search symptoms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-6"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear search</span>
                </button>
              )}
            </div>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="pb-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto pr-2"
          >
            {filteredSymptoms.length > 0 ? (
              filteredSymptoms.map((symptom) => (
                <motion.div key={symptom} variants={item}>
                  <button
                    onClick={() => handleSymptomClick(symptom)}
                    className={`w-full p-4 rounded-lg border text-left transition-all hover:shadow-md ${
                      selectedSymptoms.includes(symptom)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card hover:bg-accent/50 dark:hover:bg-accent/30"
                    }`}
                  >
                    <span>{symptom}</span>
                  </button>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No symptoms found matching "{searchQuery}"
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} AI Diet Planner. All rights reserved.
          </p>
        </div>
      </footer>

      <BackToTop />
    </div>
  );
}