// Central image imports with vite-imagetools query params for WebP conversion + resizing.
// TS ambient-module wildcards can't match query strings, so we suppress here and re-export as strings.

// @ts-expect-error vite-imagetools query
import heroVr from "./hero-vr.jpg?w=1600&format=webp&quality=72";
// @ts-expect-error vite-imagetools query
import horror from "./game-horror.jpg?w=800&format=webp&quality=72";
// @ts-expect-error vite-imagetools query
import beat from "./game-beatsaber.jpg?w=800&format=webp&quality=72";
// @ts-expect-error vite-imagetools query
import cricket from "./game-cricket.jpg?w=800&format=webp&quality=72";
// @ts-expect-error vite-imagetools query
import plank from "./game-plank.jpg?w=800&format=webp&quality=72";
// @ts-expect-error vite-imagetools query
import boxing from "./game-boxing.jpg?w=800&format=webp&quality=72";
// @ts-expect-error vite-imagetools query
import pistol from "./game-pistol.jpg?w=800&format=webp&quality=72";
// @ts-expect-error vite-imagetools query
import coaster from "./game-coaster.jpg?w=800&format=webp&quality=72";
// @ts-expect-error vite-imagetools query
import conjuring from "./game-conjuring.jpg?w=800&format=webp&quality=72";
// @ts-expect-error vite-imagetools query
import zombie from "./game-zombie.jpg?w=800&format=webp&quality=72";

export const heroImg: string = heroVr;
export const gHorror: string = horror;
export const gBeat: string = beat;
export const gCricket: string = cricket;
export const gPlank: string = plank;
export const gBoxing: string = boxing;
export const gPistol: string = pistol;
export const gCoaster: string = coaster;
export const gConjuring: string = conjuring;
export const gZombie: string = zombie;
