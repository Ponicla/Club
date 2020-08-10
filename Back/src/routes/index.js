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
    cancelar_cancha

    
} = require('../controllers/index.controller');

router.post('/payment', pagar);
router.post('/plan_usuario', get_plan_usuario);
router.post('/servicios_del_usuarios', get_servicios_contratados);

router.get('/comercios', getComercio);
router.post('/comercios', createComercio);
router.delete('/comercios/:id', deleteComercio);
router.put('/comercios/:id', updateComercio);

router.get('/servicios', getServicio);
router.post('/servicios', createServicio);
router.delete('/servicios/:id', deleteServicio);
router.put('/servicios/:id', updateServicio);
router.get('/servicio/:id', getServicioById);


router.get('/alquiler', getAlquiler);
router.post('/alquiler', createAlquilerCancha);

router.get('/cancha', getCancha);
router.post('/cancha', createCancha);
router.delete('/cancha/:id', cancelar_cancha); 
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
router.post('/usuario/login', getUsuarioByNombre);
router.put('/usuario/:id', updateUsuario);
router.post('/correo', emailSend);
router.put('/usuario_paseador/:id', update_paseador);
router.get('/usuario_paseador/:id', get_estado_paseador);
router.put('/usuario_paseador_h/:id', update_habilitacion_paseador);

// router.get('/users', getUser);

// router.get('/users/:id', getUserById);

// router.post('/users', createUser);

// router.delete('/users/:id', deleteUser);

// router.put('/users/:id', updateUser);

module.exports = router;