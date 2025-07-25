import { Component, OnInit } from '@angular/core';
import { GenericTable } from '../../components/generic-table/generic-table';
import { ReportService } from '../../core/services/api/report.service';
import { TopCustomerByOrderDTO, TopCustomerByValueDTO, TopDishDTO } from '../../core/DTOs/report.dto';

@Component({
  selector: 'app-reports',
  imports: [GenericTable],
  templateUrl: './reports.html'
})
export class Reports implements OnInit {
  topDishes: TopDishDTO[] = [];
  topClientsByOrders: TopCustomerByOrderDTO[] = [];
  topClientsBySpending: TopCustomerByValueDTO[] = [];

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.loadReports();
  }

  private loadReports() {
    this.reportService.getDishesByOrderCount().subscribe((data: any) => {
      this.topDishes = data as TopDishDTO[];
    });

    this.reportService.getTopCustomersByOrderCount().subscribe((data: any) => {
      this.topClientsByOrders = data as TopCustomerByOrderDTO[];
    });

    this.reportService.getTopCustomersBySpending().subscribe((data: any) => {
      this.topClientsBySpending = data as TopCustomerByValueDTO[];
    });
  }
}
