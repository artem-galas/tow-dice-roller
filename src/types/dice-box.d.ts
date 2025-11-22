declare module "@3d-dice/dice-box" {
  export interface DiceBoxOptions {
    /** Path to assets folder (textures, models). Example: "/assets/" */
    assetPath: string;

    /** Container where the canvas will be mounted */
    container: HTMLElement | string;

    /** Optional dice scale factor */
    scale?: number;

    /** Enable/disable shadows */
    shadows?: boolean;

    /** Environment map path */
    envPath?: string;

    /** Whether to enable antialiasing */
    antialias?: boolean;

    /** Physics configuration */
    gravity?: number;

    /** Show debug helpers (axes, lights, etc.) */
    debug?: boolean;

    /** Enable sound (if supported) */
    sound?: boolean;

    /** [width, height] override if not using container size */
    dimensions?: [number, number];

    /** Background color or image */
    background?: string;

    /** Additional options if library updates */
    [key: string]: any;
  }

  export interface Roll {
    sides: number;
    dieType: string;
    groupId: number;
    value: number;
  }

  export interface RollResult {
    id: number;
    qty: number;
    rolls: Roll[];
    sides: number;
    value: number;
  }

  export default class DiceBox {
    constructor(options: DiceBoxOptions);

    /** Initializes WebGL scene, loads assets, etc. */
    init(): Promise<void>;

    /** Rolls dice. Returns a promise that resolves with roll results */
    roll(notation: string, options?: Record<string, any>): Promise<Roll[]>;

    /** Clears dice from the scene */
    clear(): void;

    /** Fully destroys scene, WebGL context, listeners */
    destroy(): void;

    /** Event registration */
    on(event: string, handler: (...args: any[]) => void): void;

    /** Remove event listener */
    off(event: string, handler: (...args: any[]) => void): void;
  }
}
