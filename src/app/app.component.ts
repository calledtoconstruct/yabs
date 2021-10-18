import { Component } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private readonly testCollection = collection(this.firestore, 'tests');
  public readonly testData$ = collectionData(this.testCollection);

  title = 'yabs';

  constructor(
    public readonly userService: UserService,
    private readonly firestore: Firestore
  ) {
  }

}
