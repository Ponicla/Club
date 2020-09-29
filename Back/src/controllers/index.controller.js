const {
    Pool
} = require('pg');
const nodemailer = require('nodemailer');


const mercadopago = require('mercadopago');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'club',
    port: '5432'
});

mercadopago.configure({
    access_token: 'TEST-3393963390175953-050319-a1eaef6facac505af38f5089fcca8a83-559151398',
    sandbox: true
});

const fecha_hoy = () => {
    var fs = new Date();
    var ds = fs.getDate();
    var ms = fs.getMonth() + 1;
    var ys = fs.getFullYear();
    var fecha_hoy = ys + "-" + ms + "-" + ds;
    return fecha_hoy;
}

const mail_primero_aviso = (correo) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'clubniceto@gmail.com',
            pass: 'sagueros2'
        }
    });

    const mailOptions = {
        from: 'clubniceto@gmail.com',
        to: correo,
        subject: 'Bienvenido al club',
        html: `
        <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'
integrity='sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk' crossorigin='anonymous'>
<div class='container'>
<div class='row' style='margin-top: 1rem; text-align: center;'>
    <div class='col'>
        <h1 class='display-4'>NO SPAM</h1>
        <hr style='margin-left: 5rem; margin-right: 5rem;'>
    </div>
</div>

<div class='row' style='margin-top: 1rem; text-align: center; background-color: crimson;'>
    <div class='col'>
        <h5 style='color: white;'>SE BUSA EL PARADEDO DE MARCIAL E. SARTORI ALIAS ZORRO 12</h5>
    </div>
</div>

<div class='row' style='text-align: center; margin-top: 7rem;'>
    <div class='col'>
        <h4>Gracias por ser parte del club</h4>
        <p>No dejes de ver las ofertas que tenemos para vos</p>
        <h1 style='margin-bottom: 5rem;'>Tu plan vence en tres dias, te lo avisamos</h1>

    </div>
</div>

<div class='row' style='text-align: center;'>
    <div class='col'>
        <img style='max-width: 20rem; margin-bottom: 2rem;'
            src='https://indiehoy.com/wp-content/uploads/2013/07/niceto-club-logo.jpg' alt=''>
    </div>
</div>
<div class='row' style='text-align: center;'>
    <div class='col'>
        <a href='https://www.instagram.com/p/B_F2F0aFfNM' class='btn btn-success' style='margin-bottom: 2rem;'>Ir a la pagina</a>
    </div>
</div>

<div class='row' style='text-align: center;'>
    <div class='col-md-4'>
        <img style='max-width: 15rem; margin-bottom: 2rem;'
            src='data:image/jpeg;base64,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' alt=''>
    </div>
    <div class='col-md-4'>
        <img style='max-width: 15rem; margin-bottom: 2rem;'
            src='https://www.wallpaperflare.com/static/872/992/967/remember-me-dontnod-entertainment-futuristic-game-remember-wallpaper.jpg' alt=''>
    </div>
    <div class='col-md-4'>
        <img style='max-width: 17rem; margin-bottom: 2rem;'
            src='https://www.toro.com.ar/img/0_old.jpg' alt=''>
    </div>
</div>

</div>
    `
    }

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Enviado a ', element.mail);
        }
    });
}

const mail_ultimo_aviso = (correo) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'clubniceto@gmail.com',
            pass: 'sagueros2'
        }
    });

    const mailOptions = {
        from: 'clubniceto@gmail.com',
        to: correo,
        subject: 'Bienvenido al club',
        html: `
        <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'
integrity='sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk' crossorigin='anonymous'>
<div class='container'>
<div class='row' style='margin-top: 1rem; text-align: center;'>
    <div class='col'>
        <h1 class='display-4'>NO SPAM</h1>
        <hr style='margin-left: 5rem; margin-right: 5rem;'>
    </div>
</div>

<div class='row' style='margin-top: 1rem; text-align: center; background-color: crimson;'>
    <div class='col'>
        <h5 style='color: white;'>SE BUSA EL PARADEDO DE MARCIAL E. SARTORI ALIAS ZORRO 12</h5>
    </div>
</div>

<div class='row' style='text-align: center; margin-top: 7rem;'>
    <div class='col'>
        <h4>Gracias por ser parte del club</h4>
        <p>No dejes de ver las ofertas que tenemos para vos</p>
        <h1 style='margin-bottom: 5rem;'>Tu plan vence mañana</h1>

    </div>
</div>

<div class='row' style='text-align: center;'>
    <div class='col'>
        <img style='max-width: 20rem; margin-bottom: 2rem;'
            src='https://indiehoy.com/wp-content/uploads/2013/07/niceto-club-logo.jpg' alt=''>
    </div>
</div>
<div class='row' style='text-align: center;'>
    <div class='col'>
        <a href='https://www.instagram.com/p/B_F2F0aFfNM' class='btn btn-success' style='margin-bottom: 2rem;'>Ir a la pagina</a>
    </div>
</div>

<div class='row' style='text-align: center;'>
    <div class='col-md-4'>
        <img style='max-width: 15rem; margin-bottom: 2rem;'
            src='data:image/jpeg;base64,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' alt=''>
    </div>
    <div class='col-md-4'>
        <img style='max-width: 15rem; margin-bottom: 2rem;'
            src='https://www.wallpaperflare.com/static/872/992/967/remember-me-dontnod-entertainment-futuristic-game-remember-wallpaper.jpg' alt=''>
    </div>
    <div class='col-md-4'>
        <img style='max-width: 17rem; margin-bottom: 2rem;'
            src='https://www.toro.com.ar/img/0_old.jpg' alt=''>
    </div>
</div>

</div>
    `
    }

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Enviado a ', element.mail);
        }
    });
}

const mail_baja = (correo) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'clubniceto@gmail.com',
            pass: 'sagueros2'
        }
    });

    const mailOptions = {
        from: 'clubniceto@gmail.com',
        to: correo,
        subject: 'Bienvenido al club',
        html: `
        <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'
integrity='sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk' crossorigin='anonymous'>
<div class='container'>
<div class='row' style='margin-top: 1rem; text-align: center;'>
    <div class='col'>
        <h1 class='display-4'>NO SPAM</h1>
        <hr style='margin-left: 5rem; margin-right: 5rem;'>
    </div>
</div>

<div class='row' style='margin-top: 1rem; text-align: center; background-color: crimson;'>
    <div class='col'>
        <h5 style='color: white;'>SE BUSA EL PARADEDO DE MARCIAL E. SARTORI ALIAS ZORRO 12</h5>
    </div>
</div>

<div class='row' style='text-align: center; margin-top: 7rem;'>
    <div class='col'>
        <h4>:(</h4>
        <h4>No te gusto nuestro club ?</h4>
        <p>No dejes de ver las ofertas que tenemos para vos</p>
        <h1 style='margin-bottom: 5rem;'>Tu plan vencio</h1>
        <h4>Puedes volver a contratar un plan con tu usuario cuando quieras</h4>

    </div>
</div>

<div class='row' style='text-align: center;'>
    <div class='col'>
        <img style='max-width: 20rem; margin-bottom: 2rem;'
            src='https://indiehoy.com/wp-content/uploads/2013/07/niceto-club-logo.jpg' alt=''>
    </div>
</div>
<div class='row' style='text-align: center;'>
    <div class='col'>
        <a href='https://www.instagram.com/p/B_F2F0aFfNM' class='btn btn-success' style='margin-bottom: 2rem;'>Ir a la pagina</a>
    </div>
</div>

<div class='row' style='text-align: center;'>
    <div class='col-md-4'>
        <img style='max-width: 15rem; margin-bottom: 2rem;'
            src='data:image/jpeg;base64,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' alt=''>
    </div>
    <div class='col-md-4'>
        <img style='max-width: 15rem; margin-bottom: 2rem;'
            src='https://www.wallpaperflare.com/static/872/992/967/remember-me-dontnod-entertainment-futuristic-game-remember-wallpaper.jpg' alt=''>
    </div>
    <div class='col-md-4'>
        <img style='max-width: 17rem; margin-bottom: 2rem;'
            src='https://www.toro.com.ar/img/0_old.jpg' alt=''>
    </div>
</div>

</div>
    `
    }

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Enviado a ', element.mail);
        }
    });
}

const plan_vence = async (req, res) => {
    const response = await pool.query('SELECT mail, fecha_aviso_plan, fecha_ultimo_aviso_plan, fecha_baja_plan FROM usuarios');
    console.log(response.rows);
    console.log(fecha_hoy());

    response.rows.forEach(element => {
        if (element.fecha_aviso_plan == null) {
            console.log('Quieres enviar un mail a un usuario sin plan');
        } else {
            if (element.fecha_aviso_plan.toLocaleDateString('fr-CA') == fecha_hoy()) {
                mail_primero_aviso(element.mail);

            } else if (element.fecha_ultimo_aviso_plan.toLocaleDateString('fr-CA') == fecha_hoy()) {
                mail_ultimo_aviso(element.mail);

            } else if (element.fecha_baja_plan.toLocaleDateString('fr-CA') == fecha_hoy()) {
                mail_baja(element.mail);
            }
        }
    });
    console.log('SUCCESS SEMD MAIL');
};

function tarea() {
    console.log('Lanzando');
    plan_vence();
}

function lanzarSiempreALaHora(hora, minutos, tarea) {
    var ahora = new Date();
    // console.log('lanzado',ahora);
    console.log('Programado para lanzar');
    var momento = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), hora, minutos);
    if (momento <= ahora) {
        momento = new Date(momento.getTime() + 1000 * 60 * 60 * 24);
    }
    // console.log('para ser ejecutado en',momento,momento.getTime()-ahora.getTime());
    setTimeout(function () {
        tarea();
        lanzarSiempreALaHora(hora, minutos, tarea);
    }, momento.getTime() - ahora.getTime());
}

lanzarSiempreALaHora(18, 23, tarea);


/* MERCADO PAGO */
const pagar = async (req, res) => {
    const {
        precio,
        nombre,
        cantidad
    } = req.body;


    let preference = {

        items: [{
            title: nombre,
            unit_price: precio,
            quantity: cantidad,
        }],
        "back_urls": {
            "success": "http://localhost:4200/user/pago_s",
            "failure": "http://localhost:4200/",
            "pending": "http://localhost:4200/"
        },
        "auto_return": "approved"
    };
    const response = mercadopago.preferences.create(preference).then(function (response) {
        global.init_point = response.body.init_point;
        res.json(
            global.init_point
        );
    }).catch(function (error) {
        console.log(error);
    });

};
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

const getServicioById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM servicios WHERE id_servicio = $1', [id]);
    res.json(response.rows);
};
// SERVICIO //



// USUARIO //
const check_user_unique_mail = async (req, res) => {
    const response = await pool.query('SELECT mail FROM usuarios');
    console.log(response.rows);
    res.status(200).json(response.rows);
};


const generate_password = (length) => {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const createUsuario = async (req, res) => {
    const {
        nombre,
        mail,
        password
    } = req.body;

    const response = await pool.query('INSERT INTO usuarios (nombre, mail, password, rol, paseador, paseador_habilitado) VALUES ($1, $2, $3, $4, $5, $6)', [nombre, mail, password, 2, 'false', 'false']);
    console.log("respuesta", response);
    res.json({
        nombre,
        mail,
        password
    })

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
    const {
        nombre,
        password
    } = req.body;
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

const createUsuarioAdmin = async (req, res) => {
    const {
        nombre,
        mail,
    } = req.body;
    password = generate_password(5);
    const response = await pool.query('INSERT INTO usuarios (nombre, mail, password, rol) VALUES ($1, $2, $3, 1)', [nombre, mail, password]);
    console.log("respuesta", response);
    res.json({
        nombre,
        mail,
        password
    })

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
         subject: 'Eres un admin de club niceto',
         html: `<h4 class="text-center">Bienvenido</h4><p>Registraron una cuenta administrado para ti</p> <br> <br> <span>Sabemos que daras lo mejor de ti, para crecer junto con club niceto</span>  <br> <br> <span>Nombre de usuario asignado: ${nombre}</span> <br> <span> Contraseña asignada: ${password}</span> </span> <br> <br> <span> - Club niceto -</span>`
     }

     transporter.sendMail(mailOptions, function (err, info) {
         if (err) {
             console.log(err);
         } else {
             console.log(info);
         }
     });
}

const getUsuarioAdmin = async (req, res) => {
    const response = await pool.query('SELECT id_usuario, nombre, mail FROM usuarios WHERE rol = 1');
    res.json(response.rows);
};

const getUsuarioNormal = async (req, res) => {
    const response = await pool.query('SELECT id_usuario, nombre, mail FROM usuarios WHERE rol = 2');
    res.json(response.rows);
};

// USUARIOS //


// PASEADOR //
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
// PASEADOR //


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

const getPersonaById = async (req, res) => {
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
const deleteCancha = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM cancha WHERE id_cancha = $1', [id]);
    console.log(response);
    res.json(`Cancha ${id} dada de baja`);
};

const createCancha = async (req, res) => {
    const {
        nombre
    } = req.body;

    const response = await pool.query('INSERT INTO cancha (nombre, estado) VALUES ($1, 1) RETURNING id_cancha', [nombre]);
    console.log(response);
    res.json(
        response.rows[0]
    )
};

const getCancha = async (req, res) => {
    const response = await pool.query('SELECT * FROM cancha');
    console.log(response.rows);
    res.status(200).json(response.rows);
};

const update_estado_cancha = async (req, res) => {
    const {
        estado,
        id_cancha
    } = req.body;
    const response = await pool.query('UPDATE cancha SET estado = $1 WHERE id_cancha = $2', [estado, id_cancha]);
    // console.log(response.rows);
    res.status(200).json(response.rows);
};
// CANCHA //


// ALQUILER//
const createAlquilerCancha = async (req, res) => {
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
        id_plan,
        fecha_inicio_plan,
        fecha_fin_plan,
        fecha_aviso_plan,
        fecha_baja_plan,
        fecha_ultimo_aviso_plan,

    } = req.body;
    const response = await pool.query('UPDATE usuarios SET fk_id_plan = $1, fecha_inicio_plan = $2, fecha_fin_plan = $3, fecha_aviso_plan = $4, fecha_ultimo_aviso_plan = $5, fecha_baja_plan = $6  WHERE id_usuario = $7', [id_plan, fecha_inicio_plan, fecha_fin_plan, fecha_aviso_plan, fecha_ultimo_aviso_plan, fecha_baja_plan, id_usuario]);
    console.log(response);
    res.status(200).json(response.rows);
};

const get_servicios_contratados = async (req, res) => {
    const {
        id_usuario
    } = req.body;
    const response = await pool.query('SELECT a.id_alquiler AS IDENTIDAD, a.horario AS HORA, a.fecha as FECHA, a.id_cancha as ID_LUGAR_O_PASEADOR, c.nombre as NOMBRE_PASEADOR_O_CANCHA, 0 as CANTIDAD, 1 as TIPO_SERVICIO FROM alquiler_futbol as a, cancha as c WHERE a.fk_id_usuario = $1 AND a.id_cancha = c.id_cancha UNION SELECT p.id_paseo AS IDENTIDAD, p.id_rango_h AS HORA, p.fecha as FECHA, p.id_paseador as ID_LUGAR_O_PASEADOR, ux.nombre as NOMBRE_PASEADOR_O_CANCHA, p.cantidad as CANTIDAD, 2 as TIPO_SERVICIO FROM paseo as p, usuarios as ux WHERE p.fk_id_usuario = $1 AND ux.paseador = true AND ux.paseador_habilitado = true AND p.id_paseador = ux.id_usuario ', [id_usuario]);
    console.log(response);
    res.status(200).json(response.rows);
};

const cancelar_paseo = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM paseo WHERE id_paseo = $1', [id]);
    console.log(response.rows);
    res.status(200).json(response.rows);
};

const cancelar_cancha = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM alquiler_futbol WHERE id_alquiler = $1', [id]);
    console.log(response.rows);
    res.status(200).json(response.rows);
};
//PLAN DEL USUARIO//


// GOOGLE //
const check_user_mail_google = async (req, res) => {
    const { id } = req.body;
    const response = await pool.query('SELECT id_usuario, mail, cuenta_g FROM usuarios');
    console.log(response.rows);
    res.status(200).json(response.rows);
}

const obtener_user_para_local_storage = async (req, res) => {
    const { id } = req.body;
    const response = await pool.query('SELECT id_usuario, nombre, mail, rol, fk_id_plan FROM usuarios WHERE id_usuario = $1', [id]);
    console.log('Obtenido para local G');
    res.status(200).json(response.rows);
}

const create_usuario_registrado_con_google = async (req, res) => {
    const {
        mail
    } = req.body;
    const response = await pool.query('INSERT INTO usuarios (nombre, mail, password, rol, paseador, paseador_habilitado, cuenta_g) VALUES ($1, $2, $3, $4, $5, $6, $7)', [mail, mail, null, 2, 'false', 'false', 'true']);
    const response2 = await pool.query('SELECT * FROM usuarios WHERE mail = $1', [mail]);
    console.log("OK");
    res.status(200).json(response2.rows);

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


const reporte_uno = async (req, res) => {
    const {
        fecha
    } = req.body;
    const response = await pool.query("SELECT public.usuarios.nombre, public.usuarios.mail FROM public.usuarios WHERE public.usuarios.fecha_baja_plan < $1 OR public.usuarios.fecha_baja_plan IS NULL", [fecha]);
    console.log('GET REPORTE 1');
    res.status(200).json(response.rows);
}

const reporte_dos = async (req, res) => {
    const response = await pool.query("SELECT public.usuarios.nombre, public.usuarios.mail FROM public.usuarios WHERE public.usuarios.paseador = TRUE AND public.usuarios.paseador_habilitado = TRUE");
    console.log('GET REPORTE 2');
    res.status(200).json(response.rows);
}

const reporte_tres = async (req, res) => {
    const {
        fecha
    } = req.body;
    const response = await pool.query("SELECT public.alquiler_futbol.fecha, public.cancha.nombre FROM public.cancha INNER JOIN public.alquiler_futbol ON public.cancha.id_cancha = public.alquiler_futbol.id_cancha WHERE public.alquiler_futbol.fecha > $1 ORDER BY nombre", [fecha]);
    console.log('GET REPORTE 3');
    res.status(200).json(response.rows);
}

const reporte_cuatro = async (req, res) => {
    const {
        fecha
    } = req.body;
    const response = await pool.query("SELECT nombre, fecha_alta_como_usuario FROM usuarios WHERE fecha_alta_como_usuario > $12", [fecha]);
    console.log('GET REPORTE 4');
    res.status(200).json(response.rows);
}

// GOOGLE //




module.exports = {
    check_user_unique_mail,
    reporte_uno, reporte_dos, reporte_tres, reporte_cuatro,
    create_usuario_registrado_con_google,
    obtener_user_para_local_storage,
    check_user_mail_google,
    get_servicios_contratados,
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
    pagar,
    update_estado_cancha,
    cancelar_paseo,
    cancelar_cancha,
    deleteCancha,
    createUsuarioAdmin,
    getUsuarioAdmin,
    getUsuarioNormal

}