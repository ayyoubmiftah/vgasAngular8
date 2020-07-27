import {Injectable} from '@angular/core';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {takeUntil} from 'rxjs/operators/takeUntil';
import {tap} from 'rxjs/operators/tap';
import {TranslateService} from '@ngx-translate/core';
import {Subject} from 'rxjs/Subject';
import * as moment from 'moment';
import * as _ from 'underscore';
import swal from 'sweetalert2';
import {Validators} from '@angular/forms';
import {AuthHelper} from '../../core/services/security/auth.helper';
import {NgxPermissionsService, NgxRolesService} from 'ngx-permissions';
import {DataService} from '../../shared/services/data.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class CommonService {
  onDestroy$ = new Subject<void>();
  contributionDeadline: any;

  constructor(private translate: TranslateService,
              private permissionsService: NgxPermissionsService,
              private dataService: DataService,
              private rolesService: NgxRolesService) {
  }




  public initMultiSelect(text?, enableSearchFilter?, groupBy?, badgeShowLimit?, disabled?, searchPlaceholderText?, selectAllText?,
                         unSelectAllText?, classes?) {
    return {
      text: text || 'Sélectionner une valeur',
      enableSearchFilter: enableSearchFilter || true,
      badgeShowLimit: badgeShowLimit,
      disabled: disabled || false,
      selectAllText: selectAllText || 'Sélectionner tout',
      unSelectAllText: unSelectAllText || 'Tout déselectionner',
      classes: classes || 'myclass custom-class',
      searchPlaceholderText: searchPlaceholderText || 'Rechercher',
      groupBy: groupBy,
      noDataLabel: 'Pas de données disponibles'
    };
  }

  public getFiled(fields, key): FormlyFieldConfig {
    let match = null;
    if (!fields) {
      return;
    }
    for (let i = 0; i < fields.length; i++) {
      match = _.findWhere(_.toArray(fields[i]), {key});
      if (match) {
        break;
      } else {
        match = _.findWhere(fields[i].fieldGroup, {key});
        if (match) {
          break;
        }
      }
    }
    return match;
  }

  public setSettings(text?, enableSearchFilter?, groupBy?, badgeShowLimit?, disabled?, searchPlaceholderText?, selectAllText?,
                     unSelectAllText?, classes?) {
    return {
      text: text || 'Sélectionner une valeur',
      enableSearchFilter: enableSearchFilter || true,
      badgeShowLimit: badgeShowLimit,
      disabled: disabled || false,
      selectAllText: selectAllText || 'Sélectionner tout',
      unSelectAllText: unSelectAllText || 'Tout déselectionner',
      classes: classes || 'myclass custom-class',
      searchPlaceholderText: searchPlaceholderText || 'Rechercher',
      groupBy: groupBy,
      noDataLabel: 'Pas de données disponibles'
    };
  }


  public permission(authorities) {
    this.dataService.set('permissions', JSON.stringify(this.permissionsService.getPermissions()));
    this.dataService.set('roles', JSON.stringify(this.rolesService.getRoles()));
    // console.log('Roles: ', this.rolesService.getRoles());
    // console.log('Permissions: ', this.permissionsService.getPermissions());
  }

  public loadPermissions(): void {
    this.rolesService.flushRoles();
    this.permissionsService.flushPermissions();
    let roles = this.dataService.get('roles');
    if (roles) {
      roles = JSON.parse(roles);
      for (const key in roles) {
        if (roles.hasOwnProperty(key)) {
          this.rolesService.addRole(key, roles[key]);
          this.permissionsService.addPermission(roles[key].validationFunction);
        }
      }
    }
    console.log('Roles: ', this.rolesService.getRoles());
    console.log('Permissions: ', this.permissionsService.getPermissions());
  }

  public hasPermission(permission) {
    return this.permissionsService.getPermission(permission);
  }

  public isManager(AuthenticationParams): boolean {
    let isManager = false;
    const user = localStorage.getItem(AuthHelper.USER_ID);
    // Stored my allowed groups in a config file, comma separated string
    const allowedGroups = AuthenticationParams;
    if (user !== null && user !== undefined) {
      try {
        const userGroups: any = user['accountType'];
        if (userGroups !== undefined && userGroups !== null && userGroups.length > 0) {
          try {
            userGroups.forEach((e: any) => {
              if (allowedGroups.indexOf(e) > -1) {
                isManager = true;
              }
            });
          } catch (e) {
            if (allowedGroups.indexOf(userGroups) > -1) {
              isManager = true;
            }
          }
        }
      } catch (e) {
        isManager = false;
      }
    }
    return isManager;
  }
}
