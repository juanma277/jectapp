import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { UsuarioProvider } from '../../providers/usuario/usuario';


@Injectable()
export class UbicacionProvider {

	 usuario: AngularFireObject<any>;
	 private watch:any;

  constructor(	private geolocation:Geolocation,
  				private afDB: AngularFireDatabase,
  				private _up:UsuarioProvider) {

  	if (!this._up.username) {
  		return;
  	}

  	this.usuario = this.afDB.object('/users/'+this._up.username);
  	console.log(this._up.username);
    
  }

  iniciarLocalizacion(){

  	this.watch = this.geolocation.watchPosition()
		.subscribe((data) => {
			 // data can be a set of coordinates, or an error (if an error occurred).
			 // data.coords.latitude
			 // data.coords.longitude
			 if (!this._up.username) {
			 	// code...
			 	return;
			 }

			 this.usuario.update({
			 	lat: data.coords.latitude,
			 	lng: data.coords.longitude
			 });
			 
		});

  }

  detenerLocalizacion(){
  	this.watch.unsubscribe();
  }

}
