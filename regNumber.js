module.exports = function Registering(pool) {
    plates = [];

    // async function checkingReg(name) {

    //     // var using = texting.charAt(0).toUpperCase() + texting.slice(1).toLowerCase()
    //     var check = await pool.query('SELECT * FROM registration_num WHERE reg_num = $1 ', [name]);
    //     return check.rows;
    // }


    async function addReg(name) {

        var startsWith = name.substring(0, 2).toUpperCase()
        // var regPlate = checkingReg(name)

        let reg;

        var platesQuery = await pool.query("select id from registration_town where starts_with=$1", [startsWith])

        let loc_id = platesQuery.rows[0].id

        if (loc_id > 0) {
          
         reg =  await pool.query('select reg_num from registration_num where reg_num=$1', [name])
        
         if(reg.rowCount < 1){
            await pool.query("insert into registration_num(reg_num, category_id) values($1, $2)", [name, loc_id])

         }

        }
    }

    async function regis(texting) {
        var startsWith = texting.subString(0, 2).toUpperCase()

        var check = addReg(texting);
    
        var query = await pool.query(`INSERT INTO registration_town(town_name, starts_with) VALUES ($1, $2)`, [check, startsWith]);
        return query
    }

    // async function addingReg(texting, name) {

    //     var query = await pool.query(`INSERT INTO registration_num(reg_num) VALUES ($1, $2)`, [texting, name]);
    //     return query
    // }

    async function gettingReg() {
        var list = await pool.query('SELECT reg_num FROM registration_num')
        return list.rows;
    }

    function filter(texting, value) {
        // const filteredList = [];
        // for (var i = 0; i < texting.length; i++) {
        //     const currentList = texting[i].toUpperCase();
        //     if (currentList.indexOf(value) !== -1) {
        //         filteredList.push(currentList)
        //     }
        // }
    }

    return {
        // checkingReg,
        regis,
        addReg,
        gettingReg,
        filter
    }
}



























// //   async function checkingReg(name) {

//         // var using = texting.charAt(0).toUpperCase() + texting.slice(1).toLowerCase()
//         var check = await pool.query('SELECT * FROM registration_num WHERE reg_num = $1 ', [name]);
//         return check.rows;
//     }


//     async function addReg(name) {

//         var startsWith = name.subString(0, 2).toUpperCase()

    
//         var regPlate = checkingReg(name)

//         let reg;

//         if (regPlate.rowCount < 0) {

//            var platesQuery = await pool.query("select id from registration_town where starts_with=id", [startsWith])
//             var loc_id = platesQuery.rows[0].id 

//             await pool.query("insert into registration_num(reg_num, category_id) values($1, $2)", [name, loc_id])
//         }
//     }

//     async function regis(texting) {
//         var startsWith = texting.subString(0, 2).toUpperCase()

//         var check = addReg(texting);
    
//         var query = await pool.query(`INSERT INTO registration_town(town_name, starts_with) VALUES ($1, $2)`, [check, startsWith]);
//         return query
//     }

//     // async function addingReg(texting, name) {

//     //     var query = await pool.query(`INSERT INTO registration_num(reg_num) VALUES ($1, $2)`, [texting, name]);
//     //     return query
//     // }

//     async function gettingReg() {
//         var list = await pool.query('SELECT reg_num FROM registration_num')
//         return list.rows;
//     }

//     function filter(texting, value) {
//         // const filteredList = [];
//         // for (var i = 0; i < texting.length; i++) {
//         //     const currentList = texting[i].toUpperCase();
//         //     if (currentList.indexOf(value) !== -1) {
//         //         filteredList.push(currentList)
//         //     }
//         // }
//     }

//     return {
//         checkingReg,
//         regis,
//         addingReg,
//         gettingReg,
//         filter
//     }
// }