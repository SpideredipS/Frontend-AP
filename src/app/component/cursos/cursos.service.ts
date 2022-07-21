import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cursos } from './cursos';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class CursosService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getCursos(): Observable<Cursos[]> {
    return this.http.get<Cursos[]>(`${this.apiServerUrl}/cursos/all`);
  }  

  public updateCursos(curso: Cursos): Observable<Cursos> {
    return this.http.put<Cursos>(`${this.apiServerUrl}/cursos/update`, curso);
  } 
  
  public addCursos(curso: Cursos): Observable<Cursos> {
    return this.http.post<Cursos>(`${this.apiServerUrl}/cursos/add`, curso);
  }

  public deleteCursos(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/cursos/delete/${id}`);
  }
}