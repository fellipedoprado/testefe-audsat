import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { filterUsers, loadPosts, loadUsers } from '../../reducers/state.actions';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../../core/interfaces/user';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';
import { State } from '../../reducers';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FilterBy } from '../../core/interfaces/filter';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.scss'
})
export class ListingsComponent implements OnInit, AfterViewInit {
  private store = inject(Store);
  state$?: Observable<State>

  displayedColumns: string[] = ['name', 'username', 'email', 'telephone', 'openPosts'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filterBy: FilterBy[] = [];
  name = new FormControl('');
  username = new FormControl('');
  email = new FormControl('');
  phone = new FormControl('');

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.state$ = this.store.select('state');
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
    this.stateSubscription();
    this.nameSubscription();
    this.usernameSubscription();
    this.emailSubscription();
    this.phoneSubscription();
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
  }

  private stateSubscription(): void {
    this.state$?.subscribe(res => {
      this.dataSource = new MatTableDataSource<User>(res.users);
      this.dataSource.paginator = this.paginator;
    })
  }

  private nameSubscription(): void {
    this.name.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(value => {
      this.updateSearchValue('name', value);
    });
  }

  private usernameSubscription(): void {
    this.username.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(value => {
      this.updateSearchValue('username', value);
    });
  }

  private emailSubscription(): void {
    this.email.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(value => {
      this.updateSearchValue('email', value);
    });
  }

  private phoneSubscription(): void {
    this.phone.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(value => {
      this.updateSearchValue('phone', value);
    });
  }

  private updateSearchValue(key: string, value: string | null): void {
    console.log(key)
    console.log(value)
    this.filterBy = this.filterBy.filter(val => {
      return val.fieldName !== key;
    });

    if (value !== null && value.length > 0) {
      this.filterBy.push({
        fieldName: key,
        searchValue: value
      })
    }
    /* if (value === null) {
      console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
    } else {
      console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
      if (this.filterBy.length === 0) {

      } else {
        this.filterBy.forEach((filter, index) => {
          if (filter.fieldName === key) {
            console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB')
  
            this.filterBy[index].searchValue = value;
          } else {
            console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC')
  
            this.filterBy.push({
              fieldName: key,
              searchValue: value
            })
          }
        });
      }
    } */

    console.log(this.filterBy);
    this.store.dispatch(filterUsers({ filters: this.filterBy }));
  }

  openPosts(user: User): void {
    this.store.dispatch(loadPosts({ userId: user.id }));
    this.router.navigate(['post-history', user.id], { relativeTo: this.route });
  }
}
