import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Acerca } from './acerca';
import { environment } from 'src/environments/environment';


@Injectable({providedIn: 'root'}) 
export class AcercaService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAcercas(): Observable<Acerca[]> {
    return this.http.get<Acerca[]>(`${this.apiServerUrl}/acerca/all`);
  }  

  public updateAcerca(acerca: Acerca): Observable<Acerca> {
    return this.http.put<Acerca>(`${this.apiServerUrl}/acerca/update`, acerca);
  } 
  
  public addAcerca(acerca: Acerca): Observable<Acerca> {
    return this.http.post<Acerca>(`${this.apiServerUrl}/acerca/add`, acerca);
  }

  public deleteAcerca(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/acerca/delete/${id}`);
  }
}