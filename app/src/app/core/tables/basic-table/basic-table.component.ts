import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Router } from '@angular/router';
import { GenericTableModel } from '../../models/table-model';

@Component({
  selector: 'app-basic-table',
  templateUrl: './basic-table.component.html',
  styleUrls: ['./basic-table.component.css']
})
export class BasicTableComponent implements OnInit {
  @Input() ContentTb: GenericTableModel;

  headsTb: string[];

  constructor(private itemService: ItemService,
              private router: Router) {
                this.ContentTb = new GenericTableModel();
                this.ContentTb.heads = [];
              }

  ngOnInit(): void {
    this.headsTb = this.ContentTb.heads;
  }

  // onDelete(itemNumber: string, i: number) {
  //   this.loading = true;
  //   this.error = false;
  //   this.itemService.delete(itemNumber).subscribe((data: any) => {
  //     if (data) {
  //       //console.log(JSON.stringify(data));
  //       const statusCode = data['statusCode'];
  //       if (statusCode === 200) {
  //         this.List.splice(i, 1);
  //         this.loading = false;
  //       } else {
  //         this.loading = false;
  //         this.error = true;
  //         this.errorMessage = data['error'];
  //       }
  //     }
  //   }, (errorResonse) => {
  //     //console.log(JSON.stringify(errorResonse));
  //     this.loading = false;
  //     this.error = true;
  //     // tslint:disable-next-line: quotemark
  //     this.errorMessage = errorResonse["message"];
  //   });
  // }
}
