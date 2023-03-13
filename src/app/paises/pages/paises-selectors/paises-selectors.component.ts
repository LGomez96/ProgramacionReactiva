import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, concatMap, filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { PaisSmall } from '../../interfaces/paises.interface';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './paises-selectors.component.html',
  styleUrls: ['./paises-selectors.component.scss']
})
export class PaisesSelectorsComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: ['', Validators.required]
  });
  regions: string[] = [];
  paises$!: Observable<PaisSmall[]>;

  fronteras$!: Observable<any[]>;



  //ui, cambia de estado a true cuando se empiecen a cargar los datos.
  cargando$ = new BehaviorSubject<boolean>(false);

  constructor(private fb: FormBuilder,
    private paisesService: PaisesService) {
    this.regions = this.paisesService.regions
  }

  ngOnInit(): void {
    //#region 1
    // cambio de region
    //  this.miFormulario.get('region')?.valueChanges
    //  .pipe(
    //      tap(_=>{
    //       this.miFormulario.get('pais')?.reset('');
    //       this.cargando = true;
    //     }),
    //     switchMap((region)=> this.paisesService.getPaisesPorRegion(region))
    //   )
    //   .subscribe(  paises =>{
    //     this.paises = paises;
    //     this.cargando = false;
    //   })

    //   // cambio de país
    //   this.miFormulario.get('pais')?.valueChanges
    //   .pipe(
    //     tap(_=>{
    //       this.miFormulario.get('frontera')?.reset('');
    //       this.cargando = true;
    //     }),
    //     switchMap((cod)=> this.paisesService.getPaisporCodigo(cod)),
    //     switchMap((pais)=>this.paisesService.getPaisporCodigoS(pais![0]?.borders))
    //   )
    //   .subscribe( pais => {
    //     if(pais.length > 0){
    //       this.cargando = false;
    //       this.fronteras = pais;
    //     }
    //   })
    //#endregion 1
     const regionChanges$ = this.miFormulario.get('region')?.valueChanges;
  
    if (regionChanges$) {
      regionChanges$.pipe(
        filter(region => !!region), // filtrar regiones nulas o indefinidas
        tap(_ => {
          this.miFormulario.get('pais')?.reset('');
          this.cargando$.next(true);
        }),
        concatMap(region => this.paisesService.getPaisesPorRegion(region).pipe(
          filter(paises => !!paises), // filtrar paises nulos o indefinidos
          switchMap(paises => {
            this.paises$ = of(paises);
    
            const paisChanges$ = this.miFormulario.get('pais')?.valueChanges;
            if (paisChanges$) {
              return paisChanges$.pipe(
                filter(codigoPais => !!codigoPais), // filtrar codigos de paises nulos o indefinidos
                tap(_ => this.miFormulario.get('frontera')?.reset('')),
                concatMap(codigoPais => this.paisesService.getPaisporCodigo(codigoPais).pipe(
                  switchMap(pais => {
                    const codigoFronteras = pais![0]?.borders;
                    if (codigoFronteras && codigoFronteras.length) {
                      return this.paisesService.getPaisporCodigoS(codigoFronteras);
                    } else {
                      alert('No hay países fronterizos, para el país seleccionado');
                      return of([]);
                    }
                  })
                ))
              );
            } else {
              return of([]);
            }
          })
        )),
        tap(_ => {
          this.miFormulario.get('frontera')?.reset('');
          this.cargando$.next(false);
        }),
        map(fronteras => {
          this.fronteras$ = of(fronteras);
        })
      ).subscribe();
    }
    //#endregion 2
      }
  guardar() {

  }

}