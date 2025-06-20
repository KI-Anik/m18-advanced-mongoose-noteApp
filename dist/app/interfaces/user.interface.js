"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**if we nested another {key : type}, inside an
 *  interface IUser {
 *  key : {
            key : type
            }
 },
  TS validation doesn't worked properly.
  
  that's why need to create another sub-interface , which inputed directly Main interface {as : Ts Type}
    -- Now in user.model.ts--> schema can now checked Ts validation properly **/ 
