import {Character, CharacteristicKey, RollDiceFn, SkillFor} from "@/types/types";
import {UseFormRegister, type Path} from "react-hook-form";
import {D10DiceIcon} from "@/components/dice-icon/d10-dice.icon";
import {cn} from "@/lib/utils";

type SkillRecord<K extends CharacteristicKey> = K extends string
  ? Record<SkillFor<K>, number>
  : never;

type SkillComponentProps<K extends CharacteristicKey> = | {
  variant: 'form';
  name: CharacteristicKey;
  form: UseFormRegister<Character>
  onClick: RollDiceFn;
  skills: SkillRecord<K>
} |
  {
    variant: 'readonly';
    name?: never;
    form?: never;
    onClick?: never;
    skills: SkillRecord<K>
  }

export default function SkillComponent<K extends CharacteristicKey>({form, name, onClick, variant, skills}: SkillComponentProps<K>) {
  function skillPath<
    C extends CharacteristicKey,
    S extends SkillFor<C>
  >(c: C, s: S) {
    return `${c}.skills.${s}` as Path<Character>;
  }

  return <div className="attributes flex-1 divide-y divide-dotted divide-parchment-ink">
    {Object.entries(skills).map(([skill, value]) => (
      <div key={skill} className="text-lg flex justify-between items-center p-2">
        <div className={cn("cursor-pointer flex gap-2 flex-1", variant ==="form" && 'hover:bg-gray-400') } onClick={() => onClick ? onClick(name, skill as SkillFor<K>) : undefined}>
          <div className="text-lg">{skill}</div>
          {variant === 'form' && (
            <D10DiceIcon fill="#000"/>
          )}
        </div>
        {variant === 'form' && (
          <input {...form(skillPath(name, skill as SkillFor<K>))} type="number"
                 className="bg-transparent w-[50px] text-center border-b border-parchment-ink p-2"/>
        )}
        {variant === 'readonly' && (
          <div className="text-lg font-bold leading-none text-black">{value}</div>
        )}
      </div>
    ))}
  </div>
}
