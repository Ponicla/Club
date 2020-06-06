import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { ActivatedRoute } from '@angular/router';
import { stringify } from 'querystring';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit{

  // plan: any[];
  plan: any = {};
  loadingPlan: boolean;

  constructor(
    private servicio: ServiceService,
    private router: ActivatedRoute
   ) { 
    
  }
  ngOnInit() {
    
    console.log('INICIO');
    this.loadingPlan = false;
    this.router.params.subscribe(params => {

      this.servicio.obtenerPlaneById(params.id)
      .subscribe(data  =>  {
        console.log(data);
        this.plan = data; 
  
        this.loadingPlan = true;
      })
    })

  }
}
