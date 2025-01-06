import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {

  private apiUrlPrefix = environment.apiUrlPrefix + '/claims';

  constructor(
    private HttpClientObj: HttpClient
  ) { }

  splitFile(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/splitFile', data);
  }

  getIndClaimList(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/getIndClaimList', data);
  }

  exportClaims(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/exportClaims', data);
  }

  exportClaimFile(fileId: any){
    return this.HttpClientObj.post(this.apiUrlPrefix + '/exportClaimFile', {fileId});
  }

  getSingle(_id: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/getSingle', {_id});
  }

  getIndClaimsFilters(){
    return this.HttpClientObj.post(this.apiUrlPrefix + '/getIndClaimsFilters', {});
  }

  findDupsInSingleFile(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix+'/findDupsInSingleFile', data);
  }

  removeDupsInSingleFile(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix+'/removeDupsInSingleFile', data);
  }

  bulkUpload(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix+'/bulkUpload', data);
  }

  addVerifiedBulkImport(patients: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix+'/addVerifiedBulkImport', {patients});
  }

  exportBulkImportResults(patients: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix+'/exportBulkImportResults', {patients});
  }

  getMyFiles(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/getMyFiles', data);
  }

  getSingleFile(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/getSingleFile', data);
  }

  getClients(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/getClients', data);
  }

  assignClient(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/assignClient', data);
  }

  getCpts(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/getCpts', data);
  }

  addCpt(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/addCpt', data);
  }

  saveCptsForFile(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/saveCptsForFile', data);
  }

  claimCounts(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/claimCounts', data);
  }
}
