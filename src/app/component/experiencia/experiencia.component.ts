import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Experiencia } from './experiencia';
import { ExperienciaService } from './experiencia.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})

export class ExperienciaComponent implements OnInit {

  public experiencia: Experiencia[] = [];
  public editExperiencia!: Experiencia;
  public deleteExperiencia!: Experiencia;
  
  constructor(private experienciaService: ExperienciaService){}

  ngOnInit() {
    this.getExperiencias();
  }

  public getExperiencias(): void {
    this.experienciaService.getExperiencias().subscribe(
      (response: Experiencia[]) => {
        this.experiencia = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddExperiencia(addForm: NgForm):void {
    document.getElementById('add-experiencia-modal')?.click();
    this.experienciaService.addExperiencia(addForm.value).subscribe(
      (response: Experiencia) => {
        console.log(response);
        this.getExperiencias();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
    
  }

  public onUpdateExperiencia(experiencia: Experiencia):void {
      this.experienciaService.updateExperiencia(experiencia).subscribe(
      (response: Experiencia) => {
        console.log(response);
        this.getExperiencias();        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
    
  }

  public onDeleteExperiencia(id: number):void {
    this.experienciaService.deleteExperiencia(id).subscribe(
    (response: void) => {
      console.log(response);
      this.getExperiencias();
      
    },
    (error: HttpErrorResponse) => {
      console.log(error.message);
    }
  )
  
  }

  public onOpenModal(experiencia: Experiencia, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addExperienciaModal');
    }
    if (mode === 'edit') {
      this.editExperiencia = experiencia;
      button.setAttribute('data-target', '#updateExperienciaModal');
    }
    if (mode === 'delete') {
      this.deleteExperiencia = experiencia;
      button.setAttribute('data-target', '#deleteExperienciaModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
