import {Budget} from "./budget";
/**
 * Created by nour on 7/9/17.
 */
export class Transaction {
  _id:string;
  Debit:Number;
  Credit:Number;
  Date : Date;
  DateTransaction:Date;
  TypePaiement:String;
  Libelle:String;
  Remboursement : Number;
  budget : Budget;
  sousBudget : string;
  CompteBancaire : string;
}
