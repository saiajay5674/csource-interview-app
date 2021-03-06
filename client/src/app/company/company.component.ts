import { Component, Input, OnInit, Output } from "@angular/core";
import { Company } from "../_models/Company";
import { CreateCompanyComponent } from "../create-company/create-company.component";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { CompanyService } from "../_services/company.service";
import { NotificationService } from "../_services/notification.service";
import { ManageCompaniesComponent } from "../manage-companies/manage-companies.component";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: "company-component",
  templateUrl: "./company.component.html",
  styleUrls: ["./company.component.css"],
})
export class CompanyComponent implements OnInit {
  @Input() company: Company;

  mailTo: string;

  public displaySendEmailState: Boolean = false;

  constructor(
    private companyService: CompanyService,
    private notificationService: NotificationService,
    private manageCompanies: ManageCompaniesComponent,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.mailTo = this.getMailTo();
  }

  getMailTo(): string {
    const { username, password } = this.company.companyUser;
    const str = `mailto:?&subject=This is your username and password for VT career fair &body=Username%3A%20${username}%20%0D%0APassword%3A%20${password}`;
    return str;
  }

  copyToClip() {
    const selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = `Username: ${this.company.companyUser.username}\nPassword: ${this.company.companyUser.password}`;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
  }

  delete() {
    this.openDialog();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      companyName: this.company.name,
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.companyService.deleteCompany(this.company).subscribe((result) => {
          this.notificationService.showNotif(
            this.company.name + " is deleted",
            "DELETE"
          );
          this.manageCompanies.loadCompanies();
        });
      } else {
      }
    });
  }

  displaySendEmail(): void {
    this.displaySendEmailState = !this.displaySendEmailState;
  }

  handlerClose(): void {
    this.displaySendEmailState = false;
  }

  handlSendEmail(args): void {
    console.log(args);
    this.handlerClose();
  }
}
