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

// List of symptoms from the provided JSON
const allSymptoms = [
  "yellow sputum",
  "cardiovascular finding",
  "hypercapnia",
  "heavy feeling",
  "ambidexterity",
  "polymyalgia",
  "stinging sensation",
  "shortness of breath",
  "palpitation",
  "hypokalemia",
  "prostatism",
  "blanch",
  "monocytosis",
  "noisy respiration",
  "pallor",
  "feces in rectum",
  "sneeze",
  "feeling hopeless",
  "sputum purulent",
  "swelling",
  "left atrial hypertrophy",
  "welt",
  "intermenstrual heavy bleeding",
  "ecchymosis",
  "phonophobia",
  "fear of falling",
  "rhonchus",
  "inappropriate affect",
  "anosmia",
  "adverse effect",
  "hacking cough",
  "lameness",
  "scar tissue",
  "wheezing",
  "breath sounds decreased",
  "Heberden's node",
  "hypothermia, natural",
  "hyperventilation",
  "neologism",
  "chest tightness",
  "atypia",
  "incoherent",
  "hemianopsia homonymous",
  "mydriasis",
  "constipation",
  "fatigue",
  "pain foot",
  "symptom aggravating factors",
  "unresponsiveness",
  "heme positive",
  "pin-point pupils",
  "stool color yellow",
  "groggy",
  "frail",
  "tremor",
  "mass of body structure",
  "large-for-dates fetus",
  "general discomfort",
  "feeling strange",
  "immobile",
  "redness",
  "asymptomatic",
  "worry",
  "urinary hesitation",
  "gravida 0",
  "history of - blackout",
  "hoard",
  "side pain",
  "hematocrit decreased",
  "moan",
  "unhappy",
  "dysdiadochokinesia",
  "heavy legs",
  "unconscious state",
  "headache",
  "bradykinesia",
  "paralyse",
  "bedridden",
  "hirsutism",
  "clammy skin",
  "pain abdominal",
  "intoxication",
  "mediastinal shift",
  "cardiomegaly",
  "decreased body weight",
  "breakthrough pain",
  "achalasia",
  "rambling speech",
  "claudication",
  "rapid shallow breathing",
  "indifferent mood",
  "agitation",
  "no status change",
  "dyspnea",
  "lesion",
  "nasal discharge present",
  "lightheadedness",
  "r wave feature",
  "hematochezia",
  "titubation",
  "lethargy",
  "mantoux positive",
  "alcohol binge episode",
  "cushingoid facies",
  "focal seizures",
  "hyponatremia",
  "flushing",
  "jugular venous distention",
  "myoclonus",
  "passed stones",
  "satiety early",
  "excruciating pain",
  "pain chest",
  "nightmare",
  "hypokinesia",
  "out of breath",
  "dysuria",
  "sleeplessness",
  "terrify",
  "retch",
  "cardiovascular event",
  "hypertonicity",
  "nervousness",
  "giddy mood",
  "muscle twitch",
  "abscess bacterial",
  "pulse absent",
  "pain neck",
  "mood depressed",
  "scratch marks",
  "aura",
  "sinus rhythm",
  "awakening early",
  "vision blurred",
  "gravida 10",
  "st segment elevation",
  "abdominal tenderness",
  "retropulsion",
  "dizzy spells",
  "asthenia",
  "decompensation",
  "systolic ejection murmur",
  "hemodynamically stable",
  "fever",
  "absences finding",
  "nasal flaring",
  "dizziness",
  "abdomen acute",
  "motor retardation",
  "hypometabolism",
  "hypoproteinemia",
  "clumsiness",
  "t wave inverted",
  "macule",
  "hepatomegaly",
  "hypersomnia",
  "photophobia",
  "rale",
  "transsexual",
  "non-productive cough",
  "energy increased",
  "no known drug allergies",
  "projectile vomiting",
  "pansystolic murmur",
  "tired",
  "homelessness",
  "extreme exhaustion",
  "scleral icterus",
  "egophony",
  "overweight",
  "breech presentation",
  "room spinning",
  "gag",
  "mental status changes",
  "flare",
  "sweat",
  "urinoma",
  "cicatrisation",
  "orthostasis",
  "general unsteadiness",
  "behavior showing increased motor activity",
  "haemorrhage",
  "orthopnea",
  "primigravida",
  "frothy sputum",
  "apyrexial",
  "aphagia",
  "hyperemesis",
  "hydropneumothorax",
  "numbness",
  "hematuria",
  "unwell",
  "splenomegaly",
  "productive cough",
  "chest discomfort",
  "hypesthesia",
  "stiffness",
  "throbbing sensation quality",
  "weepiness",
  "nausea",
  "sore to touch",
  "hyperkalemia",
  "thicken",
  "fremitus",
  "angina pectoris",
  "asterixis",
  "night sweat",
  "withdraw",
  "clonus",
  "has religious belief",
  "qt interval prolonged",
  "posturing",
  "speech slurred",
  "pruritus",
  "hypotension",
  "patient non compliance",
  "dyspnea on exertion",
  "snore",
  "enuresis",
  "rest pain",
  "urgency of micturition",
  "dysarthria",
  "facial paresis",
  "fall",
  "hyperhidrosis disorder",
  "vomiting",
  "suicidal",
  "stupor",
  "haemoptysis",
  "drool",
  "tonic seizures",
  "paresis",
  "prodrome",
  "nonsmoker",
  "dyspareunia",
  "distended abdomen",
  "slowing of urinary stream",
  "ascites",
  "cushingoid habitus",
  "abdominal bloating",
  "colic abdominal",
  "erythema",
  "polydypsia",
  "wheelchair bound",
  "urge incontinence",
  "abnormally hard consistency",
  "moody",
  "green sputum",
  "cyanosis",
  "burning sensation",
  "uncoordination",
  "feels hot/feverish",
  "food intolerance",
  "panic",
  "verbal auditory hallucinations",
  "hunger",
  "disequilibrium",
  "previous pregnancies 2",
  "heartburn",
  "nausea and vomiting",
  "abortion",
  "posterior rhinorrhea",
  "anorexia",
  "underweight",
  "diarrhea",
  "difficulty",
  "shooting pain",
  "behavior hyperactive",
  "decreased translucency",
  "transaminitis",
  "ache",
  "elation",
  "sedentary",
  "rolling of eyes",
  "floppy",
  "bleeding of vagina",
  "hallucinations auditory",
  "charleyhorse",
  "cachexia",
  "hoarseness",
  "estrogen use",
  "red blotches",
  "pneumatouria",
  "verbally abusive behavior",
  "emphysematous change",
  "sweating increased",
  "pain back",
  "hypocalcemia result",
  "tenesmus",
  "neck stiffness",
  "spontaneous rupture of membranes",
  "dysesthesia",
  "choke",
  "pressure chest",
  "systolic murmur",
  "homicidal thoughts",
  "drowsiness",
  "todd paralysis",
  "stridor",
  "macerated skin",
  "rigor - temperature-associated observation",
  "hyperacusis",
  "soft tissue swelling",
  "pericardial friction rub",
  "hypoxemia",
  "chill",
  "hypoalbuminemia",
  "tremor resting",
  "ataxia",
  "bruit",
  "alcoholic withdrawal symptoms",
  "consciousness clear",
  "fecaluria",
  "milky",
  "arthralgia",
  "guaiac positive",
  "unable to concentrate",
  "vertigo",
  "presence of q wave",
  "irritable mood",
  "monoclonal",
  "loose associations",
  "extrapyramidal sign",
  "st segment depression",
  "hallucinations visual",
  "photopsia",
  "pustule",
  "seizure",
  "snuffle",
  "malaise",
  "sensory discomfort",
  "exhaustion",
  "pain in lower limb",
  "stuffy nose",
  "oliguria",
  "impaired cognition",
  "adverse reaction",
  "Stahli's line",
  "para 1",
  "coordination abnormal",
  "throat sore",
  "cystic lesion",
  "tumor cell invasion",
  "hemiplegia",
  "sniffle",
  "superimposition",
  "distress respiratory",
  "unsteady gait",
  "catatonia",
  "bradycardia",
  "regurgitates after swallowing",
  "spasm",
  "difficulty passing urine",
  "abnormal sensation",
  "sciatica",
  "paraparesis",
  "prostate tender",
  "hypotonic",
  "gurgle",
  "tachypnea",
  "labored breathing",
  "formication",
  "syncope",
  "mass in breast",
  "bowel sounds decreased",
  "rhd positive",
  "renal angle tenderness",
  "debilitation",
  "barking cough",
  "sleepy",
  "poor feeding",
  "proteinemia",
  "hypersomnolence",
  "feeling suicidal",
  "polyuria",
  "metastatic lesion",
  "lung nodule",
  "tinnitus",
  "lip smacking",
  "dullness",
  "hepatosplenomegaly",
  "gasping for breath",
  "disturbed family",
  "decreased stool caliber",
  "painful swallowing",
  "poor dentition",
  "paresthesia",
  "low back pain",
  "catching breath",
  "pulsus paradoxus",
  "fatigability",
  "pleuritic pain",
  "flatulence",
  "myalgia",
  "breath-holding spell",
  "para 2",
  "pain",
  "numbness of hand",
  "Murphy's sign",
  "air fluid level",
  "muscle hypotonia",
  "cough",
  "weight gain",
  "hot flush",
  "blackout",
];

export default function SymptomsPage() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
          age: 20,
          bmi: 20,
          gender: "Male",
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Select Your Symptoms
            </h1>
            <p className="text-muted-foreground mb-6">
              Click on the symptoms you're experiencing to get a personalized
              diet plan.
            </p>
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
