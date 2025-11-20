"use client";

import {Geist, Geist_Mono} from "next/font/google";
import CharacteristicComponent from "@/components/skills/characteristicComponent";
import {Characteristics, CharacteristicKey} from "@/types/types";
import SkillComponent from "@/components/attributes/skillComponent";
import DiceBox from '@3d-dice/dice-box'
import {useEffect, useRef, useState} from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const diceRollRef = useRef<HTMLDivElement>(null);
  const [diceBox, setDiceBox] = useState<any>();


  useEffect(() => {
    const diceBox = new DiceBox(".dice-rolling", {
      assetPath: '/assets/',
      container: 'w-full'
    });

    diceBox.init().then(() => {})

    setDiceBox(diceBox);
  }, []);

  const roll = () => {
    diceBox.roll('4d10')
  }

  const rollDice = (characteristic: CharacteristicKey, attribute: string) => {

  }

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black`}
    >
      <main className="flex flex-col w-xl">
        <div ref={diceRollRef} className="dice-rolling fixed top-0 left-0 z-20 w-full h-full pointer-events-none [&>canvas]:w-full [&>canvas]:h-full"/>
        <button onClick={roll}>ROOOL</button>
        <section className="divide-y">
          {Object.keys(Characteristics).map((characteristic) => (
            <section key={characteristic} className="flex border-l border-r first:border-t last:border-b">
              <CharacteristicComponent name={characteristic as CharacteristicKey}/>
              <SkillComponent name={characteristic as CharacteristicKey} onClick={rollDice}/>
            </section>
          ))}
        </section>
      </main>
    </div>
  );
}
