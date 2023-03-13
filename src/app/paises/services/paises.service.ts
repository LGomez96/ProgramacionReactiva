import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, of, catchError, forkJoin } from 'rxjs';
import { PaisSmall, Pais } from '../interfaces/paises.interface';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private url = 'https://restcountries.com/v2/'
  private url2 = 'https://restcountries.com/v3.1/'
  private region: string[]= ['Africa', 'Americas','Asia', 'Europe', 'Oceania']
  get regions(){
  return this.region;
  }
  private paisesSubject = new BehaviorSubject<PaisSmall[]>([]);
  private fronterasSubject = new BehaviorSubject<any[]>([]);
  paisesPorRegion$: Observable<PaisSmall[]> = this.paisesSubject.asObservable();
  fronterasPorCodigo$: Observable<any[]> = this.fronterasSubject.asObservable();
  constructor(private http: HttpClient) { }
  getPaisesPorRegion(region:string):Observable<PaisSmall[]>{
  // si cambias una coma por un punto y coma toda la peticion cambia
  const url = `${this.url}region/${region}?fields=alpha3Code,name`;
  return this.http.get<PaisSmall[]>(url).pipe(
  tap(paises => this.paisesSubject.next(paises))
  );
  }
  getPaisporCodigo(codigo: string): Observable<Pais[]|undefined>{
  if(!codigo){
  return of([])
  }
  return this.http.get<Pais[]>(`${this.url2}alpha/${codigo}`)
  .pipe(
  catchError(err => of(undefined))
  );
  }
  getPaisporCodigoSmall(codigo: string): Observable<PaisSmall | null>{
  if(!codigo){
  return of(null)
  }
  return this.http.get<PaisSmall>(`${this.url2}alpha/${codigo}?fields=cca3,name`)
  }
  getPaisporCodigoS(fronteras:string[]=[]):Observable<PaisSmall[]>{
  if(!fronteras){
  return of([]);
  }
  const peticiones: Observable<any>[] = fronteras.map(codigo =>
  this.getPaisporCodigoSmall(codigo)
  );
  console.log(peticiones)
  return forkJoin(peticiones);
  }
  }

