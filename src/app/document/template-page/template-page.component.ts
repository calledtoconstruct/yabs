import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TemplateService } from '../template.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-template-page',
  templateUrl: './template-page.component.html',
  styleUrls: ['./template-page.component.scss']
})
export class TemplatePageComponent {

  public readonly formGroup = this.formBuilder.group({
  });

  constructor(
    private readonly userService: UserService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly templateService: TemplateService,
    private readonly formBuilder: FormBuilder
  ) { }

}
