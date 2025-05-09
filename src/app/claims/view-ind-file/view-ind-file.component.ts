import { Component, OnInit } from '@angular/core';
import { ClaimsService } from './../../shared/services/claims.service';
import { SnackBarService } from './../../shared/services/snack-bar.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-ind-file',
  templateUrl: './view-ind-file.component.html',
  styleUrls: ['./view-ind-file.component.scss']
})
export class ViewIndFileComponent implements OnInit {

  constructor(
    private claimsService: ClaimsService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBarService: SnackBarService
  ) { }

  public fileId: any = null;
  public fileDetails: any = {};
  public totalPatients: any = null;
  public clients: any = [];

  public selectedClient: any = '';

  public minPerDay: any = 50;
  public maxPerDay: any = 100;
  public startDate: any = null;
  public assignTable: any = [];

  public minPerFile: any = 50;
  public maxPerFile: any = 100;

  public remainingInTable = 0;

  public savingCptsWithDos = false;

  public dupButtonText = 'Assign client to check duplicates';

  public days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  public selectedDayIndex: any = null;
  public cptsList: any = [];
  public overallCpts: any = [];
  public isAddingOverallCpts = false;

  public holidays = ['08/05/2023','08/06/2023','08/12/2023','08/13/2023','08/16/2023','08/19/2023','08/20/2023','08/26/2023','08/27/2023','09/02/2013','09/03/2023','09/04/2023','09/09/2023','09/10/2023','09/11/2023','09/16/2023','09/17/2023','09/23/2023','09/24/2023','09/30/2023','10/01/2023','10/07/2023','10/08/2023','10/14/2023','10/15/2023','10/21/2023','10/22/2023','10/28/2023','10/29/2023','11/04/2023','11/05/2023','11/10/2023','11/11/2023','11/12/2023','11/18/2023','11/19/2023','11/23/2023','11/24/2023','11/25/2023','11/26/2023','12/02/2023','12/03/2023','12/09/2023','12/10/2023','12/16/2023','12/17/2023','12/23/2023','12/24/2023','12/25/2023','12/26/2023','12/30/2023','12/31/2023','01/01/2024','01/02/2024','01/06/2024','01/07/2024','01/13/2024','01/14/2024','01/15/2024','01/20/2024','01/21/2024','01/27/2024','01/28/2024','02/03/2024','02/04/2024','02/10/2024','02/11/2024','02/17/2024','02/18/2024','02/19/2024','02/24/2024','02/25/2024','03/02/2024','03/03/2024','03/09/2024','03/10/2024','03/16/2024','03/17/2024','03/23/2024','03/24/2024','03/30/2024','03/31/2024'];

  public listAllClaims: any = [];
  public filterSearchAllClaims: any = '';
  public filterEmdStatusAllClaims: any = '';
  public totalCountAllClaims: any = 0;
  public perPageAllClaims: any = 10;
  public pageNumAllClaims: any = 1;
  public statusListAllClaimsOpts: any = ['Claim Added', 'Error', 'Ready To Submit', 'Pending Verification'];

  
  ngOnInit(): void {
    this.fileId = this.route.snapshot.paramMap.get('id');
    this.startDate = new Date();
    this.startDate = this.formatDate(this.startDate);
    this.getFileDetails();
  }

  getFileDetails(){
    this.claimsService.getSingleFile({fileId: this.fileId}).subscribe((data: any) => {
      this.fileDetails = data;
      this.totalPatients = 0;
      for(const status of this.fileDetails.patientStatuses){
        this.totalPatients+= status.total;
      }
      this.getIndClaimList();
      if(this.fileDetails.file && this.fileDetails.file.client && this.fileDetails.file.client._id){
        this.getCpts();
        this.findDupsInSingleFile();
      } else {
        this.getClients();
      }
    })
  }

  findDupsInSingleFile(){
    this.dupButtonText = 'Looking for duplicates ...';
    this.claimsService.findDupsInSingleFile({fileId: this.fileId, clientId: this.fileDetails.file.client._id}).subscribe((data: any) => {
      if(data['dups']){
        this.dupButtonText = data['dups']+' duplicates found, Click to remove';
      } else {
        this.dupButtonText = 'No duplicates found';
      }
    })
  }

  splitFile(){
    if(!this.minPerFile || !this.maxPerFile){
      return this.snackBarService.errorMessage('Kindly enter min and max claims per file');
    }
    if(this.minPerFile > this.totalPatients){
      return this.snackBarService.errorMessage('Min per file cannot be greater than total patients');
    }
    this.claimsService.splitFile({fileId: this.fileId, minPerFile: this.minPerFile, maxPerFile: this.maxPerFile}).subscribe((data: any) => {
      this.router.navigate(['/claims']);
    });
  }

  removeDupsInSingleFile(){
    if(this.dupButtonText.indexOf('Click to remove') >= 0){
      this.claimsService.removeDupsInSingleFile({fileId: this.fileId, clientId: this.fileDetails.file.client._id}).subscribe((data: any) => {
        this.ngOnInit();
      })
    }
  }

  getCpts(){
    this.claimsService.getCpts({clientId: this.fileDetails.file.client._id}).subscribe((data: any) => {
      this.cptsList = data['cpts'];
    })
  }

  getClients(){
    this.claimsService.getClients({}).subscribe((data: any) => {
      this.clients = data['clients'];
    })
  }

  assignClient(){
    if(!this.selectedClient){
      return this.snackBarService.errorMessage('Kindly select the client first');
    }
    this.claimsService.assignClient({fileId: this.fileId, clientId: this.selectedClient}).subscribe(ignore => {
      this.ngOnInit();
    });
  }

  dividePatients(){
    this.assignTable = [];
    let remaining = this.totalPatients;
    let datee = null;
    while(remaining > 0){
      let rand = Math.floor(Math.random() * (this.maxPerDay - this.minPerDay + 1)) + this.minPerDay;
      if(rand == 0){
        rand = 1;
      }
      if(rand > remaining){
        rand = remaining
      }
      datee = this.nextDate(datee);
      this.assignTable.push({
        date: this.formatDate(datee),
        day: this.days[datee.getDay()],
        patients: rand,
        cpts: []
      });
      remaining = remaining - rand;
    }
  }

  nextDate(curDate: any = null){
    if(curDate == null){
        curDate = this.parseDate(this.startDate)
    } else {
        curDate.setHours(curDate.getHours() + 24);
    }
    var dayName = this.days[curDate.getDay()];
    let formattedDate = this.formatDate(curDate);
    while(dayName == 'Sunday' || dayName == 'Saturday' || this.holidays.indexOf(formattedDate) >= 0){
        curDate.setHours(curDate.getHours() + 24);
        dayName = this.days[curDate.getDay()];
        formattedDate = this.formatDate(curDate);
    }
    return curDate;
  }

  formatDate(date: any) {
    let day = date.getDate().toString().padStart(2, '0'); // Get the day and pad with zero if necessary
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get the month, add 1 (since months start at 0), and pad with zero
    let year = date.getFullYear(); // Get the full year
    return `${month}/${day}/${year}`; // Format and return the date
  }

  parseDate(dateStr: any) {
      // Split the date string by the slash (/) to extract day, month, and year components
      const parts = dateStr.split('/');

      // Adjust month value (-1) because months are 0-based in JavaScript
      const month = parseInt(parts[0], 10) - 1;
      const day = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);

      // Create a new Date object using the extracted parts
      return new Date(year, month, day);
  }

  addTableDay(){
    this.assignTable.push({
      date: '',
      day: '',
      patients: 0,
      cpts: []
    });
  }

  addEmptyCpt(){
    this.assignTable[this.selectedDayIndex].cpts.push({
      code: '',
      quantity: 1,
      icd: '',
      amount: '',
      modifier: ''
    })
  }

  adjustDaysAndCounts(){
    let isError = false;
    this.remainingInTable = this.totalPatients;
    for(let i=0 ; i<this.assignTable.length ; i++){
      if(isNaN(new Date(this.assignTable[i].date).getTime()) && this.assignTable[i].date != 'Dos Already Added'){
        this.snackBarService.errorMessage('Enter a valid date');
        isError = true;
      } else {
        this.assignTable[i].day = this.days[new Date(this.assignTable[i].date).getDay()];
      }
      if(!this.assignTable[i].patients){
        this.snackBarService.errorMessage('Number of claims cant be 0');
        isError = true;
      } else {
        this.remainingInTable -= this.assignTable[i].patients;
      }
    }
    if(this.remainingInTable != 0){
      this.snackBarService.errorMessage('Remaining patients should be 0');
      isError = true;
    }
    return isError;
  }

  sortDateWise(){
    this.assignTable.sort((a: any,b: any) => {
      return a.date > b.date;
    });
  }

  cptUpdated(index: any){
    let selectedCpt = this.assignTable[this.selectedDayIndex].cpts[index].code;
    for(const cpt of this.cptsList){
      if(selectedCpt == cpt.cptCode){
        this.assignTable[this.selectedDayIndex].cpts[index].amount = cpt.price;
      }
    }
  }

  cptUpdatedOverall(index: any){
    let selectedCpt = this.overallCpts[index].code;
    for(const cpt of this.cptsList){
      if(selectedCpt == cpt.cptCode){
        this.overallCpts[index].amount = cpt.price;
      }
    }
  }

  saveIndCpts(){
    for(const cpt of this.assignTable[this.selectedDayIndex].cpts){
      if(!cpt.code){
        return this.snackBarService.errorMessage('Select a cpt code');
      }
      if(!cpt.icd){
        return this.snackBarService.errorMessage('Select a icd code');
      }
      if(!cpt.amount){
        return this.snackBarService.errorMessage('Amount cannot be empty');
      }
      if(!cpt.quantity){
        return this.snackBarService.errorMessage('Qty cannot be empty');
      }
    }
    this.selectedDayIndex = null;
  }

  saveOverallCpts(){
    for(const cpt of this.overallCpts){
      if(!cpt.code){
        return this.snackBarService.errorMessage('Select a cpt code');
      }
      if(!cpt.icd){
        return this.snackBarService.errorMessage('Select a icd code');
      }
      if(!cpt.amount){
        return this.snackBarService.errorMessage('Amount cannot be empty');
      }
      if(!cpt.quantity){
        return this.snackBarService.errorMessage('Qty cannot be empty');
      }
    }
    for(let i=0 ; i<this.assignTable.length ; i++){
      this.assignTable[i].cpts = JSON.parse(JSON.stringify(this.overallCpts))
    }
    console.log(this.assignTable);
    this.isAddingOverallCpts = false;
  }

  saveCptsWithDos(){
    this.savingCptsWithDos = true;
    this.assignTable.push({
      date: 'Dos Already Added',
      day: 'Dos Already Added',
      patients: this.totalPatients,
      cpts: []
    });
  }

  saveEverything(){
    let error = this.adjustDaysAndCounts();
    if(error){
      return;
    }
    for(let i=0 ; i<this.assignTable.length ; i++){
      if(!this.assignTable[i].cpts || !this.assignTable[i].cpts.length){
        return this.snackBarService.errorMessage('Add cpts for '+this.assignTable[i].date);
      }
      for(const cpt of this.assignTable[i].cpts){
        if(!cpt.code){
          return this.snackBarService.errorMessage('Select a cpt code');
        }
        if(!cpt.icd){
          return this.snackBarService.errorMessage('Select a icd code');
        }
        if(!cpt.amount){
          return this.snackBarService.errorMessage('Amount cannot be empty');
        }
        if(!cpt.quantity){
          return this.snackBarService.errorMessage('Qty cannot be empty');
        }
      }
    }
    this.claimsService.saveCptsForFile({fileId: this.fileId, assignTable: this.assignTable}).subscribe(ignore => {
      this.ngOnInit();
    })
  }

  getIndClaimList() {
    this.claimsService.getIndClaimList({
      query: {
        filterSearch: this.filterSearchAllClaims,
        filterFileId: this.fileDetails.file._id,
        filterEmdStatus: this.filterEmdStatusAllClaims
      },
      pagination: {
        perPage: this.perPageAllClaims,
        pageNum: this.pageNumAllClaims
      }
    }).subscribe((d: any) => {
      this.listAllClaims = d.list;
      this.totalCountAllClaims = d.count;
    });
  }

}
