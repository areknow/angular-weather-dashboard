import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, Sort } from '@angular/material';
import { CookieService } from 'angular2-cookie';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CoreService } from '../core/core.service';
import { LocationsService } from './locations.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  loading = true;

  location: string;
  response = [];

  selection = new SelectionModel<any>(true, []);

  collection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;

  tableData: any;
  sortedTableData: any;

  constructor(
    private locationsService: LocationsService,
    private afs: AngularFirestore,
    private cookieService: CookieService,
    public coreService: CoreService,
    private snackBar: MatSnackBar
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
    this.items.subscribe(data => {
      this.tableData = data;
      this.sortedTableData = this.tableData.slice();
      this.sortData({active: 'city', direction: 'asc'});
      this.loading = false;
    });
  }

  ngOnInit() { }

  /**
   * Form submit logic
   * @param query: user search value
   */
  async submitForm(query: string): Promise<void> {
    try {
      this.response = await this.locationsService.getLocationData(query);
    } catch (err) {
      console.log(err);
    }
  }

  saveLocation(newLocation) {
    // Get user items
    const collection = this.afs.collection('locations', ref => {
      return ref.where('id', '==', this.cookieService.get('WD_GUID'));
    });
    const locations = collection.valueChanges();
    locations.pipe(take(1)).subscribe((data: any) => {
      // Check if user already has this location saved
      const checkForMatch = obj => obj.location.Key === newLocation.Key;
      if (!data.some(checkForMatch)) {
        const userCookie = this.cookieService.get('WD_GUID');
        // Add location
        this.collection.add({
          id: userCookie,
          location: newLocation
        })
        .then(val => {
          this.snackBar.open('Location sucessfully added to your profile.', 'Close', {
            duration: 2000,
          });
        })
        .catch((error) => console.log(error));
      } else {
        this.snackBar.open('Sorry, this location is already saved.', 'Close', {
          duration: 2000,
        });
      }
    });
  }

  removeRow(row) {
    this.collection.doc(row.docId).delete();
  }

  openModal() {
    this.coreService.modalIsOpen = true;
  }

  closeModal() {
    this.coreService.modalIsOpen = false;
    this.response = [];
    this.location = '';
  }

  sortData(sort: Sort) {
    console.log(sort);
    const data = this.tableData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedTableData = data;
      return;
    }
    this.sortedTableData = data.sort((a, b) => {
      console.log(a , b);
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'city': return compare(a.data.location.LocalizedName, b.data.location.LocalizedName, isAsc);
        case 'state': return compare(a.data.location.AdministrativeArea.EnglishName, b.data.location.AdministrativeArea.EnglishName, isAsc);
        case 'country': return compare(a.data.location.Country.EnglishName, b.data.location.Country.EnglishName, isAsc);
        case 'region': return compare(a.data.location.Region.EnglishName, b.data.location.Region.EnglishName, isAsc);
        case 'zip': return compare(a.data.location.PrimaryPostalCode, b.data.location.PrimaryPostalCode, isAsc);
        default: return 0;
      }
    });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
