import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private apiUrlPrefix = environment.apiUrlPrefix + '/app';

  constructor(
    private HttpClientObj: HttpClient
  ) { }

  bulkUpload(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix+'/bulkUpload', data);
  }

  getUploadedFileStats() {
    return this.HttpClientObj.post(this.apiUrlPrefix+'/getUploadedFileStats', {});
  }

  addVerifiedBulkImport(patients: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix+'/addVerifiedBulkImport', {patients});
  }

  exportBulkImportResults(patients: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix+'/exportBulkImportResults', {patients});
  }

  list(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/list', data);
  }

  bulkUpdateStatus(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/bulkUpdateStatus', data);
  }

  listForDoctorFinance(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/listForDoctorFinance', data);
  }

  getSingle(_id: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/getSingle', {_id});
  }

  update(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/update', data);
  }

  add(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/add', data);
  }

  getFiles(patientId: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/getFiles', {patientId});
  }

  uploadFiles(patientId: any, files: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/uploadFiles', {patientId, files});
  }

  addAppointment(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/addAppointment', data);
  }

  markComplete(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/markComplete', data);
  }

  reconciled(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/reconciled', data);
  }

  export(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/export', data);
  }

  getMyFiles(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/getMyFiles', data);
  }
}
