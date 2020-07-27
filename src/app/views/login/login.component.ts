import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginTokenService} from '../../services/login-token.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Loader, NgxUiLoaderService, SPINNER} from 'ngx-ui-loader';
import {MissionsService} from '../services/missions.service';
import {ProfileService} from '../services/profile.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['login.styles.scss']
})
export class LoginComponent {
  accessToken: string = '';
  username: string = '';
  password: string = '';
  masterLoader: Loader;
  SPINNER: SPINNER.ballScaleMultiple;
  LOGO_URL = 'assets/img/brand/vgas1.png';
  tasks: boolean;
  timers: NodeJS.Timeout;
  usernameChangedVar: boolean = false;
  passwordChangedVar: boolean = false;

  constructor(private http: HttpClient,
              private service: LoginTokenService,
              private serviceM: MissionsService,
              private serviceP: ProfileService,
              private router: Router,
              private toastrService: ToastrService,
              private ngxUiLoaderService: NgxUiLoaderService) {
  }

  ngOnInit() {
    if (localStorage.getItem('accessToken') != null) {
      this.router.navigate([`/dashboard`]);
    }
    this.ngxUiLoaderService.startLoader('loader-01');
    this.timers = setTimeout(() => {
      this.ngxUiLoaderService.stopLoader('loader-01');
    }, 2000);
  }


  testToast() {
    this.ngxUiLoaderService.startBackgroundLoader('loader-01');
    this.timers = setTimeout(() => {
      this.ngxUiLoaderService.stopBackgroundLoader('loader-01');
    }, 1000);
  }

  login() {
    this.ngxUiLoaderService.startBackgroundLoader('loader-01');
    const body = {
      username: this.username,
      password: this.password
    };
    this.service.getToken(body).subscribe(response => {
      this.accessToken = response.data['accessToken'];
      this.service.accessToken = this.accessToken;
      this.serviceM.header.set('Authorization', localStorage.getItem('accessToken'));
      this.serviceP.header.set('Authorization', localStorage.getItem('accessToken'));
      localStorage.setItem('accessToken', this.accessToken);
      this.toastrService.success('Bienvenue', '', {
        timeOut: 2000,
      });
      this.timers = setTimeout(() => {
        this.ngxUiLoaderService.stopBackgroundLoader('loader-01');
        this.router.navigate([`/dashboard`]);
        location.reload();
      }, 1000);
    }, err => {
      this.toastrService.error('Identifiant ou mot de passe incorrect', '', {
        timeOut: 2000,
      });
      this.timers = setTimeout(() => {
        this.ngxUiLoaderService.stopBackgroundLoader('loader-01');
      }, 1000);
    });
  }

  usernameChanged() {
    this.usernameChangedVar = true;
  }

  passwordChanged() {
    this.passwordChangedVar = true;
  }
}
