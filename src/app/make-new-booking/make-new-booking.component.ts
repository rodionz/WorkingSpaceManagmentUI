import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, Validators, NumberValueAccessor } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MainServiceService } from '../main-service.service';
import { Company } from '../Model/Company';



@Component({
  selector: 'app-make-new-booking',
  templateUrl: './make-new-booking.component.html',
  styleUrls: ['./make-new-booking.component.css']
})
export class MakeNewBookingComponent implements OnInit, OnDestroy {

  constructor(private mainSrv: MainServiceService) { }

  listOfSubscriptions: Subscription[] = [];
  company: Company;
  dataSource: any[];
  displayedColumns: string[] = ['workStationId', 'companyName'];
  selectedRowIndex: number = -1;

  datesForm: FormGroup = new FormGroup({
    datefrom: new FormControl('', Validators.required),
    dateTo: new FormControl('', Validators.required),
  })
  _
  ngOnInit(): void {

      this.mainSrv.companySelected$
        .subscribe(res => {
          this.company = res;
          console.log(this.company);
        }

        )
  }

  onFormSubmit() {
    console.table(this.datesForm);

    let dateFrom = this.datesForm.controls["datefrom"].value;
    let dateTo = this.datesForm.controls["dateTo"].value;

    this.listOfSubscriptions.push(
      this.mainSrv.getAvaliableWorkStations(this.company.Id, dateFrom, dateTo)
        .subscribe((res: any[])=>{
          this.dataSource = res;
        })
    )
  }

  highlight(row){
    this.selectedRowIndex = row.id;
  }

  makeBooking(){
    let dateFrom = this.datesForm.controls["datefrom"].value;
    let dateTo = this.datesForm.controls["dateTo"].value;
    let workStationId = this.dataSource[this.selectedRowIndex]["workStationId"]
    this.mainSrv.MakeBooking(this.company.Id, dateFrom, dateTo, workStationId)
    .subscribe()
  }

  ngOnDestroy(): void {
    this.listOfSubscriptions.forEach((sub) => sub.unsubscribe());
  }

}
