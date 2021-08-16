import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Role} from "../../../interfaces/role";
import {RoleService} from "../../../services/role.service";
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../interfaces/user";
import {Response} from "../../../interfaces/response";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  // @ts-ignore
  form: FormGroup;
  roles: Role[] = [];
  // @ts-ignore
  id: number;
  // @ts-ignore
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      first_name: '',
      last_name: '',
      email: '',
      role_id: ''
    });

    this.roleService.all().subscribe(
      (res: Response) => {
        this.roles = res.data
      }
    );

    console.log(this.route);
    // this.route - можно выполнять действия над маршрутом
    this.route.params.subscribe(
      // params = id
      params => {
        console.log('route.params', params)
        this.userService.get(params.id).subscribe(
          (res: Response) => {
            console.log('user service get(id)', res.data)

            this.user = res.data;

            // Patches the value of the FormGroup
            this.form.patchValue({
              first_name: this.user.first_name,
              last_name: this.user.last_name,
              email: this.user.email,
              role_id: this.user.role.id
            });
          }
        )
      }
    )
  }

  submit(): void {
    const data = this.form.getRawValue();

    this.userService.update(this.user.id, data).subscribe(
      () => this.router.navigate(['/users'])
    );
  }
}
