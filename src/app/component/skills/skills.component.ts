import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Skills } from './skills';
import { SkillsService } from './skills.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})

export class SkillsComponent implements OnInit {

  public skills: Skills[] = [];
  public editSkills!: Skills;
  public deleteSkills!: Skills;

  constructor(private skillsService: SkillsService){}

  ngOnInit() {
    this.getSkills();
  }

  public getSkills(): void {
    this.skillsService.getSkills().subscribe(
      (response: Skills[]) => {
        this.skills = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddSkills(addForm: NgForm):void {
    document.getElementById('add-skills-modal')?.click();
    this.skillsService.addSkills(addForm.value).subscribe(
      (response: Skills) => {
        console.log(response);
        this.getSkills();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
  }

  public onUpdateSkills(skills: Skills):void {
      this.skillsService.updateSkills(skills).subscribe(
      (response: Skills) => {
        console.log(response);
        this.getSkills();        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteSkills(id: number):void {
    this.skillsService.deleteSkills(id).subscribe(
    (response: void) => {
      console.log(response);
      this.getSkills();
      
    },
    (error: HttpErrorResponse) => {
      console.log(error.message);
    }
  )
  }

  public onOpenModal(skills: Skills, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addSkillsModal');
    }
    if (mode === 'edit') {
      this.editSkills = skills;
      button.setAttribute('data-target', '#updateSkillsModal');
    }
    if (mode === 'delete') {
      this.deleteSkills = skills;
      button.setAttribute('data-target', '#deleteSkillsModal');
    }
    container?.appendChild(button);
    button.click();
  }

}

