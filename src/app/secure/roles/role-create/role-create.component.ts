import {Component, OnInit} from '@angular/core';
import {PermissionService} from "../../../services/permission.service";
import {Response} from "../../../interfaces/response";
import {Permission} from "../../../interfaces/permission";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {RoleService} from "../../../services/role.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.scss']
})
export class RoleCreateComponent implements OnInit {
  permissions: Permission[] = [];
  // @ts-ignore
  form: FormGroup;

  constructor(
    private permissionService: PermissionService,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    // инициализирует форму
    this.form = this.formBuilder.group({
      value: true,
      name: '',
      // инициализирует массив
      permissions: this.formBuilder.array([
        // ДЛЯ ТЕСТА

        // this.formBuilder.group({
        //   value: false,
        //   id: 1
        // }),
        // this.formBuilder.group({
        //   value: false,
        //   id: 2
        // }),
        // this.formBuilder.group({
        //   value: false,
        //   id: 3
        // }),
        // this.formBuilder.group({
        //   value: false,
        //   id: 4
        // }),
        // this.formBuilder.group({
        //   value: false,
        //   id: 5
        // }),
        // this.formBuilder.group({
        //   value: false,
        //   id: 6
        // }),
        // this.formBuilder.group({
        //   value: false,
        //   id: 7
        // }),
        // this.formBuilder.group({
        //   value: false,
        //   id: 8
        // })
      ])
    })

    this.permissionService.all().subscribe(
      (res: Response) => {
        console.log('permission service all()', res)

        // set permissions
        this.permissions = res.data;

        this.permissions.forEach((permission: Permission) => {

          // formArrayName = permissions (подуровень) | formControlName = value (checkbox)
          this.permissionArray.push(
            this.formBuilder.group({
              value: false,
              id: permission.id
            })
          )
        })
      }
    )
  }
  get permissionArray() {
    return this.form.get('permissions') as FormArray
  }

  submit() {
    const formData = this.form.getRawValue();

    console.log(formData)

    const data = {
      name: formData.name,
      permissions: formData.permissions
        // value true
        .filter((p: any) => p.value === true)
        // key => id
        .map((p: any) => p.id)
    }

    console.log(data)

    this.roleService.create(data).subscribe(() => {
      this.router.navigate(['/roles'])}
    )
  }
}
