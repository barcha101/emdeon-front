import { Component, OnInit } from '@angular/core';
import { ClaimsService } from '../../shared/services/claims.service';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { HelperService } from '../../shared/services/helper.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all-ind-claims',
  templateUrl: './all-ind-claims.component.html',
  styleUrls: ['./all-ind-claims.component.scss']
})
export class AllIndClaimsComponent implements OnInit {

  public list: any = [];
  public totalCount = 0;
  public perPage = 10;
  public pageNum = 1;

  public filterSearch = '';
  public filterClient: any = '';
  public filterDosStart: any = '';
  public filterDosEnd: any = '';
  public filterClaimStatusCode: any = '';
  public filterGroupReason: any = '';
  public filterCptCode: any = '';
  public filterIcdCode: any = '';
  public filterCheckNum: any = '';
  public filterCheckDateStart: any = '';
  public filterCheckDateEnd: any = '';
  public filterInsurance: any = '';
  public filterEmdStatus: any = '';
  public filterPaymentStatus: any = '';
  public filterEraAvailable: any = '';
  public filterHasAdjustCodes: any = '';


  public clientList: any = [];
  public claimStatusCodeList: any = [];
  public groupReasonList: any = [];
  public cptCodeList: any = [];
  public icdCodeList: any = [];
  public statusList: any = [];
  

  constructor(
    private claimsService: ClaimsService,
    private snackBarService: SnackBarService,
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.getIndClaimList();
    this.getClientList();
    this.getIndClaimsFilters();
  }

  getIndClaimsFilters(){
    this.claimsService.getIndClaimsFilters().subscribe((d: any) => {
      this.claimStatusCodeList = d['claimStatuses'];
      this.groupReasonList = d['adjustmentCodes'];
      this.cptCodeList = d['cptCodes'];
      this.icdCodeList = d['icds'];
      this.statusList = d['statuses'];
    });
  }

  getClientList(){
    this.claimsService.getClients({}).subscribe((d: any) => {
      this.clientList = d['clients'];
    });
  }

  perPageUpdated(perPage: any){
    this.perPage = parseInt(perPage);
    this.filterUpdated();
  }

  filterUpdated(){
    this.pageNum = 1;
    this.getIndClaimList();
  }

  getIndClaimList(){
    this.claimsService.getIndClaimList({
      query: {
        filterSearch: this.filterSearch,
        filterClient: this.filterClient,
        filterDosStart: this.filterDosStart,
        filterDosEnd: this.filterDosEnd,
        filterClaimStatusCode: this.filterClaimStatusCode,
        filterGroupReason: this.filterGroupReason,
        filterCptCode: this.filterCptCode,
        filterIcdCode: this.filterIcdCode,
        filterCheckNum: this.filterCheckNum,
        filterCheckDateStart: this.filterCheckDateStart,
        filterCheckDateEnd: this.filterCheckDateEnd,
        filterInsurance: this.filterInsurance,
        filterEmdStatus: this.filterEmdStatus,
        filterPaymentStatus: this.filterPaymentStatus,
        filterEraAvailable: this.filterEraAvailable,
        filterHasAdjustCodes: this.filterHasAdjustCodes
      },
      pagination: {
        perPage: this.perPage,
        pageNum: this.pageNum
      }
    }).subscribe((d: any) => {
      this.list = d.list;
      this.totalCount = d.count;
    });
  }

  exportReport(patient: any){
    if(!patient.reportS3Link){
      this.snackBarService.errorMessage('Report not generated for this patient yet');
      return;
    } else {
      this.helperService.getS3File(patient.reportS3Link).subscribe(d=> {
        this.helperService.downloadBlobFile(d, patient.fName+' '+patient.lName+'.pdf');
      });
    }
  }

  pageChanged(pageNum: any){
    this.pageNum = pageNum;
    this.getIndClaimList();
  }

  exportPatients(){
    this.claimsService.exportClaims({
      query: {
        filterSearch: this.filterSearch,
        filterClient: this.filterClient,
        filterDosStart: this.filterDosStart,
        filterDosEnd: this.filterDosEnd,
        filterClaimStatusCode: this.filterClaimStatusCode,
        filterGroupReason: this.filterGroupReason,
        filterCptCode: this.filterCptCode,
        filterIcdCode: this.filterIcdCode,
        filterCheckNum: this.filterCheckNum,
        filterCheckDateStart: this.filterCheckDateStart,
        filterCheckDateEnd: this.filterCheckDateEnd,
        filterInsurance: this.filterInsurance,
        filterEmdStatus: this.filterEmdStatus,
        filterPaymentStatus: this.filterPaymentStatus,
        filterEraAvailable: this.filterEraAvailable
      }}).subscribe((d: any) => {
      this.snackBarService.downloadFileWithUrl('Emdeon Claim Export.xlsx', 'application/vnd.ms-excel', environment.apiUrlPrefix + '/' + d['fileUrl']);
    });
  }

}
