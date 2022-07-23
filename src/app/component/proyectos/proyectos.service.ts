import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyectos } from './proyectos';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class ProyectosService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getProyectos(): Observable<Proyectos[]> {
    return this.http.get<Proyectos[]>(`${this.apiServerUrl}/proyectos/all`);
  }  

  public updateProyectos(proyectos: Proyectos): Observable<Proyectos> {
    return this.http.put<Proyectos>(`${this.apiServerUrl}/proyectos/update`, proyectos);
  } 
  
  public addProyectos(proyectos: Proyectos): Observable<Proyectos> {
    return this.http.post<Proyectos>(`${this.apiServerUrl}/proyectos/add`, proyectos);
  }

  public deleteProyectos(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/proyectos/delete/${id}`);
  }
}
  
