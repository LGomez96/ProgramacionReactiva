import { Component } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Component({
  selector: 'app-suma',
  templateUrl: './suma.component.html',
  styleUrls: ['./suma.component.scss']
})
export class SumaComponent {
// son observables que siempre emiten el último valor que se les asignó
  // incluso si aún no hay ningún suscriptor.
  // aquí podemos recibir el valor al que deseamos aplicar las transformaciones

  private aSubject = new BehaviorSubject<number>(7); // Valores de entrada
  private bSubject = new BehaviorSubject<number>(3);

  // ¿Qué queremos lograr? Obtener el resultado de sumar a y b.

  // 1.- declaramos sumResult$   
  // con el pipe y el map creamos un nuevo observable ´sumResult$´
  // esta variable asíncrona emite la suma de los valores de entrada
  sumResult$ = this.aSubject.pipe(
    map(a => a + this.bSubject.value)
  );
  
  constructor() { }

  // Actualizar los valores de entrada de a y b
  // actualizan los BehaviorSubject correspondientes con los nuevos valores.
  setA(value: number) {
    this.aSubject.next(value);
  }

  setB(value: number) {
    this.bSubject.next(value);
  }
   // ¿qué principios se siguen?
  // se sigue el principio de programación reactiva de separar la declaración 
  // de las fuentes de datos de la lógica de negocio y presentación.
  // se agregaron métodos explícitos para actualizar los valores de entrada ´setA´ y ´setB´
  // los operadores nos permiten manipular y transformar los datos en lugar de realizar operaciones imperativas 
  // operaciones imperativas : (son aquellas en las que se describe explícitamente cómo se debe realizar una tarea paso a paso)
  // en este caso se describen las transformaciones que se deben aplicar a los flujos de datos para lograr el resultado deseado.


}
