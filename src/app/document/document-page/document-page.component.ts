import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-page',
  templateUrl: './document-page.component.html',
  styleUrls: ['./document-page.component.scss']
})
export class DocumentPageComponent {

  public readonly formGroup = this.formBuilder.group({
  });

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly documentService: DocumentService,
    private readonly userService: UserService,
    private readonly formBuilder: FormBuilder
  ) { }

}
