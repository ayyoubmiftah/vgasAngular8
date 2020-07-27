import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Tableau de bord',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: '',
    }
  },
  /*{
    title: true,
    name: 'User'
  },*/
  {
    name: 'Affaires',
    icon: 'icon-puzzle',
    url: '/addAffaire',
    badge: {
      variant: 'info',
      text: ''
    },
    children: [
      {
        name: 'Nouvelle Affaire',
        url: '/addAffaire',
        icon: 'icon-puzzle'
      },
      {
        name: 'Mes Affaires',
        url: '/listAffaire',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Clients',
    url: '/addCustomer',
    badge: {
      variant: 'info',
      text: ''
    },
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Nouveau Client',
        url: '/addCustomer',
        icon: 'icon-puzzle'
      },
      {
        name: 'Mes Client',
        url: '/listCustomer',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'CVThéque',
    url: '/listProfil',
    icon: 'icon-puzzle',
    badge: {
      variant: 'info',
      text: ''
    },
    children: [
      {
        name: 'Nouveau profil',
        url: '/listProfil',
        icon: 'icon-puzzle'
      },
      {
        name: 'Recherche manuelle',
        url: '/rechercheManuelle',
        icon: 'icon-puzzle'
      },
      {
        name: 'Consulter la CVThéque',
        url: '/listCVThéque',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Calendrier des entretiens',
    url: '/calendrier',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: '',
    }
  },
  {
    name: 'Partenaires',
    icon: 'icon-puzzle',
    url: '/addPartenaire',
    badge: {
      variant: 'info',
      text: '',
    },
    children: [
      {
        name: 'Nouveau Partenaire',
        url: '/addPartenaire',
        icon: 'icon-puzzle'
      },
      {
        name: 'Mes Partenaires',
        url: '/listPartenaire',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Actions',
    url: '/actions',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: '',
    }
  },
  {
    name: 'Panneau de configuration',
    url: '/panneau',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: '',
    }
  }
];
