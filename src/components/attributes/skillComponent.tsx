import {CharacteristicKey} from "@/types/types";

type AttributesComponentProps = {
  name: CharacteristicKey;
  onClick: (characteristic: CharacteristicKey, attribute: string) => void;
}

const Skills: Record<CharacteristicKey, string[]> = {
  'WS': ['Melee Attack', 'Defense'],
  'BS': ['Shooting', 'Throwing'],
  'S': ['Brawl', 'Toil'],
  'T': ['Survival', 'Endurance'],
  'Ag': ['Athletics', 'Stealth'],
  'Re': ['Willpower', 'Recall'],
  'Fel': ['Leadership', 'Charm'],
}

export default function SkillComponent({name, onClick}: AttributesComponentProps) {
  return <div className="attributes flex-1 divide-y divide-dotted">
    {Skills[name].map((attr) => (
      <div key={attr} className="text-lg flex justify-between items-center p-2">
        <div className="text-lg cursor-pointer" onClick={() => onClick(name, attr)}>{attr}</div>
        <input type="number" name={attr} className="bg-transparent w-[40px] text-center border-b-[1px] border-black p-2"/>
      </div>
    ))}
  </div>
}
