import {Encounter} from "@/types/types";

export const horror: Encounter = {
  "name": "Blue Horror",
  "type": "minion",
  "resilience": 4,
  "speed": "normal",
  "wounds": 0,
  "WS": {
    "value": 3,
    skills: {
      "Melee": 6,
      "Defense": 3
    }
  },
  "BS": {
    "value": 3,
    skills: {
      "Shooting": 4,
      "Throwing": 3
    }
  },
  "S": {
    "value": 4,
    skills: {
      "Brawl": 3,
      "Toil": 3
    }
  },
  "T": {
    "value": 3,
    skills: {
      "Survival": 3,
      "Endurance": 3
    }
  },
  "Ag": {
    "value": 3,
    skills: {
      "Stealth": 3,
      "Athletics": 3
    }
  },
  "Re": {
    "value": 2,
    skills: {
      "Willpower": 3,
      "Recall": 3
    }
  },
  "Fel": {
    "value": 1,
    skills: {
      "Leadership": 3,
      "Charm": 3
    }
  }
}
