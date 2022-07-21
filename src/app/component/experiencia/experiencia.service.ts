import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Experiencia } from './experiencia';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'}) 
export class ExperienciaService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getExperiencias(): Observable<Experiencia[]> {
    return this.http.get<Experiencia[]>(`${this.apiServerUrl}/experiencia/all`);
  }  

  public updateExperiencia(experiencia: Experiencia): Observable<Experiencia> {
    return this.http.put<Experiencia>(`${this.apiServerUrl}/experiencia/update`, experiencia);
  } 
  
  public addExperiencia(experiencia: Experiencia): Observable<Experiencia> {
    return this.http.post<Experiencia>(`${this.apiServerUrl}/experiencia/add`, experiencia);
  }

  public deleteExperiencia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/experiencia/delete/${id}`);
  }
}