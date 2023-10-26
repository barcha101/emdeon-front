import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BotsService } from 'src/app/shared/services/bots.service';
import { SnackBarService } from '../../shared/services/snack-bar.service';

@Component({
  selector: 'emdeon-update-bot',
  templateUrl: './update-bot.component.html',
  styleUrls: ['./update-bot.component.scss']
})
export class UpdateBotComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UpdateBotComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private botsService:BotsService,
    private snackBarService: SnackBarService
  ) {
    this.what = this.data.what;
  }
  public what: any = '';
  public bot: any = {};

  ngOnInit(): void {
    if(this.what == 'add'){
      this.bot = {
        username: '',
        password: ''
      };
    } else if(this.what == 'update' && this.data.botInfo){
      this.bot = this.data.botInfo;
    }
  }

  submit(){
    if(this.what == 'add'){
      this.botsService.add(this.bot).subscribe(user=>{
        this.dialogRef.close(true);
      })
    } else if(this.what == 'update'){
      this.botsService.update(this.bot).subscribe(user=>{
        this.dialogRef.close(true);
      })
    }
  }

  close(){
    this.dialogRef.close(false);
  }

}
