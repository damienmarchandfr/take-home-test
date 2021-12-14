import { Drug, Pharmacy } from "./pharmacy";

import fs from "fs";

const drugs = [
  new Drug("Doliprane", 20, 30),
  new Drug("Herbal Tea", 10, 5),
  new Drug("Fervex", 5, 40),
  new Drug("Magic Pill", 15, 40),
];
const trial = new Pharmacy(drugs);

const log = {};

// First day drugs stats do not change
log['0'] = JSON.parse(JSON.stringify(drugs))

for (let elapsedDays = 1; elapsedDays < 30; elapsedDays++) {
  log[elapsedDays] = JSON.parse(JSON.stringify(trial.updateBenefitValue()))
}

/* eslint-disable no-console */
fs.writeFile("output.json", JSON.stringify(log), (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("success");
  }
});
/* eslint-enable no-console */
