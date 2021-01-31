import { Component, Input, OnInit } from '@angular/core';
import { DatabseService } from 'src/app/databse.service';

@Component({
  selector: 'like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss'],
})
export class LikeComponent {
  public isLiked: boolean = false;
  @Input() key: any;
  liked() {
    this.isLiked = !this.isLiked;
    if (this.isLiked) {
      this.db.addLiked(this.key);
    } else {
      this.db.removeLiked(this.key);
    }
  }

  constructor(private db: DatabseService) {}

  async ngOnChanges(): Promise<void> {
    (await this.db.isLiked(this.key)).subscribe(
      (data) => (this.isLiked = data.exists)
    );
    (await this.db.getLiked()).subscribe((data) => {
      this.isLiked = false;
      data.forEach((el) => {
        if (this.key['media']['low'] == el['media']['low']) this.isLiked = true;
      });
    });
  }
}
