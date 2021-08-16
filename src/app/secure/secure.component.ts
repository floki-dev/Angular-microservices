import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {User} from "../interfaces/user";
import {Auth} from "../classes/auth";
import {Response} from "../interfaces/response";

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss']
})
export class SecureComponent implements OnInit {
  // @ts-ignore
  user: User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.authService.user().subscribe(
      // @ts-ignore
      (res: Response) => {
        this.user = res.data; // get user
        Auth.user = this.user; // use user global
      },
      () => {
        this.router.navigate(['/login'])
      })
  }

  listElements: any = [
    'name', 1
  ]
}
