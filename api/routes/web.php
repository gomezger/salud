<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::group(['middleware' => ['cors']], function () {
    
    // usuarios
    Route::post('/usuarios/registrar/', 'UserController@register');
    Route::post('/usuarios/login/', 'UserController@login');

    // informacion
    Route::get('/informacion/', 'InformacionController@getInformacion');

    //avisos
    Route::post('/avisos/correoweb/', 'AvisosController@correoWeb');
    

});
