import {Characteristics, CharacteristicKey} from "@/types/types";

type SkillsProps = {
  name: CharacteristicKey;
}

export default function CharacteristicComponent({name}: SkillsProps) {
  return <div className="characteristic flex items-center justify-between p-2 w-[250px]">
    <div className="flex flex-col">
      <h2 className="text-[2rem] font-bold leading-[1] text-black">{name}</h2>
      <p className="text-sm uppercase">{Characteristics[name]}</p>
    </div>
    <div className="flex flex-col gap-1 items-center">
      <input name={name} type="number" className="bg-transparent border-b-[1px] border-solid p-[2px] text-2xl font-bold w-[50px] text-center"/>
      <input name={`${name}_favored`} type="checkbox" className="bg-transparent w-4 h-4 border-[1px] cursor-pointer inline-block"/>
    </div>
  </div>
}
