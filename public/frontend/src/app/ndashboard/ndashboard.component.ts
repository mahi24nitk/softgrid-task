import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
@Component({
	selector: 'app-ndashboard',
	templateUrl: './ndashboard.component.html',
	styleUrls: ['./ndashboard.component.scss']
})
export class NdashboardComponent {

	constructor(private http: HttpClient) {}
	data:any = [];
	displayedColumns: string[] = ['requestedBy', 'origin', 'requestedAt', 'requestType'];

	dataSource:MatTableDataSource<any>;

	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;

	ngOnInit() {
		this.getAllRequest();

	}

	//send get request
	sendRequest(partnerName){

		this.http.get(`http://localhost:3000/api/v1/global/${partnerName}`)
		.subscribe( data =>{
			this.dataSource = new MatTableDataSource(data['data']);
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;

		},error=>{	
			alert(error)
		})
	}

	getAllRequest(){

		this.http.get(`http://localhost:3000/api/v1/global/`)
		.subscribe( data =>{
			this.dataSource = new MatTableDataSource(data['data']);
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
		},error=>{
			alert(error)
		})
	}


	//filtering data
	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}


}
