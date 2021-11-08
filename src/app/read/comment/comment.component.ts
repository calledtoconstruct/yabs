import { Component, Input } from '@angular/core';
import { ArticleComment } from '../read-article.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {

  @Input() public comment: ArticleComment | null = null;

}
