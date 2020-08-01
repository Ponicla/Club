const { Pool } = require('pg');
const nodemailer = require('nodemailer');

// SDK de Mercado Pago
const mercadopago = require ('mercadopago');


const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'club',
    port: '5432'
});


/* MERCADO PAGO */

// Agrega credenciales
mercadopago.configure({
    access_token: 'TEST-3393963390175953-050319-a1eaef6facac505af38f5089fcca8a83-559151398',
    sandbox:true
});

const pagar = async (req, res) => {
    const {
        precio,
        nombre,
        cantidad
    } = req.body;


    let preference = {

        items: [
          {
            title: nombre,
            unit_price: precio,
            quantity: cantidad,
          }
        ],
        "back_urls": {
            "success": "http://localhost:4200/user/pago_s",
            "failure": "http://localhost:4200/",
            "pending": "http://localhost:4200/"
        },
        "auto_return": "approved"
      };
      const response = mercadopago.preferences.create(preference).then(function(response){
        global.init_point = response.body.init_point;
        res.json(
            global.init_point
        );
      }).catch(function(error){
        console.log(error);
      });
    
};



// var precio = 1000;
// var nombre = 'PLAN ORO CLUB NICETO';
// var cantidad = 1;
// // Crea un objeto de preferencia
// let preference = {

//     items: [
//       {
//         title: nombre,
//         unit_price: precio,
//         quantity: cantidad,
//       }
//     ],

//     "back_urls": {
//         "success": "http://localhost:4200",
//         "failure": "http://www.tu-sitio/failure",
//         "pending": "http://www.tu-sitio/pending"
//     }
//     //"auto_return": "approved"
//   };
  
//   mercadopago.preferences.create(preference).then(function(response){
//     global.init_point = response.body.init_point;
//     console.log(global.init_point);
//   }).catch(function(error){
//     console.log(error);
//   });
/* MERCADO PAGO */




// COMERCIOS //
const createComercio = async (req, res) => {
    const {
        nombre,
        descuento
    } = req.body;

    const response = await pool.query('INSERT INTO comercios (nombre, descuento) VALUES ($1, $2)', [nombre, descuento]);
    console.log(response);
    res.json(
        `COMERCIO ${nombre.toUpperCase()} ALTA CORRECTA`
    )
};


const getComercio = async (req, res) => {
    const response = await pool.query('SELECT * FROM comercios');
    console.log(response.rows);
    res.status(200).json(response.rows);
};


const deleteComercio = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM comercios WHERE id_comercio = $1', [id]);
    console.log(response);
    res.json(`Comercio ${id} dado de baja`);
};

const updateComercio = async (req, res) => {
    const id = req.params.id;
    const {
        nombre
    } = req.body;
    const {
        descuento
    } = req.body;
    const response = await pool.query('UPDATE comercios SET nombre =$1, descuento = $2 WHERE id_comercio = $3', [nombre, descuento, id]);
    console.log(response);
    res.json(`${nombre} se ha actualizado`);
};

// COMERCIOS //


// PLAN //
const createPlan = async (req, res) => {
    const {
        nombre,
        descripcion,
        costo,
        imagen
    } = req.body;

    const response = await pool.query('INSERT INTO planes (nombre, descripcion, costo, imagen) VALUES ($1, $2, $3, $4)', [nombre, descripcion, costo, imagen]);
    console.log(response);
    res.json(
        `PLAN ${nombre.toUpperCase()} ALTA CORRECTA`
    )
};

const getPlanById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM planes WHERE id_plan = $1', [id]);
    res.json(response.rows);
};

const getPlan = async (req, res) => {
    const response = await pool.query('SELECT * FROM planes');
    console.log(response.rows);
    res.status(200).json(response.rows);
};

const deletePlan = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM planes WHERE id_plan = $1', [id]);
    console.log(response);
    res.json(`Plan ${id} dado de baja`);
};



const updatePlan = async (req, res) => {
    const id = req.params.id;
    const {
        nombre
    } = req.body;
    const {
        descripcion
    } = req.body;
    const {
        costo
    } = req.body;
    const {
        imagen
    } = req.body;
    const response = await pool.query('UPDATE planes SET nombre =$1, descripcion = $2, costo = $3, imagen = $4 WHERE id_plan = $5', [nombre, descripcion, costo, imagen, id]);
    console.log(response);
    res.json(`Plan ${nombre} se ha actualizado`);
};
// PLAN //


// SERVICIO //
const createServicio = async (req, res) => {
    const {
        nombre,
        descripcion,
        id_plan,
        imagen
    } = req.body;

    const response = await pool.query('INSERT INTO servicios (nombre, descripcion, id_plan, imagen) VALUES ($1, $2, $3, $4)', [nombre, descripcion, id_plan, imagen]);
    console.log(response);
    res.json(
        `SERVICIO ${nombre.toUpperCase()} ALTA CORRECTA`
    )
};

const getServicio = async (req, res) => {
    const response = await pool.query('SELECT * FROM servicios');
    console.log(response.rows);
    res.status(200).json(response.rows);
};

const deleteServicio = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM servicios WHERE id_servicio = $1', [id]);
    console.log(response);
    res.json(`Servicio ${id} dado de baja`);
};

const updateServicio = async (req, res) => {
    const id = req.params.id;
    const {
        nombre
    } = req.body;
    const {
        descripcion
    } = req.body;
    const {
        id_plan
    } = req.body;
    const {
        imagen
    } = req.body;
    const response = await pool.query('UPDATE servicios SET nombre =$1, descripcion = $2, id_plan = $3, imagen = $4 WHERE id_servicio = $5', [nombre, descripcion, id_plan, imagen, id]);
    console.log(response);
    res.json(`Servicios ${nombre} se ha actualizado`);
};

const getServicioById= async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM servicios WHERE id_servicio = $1', [id]);
    res.json(response.rows);
};


// SERVICIO //



/* = req.body;

    const response = await pool.query('INSERT INTO plan (nombre, descripcion, costo) VALUES ($1, $2, $3)', [nombre, descripcion, costo]);
    console.log(response);
    res.json(
        `PLAN ${nombre.toUpperCase()} ALTA CORRECTA`
    ) */

// USUARIO //
const createUsuario = async (req, res) => {
    const { nombre, mail, password } = req.body;

    const response = await pool.query('INSERT INTO usuarios (nombre, mail, password, rol, paseador, paseador_habilitado) VALUES ($1, $2, $3, $4, $5, $6)', [nombre, mail, password, 2, 'false', 'false']);
    console.log("respuesta", response);
    res.json({ nombre, mail, password })

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'clubniceto@gmail.com',
            pass: 'sagueros2'
        }
    });

    const mailOptions = {
        from: 'clubniceto@gmail.com',
        to: mail,
        subject: 'Bienvenido al club',
        html: '<h4 class="text-center">Bienvenido</h4><p>Registraste una cuenta en nuestro club</p><span>Estamos muy contentos que estes con nosotros, estamos a tu dispocion</span>'
    }

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
}


const getUsuario = async (req, res) => {
    const response = await pool.query('SELECT * FROM usuarios');
    console.log(response.rows);
    res.status(200).json(response.rows);
};


const getUsuarioByNombre = async (req, res) => {
    const { nombre, password } = req.body;
    const response = await pool.query('SELECT * FROM usuarios WHERE nombre = $1 AND password = $2', [nombre, password]);
    console.log("RESPUESTA", response);
    res.status(200).json(response.rows);

};


const updateUsuario = async (req, res) => {
    const id = req.params.id;
    const {
        id_persona
    } = req.body;
    const response = await pool.query('UPDATE usuarios SET id_persona =$1 WHERE id_usuario = $2', [id_persona, id]);
    console.log(response);
    res.json(`Usuario se ha actualizado`);
};


const update_paseador = async (req, res) => {
    const id = req.params.id;
    const {
        paseador
    } = req.body;
    const response = await pool.query('UPDATE usuarios SET paseador =$1 WHERE id_usuario = $2', [paseador, id]);
    console.log(response);
    res.json(`Usuario se ha actualizado`);
};

const update_habilitacion_paseador = async (req, res) => {
    const id = req.params.id;
    const {
        paseador_habilitado
    } = req.body;
    const response = await pool.query('UPDATE usuarios SET paseador_habilitado =$1 WHERE id_usuario = $2', [paseador_habilitado, id]);
    console.log(response);
    res.json(`Usuario se ha actualizado`);
};


const get_estado_paseador = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT paseador FROM usuarios WHERE id_usuario = $1', [id]);
    res.status(200).json(response.rows);
};






// USUARIO //


// TURNO //
const createTurno = async (req, res) => {
    const {
        fecha
    } = req.body;

    const response = await pool.query('INSERT INTO turno (fecha) VALUES ($1)', [fecha]);
    console.log(response);
    res.json({
        Message: 'TURNO ADD CORRECTAMENTE',
        body: {
            comercio: {
                fecha
            }
        }
    })
};


const getTurno = async (req, res) => {
    const response = await pool.query('SELECT * FROM turno');
    console.log(response.rows);
    res.status(200).json(response.rows);
};
// TURNO //

const emailSend = (req, res) => {
    console.log("CHICHA");
    console.log(req.body);
    console.log("CHICHA");
    res.send('RECIBIDO')
}



// PERSONA //
const createPersona = async (req, res) => {
    const {
        nombre,
        apellido,
        dni,
        id_gfamiliar,
        id_usuario,
    } = req.body;

    const response = await pool.query('INSERT INTO personas (nombre, apellido, dni, id_gfamiliar, id_usuario) VALUES ($1, $2, $3, $4, $5)', [nombre, apellido, dni, id_gfamiliar, id_usuario]);
    console.log(response);
    res.json(
        `${nombre.toUpperCase()} ${apellido.toUpperCase()} ALTA CORRECTA`
    )
};


const getPersona = async (req, res) => {
    const response = await pool.query('SELECT * FROM personas');
    console.log(response.rows);
    res.status(200).json(response.rows);
};

const getPersonaById= async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM personas WHERE id_usuario = $1', [id]);
    res.json(response.rows);
};


const deletePersona = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM personas WHERE id_persona = $1', [id]);
    console.log(response);
    res.json(`Persona ${id} dada de baja`);
};

const updatePersona = async (req, res) => {
    const id = req.params.id;
    const {
        nombre
    } = req.body;
    const {
        apellido
    } = req.body;
    const {
        dni
    } = req.body;
    const {
        id_gfamiliar
    } = req.body;
    const response = await pool.query('UPDATE personas SET nombre =$1, apellido = $2, dni = $3, id_gfamiliar = $4 WHERE id_persona = $5', [nombre, apellido, dni, id_gfamiliar, id]);
    console.log(response);
    res.json(`${nombre} ${apellido} se ha actualizado`);
};
// PERSONA //


// PASEO //
const createPaseo = async (req, res) => {
    const {
        cantidad,
        id_paseador,
        id_rango_h,
        fecha,
        direccion,
        fk_id_usuario
    } = req.body;
    const response = await pool.query('INSERT INTO paseo (cantidad, id_paseador, id_rango_h, fecha, direccion, fk_id_usuario) VALUES ($1, $2, $3, $4, $5, $6)', [cantidad, id_paseador, id_rango_h, fecha, direccion, fk_id_usuario]);
    console.log(response);
    res.json({
        Message: 'PASEO ADD CORRECTO',
        body: {
            comercio: {
                cantidad
            }
        }
    })
};


const getPaseo = async (req, res) => {
    const response = await pool.query('SELECT * FROM paseo');
    console.log(response.rows);
    res.status(200).json(response.rows);
};
// PASEO //


// G FAMILIAR //
const createGFamiliar = async (req, res) => {
    const {
        descripcion
    } = req.body;

    const response = await pool.query('INSERT INTO gfamiliar (descripcion) VALUES ($1)', [descripcion]);
    console.log(response);
    res.json({
        Message: 'G FAMILIAR ADD CORRECTAMENTE',
        body: {
            comercio: {
                descripcion

            }
        }
    })
};


const getGFamiliar = async (req, res) => {
    const response = await pool.query('SELECT * FROM gfamiliar');
    console.log(response.rows);
    res.status(200).json(response.rows);
};
// G FAMILIAR//


// CUOTA//
const createCuota = async (req, res) => {
    const {
        numeroCuota,
        fecha,
        vencimiento
    } = req.body;

    const response = await pool.query('INSERT INTO cuota (numeroCuota, fecha, vencimiento) VALUES ($1, $2, $3)', [numeroCuota, fecha, vencimiento]);
    console.log(response);
    res.json({
        Message: 'CUOTA ADD CORRECTAMENTE',
        body: {
            comercio: {
                numeroCuota,
                fecha,
                vencimiento
            }
        }
    })
};


const getCuota = async (req, res) => {
    const response = await pool.query('SELECT * FROM cuota');
    console.log(response.rows);
    res.status(200).json(response.rows);
};
// CUOTA //


// CANCHA //
const createCancha = async (req, res) => {
    const {
        nombre
    } = req.body;

    const response = await pool.query('INSERT INTO cancha (nombre) VALUES ($1)', [nombre]);
    console.log(response);
    res.json({
        Message: 'CANCHA ADD CORRECTAMENTE',
        body: {
            comercio: {
                nombre
            }
        }
    })
};


const getCancha = async (req, res) => {
    const response = await pool.query('SELECT * FROM cancha');
    console.log(response.rows);
    res.status(200).json(response.rows);
};





// CANCHA //


// ALQUILER//
const createAlquilerCancha= async (req, res) => {
    const {
        horario,
        fecha,
        fk_id_usuario,
        id_cancha
    } = req.body;

    const response = await pool.query('INSERT INTO alquiler_futbol (horario, fecha, fk_id_usuario, id_cancha) VALUES ($1, $2, $3, $4)', [horario, fecha, fk_id_usuario, id_cancha]);
    console.log(response);
    res.json({
        Message: 'ALQUILER DE CANCHA F5 ADD CORRECTAMENTE',
        body: {
            alquiler_cancha: {
                horario,
                fecha,
                fk_id_usuario,
                id_cancha
            }
        }
    })
};


const getAlquiler = async (req, res) => {
    const response = await pool.query('SELECT * FROM alquiler');
    console.log(response.rows);
    res.status(200).json(response.rows);
};
// ALQUILER //



//PLAN DEL USUARIO//
const get_plan_usuario = async (req, res) => {
    const {
        id_plan
    } = req.body;
    const response = await pool.query('SELECT p.nombre, s.nombre, s.descripcion, s.id_servicio as ID_SERVICIO FROM plan_servicio as ps, planes as p, servicios as s WHERE  ps.fk_id_plan = p.id_plan AND ps.fk_id_servicio = s.id_servicio AND p.id_plan = $1', [id_plan]);
    console.log(response.rows);
    res.status(200).json(response.rows);

};

const contratar_plan = async (req, res) => {
    const {
        id_usuario,
        id_plan
    } = req.body;
    const response = await pool.query('UPDATE usuarios SET fk_id_plan = $1 WHERE id_usuario = $2', [id_plan, id_usuario]);
    console.log(response.rows);
    res.status(200).json(response.rows);
};







// const updateUser = async (req, res) =>{
//     const id = req.params.id;
//     const { nombre } = req.body;
//     const response = await pool.query('UPDATE socio SET nombre = $1 WHERE id = $2', [nombre, id]);
//     console.log(response);
//     res.json('Socio actualizado');
// };

// const getUser = async (req, res) => {
//     const response = await pool.query('SELECT * FROM socio');
//     console.log(response.rows);
//     res.status(200).json(response.rows);
// };

// const getUserById = async (req, res) => {
//     const id = req.params.id;
//     const response = await pool.query('SELECT * FROM socio WHERE id = $1', [id]);
//     res.json(response.rows);
// };

// const createUser = async (req, res) => {
//     const { nombre } = req.body;

//     const response = await pool.query('INSERT INTO socio (nombre) VALUES ($1)', [nombre]);
//     console.log(response);
//     res.json({
//         Message: 'USUARIO AGREGADO CORRECTAMENTE',
//         body: {
//             usuario: {nombre}
//         }
//     })
// };

// const deleteUser = async (req, res) => {
//     const id = req.params.id;
//     const response = await pool.query('DELETE FROM socio WHERE id = $1', [id]);
//     console.log(response);
//     res.json(`socio ${id} eliminado correctamanete`);
// };


module.exports = {
    // getUser,
    // createUser,
    // getUserById,
    // deleteUser, 
    // updateUser
    createComercio,
    getComercio,
    deleteComercio,
    updateComercio,
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
    deletePersona,
    updatePersona,
    createPlan,
    getPlan,
    deletePlan,
    updatePlan,
    createTurno,
    getTurno,
    createUsuario,
    getUsuario,
    getUsuarioByNombre,
    updateUsuario,
    emailSend,
    createServicio,
    getServicio,
    deleteServicio,
    updateServicio,
    getPlanById,
    getPersonaById,
    update_paseador,
    get_estado_paseador,
    update_habilitacion_paseador,
    getServicioById,
    createAlquilerCancha,
    get_plan_usuario,
    contratar_plan,
    pagar

}