import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Company } from '../_models/index';
@Injectable()
export class CompanyService {

  constructor(private http: Http) { }
  company_url='http://localhost:3000/company/add';


  create(company: any)
  {
    console.log("Hello From CompanyService; Méthode Create");

    //noinspection TypeScriptValidateTypes
    return this.http.post(this.company_url, company).
    map((response: Response) =>response.json());
  }



}
