import { TdService } from '../services/td.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { InteractionService } from '../services/interaction.service';
import { Router } from '@angular/router';

import { AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
  
interface Website {
  id: string;
  name: string;
}


@Component({
  selector: 'app-tds-list',
  templateUrl: './tds-list.component.html', 
  styleUrls: ['./tds-list.component.css']
})

export class TdsListComponent implements OnInit {
  tds: any[]
  searchValue: string; //THIS
  compareTds: any[]
  title = 'app-material3';

  protected websites: Website[] = [
    { id: '1', name: 'Adare - Rathkeale'},
    { id: '2', name: 'An Daingean'},
    { id: '3', name: 'Ardee'},
    { id: '4', name: 'Arklow'},
    { id: '5', name: 'Artane - Whitehall'},
    { id: '6', name: 'Ashbourne'},
    { id: '7', name: 'Athlone (Roscommon)'},
    { id: '8', name: 'Athlone (Westmeath)'},
    { id: '9', name: 'Athy'},
    { id: '10', name: 'Bailieborough - Cootehill'},
    { id: '11', name: 'Balbriggan'},
    { id: '12', name: 'Ballina'},
    { id: '13', name: 'Ballinamore'},
    { id: '14', name: 'Ballinasloe'},
    { id: '15', name: 'Ballybay - Clones'},
    { id: '16', name: 'Ballyfermot - Drimnagh'},
    { id: '17', name: 'Ballyjamesduff'},
    { id: '18', name: 'Ballymahon'},
    { id: '19', name: 'Ballymote - Tobercurry'},
    { id: '20', name: 'Ballymun-Finglas'},
    { id: '21', name: 'Baltinglass'},
    { id: '22', name: 'Bandon-Kinsale'},
    { id: '23', name: 'Bantry-West Cork'},
    { id: '24', name: 'Belmullet'},
    { id: '25', name: 'Birr'},
    { id: '26', name: 'Blackrock'},
    { id: '27', name: 'Blanchardstown - Mulhuddart'},
    { id: '28', name: 'Borris-in-Ossory-Mountmellick'},
    { id: '29', name: 'Boyle'},
    { id: '30', name: 'Bray East'},
    { id: '31', name: 'Bray West'},
    { id: '32', name: 'Buncrana'},
    { id: '33', name: 'Cabra-Glasnevin'},
    { id: '34', name: 'Cahir'},
    { id: '35', name: 'Callan-Thomastown'},
    { id: '36', name: 'Cappamore-Kilmallock'},
    { id: '37', name: 'Carlow'},
    { id: '38', name: 'Carndonagh'},
    { id: '39', name: 'Carrick-on-Shannon'},
    { id: '40', name: 'Carrick-on-Suir'},
    { id: '41', name: 'Carrickmacross-Castleblayney'},
    { id: '42', name: 'Carrigaline'},
    { id: '43', name: 'Cashel-Tipperary'},
    { id: '44', name: 'Castlebar'},
    { id: '45', name: 'Castlecomer'},
    { id: '46', name: 'Castleisland'},
    { id: '47', name: 'Castleknock'},
    { id: '48', name: 'Cavan-Belturbet'},
    { id: '49', name: 'Celbridge'},
    { id: '50', name: 'Clane'},
    { id: '51', name: 'Claremorris'},
    { id: '52', name: 'Clondalkin'},
    { id: '53', name: 'Clonmel'},
    { id: '54', name: 'Clontarf'},
    { id: '55', name: 'Cobh'},
    { id: '56', name: 'Conamara North'},
    { id: '57', name: 'Conamara South'},
    { id: '58', name: 'Cork City North East'},
    { id: '59', name: 'Cork City North West'},
    { id: '60', name: 'Cork City South Central'},
    { id: '61', name: 'Cork City South East'},
    { id: '62', name: 'Cork City South West'},
    { id: '63', name: 'Donaghmede'},
    { id: '64', name: 'Donegal'},
    { id: '65', name: 'Drogheda Rural'},
    { id: '66', name: 'Drogheda Urban'},
    { id: '67', name: 'Dublin North Inner City'},
    { id: '68', name: 'Dublin South East Inner City'},
    { id: '69', name: 'Dublin South West Inner City'},
    { id: '70', name: 'Dún Laoghaire'},
    { id: '71', name: 'Dundalk Carlingford'},
    { id: '72', name: 'Dundalk South'},
    { id: '73', name: 'Dundrum'},
    { id: '74', name: 'Dungarvan'},
    { id: '75', name: 'Edenderry'},
    { id: '76', name: 'Ennis'},
    { id: '77', name: 'Enniscorthy'},
    { id: '78', name: 'Ennistymon'},
    { id: '79', name: 'Fermoy'},
    { id: '80', name: 'Firhouse-Bohernabreena'},
    { id: '81', name: 'Galway City Central'},
    { id: '82', name: 'Galway City East'},
    { id: '83', name: 'Galway City West'},
    { id: '84', name: 'Glencullen-Sandyford'},
    { id: '85', name: 'Glenties'},
    { id: '86', name: 'Gorey'},
    { id: '87', name: 'Gort-Kinvara'},
    { id: '88', name: 'Graiguecullen-Portarlington'},
    { id: '89', name: 'Granard'},
    { id: '90', name: 'Greystones'},
    { id: '91', name: 'Howth-Malahide'},
    { id: '92', name: 'Kanturk'},
    { id: '93', name: 'Kells'},
    { id: '94', name: 'Kenmare'},
    { id: '95', name: 'Kildare'},
    { id: '96', name: 'Kilkenny'},
    { id: '97', name: 'Killaloe'},
    { id: '98', name: 'Killarney'},
    { id: '99', name: 'Killiney-Shankill'},
    { id: '100', name: 'Killiney–Shankill'},
    { id: '101', name: 'Kilmuckridge'},
    { id: '102', name: 'Kilrush'},
    { id: '103', name: 'Kimmage-Rathmines'},
    { id: '104', name: 'Kinnegad'},
    { id: '105', name: 'Laytown-Bettystown'},
    { id: '106', name: 'Leixlip'},
    { id: '107', name: 'Letterkenny'},
    { id: '108', name: 'Lifford-Stranorlar'},
    { id: '109', name: 'Limerick City East'},
    { id: '110', name: 'Limerick City North'},
    { id: '111', name: 'Limerick City West'},
    { id: '112', name: 'Lismore'},
    { id: '113', name: 'Listowel'},
    { id: '114', name: 'Longford'},
    { id: '115', name: 'Loughrea'},
    { id: '116', name: 'Lucan'},
    { id: '117', name: 'Macroom'},
    { id: '118', name: 'Mallow'},
    { id: '119', name: 'Manorhamilton'},
    { id: '120', name: 'Maynooth'},
    { id: '121', name: 'Midleton'},
    { id: '122', name: 'Milford'},
    { id: '123', name: 'Moate'},
    { id: '124', name: 'Monaghan'},
    { id: '125', name: 'Muinebeag'},
    { id: '126', name: 'Mullingar'},
    { id: '127', name: 'Naas'},
    { id: '128', name: 'Navan'},
    { id: '129', name: 'Nenagh'},
    { id: '130', name: 'New Ross'},
    { id: '131', name: 'Newbridge'},
    { id: '132', name: 'Newcastle West'},
    { id: '133', name: 'Newport'},
    { id: '134', name: 'Ongar'},
    { id: '135', name: 'Oranmore - Athenry'},
    { id: '136', name: 'Palmerstown-Fonthill'},
    { id: '137', name: 'Pembroke'},
    { id: '138', name: 'Piltown'},
    { id: '139', name: 'Portlaoise'},
    { id: '140', name: 'Portlaw-Kilmacthomas'},
    { id: '141', name: 'Rathfarnham Templeogue'},
    { id: '142', name: 'Ratoath'},
    { id: '143', name: 'Roscommon'},
    { id: '144', name: 'Roscrea-Templemore'},
    { id: '145', name: 'Rosslare'},
    { id: '146', name: 'Rush-Lusk'},
    { id: '147', name: 'Shannon'},
    { id: '148', name: 'Skibbereen-West Cork'},
    { id: '149', name: 'Sligo-Drumcliff'},
    { id: '150', name: 'Sligo-Strandhill'},
    { id: '151', name: 'Stillorgan'},
    { id: '152', name: 'Swinford'},
    { id: '153', name: 'Swords'},
    { id: '154', name: 'Tallaght Central'},
    { id: '155', name: 'Tallaght South'},
    { id: '156', name: 'Thurles'},
    { id: '157', name: 'Tralee'},
    { id: '158', name: 'Tramore-Waterford City West'},
    { id: '159', name: 'Trim'},
    { id: '160', name: 'Tuam'},
    { id: '161', name: 'Tullamore'},
    { id: '162', name: 'Tullow'},
    { id: '163', name: 'Waterford City East'},
    { id: '164', name: 'Waterford City South'},
    { id: '165', name: 'Westport'},
    { id: '166', name: 'Wexford'},
    { id: '167', name: 'Wicklow'},
    ];

    public websiteCtrl: FormControl = new FormControl();
    public websiteFilterCtrl: FormControl = new FormControl();
    public filteredWebsites: ReplaySubject<Website[]> = new ReplaySubject(1);

    
    @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
    
    protected _onDestroy = new Subject();

  pageYoffset = 0;
  @HostListener('window:scroll', ['$td']) onScroll(event){
    this.pageYoffset = window.pageYOffset;
  }

  constructor(private tdService: TdService, 
              private scroll: ViewportScroller, 
              private _interactionService: InteractionService,
              private router: Router) { }


  ngOnInit() {
    this.tdService.candidates$.subscribe(
      res => {
        this.tds = res
        this.compareTds = this.tds.filter(td => td.comparison == true);
      },
      err => { }
    );
    this._interactionService.thumbnailMessage$
      .subscribe(
        message => {
          this.compareTds = this.tds.filter(td => td.comparison == true);
        }
      )
    this.websiteCtrl.setValue(this.websites[1]);
    this.filteredWebsites.next(this.websites.slice());
  
    this.websiteFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  scrollToTop(){
    this.scroll.scrollToPosition([0,0]);
  }
  

  openComparison(){
    this.router.navigate(['/app-comparisonpage']);
  }

  untickAll(){   
    this.compareTds.forEach((td) => {
      td.comparison = false;
    });
    this._interactionService.sendMessage('Checkbox Clicked');
  }

  protected setInitialValue() {
    this.filteredWebsites
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
          this.singleSelect.compareWith = (a: Website, b: Website) => a && b && a.id === b.id;
      });
  }
  
  protected filterBanks() {
    if (!this.websites) {
      return;
    }
  
    let search = this.websiteFilterCtrl.value;
    if (!search) {
      this.filteredWebsites.next(this.websites.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
  
    this.filteredWebsites.next(
      this.websites.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }
}