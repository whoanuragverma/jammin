import { Component, OnInit } from '@angular/core';
import { DatabseService } from 'src/app/databse.service';

@Component({
  selector: 'liked',
  templateUrl: './liked.component.html',
  styleUrls: ['./liked.component.scss'],
})
export class LikedComponent implements OnInit {
  public likedSong: any;
  constructor(private db: DatabseService) {}

  async ngOnInit(): Promise<void> {
    (await this.db.getLiked()).subscribe((data) => (this.likedSong = data));
  }
}
