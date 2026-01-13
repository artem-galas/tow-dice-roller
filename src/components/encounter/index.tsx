import {CharacteristicKey, Characteristics, Encounter} from "@/types/types";
import CharacteristicComponent from "@/components/skills/characteristicComponent";
import SkillComponent from "@/components/attributes/skillComponent";

type EncounterProps = {
  encounter: Encounter;
}

export default function EncounterComponent({encounter}: EncounterProps) {
  const {name, type, speed, resilience, wounds} = encounter;
  return <>
    <header className="text-left border-b pb-4 mb-4">
      <h1 className="name text-4xl color-ink-header">{name}</h1>
      <p className="text-lg italic">{type}</p>
    </header>
    <div className="grid grid-cols-3 gap-3 text-center mb-4">
      <div className="p-2 border-parchment-accent border">
        <p className="uppercase text-xs">Speed</p>
        <p className="text-lg font-bold">{speed}</p>
      </div>
      <div className="p-2 border-parchment-accent border">
        <p className="uppercase text-xs">Resilience</p>
        <p className="text-lg font-bold">{resilience}</p>
      </div>
      <div className="p-2 border-parchment-accent border">
        <p className="uppercase text-xs">Wounds</p>
        <p className="text-lg font-bold">{wounds}</p>
      </div>
    </div>
    <div className="border-parchment-ink border">
      <div className="divide-y">
        {(Object.keys(Characteristics) as CharacteristicKey[]).map((characteristic) => (
          <section key={characteristic}
                   className="flex border-l border-r border-parchment-ink first:border-t last:border-b">
            <CharacteristicComponent value={encounter[characteristic].value} variant="readonly" name={characteristic}/>
            <SkillComponent skills={encounter[characteristic].skills} variant="readonly"/>
          </section>
        ))}
      </div>
    </div>
  </>
}
