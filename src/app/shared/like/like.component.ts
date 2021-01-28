import { Component, Input, OnInit } from '@angular/core';
import { DatabseService } from 'src/app/databse.service';

@Component({
  selector: 'like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss'],
})
export class LikeComponent {
  public isLiked: boolean = false;
  liked() {
    this.isLiked = !this.isLiked;
    if (this.isLiked) {
      this.db.addLiked(this.key);
    } else {
      this.db.removeLiked(this.key);
    }
  }
  @Input() key: any;
  constructor(private db: DatabseService) {}

  async ngOnChanges() {
    (await this.db.isLiked(this.key)).subscribe(
      (data) => (this.isLiked = data.exists)
    );
  }
}
