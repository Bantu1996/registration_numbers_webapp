module.exports = function Registering(pool) {
    plates = [];

    async function addReg(name) {
       var name = name.toUpperCase()
        var names = /^C[AYJ]\s\d{3,10}-\d{3,10}$|C[AYJ]\s\d{3,10}$/gi
        var results = names.test(name)
        // var startsWith = name.substring(0, 2)
        // console.log(results);
        
        let reg;
       if(results === false){
           
           return "Please enter a valid reg";
       }
     else{
        var loc_id = await regId(name)
        // if (loc_id ) {
            
        // }
           if (loc_id > 0) {
               reg = await pool.query('select reg_num from registration_num where reg_num=$1', [name])
               
               if (reg.rowCount == 0) {
                  await pool.query("insert into registration_num(reg_num, category_id) values($1, $2)", [name, loc_id])
                  return true
               }else{
                return "You have entered an existing reg"
               }
              
           }
       }
     
}
async function regId(name){
    var startsWith = name.substring(0, 2)

    var platesQuery = await pool.query("select id from registration_town where starts_with=$1", [startsWith])
   
    
       let loc_id = platesQuery.rows[0].id;
       return loc_id;
    }

    async function gettingReg() {
        var list = await pool.query('SELECT reg_num FROM registration_num')
        return list.rows;
    }

    async function showFilter(filter) {
        if (filter === "All") {
            const all = await pool.query('select reg_num from registration_num');
            return all.rows;
        } else {
            const platenumbers = filter.substring(0, 2).trim();
            // console.log(platenumbers);
            
            const loc_id = await pool.query('select id from registration_town where starts_with = $1', [platenumbers]);
            const id = loc_id.rows[0].id
            // console.log(id);
            
            const filtering = await pool.query('select reg_num from registration_num where category_id = $1', [id]);
            // console.log(filtering);
            
            return filtering.rows
        }
    }

    async function reset() {
        var reseting = await pool.query('DELETE FROM registration_num')
        return reseting
    }
    return {
        addReg,
        regId,
        gettingReg,
        showFilter,
        reset
    }
}