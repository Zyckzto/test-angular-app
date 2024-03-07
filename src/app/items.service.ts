import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import * as httpClient from './fakeHTTPClient';

export type Item = {
  id: string;
  name: string;
  subItems?: SubItem[];
};

export type SubItem = {
  id: string;
  name: string;
};

const items: Item[] = Array.from({ length: 5 }, (_, itemIndex) => ({
  id: `id-${itemIndex + 1}`,
  name: `Item ${itemIndex + 1}`,
  subItems: Array.from({ length: 5 }, (_, subItemIndex) => ({
    id: `id-${itemIndex + 1}-${subItemIndex + 1}`,
    name: `Subitem ${itemIndex + 1} ${subItemIndex + 1}`,
  })),
}));

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor() {}

  getItems(): Observable<Item[]> {
    return httpClient.get(items);
  }

  getSubItems(itemId: string): Observable<SubItem[]> {
    return httpClient.get(
      // find subitems
      items.find(({id}) => id === itemId)?.subItems || []
    );
  }
}
