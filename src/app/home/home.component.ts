import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainServiceService } from '../main-service.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Company } from '../Model/Company';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {


  title = 'WorkingSpaceManagmentUI';

  listOfSubscriptions: Subscription[] = [];
  companies: Company[] = [];
  selectedCompany: Company;
  selectedCompanyId: any;
  selectedCompanyName: string;

  constructor(private mainSrv: MainServiceService) { }


  ngOnInit(): void {
   this.listOfSubscriptions.push(
      this.mainSrv.getCompanies()
      .subscribe((res: Company[]) => {
        this.companies = res;
      })
    );
 }


 valueChanged(val){
   this.selectedCompany = this.companies.find(c => c.Id == val);
   this.selectedCompanyName = this.selectedCompany.companyName;
   this.mainSrv.companySelected$.next(this.selectedCompany);
 }

 ngOnDestroy(): void {
  this.listOfSubscriptions.forEach((sub) => sub.unsubscribe());
}

}
