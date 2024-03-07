import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../user.service';
import { Observable, forkJoin } from 'rxjs';
import { Item, ItemsService, SubItem } from '../items.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  user$: Observable<User>;
  items$: Observable<Item[]>;
  subItems$: Observable<SubItem[] | undefined>;

  constructor(
    private userService: UserService,
    private itemsService: ItemsService,
  ) {}

  ngOnInit(): void {
    this.user$ = this.userService.getUser();
    // items depende de users, si es admin, muestra sub items, si no, no los muestra
    this.items$ = forkJoin(
      [this.user$, this.itemsService.getItems()]
    ).pipe(
      map(([user, items]) => {
        return items.map(({ subItems, ...item }) =>  user.admin ? {...item, subItems} : item);
      })
    );
    this.subItems$ = this.getSubItems$();
  }

  onChange(event: Event): void {
    const itemId = (event.target as HTMLSelectElement).value;
    this.subItems$ = this.getSubItems$(itemId);
  }

  getSubItems$(itemId?: string) {
    return this.items$.pipe(
      map(items => (items.find(({id}) => itemId === id ) || items[0]).subItems)
    );
  }

}
