import {Component} from '@angular/core';
import {Permission} from "../../../interfaces/permission";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {PermissionService} from "../../../services/permission.service";
import {RoleService} from "../../../services/role.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Response} from "../../../interfaces/response";

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent {
  permissions: Permission[] = []
  // @ts-ignore
  form: FormGroup
  private role: any

  constructor(
    private permissionService: PermissionService,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      permissions: this.formBuilder.array([])
    })

    //permissions
    this.permissionService.all().subscribe(
      (permissions: Response) => {
        this.permissions = permissions.data
        console.log('permission get all()', this.permissions)

        this.permissions.forEach((p: Permission) => {
          this.permissionArray.push(
            this.formBuilder.group({
              value: false,
              id: p.id
            })
          )
        });
      }
    );

    // params
    this.route.params.subscribe(
      params => {
        this.roleService.get(params.id).subscribe(
          (res: Response) => {

            this.role = res.data
            console.log('role show get(id)', this.role)

            console.log('this.permissions', this.permissions);
            console.log('this.role.permissions', this.role.permissions);

            let values = this.permissions.map((allPermission: Permission) => {
              let selected = this.role.permissions.filter((rolePermission: Permission) => rolePermission.id === allPermission.id).length > 0 // true or false for checkbox

              return {
                value: selected,
                id: allPermission.id
              }
            });

            this.form.patchValue({
              name: this.role.name,
              permissions: values
            })
          }
        )
      }
    )
  }

  get permissionArray() {
    return this.form.get('permissions') as FormArray
  }

  submit(): void {
    const formData = this.form.getRawValue()

    const data = {
      name: formData.name,
      permissions: formData.permissions
        .filter((formPermissions: any) => formPermissions.value === true) // только value равное true
        .map((formPermissions: any) => formPermissions.id) // из объекта только от id value, было 0: {value: true, id: 1}, стало 0: 1
    };

    this.roleService.update(this.role.id, data)
      .subscribe(() => this.router.navigate(['/roles']))
  }
}
