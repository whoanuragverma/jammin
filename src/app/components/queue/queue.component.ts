import { Component, OnInit } from '@angular/core';
import { DatabseService } from 'src/app/databse.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss'],
})
export class QueueComponent implements OnInit {
  public queue;
  constructor(private db: DatabseService) {}

  async ngOnInit(): Promise<void> {
    (await this.db.getQueue()).subscribe((data) => (this.queue = data));
  }
}
