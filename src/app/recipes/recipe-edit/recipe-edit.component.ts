import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  imports: [],
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {
  // id?: number;
  // private activatedRoute = inject(ActivatedRoute);
  
  editMode = false;
  @Input()
  set id(id: string) {
    this.editMode = id != null;
    console.log(this.editMode);
    console.log(id);
  }

  ngOnInit() {
    // this.activatedRoute.params.subscribe({
    //   next: (params) => {
    //     this.id = +params['id'];
    //     this.editMode = params['id'] != null;
    //     console.log(this.editMode);
    //   }
    // });
  }
}
