import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { DropdownDirective } from '../shared/dropdown.directive';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [DropdownDirective, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  // @Output() featureSelected = new EventEmitter<string>();

  // onSelect(feature: string) {
  //   this.featureSelected.emit(feature);
  // }
  isAuthenticated = false;

  private authService = inject(AuthService);
  private dsService = inject(DataStorageService);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    const sub = this.authService.user$.subscribe({
      next: (user) => {
        // this.isAuthenticated = !user ? false : true
        this.isAuthenticated = !!user;
        console.log(!user);
        console.log(!!user);
      }
    });

    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }

  onSaveData() {
    this.dsService.storeRecipes();
  }

  onFetchData() {
    this.dsService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
