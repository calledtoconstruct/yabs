import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { FakeActivatedRoute } from 'src/app/fake/activated-route.fake';
import { FakeTemplateService } from '../fake/template-service.fake';
import { FakeUserService } from 'src/app/fake/user-service.fake';
import { ReactiveFormsModule } from '@angular/forms';
import { TemplatePageComponent } from './template-page.component';
import { TemplateService } from '../template.service';
import { UserService } from 'src/app/user.service';

describe('Document -> Template Page', () => {

  let userService: FakeUserService;
  let templateService: FakeTemplateService;
  let activatedRoute: FakeActivatedRoute;

  beforeEach(() => {
    userService = new FakeUserService();
    templateService = new FakeTemplateService();
    activatedRoute = new FakeActivatedRoute();
  });

  afterEach(() => {
    userService.tearDown();
    templateService.tearDown();
    activatedRoute.tearDown();
  });

  let component: TemplatePageComponent;
  let fixture: ComponentFixture<TemplatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemplatePageComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: TemplateService, useValue: templateService },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatePageComponent);
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
