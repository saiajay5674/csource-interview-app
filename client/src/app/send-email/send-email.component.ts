import { Input, Output, EventEmitter, Component, OnInit } from '@angular/core';
import { Company } from '../_models/Company';

@Component({
  selector: 'send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  @Input() company: Company;

  @Output() private onSend = new EventEmitter();
  @Output() private onClose = new EventEmitter();


  public fullScreenState: Boolean = false;

  public addressee: String = '';
  public subject: String = '';
  public body: String = '';


  constructor() { }

  ngOnInit() {
    this.body = `Username: ${this.company.companyUser.username}\nPassword: ${this.company.companyUser.password}`;
  }

  close(): void {
    this.onClose.emit(true);
  }

  sendEmail(): void {
    const data = {
      addressee: this.addressee,
      subject: this.subject,
      body: this.body,
    };
    this.onSend.emit(data);
  }

  fullScreen(state: Boolean): void {
    this.fullScreenState = state;
  }
}
