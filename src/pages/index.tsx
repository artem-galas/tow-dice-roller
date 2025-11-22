"use client";

import {Geist, Geist_Mono} from "next/font/google";
import CharacteristicComponent from "@/components/skills/characteristicComponent";
import {CharacteristicKey, Characteristics, RollDiceFn, Character} from "@/types/types";
import SkillComponent from "@/components/attributes/skillComponent";
import DiceBox from '@3d-dice/dice-box'
import {useEffect, useRef} from "react";
import {useForm, SubmitHandler, type Path} from "react-hook-form"
import {parseDiceResult} from "@/lib/parse-dice-result";
import {toast} from "@/components/ui/sonner";
import {Toaster} from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DefaultFormValues: Character = {
  WS: {
    favored: false,
    value: 3,
    skills: {
      Melee: 4,
      Defense: 2
    }
  },
  BS: {
    value: 3,
    favored: true,
    skills: {
      Shooting: 5,
      Throwing: 4
    }
  },
  S: {
    value: 5,
    favored: false,
    skills: {
      Brawl: 2,
      Toil: 2
    }
  },
  T: {
    value: 4,
    favored: false,
    skills: {
      Survival: 3,
      Endurance: 3
    },
  },
  Ag: {
    value: 4,
    favored: false,
    skills: {
      Athletics: 3,
      Stealth: 2
    }
  },
  Re: {
    value: 5,
    favored: false,
    skills: {
      Willpower: 2,
      Recall: 4
    }
  },
  Fel: {
    value: 2,
    favored: false,
    skills: {
      Leadership: 3,
      Charm: 3
    }
  }
}

export default function Home() {
  const diceContainerRef = useRef<HTMLDivElement>(null);
  const diceBoxRef = useRef<DiceBox>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
  } = useForm<Character>({defaultValues: DefaultFormValues})

  const onSubmit: SubmitHandler<Character> = (data) => console.log(data)


  useEffect(() => {
    if (!diceContainerRef.current) return;

    const diceBox = new DiceBox({
      assetPath: '/assets/',
      container: '.dice-rolling',
    });

    diceBox.init().then(() => {
      console.log('DiceBox initialized');
    });

    diceBoxRef.current = diceBox;

    // Optional cleanup
    return () => {
      diceBoxRef.current?.destroy?.();
    };
  }, []);

  const rollDice: RollDiceFn = (characteristic, attribute) => {
    const numberOfDice = getValues(`${characteristic}.value`);
    const numberBelow = getValues(`${characteristic}.skills.${attribute}` as Path<Character>);
    const diceRolledText = `${numberOfDice}d10<${numberBelow}`

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!diceBoxRef.current) return;

    diceBoxRef.current.roll(diceRolledText).then(rollResult => {
      const result = parseDiceResult(rollResult, numberBelow as number);

      toast({
        title: `Result ${diceRolledText}`,
        description: `${attribute}`,
        result: result.length,
      });

      timeoutRef.current = setTimeout(() => {
        diceBoxRef.current?.clear();
        timeoutRef.current = null;
      }, 10_000);
    });
  }

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} flex min-h-screen items-center justify-center bg-parchment font-sans dark:bg-black`}
    >
      <main className="flex flex-col w-xl">
        <div ref={diceContainerRef}
             className="dice-rolling fixed top-0 left-0 z-20 w-full h-full pointer-events-none [&>canvas]:w-full [&>canvas]:h-full"/>
        <form className="divide-y" onSubmit={handleSubmit(onSubmit)}>
          {Object.keys(Characteristics).map((characteristic) => (
            <section key={characteristic}
                     className="flex border-l border-r border-parchment-ink first:border-t last:border-b">
              <CharacteristicComponent form={register} name={characteristic as CharacteristicKey}/>
              <SkillComponent form={register} name={characteristic as CharacteristicKey} onClick={rollDice}/>
            </section>
          ))}
        </form>
        <Toaster/>
      </main>
    </div>
  );
}
