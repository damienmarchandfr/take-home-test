import { Drug, Pharmacy } from "./pharmacy";
import {readFile} from 'fs'

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    const pharmacy = new Pharmacy([new Drug("test", 2, 3)])
    expect(pharmacy.updateBenefitValue()).toStrictEqual([
      new Drug("test", 1, 2),
    ]);
  });

  it("should update benefit and expiresIn", (next) => {
    const drugs = [
      new Drug("Doliprane", 20, 30),
      new Drug("Herbal Tea", 10, 5),
      new Drug("Fervex", 5, 40),
      new Drug("Magic Pill", 15, 40),
    ];
    const pharmacy = new Pharmacy(drugs);
    
    readFile("test.json",(err,buffer)=>{
      if(err){
        throw err
      }
      const log = {};

      // First day drugs stats do not change
      log["0"] = JSON.parse(JSON.stringify(pharmacy.drugs));
  
      for (let elapsedDays = 1; elapsedDays < 30; elapsedDays++) {
        log[elapsedDays] = JSON.parse(JSON.stringify(pharmacy.updateBenefitValue()));
      }
  
      expect(log).toStrictEqual(JSON.parse(buffer.toString()));
      next()
    })
  });
});
