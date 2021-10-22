import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public readonly data = [{test: 'data'}];
  public readonly columns = ['test'];

  constructor(
    public readonly userService: UserService
  ) { }

  public ngOnInit(): void {
  }

}
