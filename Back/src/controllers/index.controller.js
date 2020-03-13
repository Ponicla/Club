const { Pool } = require('pg');
const nodemailer = require('nodemailer');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'club',
    port: '5432'
});

// COMERCIOS //
const createComercio = async (req, res) => {
    const {
        nombre,
        descuento
    } = req.body;

    const response = await pool.query('INSERT INTO comercio (nombre, descuento) VALUES ($1, $2)', [nombre, descuento]);
    console.log(response);
    res.json(
        `COMERCIO ${nombre.toUpperCase()} ALTA CORRECTA`
    )
};


const getComercio = async (req, res) => {
    const response = await pool.query('SELECT * FROM comercio');
    console.log(response.rows);
    res.status(200).json(response.rows);
};


const deleteComercio = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM comercio WHERE id_comercio = $1', [id]);
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
    const response = await pool.query('UPDATE comercio SET nombre =$1, descuento = $2 WHERE id_comercio = $3', [nombre, descuento, id]);
    console.log(response);
    res.json(`${nombre} se ha actualizado`);
};

// COMERCIOS //


// PLAN //
const createPlan = async (req, res) => {
    const {
        nombre,
        descripcion,
        costo
    } = req.body;

    const response = await pool.query('INSERT INTO plan (nombre, descripcion, costo) VALUES ($1, $2, $3)', [nombre, descripcion, costo]);
    console.log(response);
    res.json(
        `PLAN ${nombre.toUpperCase()} ALTA CORRECTA`
    )
};

const getPlan = async (req, res) => {
    const response = await pool.query('SELECT * FROM plan');
    console.log(response.rows);
    res.status(200).json(response.rows);
};

const deletePlan = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM plan WHERE id_plan = $1', [id]);
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
    const response = await pool.query('UPDATE plan SET nombre =$1, descripcion = $2, costo = $3 WHERE id_plan = $4', [nombre, descripcion, costo, id]);
    console.log(response);
    res.json(`Plan ${nombre} se ha actualizado`);
};
// PLAN //
/* = req.body;

    const response = await pool.query('INSERT INTO plan (nombre, descripcion, costo) VALUES ($1, $2, $3)', [nombre, descripcion, costo]);
    console.log(response);
    res.json(
        `PLAN ${nombre.toUpperCase()} ALTA CORRECTA`
    ) */

// USUARIO //
const createUsuario = async (req, res) => {
    const {nombre, mail, password } = req.body;

    const response = await pool.query('INSERT INTO usuario (nombre, mail, password) VALUES ($1, $2, $3)', [nombre, mail, password]);
    console.log("respuesta",response);
    res.json({nombre, mail, password })

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'clubniceto@gmail.com',
            pass: 'sagueros2'
        }
    });

    const mailOptions = {
        from:'clubniceto@gmail.com',
        to: mail,
        subject: 'Bienvenido al club',
        html: '<h4 class="text-center">Bienvenido</h4><p>Registraste una cuenta en nuestro club</p><span>Estamos muy contentos que estes con nosotros, estamos a tu dispocion</span>'
    }

    transporter.sendMail(mailOptions, function(err, info){
        if(err){
            console.log(err);
        }else{
            console.log(info);
        }
    });
}


const getUsuario = async (req, res) => {
    const response = await pool.query('SELECT * FROM usuario');
    console.log(response.rows);
    res.status(200).json(response.rows);
};


 const getUsuarioByNombre = async (req, res) => {
     const{ nombre, password} = req.body;
     const response = await pool.query('SELECT * FROM usuario WHERE nombre = $1 AND password = $2', [nombre, password]);
     console.log("RESPUESTA",response);
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
        id_gfamiliar
    } = req.body;

    const response = await pool.query('INSERT INTO persona (nombre, apellido, dni, id_gfamiliar) VALUES ($1, $2, $3, $4)', [nombre, apellido, dni, id_gfamiliar]);
    console.log(response);
    res.json(
        `${nombre.toUpperCase()} ${apellido.toUpperCase()} ALTA CORRECTA`
    )
};


const getPersona = async (req, res) => {
    const response = await pool.query('SELECT * FROM persona');
    console.log(response.rows);
    res.status(200).json(response.rows);
};


const deletePersona = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM persona WHERE id_persona = $1', [id]);
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
    const response = await pool.query('UPDATE persona SET nombre =$1, apellido = $2, dni = $3, id_gfamiliar = $4 WHERE id_persona = $5', [nombre, apellido, dni, id_gfamiliar, id]);
    console.log(response);
    res.json(`${nombre} ${apellido} se ha actualizado`);
};
// PERSONA //


// PASEO //
const createPaseo = async (req, res) => {
    const {
        cantidad,
        precio
    } = req.body;

    const response = await pool.query('INSERT INTO paseo (cantidad, precio) VALUES ($1, $2)', [cantidad, precio]);
    console.log(response);
    res.json({
        Message: 'USUARIO ADD CORRECTAMENTE',
        body: {
            comercio: {
                cantidad,
                precio
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
const createAlquiler = async (req, res) => {
    const {
        precio
    } = req.body;

    const response = await pool.query('INSERT INTO alquiler (precio) VALUES ($1)', [precio]);
    console.log(response);
    res.json({
        Message: 'ALQUILER ADD CORRECTAMENTE',
        body: {
            comercio: {
                precio
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
    emailSend
}