const p = "Perfect round!";
export const mode_301 = { startingScore: 301, specialMessages: { 151: "1/2 to finish!", 180: p } };
export const mode_501 = { startingScore: 501, specialMessages: { 251: "1/2 to finish!", 180: p } };
export const customMode = (startingScore) => ({ startingScore, specialMessages: { 180: p } });