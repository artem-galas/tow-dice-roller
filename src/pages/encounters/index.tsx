import EncounterComponent from "@/components/encounter";
import {horror} from "@/data/encounters/horror";

export default function EncounterPage() {
  return <main className="flex flex-col w-xl">
    <EncounterComponent encounter={horror}/>
  </main>
}
