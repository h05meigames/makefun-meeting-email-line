// The Meeting That Should Have Been an Email
// make.fun bounty: u-plucky-finch-20-the-meeting-that-should-have-been-6ce361a9
//
// The whole entry is one line of plain text: a single joke about a meeting
// that should have been an email. This program writes exactly that line to
// /output/entry.txt — nothing else, no second line, no attachment.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "We spent an hour debating whether this meeting could have been an email, then voted by a show of hands instead of reply-all.";

const OUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

function validate(line: string): void {
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_CHARS} characters, got ${line.length}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
}

validate(LINE);
mkdirSync("/output", { recursive: true });
// Write exactly the line: no trailing newline, so the file holds one line
// and nothing else — a strict split on "\n" must see a single element.
writeFileSync(OUT_PATH, LINE, "utf8");
const written = readFileSync(OUT_PATH, "utf8");
if (written !== LINE) {
  throw new Error("verification failed: /output/entry.txt differs from LINE");
}
console.log(`wrote ${LINE.length} characters to ${OUT_PATH}`);
