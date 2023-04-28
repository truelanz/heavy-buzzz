import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, @Inject(DOCUMENT) private document: Document) { }

  goToHome() {
    this.router.navigate(['/']);
    this.document.body.scrollTop = 0; // Para navegadores antigos
    this.document.documentElement.scrollTop = 0; // Para navegadores modernos
  }

  ngOnInit(): void {
    
  }


}
