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
    Route::post('/usuarios/login/info', 'UserController@info');

    // informacion
    Route::get('/informacion/', 'InformacionController@getInformacion');
    
    //avisos
    Route::post('/avisos/correoweb/', 'AvisosController@correoWeb');
    Route::post('/avisos/sumate/', 'AvisosController@sumate');
    
    //profesionales
    Route::post('/profesionales/insert/','ProfesionalController@insertProfesional');
    Route::get('/profesionales/','ProfesionalController@getProfesionales');
    Route::get('/profesional/{id}','ProfesionalController@getProfesionalById');
    Route::get('/profesional/tipo/{idTipo}','ProfesionalController@getProfesionalByIdTipo');
    Route::delete('/profesionales/eliminar/{id}','ProfesionalController@deleteProfesional');
    Route::post('/profesionales/editar/{id}','ProfesionalController@updateProfesional');

    //tipo de profesionales
    Route::get('profesionales/tipos/', 'TipoProfesionalController@getTipoProfesionales');
    Route::get('profesionales/tipos/{id}', 'TipoProfesionalController@getTipoProfesional');
    Route::post('profesionales/tipos/editar/{id}', 'TipoProfesionalController@update');
    Route::post('profesionales/tipos/insert', 'TipoProfesionalController@insert');
    Route::delete('profesionales/tipos/eliminar/{id}', 'TipoProfesionalController@delete');

    //opiniones
    Route::get('/opiniones/','OpinionCotroller@getOpiniones');
    Route::post('/opiniones/editar/{id}','OpinionCotroller@updateOpinion');
    Route::post('/opiniones/insert/','OpinionCotroller@insertOpinion');
    Route::delete('/opiniones/delete/{id}','OpinionCotroller@deleteOpinion');
    Route::get('/opiniones/profesional/{profesional_id}','OpinionCotroller@getOpinionByProfesional');
});
