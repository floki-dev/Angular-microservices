import {Component, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";
import {Router} from "@angular/router";
import {Auth} from "../../classes/auth";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // @ts-ignore
  user: User = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    Auth.userEmitter.subscribe(
      (user: User) => {
        this.user = user;
      }
    )
  }

  logout() {
    this.authService.logout().subscribe(
      () =>
        this.router.navigate(['/login'])
    )
  }
}
