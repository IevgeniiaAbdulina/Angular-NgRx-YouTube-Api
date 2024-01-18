import { Component, Input } from '@angular/core';
import { VideoItem } from 'src/app/shared/models/video-list-response';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() videoItem?: VideoItem;
  @Input() isFavorite?: boolean;
}
