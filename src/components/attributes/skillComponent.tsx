import {Character, CharacteristicKey, RollDiceFn, SkillFor, Skills} from "@/types/types";
import {UseFormRegister, type Path} from "react-hook-form";
import {D10DiceIcon} from "@/components/dice-icon/d10-dice.icon";

type AttributesComponentProps = {
  name: CharacteristicKey;
  form: UseFormRegister<Character>
  onClick: RollDiceFn;
}

export default function SkillComponent({name, form, onClick}: AttributesComponentProps) {
  function skillPath<
    C extends CharacteristicKey,
    S extends SkillFor<C>
  >(c: C, s: S) {
    return `${c}.skills.${s}` as Path<Character>;
  }

  return <div className="attributes flex-1 divide-y divide-dotted divide-parchment-ink">
    {Skills[name].map((attr) => (
      <div key={attr} className="text-lg flex justify-between items-center p-2">
        <div className="cursor-pointer flex gap-2 flex-1 hover:bg-gray-400" onClick={() => onClick(name, attr)}>
          <div className="text-lg">{attr}</div>
          <D10DiceIcon fill="#000"/>
        </div>
        <input {...form(skillPath(name, attr))} type="number"
               className="bg-transparent w-[50px] text-center border-b-[1px] border-parchment-ink p-2"/>
      </div>
    ))}
  </div>
}
