import {Component, TemplateRef} from '@angular/core';
import {navItems} from '../../_nav';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {ToastrService} from 'ngx-toastr';
import {MissionsService} from '../../views/services/missions.service';
import {Mission} from '../../views/models/mission';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Router} from '@angular/router';
import {LoginTokenService} from '../../services/login-token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  showAppSide: boolean = false;
  timers: NodeJS.Timeout;
  missionFinishedDate: Mission[] = [];
  mission: Mission;
  isopen = true;
  modelRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-lg'
  };

  constructor(private ngxUiLoaderService: NgxUiLoaderService,
              private toastrService: ToastrService,
              private utilsService: MissionsService,
              private service: LoginTokenService,
              private router: Router,
              private modelService: BsModalService) {
  }

  ngOnInit() {
    this.ngxUiLoaderService.startLoader('loader-01');
    this.timers = setTimeout(() => {
      this.ngxUiLoaderService.stopLoader('loader-01');
    }, 1000);
    this.utilsService.getMissionFinnished().subscribe(response => {
      this.missionFinishedDate = response.data;
    });
  }

  toggleMinimize(e) {
    console.log(e);
    this.sidebarMinimized = e;
  }

  getElement() {
    this.utilsService.postMissionFinnished(this.mission.id, true).subscribe(res => {
      this.utilsService.getMissionFinnished().subscribe(response => {
        this.missionFinishedDate = response.data;
      });
      this.toastrService.success('Cette mission est terminé', 'TERMINE', {timeOut: 1000});
    });
  }

  showPop(template: TemplateRef<any>, mission: Mission) {
    this.modelRef = this.modelService.show(template, this.config);
    this.mission = mission;
  }

  showToast(n: number) {

    for (let i = 0; i < this.missionFinishedDate.length; i++) {
      if (this.missionFinishedDate[i].id === n) {
        this.missionFinishedDate.splice(i, 1);
        console.log(this.missionFinishedDate);
      }
    }
    /*let element: HTMLElement = document.getElementById('hola') as HTMLElement;
    console.log(element);
    element.click();*/
  }

  logout() {
    this.toastrService.success('À bientôt', '', {timeOut: 1000});
    localStorage.removeItem('accessToken');
    this.service.accessToken = '';
    this.router.navigate([`/login`]);
  }
}
