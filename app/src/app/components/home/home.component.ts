import { Component, OnInit } from '@angular/core';
import { ItemModel } from 'src/app/core/models/item.model';
import { ItemService } from 'src/app/core/services/item.service';
import { UiService } from '../../core/services/ui.service';
@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  List: ItemModel[];
  loading: boolean;
  error: boolean;
  errorMessage: string;
  name: string;

  modalSwitch: boolean;

  constructor(private itemService: ItemService,
              private uiService: UiService) {
      if (localStorage.getItem('name')) {
        this.name = localStorage.getItem('name');
      } else {
        this.name = '';
      }
      this.loading = true;
      this.error = false;
      // this.itemService.getAll().subscribe((data: any) => {
      //   if (data) {
      //     //console.log(JSON.stringify(data));
      //     const statusCode = data['statusCode'];
      //     if (statusCode === 200) {
      //       //console.log(JSON.stringify(data['data']));
      //       this.List = data['data'];
      //       this.loading = false;
      //     } else {
      //       this.loading = false;
      //       this.error = true;
      //       this.errorMessage = data['error'];
      //     }
      //   }
      //   this.loading = false;
      // }, (errorResonse) => {
      //   this.loading = false;
      //   this.error = true;
      //   // tslint:disable-next-line: quotemark
      //   this.errorMessage = errorResonse["message"];
      //   //console.log(`errorResonse = ${JSON.stringify(errorResonse)}`);
      // });
      this.loading = false;
     }

  ngOnInit() {
    this.uiService.$modalSwitch.subscribe((value) => this.modalSwitch = value);
  }

  openModal() {
    this.modalSwitch = true;
  }

  closeModal() {
    this.modalSwitch = false;
  }

}
