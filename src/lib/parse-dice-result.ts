import {Roll} from "@3d-dice/dice-box";

export function parseDiceResult(result: Roll[], below: number): {
  value: number;
  sides: number;
}[] {
  return result.filter(dice => dice.value <= below).map(die => ({
    value: die.value,
    sides: die.sides,
  }));
}
