import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Cursos } from './cursos';
import { CursosService } from './cursos.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})

export class CursosComponent implements OnInit {

  public cursos: Cursos[] = [];
  public editCursos!: Cursos;
  public deleteCursos!: Cursos;

  constructor(private cursosService: CursosService){}

  ngOnInit() {
    this.getCursos();
  }

  public getCursos(): void {
    this.cursosService.getCursos().subscribe(
      (response: Cursos[]) => {
        this.cursos = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddCursos(addForm: NgForm):void {
    document.getElementById('add-cursos-modal')?.click();
    this.cursosService.addCursos(addForm.value).subscribe(
      (response: Cursos) => {
        console.log(response);
        this.getCursos();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
    
  }

  public onUpdateCursos(cursos: Cursos):void {
      this.cursosService.updateCursos(cursos).subscribe(
      (response: Cursos) => {
        console.log(response);
        this.getCursos();        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
    
  }

  public onDeleteCursos(id: number):void {
    this.cursosService.deleteCursos(id).subscribe(
    (response: void) => {
      console.log(response);
      this.getCursos();
      
    },
    (error: HttpErrorResponse) => {
      console.log(error.message);
    }
  )
  
  }

  public onOpenModal(cursos: Cursos, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addCursosModal');
    }
    if (mode === 'edit') {
      this.editCursos = cursos;
      button.setAttribute('data-target', '#updateCursosModal');
    }
    if (mode === 'delete') {
      this.deleteCursos = cursos;
      button.setAttribute('data-target', '#deleteCursosModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
