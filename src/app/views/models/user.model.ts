import {User as CustomUser} from '../../core/models/user.model';

export class User extends CustomUser {
  accountType: string;
  address: string;
  admin: boolean;
  avatar: string;
  settings: any;
  enabled: boolean;
  phone: string;
  profile: any;
  authoritiesIds: any;
  createdDate: string;
}
