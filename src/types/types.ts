export const Characteristics = {
  'WS': 'Weapons skills',
  'BS': 'Ballistic skills',
  'S': 'Strength',
  'T': 'Toughness',
  'Ag': 'Agility',
  'Re': 'Reason',
  'Fel': 'Fellowship',
}

export type CharacteristicKey = keyof typeof Characteristics;
