export const Characteristics = {
  'WS': 'Weapons skills',
  'BS': 'Ballistic skills',
  'S': 'Strength',
  'T': 'Toughness',
  'Ag': 'Agility',
  'Re': 'Reason',
  'Fel': 'Fellowship',
}

export const Skills = {
  WS: ['Melee', 'Defense'],
  BS: ['Shooting', 'Throwing'],
  S: ['Brawl', 'Toil'],
  T: ['Survival', 'Endurance'],
  Ag: ['Athletics', 'Stealth'],
  Re: ['Willpower', 'Recall'],
  Fel: ['Leadership', 'Charm'],
} as const;

export type SkillsByCharacteristic = typeof Skills;
export type CharacteristicKey = keyof SkillsByCharacteristic;
export type SkillFor<C extends CharacteristicKey> = SkillsByCharacteristic[C][number];

export type RollDiceFn = <
  C extends CharacteristicKey,
  S extends SkillFor<C>
>(
  characteristic: C,
  attribute: S
) => void;


export type Character = {
  [K in CharacteristicKey]: {
    favored: boolean;
    value: number;
    skills: Record<SkillFor<K>, number>;
  };
};


export type Encounter = {
  name: string;
  type: 'minion' | 'brute' | 'champions' | 'monstrosities';
  speed: 'slow' | 'normal' | 'fast';
  resilience: number;
  wounds: number
} & {
  [K in CharacteristicKey]: {
    value: number;
    skills: Record<SkillFor<K>, number>;
  }
};

export function typedEntries<T extends object>(obj: T) {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}
