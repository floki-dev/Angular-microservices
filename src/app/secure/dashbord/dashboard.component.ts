import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../services/order.service";
// @ts-ignore
import * as c3 from 'c3';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(protected orderService: OrderService) { }

  ngOnInit(): void {
    const chart = c3.generate({
      bindto: '#chart',
      data: {
        x: 'x',
        columns: [
          ['x'],
          ['Sales'],
        ],
        types: {
          Sales: 'bar'
        }
      },
      axis: {
        'x': {
          type: 'timeseries',
          tick: {
            format: '%Y-%m-%d'
          }
        }
      }
    });

    this.orderService.chart().subscribe(
      // @ts-ignore
      (res: Response) => {
        // @ts-ignore
        const records = res.data;
        // @ts-ignore
        console.log(res)

        chart.load({
          columns: [
            // @ts-ignore
            ['x', ...records.map(r => r.date)],
            // @ts-ignore
            ['Sales', ...records.map(r => r.sum)]
          ]
        })
      }
    )
  }

}
