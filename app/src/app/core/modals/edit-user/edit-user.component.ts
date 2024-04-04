import { Component, OnInit } from '@angular/core';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private uiService: UiService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.uiService.$modalSwitch.emit(false);
  }

}
