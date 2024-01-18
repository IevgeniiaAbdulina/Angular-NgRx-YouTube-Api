import { Component, Input } from '@angular/core';
import { VideoItem } from 'src/app/shared/models/video-list-response';

@Component({
  selector: 'app-item-statistics',
  templateUrl: './item-statistics.component.html',
  styleUrls: ['./item-statistics.component.scss']
})
export class ItemStatisticsComponent {
  @Input() videoItem?: VideoItem;
}
