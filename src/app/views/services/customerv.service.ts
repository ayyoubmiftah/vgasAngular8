import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');

@Injectable()
export class CustomervService {

  constructor(private httpClient: HttpClient) {
  }





}
