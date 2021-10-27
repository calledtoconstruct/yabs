import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FakeActivatedRoute } from 'src/app/fake/activated-route.fake';
import { FakeUserService } from 'src/app/fake/user-service.fake';
import { UserService } from 'src/app/user.service';
import { DocumentService } from '../document.service';
import { FakeDocumentService } from '../fake/document-service.fake';

import { DocumentPageComponent } from './document-page.component';

describe('Document -> Document Page', () => {

  let userService: FakeUserService;
  let documentService: FakeDocumentService;
  let activatedRoute: FakeActivatedRoute;

  beforeEach(() => {
    userService = new FakeUserService();
    documentService = new FakeDocumentService();
    activatedRoute = new FakeActivatedRoute();
  });

  afterEach(() => {
    userService.tearDown();
    documentService.tearDown();
    activatedRoute.tearDown();
  });

  let component: DocumentPageComponent;
  let fixture: ComponentFixture<DocumentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentPageComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: DocumentService, useValue: documentService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should provide form group', () => {
    expect(component.formGroup).toBeTruthy();
  });

});
