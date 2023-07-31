import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';

import { AppComponent } from '../app.component';
import { Chart, initTE } from 'tw-elements';
import { AlldataService } from '../services/alldata.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
  @ViewChild('canv') canvasElement!: ElementRef<HTMLCanvasElement>;
   Date = '';
  selectedBranch: string = '';
  range = '';
  isMobileMenu = false;
  isProfileMenu = false;
  winSize: boolean = false;
  allorders: number = 0;
  inprogress: number = 0;
  completed: number = 0;
  cancelled: number = 0;
  initiated: number = 0;
  esign: any = [];
  estamp: any = [];

  chart1 = Chart;
  chart2 = Chart;
   constructor(public App: AppComponent, private AllData: AlldataService,private snackBar: MatSnackBar) {
    this.isMobileMenu = this.App.isMobileMenuOpen;
    this.isProfileMenu = this.App.isProfileMenuOpen;
    this.winSize = window.innerWidth <= 240;
    this.allorders = this.AllData.allData();
    this.inprogress = this.AllData.proGress();
    this.completed = this.AllData.cancelled();
    this.cancelled = this.AllData.cancelled();
     this.esign = [
      this.AllData.initiated(),
      this.AllData.signed(),
      this.AllData.expired(),
      this.AllData.pending(),
    ];
    this.estamp = [
      this.AllData.initiatedStamp(),
      this.AllData.signedStamp(),
      this.AllData.expiredStamp(),
      this.AllData.pendingStamp(),
    ];
  }

  onBranchSelectionChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    const name = (event.target as HTMLSelectElement).name;
    if (name === 'branch') {
      this.selectedBranch = selectedValue;
    } else if (name === 'range') {
      this.range = selectedValue;
    } else {
      this.Date = selectedValue;
    }
    let material = this.AllData.flterData(
      this.selectedBranch,
      this.range,
      this.Date
    );
   
    this.allorders = material.orderDetail[0];
    this.inprogress = material.orderDetail[1];
    this.completed = material.orderDetail[2];
    this.cancelled = material.orderDetail[3];
    this.esign = material.esign;
    this.estamp = material.estamp;
    // this.renderChart()
  }

  renderChart(esign?: any, estamp?: any) {
    const dataDoughnut = {
      type: 'doughnut',
      data: {
        datasets: [
          {
            label: 'Traffic',
            data: this.esign,
            backgroundColor: [
              'rgba(63, 81, 181, 0.5)',
              'rgba(77, 182, 172, 0.5)',
              'rgba(66, 133, 244, 0.5)',
              'rgba(156, 39, 176, 0.5)',
            ],
          },
        ],
      },
    };

    new Chart(document.getElementById('doughnut-chart'), dataDoughnut);

    const dataDoughnut2 = {
      type: 'doughnut',
      data: {
        datasets: [
          {
            label: 'Traffic',
            data: this.estamp,
            backgroundColor: [
              'rgba(63, 81, 181, 0.5)',
              'rgba(77, 182, 172, 0.5)',
              'rgba(66, 133, 244, 0.5)',
              'rgba(156, 39, 176, 0.5)',
            ],
          },
        ],
      },
    };

    this.chart2 = new Chart(
      document.getElementById('doughnut-chart2'),
      dataDoughnut2
    );
  }

  showNotification() {
    this.snackBar.open('This is a notification!', 'Dismiss', {
      duration: 5000, 
      verticalPosition: 'top',  
      horizontalPosition: 'center' 
    });
  }
  
  ngOnInit() {
    setInterval(()=>this.showNotification(),10000)
    
    initTE({ Chart });
    
    this.renderChart();
  }
}
