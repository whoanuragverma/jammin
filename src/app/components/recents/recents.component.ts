import { Component, OnInit } from '@angular/core';
import { DatabseService } from 'src/app/databse.service';

@Component({
  selector: 'recents',
  templateUrl: './recents.component.html',
  styleUrls: ['./recents.component.scss'],
})
export class RecentsComponent implements OnInit {
  public recentSong: any;
  constructor(private db: DatabseService) {}

  async ngOnInit(): Promise<void> {
    (await this.db.getRecent()).subscribe((data) => (this.recentSong = data));
  }
}
