import {Characteristics, CharacteristicKey, Character} from "@/types/types";
import {UseFormRegister} from "react-hook-form";

type SkillsProps =
  | {
  variant: 'form';
  form: UseFormRegister<Character>;
  name: CharacteristicKey;
  value?: never;
}
  | {
  variant: 'readonly';
  form?: never;
  name: CharacteristicKey;
  value: number
};

export default function CharacteristicComponent({name, form, variant, value}: SkillsProps) {
  return <div className="characteristic flex items-center justify-between p-2 w-[250px] border-r border-parchment-ink">
    <div className="flex flex-col">
      <h2 className="text-[2rem] font-bold leading-none text-black">{name}</h2>
      <p className="text-sm uppercase">{Characteristics[name]}</p>
    </div>
    <div className="flex flex-col gap-1 items-center">
      {variant === 'form' && (
      <>
        <input {...form(`${name}.value`)} type="number" className="bg-transparent border-b border-solid border-parchment-ink p-0.5 text-2xl font-bold w-[50px] text-center"/>
        <input {...form(`${name}.favored`)} type="checkbox" className="bg-transparent w-4 h-4 border cursor-pointer inline-block"/>
      </>
      )}
      {variant === 'readonly' && (
        <div className="text-2xl font-bold leading-none text-black">{value}</div>
      )}
    </div>
  </div>
}
