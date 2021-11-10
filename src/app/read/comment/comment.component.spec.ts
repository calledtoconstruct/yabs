import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleComment } from '../read-article.service';
import { CommentComponent } from './comment.component';
import { DebugElement } from '@angular/core';
import { FakeImageDirective } from 'src/app/fake/image.fake';
import { findElement } from 'src/app/find-elements-helper';

const howToFindHeader = findElement('header')
  .withClass('comment')
  .please();

const howToFindFooter = findElement('footer')
  .withClass('comment')
  .please();

const howToFindBrandPhoto = findElement('img')
  .withClass('brand-photo')
  .please();

const howToFindBrand = findElement('p')
  .withClass('brand')
  .please();

const howToFindText = findElement('p')
  .withClass('text')
  .please();

const comment = <ArticleComment>{
  brandPhoto: '/fake/img/url.png',
  brand: 'oiweionvladsif',
  text: 'uvuewnsnbuad',
  when: new Date()
};

describe('CommentComponent', () => {

  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentComponent, FakeImageDirective]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    component.comment = comment;
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

  describe('brand photo', () => {
    
    let brandPhoto: DebugElement;
    let fakeImageDirective: FakeImageDirective;

    beforeEach(() => {
      brandPhoto = fixture.debugElement.query(howToFindBrandPhoto);
      fakeImageDirective = brandPhoto.injector.get(FakeImageDirective);
    });

    it('should exist', () => {
      expect(brandPhoto).toBeTruthy();
    });

    it('should reference the correct url', () => {
      expect(fakeImageDirective.src).toBe(comment.brandPhoto);
    });

  });

  describe('brand', () => {
    
    let brand: DebugElement;

    beforeEach(() => {
      brand = fixture.debugElement.query(howToFindBrand);
    });

    it('should exist', () => {
      expect(brand).toBeTruthy();
    });

    it('should contain the correct text', () => {
      expect(brand.nativeElement.innerText).toBe(comment.brand);
    });

  });

  describe('text', () => {

    let text: DebugElement;

    beforeEach(() => {
      text = fixture.debugElement.query(howToFindText);
    });

    it('should exist', () => {
      expect(text).toBeTruthy();
    });

    it('should contain the correct text', () => {
      expect(text.nativeElement.innerText).toBe(comment.text);
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
