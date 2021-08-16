import { Component, OnInit } from '@angular/core';
import {Role} from "../../interfaces/role";
import {RoleService} from "../../services/role.service";
import {Response} from "../../interfaces/response";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  roles: Role[] = [];

  constructor(private roleService: RoleService) { }

  ngOnInit(): void {
    this.roleService.all().subscribe(
      (res: Response) => {
        this.roles = res.data;
      }
    )
  }

  delete(id: number) {
    if(confirm('Are you sure you want to delete this record?'))
      this.roleService.delete(id).subscribe(
        () => {
          if (this.roles) {
            this.roles = this.roles.filter(r => r.id !== id);
          }
        }
      )
  }
}
