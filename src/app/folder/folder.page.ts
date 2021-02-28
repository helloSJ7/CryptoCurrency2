import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { CommonModule, CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public CryptoCurrency: any;
  public searchedName: string;
  public storedCurrency: any;
  constructor(private activatedRoute: ActivatedRoute, public Http: HttpClient, public currencyPipe: CurrencyPipe) {
    this.getCoincapData();
  }

  ngOnInit() {
  }

  getCoincapData() {
    this.Http.get('https://api.coincap.io/v2/assets').subscribe((resp: any) => {
      this.CryptoCurrency = resp.data;
      this.storedCurrency = this.CryptoCurrency;
    }, (error) => {
      console.log(error)
    })
  }

  doRefresh(event) {
    this.Http.get('https://api.coincap.io/v2/assets').subscribe((resp: any) => {
      this.CryptoCurrency = resp.data;
      this.storedCurrency = this.CryptoCurrency;
      event.target.complete();
    }, (error) => {
      console.log(error);
      event.target.complete();
    })
  }

  initializeItems() {
    this.CryptoCurrency = this.storedCurrency;
  }

  findName(ev: any) {
    const val = ev.target.value;
    this.initializeItems();
    if(val && val.trim() != '') {
      this.CryptoCurrency = this.CryptoCurrency.filter((item: any) => {
        if(item.name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return true;
        }
        return false;
      })
    }
  }
}
