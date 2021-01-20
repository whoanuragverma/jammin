import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DatabseService } from 'src/app/databse.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidenavComponent implements OnInit {
  constructor(public db: DatabseService) {}
  public myPlaylist: any;
  async ngOnInit() {
    this.myPlaylist = (await this.db.getPlaylist()).pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }
}
