import {Component, OnInit, Input} from '@angular/core';
import {User} from '../shared/user.model';
import {UserService} from '../shared/user.service';
import {Observable} from 'rxjs/Observable';
import {SessionService} from '../../core/firebase/session.service';
import {MdSnackBar} from '@angular/material';
import {MdDialog} from '@angular/material';
import {Router} from '@angular/router';
import {Post} from '../../post/shared/post.model';
import {SubmitDialogComponent} from '../../shared/submit-dialog/submit-dialog.component';
import {DialogService} from "../../shared/dialog.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() user: User = null;
  posts: Post[] = [];
  loggedIn: Observable<boolean> = null;

  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private snackbar: MdSnackBar,
    private dialogService: DialogService,
    private router: Router) { }

  ngOnInit() {
    this.loggedIn = this.sessionService.watchLoggedIn();
  }

  onDelete(obj: User) {
    const dialogRef = this.dialogService.confirmDelete(obj.name).subscribe(dialogResult => {
    if (dialogResult) {
        this.userService.delete(obj).subscribe(
          result => this.snackbar.open('User deleted', null, {duration: 5000}),
          error => this.snackbar.open(error.message, null, {duration: 5000})
        );
      }
    });
  }

  onEdit(obj: User) {
    this.router.navigate(['/user', obj['$key']]);
  }

}
