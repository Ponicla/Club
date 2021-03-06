const {
    Router
} = require('express');

const router = Router();
const {
    createComercio,
    getComercio,
    deleteComercio,
    updateComercio,
    createAlquiler,
    getAlquiler,
    createCancha,
    getCancha,
    createCuota,
    getCuota,
    createGFamiliar,
    getGFamiliar,
    createPaseo,
    getPaseo,
    createPersona,
    getPersona,
    updatePersona,
    deletePersona,
    createPlan,
    getPlan,
    deletePlan,
    updatePlan,
    createTurno,
    getTurno,
    createUsuario,
    getUsuario,
    getUsuarioByNombre,
    emailSend,
    createServicio,
    getServicio,
    deleteServicio,
    updateServicio,
    getPlanById,
    updateUsuario,
    getPersonaById,
    update_paseador,
    get_estado_paseador,
    update_habilitacion_paseador,
    getServicioById,
    createAlquilerCancha,
    get_plan_usuario,
    contratar_plan,
    pagar,
    update_estado_cancha,
    get_servicios_contratados,
    cancelar_paseo,
    cancelar_cancha,
    deleteCancha,
    createUsuarioAdmin,
    getUsuarioAdmin,
    getUsuarioNormal,
    check_user_mail_google,
    obtener_user_para_local_storage,
    create_usuario_registrado_con_google,
    reporte_uno, reporte_dos, reporte_tres, reporte_cuatro,
    check_user_unique_mail,
    verifacar_ratoneada_paseador,
    verifacar_disponibilidad_del_turno,
    check_vencimiento_plan,
    cantidad_alquileres_por_cancha,
    pagar_cancha_sin_plan,
    paseos_pendientes_por_paseador,
    informe_de_vencimiento,
    verifacar_disponibilidad_del_paseos,
    pagar_paseo_sin_plan,
    plan_para_perfil
 
} = require('../controllers/index.controller');

// GOOGLE
router.post('/create_usuario_registrado_con_google', create_usuario_registrado_con_google);
router.post('/verificar_mail_google', check_user_mail_google);
router.post('/obtener_user_para_local_storage', obtener_user_para_local_storage);
// GOOGLE


// REPORTES
router.post('/reporte_uno', reporte_uno);
router.get('/reporte_dos', reporte_dos);
router.post('/reporte_tres', reporte_tres);
router.post('/reporte_cuatro', reporte_cuatro);
// REPORTES


router.post('/cantidad_alquileres_por_cancha', cantidad_alquileres_por_cancha); 
router.post('/check_vencimiento_plan', check_vencimiento_plan); 
router.post('/verifacar_disponibilidad_del_turno', verifacar_disponibilidad_del_turno); 
router.post('/verifacar_disponibilidad_del_paseos', verifacar_disponibilidad_del_paseos);
router.post('/verifacar_ratoneada_paseador', verifacar_ratoneada_paseador);

// MERCADO PAGO
router.post('/payment', pagar);
router.post('/payment_cancha', pagar_cancha_sin_plan);
router.post('/payment_paseo', pagar_paseo_sin_plan);
// MERCADO PAGO

router.post('/plan_usuario', get_plan_usuario);
router.post('/servicios_del_usuarios', get_servicios_contratados);
router.post('/plan_para_perfil', plan_para_perfil);

router.get('/comercios', getComercio);
router.post('/comercios', createComercio);
router.delete('/comercios/:id', deleteComercio);
router.put('/comercios/:id', updateComercio);

router.get('/servicios', getServicio);
router.post('/servicios', createServicio);
router.delete('/servicios/:id', deleteServicio);
router.put('/servicios/:id', updateServicio);
router.get('/servicio/:id', getServicioById);

router.get('/check_user_unique_mail', check_user_unique_mail);


router.get('/alquiler', getAlquiler);
router.post('/alquiler', createAlquilerCancha);

router.get('/cancha', getCancha);
router.post('/cancha', createCancha);
router.delete('/cancha/:id', cancelar_cancha); 
router.delete('/eliminar_cancha/:id', deleteCancha); 
router.put('/estado_cancha', update_estado_cancha); 

router.get('/cuota', getCuota);
router.post('/cuota', createCuota);

router.get('/gfamiliar', getGFamiliar);
router.post('/gfamiliar', createGFamiliar);

router.get('/paseo', getPaseo);
router.post('/paseo', createPaseo);
router.delete('/paseo/:id', cancelar_paseo);

router.get('/persona', getPersona);
router.post('/persona', createPersona);
router.delete('/persona/:id', deletePersona);
router.put('/persona/:id', updatePersona);
router.get('/persona/:id', getPersonaById);

 
router.get('/plan', getPlan);
router.post('/plan', createPlan);
router.delete('/plan/:id', deletePlan);
router.put('/plan/:id', updatePlan);
router.get('/plan/:id', getPlanById);
router.put('/contratar_plan', contratar_plan);

router.get('/turno', getTurno);
router.post('/turno', createTurno);

router.get('/usuario', getUsuario);
router.post('/usuario', createUsuario);
router.post('/usuario_admin', createUsuarioAdmin);
router.post('/usuario/login', getUsuarioByNombre);
router.put('/usuario/:id', updateUsuario);
router.post('/correo', emailSend);
router.get('/obtener_usuario_admin', getUsuarioAdmin);
router.get('/obtener_usuario_normal', getUsuarioNormal);
router.put('/usuario_paseador/:id', update_paseador);
router.get('/usuario_paseador/:id', get_estado_paseador);
router.put('/usuario_paseador_h/:id', update_habilitacion_paseador);

router.post('/paseos_pendientes_por_paseador', paseos_pendientes_por_paseador);
router.post('/informe_de_vencimiento', informe_de_vencimiento);



// router.get('/users', getUser);

// router.get('/users/:id', getUserById);

// router.post('/users', createUser);

// router.delete('/users/:id', deleteUser);

// router.put('/users/:id', updateUser);

module.exports = router;