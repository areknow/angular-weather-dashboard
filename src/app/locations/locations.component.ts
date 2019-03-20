import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocationsService } from './locations.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  location: string;
  response: any;

  selection = new SelectionModel<any>(true, []);

  collection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;

  response2 = [
    {Key: 1, EnglishName: 'Detroit', AdministrativeArea: 'MI', PrimaryPostalCode: '48226'}
  ];

  constructor(
    private locationsService: LocationsService,
    private afs: AngularFirestore,
    private cookieService: CookieService
  ) {
    // Initiate fire store collection holder and query for user id
    this.collection = this.afs.collection<any>('locations', ref => {
      return ref.where('id', '==', this.cookieService.get('WD_GUID'));
    });
    // this.items = this.collection.valueChanges();
    this.items = this.collection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as any;
        const docId = a.payload.doc.id;
        return { docId, data };
      });
    }));
  }

  ngOnInit() { }

  /**
   * Form submit logic
   * @param query: user search value
   */
  async submitForm(query: string): Promise<void> {
    try {
      this.response = await this.locationsService.getLocationData(query);
      console.log(this.response);
    } catch (err) {
      console.log(err);
    }
  }

  saveLocation(location) {
    const userCookie = this.cookieService.get('WD_GUID');
    this.collection.add({
      id: userCookie,
      location: location
    })
    .catch((error) => console.log(error));
  }

  removeRow(row) {
    this.collection.doc(row.docId).delete();
  }

}
