import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentComponent } from './comment.component';
import { DebugElement } from '@angular/core';
import { findElement } from 'src/app/find-elements-helper';

const howToFindHeader = findElement('header')
  .withClass('comment')
  .please();

const howToFindFooter = findElement('footer')
  .withClass('comment')
  .please();

describe('CommentComponent', () => {

  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  describe('header', () => {

    let header: DebugElement;

    beforeEach(() => {
      header = fixture.debugElement.query(howToFindHeader);
    });

    it('should exist', () => {
      expect(header).toBeTruthy();
    });

  });

  describe('footer', () => {

    let footer: DebugElement;

    beforeEach(() => {
      footer = fixture.debugElement.query(howToFindFooter);
    });

    it('should exist', () => {
      expect(footer).toBeTruthy();
    });

  });

});
