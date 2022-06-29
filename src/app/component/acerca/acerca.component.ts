import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AcercaService } from './acerca.service';
import { Acerca } from './acerca';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.css']
})

  export class AcercaComponent implements OnInit {

  public acercas: Acerca[] = [];
  public editAcerca!: Acerca;
  public deleteAcerca!: Acerca;
  
  constructor(private acercaService: AcercaService){}

  ngOnInit() {
    this.getAcercas();
  }

  public getAcercas(): void {
    this.acercaService.getAcercas().subscribe(
      (response: Acerca[]) => {
        this.acercas = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  //Agregado 17/06

  public onAddAcerca(addForm: NgForm):void {
    document.getElementById('add-acerca-modal')?.click();
    this.acercaService.addAcerca(addForm.value).subscribe(
      (response: Acerca) => {
        console.log(response);
        this.getAcercas();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
    
  }

  public onUpdateAcerca(acerca: Acerca):void {
      this.acercaService.updateAcerca(acerca).subscribe(
      (response: Acerca) => {
        console.log(response);
        this.getAcercas();
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
    
  }

  public onDeleteAcerca(id: number):void {
    this.acercaService.deleteAcerca(id).subscribe(
    (response: void) => {
      console.log(response);
      this.getAcercas();
      
    },
    (error: HttpErrorResponse) => {
      console.log(error.message);
    }
  )
  
}


  //Agregado 04/06

  public onOpenModal(acerca: Acerca, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addAcercaModal');
    }
    if (mode === 'edit') {
      this.editAcerca = acerca;
      button.setAttribute('data-target', '#updateAcercaModal');
    }
    if (mode === 'delete') {
      this.deleteAcerca = acerca;
      button.setAttribute('data-target', '#deleteAcercaModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
