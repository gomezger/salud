import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	providers : [
	  	UsuarioService
	]
})
export class LoginComponent implements OnInit {
	public user: Usuario;
	public identity: Usuario;
	public token: string;

  constructor(
        private _route: Router,
        private _router: ActivatedRoute,
        private _usuarioService: UsuarioService,
		private _titleService: Title,
  ) { }

  ngOnInit() {
    this._titleService.setTitle('Login - Panel de Control');
    // variables de sesion
    this.user = new Usuario(0,"","",null,"","",null,null);
  }

  /**
     * Inicia sesion con los datos cargados.
     * Utiliza los datos que se guardaron el la variable usuario.
     * Si es exitoso, guarda en el local storage el objeto usuario y el token.
     */
	onSubmit(loginForm) {

		//muestro mensaje de validar datos
		$('.alert').addClass('alert-info');
		$('.alert').removeClass('d-none');
		$('.alert').text('Validando datos...');

		//le paso el usuario que solo tiene la contraseña y el usuario
		this._usuarioService.login(this.user).subscribe(
			(response) => {
				// verifico si hubo un error
				if (response.status === 'error') {

					//muestro mensaje de validar datos
					$('.alert').addClass('alert-danger');
					$('.alert').removeClass('alert-info');
					$('.alert').text(response.errores[0]);

				} else {
					// si llegue hasta aca es porque estoy logueado y guardo el token
					this.token = response;

					// lo guardo en el local storage
					localStorage.setItem('token-panel', this.token);

					// seteo login
					localStorage.setItem('isLoggedin-panel', 'true');


					// obtengo los datos del usuario y lo dejo en usuario
					this._usuarioService.getIdentity(this.user).subscribe(
						(response2) => {

							// lo guardo en el local storage
							localStorage.setItem('identity-panel', JSON.stringify(response2));

							// redireccionamos
							this._route.navigate(['/panel/profesionales'], { relativeTo: this._router });
							
						},
						(error) => {		
							$('.alert').addClass('alert-danger');
							$('.alert').removeClass('alert-info');
							$('.alert').text('Verificar conexión');
						}
					);
				}
			},
			(error) => {		
				$('.alert').addClass('alert-danger');
				$('.alert').removeClass('alert-info');
				$('.alert').text('Verificar conexión');
			}
		);
	}

	/**
	 * 
	 * @param clase Pone un mensaje de error en uno de los alerts
	 * @param mensaje mensaje opcional para poner en la alertas
	 */
	private putError(clase: string, mensaje: string=null){
		
		$('.alert').addClass('d-none');
		$('.'+clase).removeClass('d-none');

		if(mensaje!=null){
			$('.'+clase).html(mensaje);
		}

	}

}
