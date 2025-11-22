import {Characteristics, CharacteristicKey, Character} from "@/types/types";
import {UseFormRegister} from "react-hook-form";

type SkillsProps = {
  name: CharacteristicKey;
  form: UseFormRegister<Character>
}

export default function CharacteristicComponent({name, form}: SkillsProps) {
  return <div className="characteristic flex items-center justify-between p-2 w-[250px]">
    <div className="flex flex-col">
      <h2 className="text-[2rem] font-bold leading-[1] text-black">{name}</h2>
      <p className="text-sm uppercase">{Characteristics[name]}</p>
    </div>
    <div className="flex flex-col gap-1 items-center">
      <input {...form(`${name}.value`)} type="number" className="bg-transparent border-b-[1px] border-solid border-parchment-ink p-[2px] text-2xl font-bold w-[50px] text-center"/>
      <input {...form(`${name}.favored`)} type="checkbox" className="bg-transparent w-4 h-4 border-[1px] cursor-pointer inline-block"/>
    </div>
  </div>
}
