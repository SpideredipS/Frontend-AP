import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Proyectos } from './proyectos';
import { ProyectosService } from './proyectos.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})

export class ProyectosComponent implements OnInit {

  public proyectos: Proyectos[] = [];
  public editProyectos!: Proyectos;
  public deleteProyectos!: Proyectos;
  
  constructor(private proyectosService: ProyectosService){}

  ngOnInit() {
    this.getProyectos();
  }

  public getProyectos(): void {
    this.proyectosService.getProyectos().subscribe(
      (response: Proyectos[]) => {
        this.proyectos = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddProyectos(addForm: NgForm):void {
    document.getElementById('add-proyectos-modal')?.click();
    this.proyectosService.addProyectos(addForm.value).subscribe(
      (response: Proyectos) => {
        console.log(response);
        this.getProyectos();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
    
  }

  public onUpdateProyectos(proyectos: Proyectos):void {
      this.proyectosService.updateProyectos(proyectos).subscribe(
      (response: Proyectos) => {
        console.log(response);
        this.getProyectos();        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
    
  }

  public onDeleteProyectos(id: number):void {
    this.proyectosService.deleteProyectos(id).subscribe(
    (response: void) => {
      console.log(response);
      this.getProyectos();
      
    },
    (error: HttpErrorResponse) => {
      console.log(error.message);
    }
  )
  
  }

  public onOpenModal(proyectos: Proyectos, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addProyectosModal');
    }
    if (mode === 'edit') {
      this.editProyectos = proyectos;
      button.setAttribute('data-target', '#updateProyectosModal');
    }
    if (mode === 'delete') {
      this.deleteProyectos = proyectos;
      button.setAttribute('data-target', '#deleteProyectosModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
