import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Company } from '../_models/index';
@Injectable()
export class CompanyService {

  constructor(private http: Http) { }
  company_url='http://localhost:3000/company/add';
  endpoint_url='http://localhost:3000/company/deletecompany';
  get_url='http://localhost:3000/company/findcompany';

  create(company: any)
  {
    console.log("Hello From CompanyService; Méthode Create");

    //noinspection TypeScriptValidateTypes
    return this.http.post(this.company_url, company).
    map((response: Response) =>response.json());
  }

  getall()
  {return this.http.get('http://localhost:3000/company/listalll').
  map((response: Response) =>response.json());

  }

deleteCompany(id:string)
{
  const url=`${this.endpoint_url}/${id}`;
  return this.http.delete(url).
  map((response: Response) =>response.json());
}

  getCompany(companyId : string)
  {
    const url=`${this.get_url}/${companyId}`;
    console.log(url);
    return this.http.
    get(url).
    map(response => response.json());
  }


}
