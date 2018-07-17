import { Injectable } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class ErrorhandlerService {

  constructor() { }

  handleHttpError(error: HttpErrorResponse) {
    console.error(error)
  }

}
