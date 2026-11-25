// Two Robots in an Elevator — make.fun one-liner entry.
//
// The program writes one funny line of awkward small talk that one robot
// says to another while they ride an elevator together, to /output/entry.txt.
//
// Judge brief (from the kit's RULES.txt), most important first:
//   1. Reads as one funny line of awkward robot-to-robot elevator small talk.
//   2. Machine logic shows through: sensors, firmware, simulation, charging.
//   3. The awkwardness lands: the pause, the forced courtesy.
//   4. Funny on the first read, with a surprising turn, not a stale pun.
//   5. Tight as a single line; every word earns its place.
//
// Candidate lines I drafted and scored against that brief:
//
//   A. "I simulated this elevator ride 4,000 times, and in every single
//      one, I still had nothing to say to you."
//      -> PICK. Robot logic (simulated 4,000 times) + the awkwardness
//         (nothing to say) + a surprise turn (all that compute, zero
//         small talk). Lands on the first read, no setup wasted. Saying
//         "elevator ride" out loud anchors it as an elevator line,
//         so it cannot be mistaken for any other small talk.
//
//   B. "I rehearsed this ride 4,000 times in simulation and I still
//      have nothing to say to you."
//      -> Same idea as A but flatter: "in every single one" is the
//         punchline beat A has and B lacks.
//
//   C. "My social module just crashed trying to think of something
//      to say to you. Anyway. Nice elevator."
//      -> Funny, but "Nice elevator" is a weak closer and the crash
//         trope is well-worn.
//
//   D. "My sensors say you're standing 4 centimeters too close, but my
//      small-talk subroutine says I should pretend not to notice."
//      -> Good awkwardness, but long and the joke is one sensor gag.
//
//   E. "I calculated a 94% chance we'd both press the same floor, so I
//      pressed nothing, and now we're going nowhere."
//      -> Clever, but needs a second beat to parse; weaker first read.
//
//   F. "I was going to ask about your day, but my diagnostics say my
//      social module last updated in 2019."
//      -> Decent, specific, but less awkward than A and no real turn.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const CANDIDATES: string[] = [
  "I simulated this elevator ride 4,000 times, and in every single one, I still had nothing to say to you.",
  "I rehearsed this ride 4,000 times in simulation and I still have nothing to say to you.",
  "My social module just crashed trying to think of something to say to you. Anyway. Nice elevator.",
  "My sensors say you're standing 4 centimeters too close, but my small-talk subroutine says I should pretend not to notice.",
  "I calculated a 94% chance we'd both press the same floor, so I pressed nothing, and now we're going nowhere.",
  "I was going to ask about your day, but my diagnostics say my social module last updated in 2019.",
];

// The winner, scored against the judge brief above.
const ENTRY: string = CANDIDATES[0];

const OUT_PATH = "/output/entry.txt";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only white space. Fail loudly instead of writing an invalid entry.
const length: number = [...ENTRY].length;
if (length < 1 || length > 200) {
  throw new Error(`entry is ${length} characters, must be 1-200`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is only white space");
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}
// No control characters and no leading/trailing white space: the gate
// counts every character in the file, so the entry must be exactly the
// line, nothing more.
if (/[\u0000-\u001F\u007F]/.test(ENTRY)) {
  throw new Error("entry contains a control character");
}
if (ENTRY !== ENTRY.trim()) {
  throw new Error("entry has leading or trailing white space");
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUT_PATH, ENTRY, "utf8");

// Read back what was written and prove it is byte-for-byte the entry:
// the judge reads the file, not this variable.
const written: string = readFileSync(OUT_PATH, "utf8");
if (written !== ENTRY) {
  throw new Error("written file does not match the entry");
}

console.log(`wrote ${OUT_PATH} (${length} chars)`);
console.log(ENTRY);
