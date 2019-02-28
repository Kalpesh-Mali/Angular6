import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
 hide=true;
  constructor(private router:Router) { }

  ngOnInit() {
  }

  archive(){
    this.router.navigate(['welcome/archive-notes'])
  }
  notes()
  {
    this.router.navigate(['welcome/main-notes'])
  }
 
}
