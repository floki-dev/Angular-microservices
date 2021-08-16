import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {RoleService} from "../../../services/role.service";
import {Role} from "../../../interfaces/role";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {Response} from "../../../interfaces/response";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  // @ts-ignore
  form: FormGroup;
  roles: Role[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private roleService: RoleService,

    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      first_name: '',
      last_name: '',
      email: '',
      role_id: '',
    })

    this.roleService.all().subscribe(
      (res: Response) => {
        console.log('user create role service all()', res) // data {0: { id: 1, name: "First"}}
        this.roles = res.data;
      }
    )
  }

  submit() {
    const data = this.form.getRawValue();
    console.log(this.form.getRawValue())

    // data {email: "", first_name: ""}
    this.userService.create(data).subscribe(
      res => {
        console.log('user service create(data)', res)
        this.router.navigate(['/users'])
      }
    )
  }
}
