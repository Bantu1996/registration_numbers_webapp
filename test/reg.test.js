const assert = require('assert');
const Registering = require('../regNumber');
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://bantu:s0ty@t0b@n2@localhost:5432/registration';

const pool = new Pool({
  connectionString
});

describe('Registration', function () {

  const INSERT_QUERY = " INSERT INTO registration_num(reg_num, category_id) VALUES ($1, $2)";

  beforeEach(async function () {
    // clean the tables before each test run
    await pool.query("delete from registration_num");

  });


  it("should be able to ENTER registration numbers  ", async function () {

    var registing = Registering(pool)
    await registing.addReg("CA 1234")
    await registing.addReg("CY 7654")
    await registing.addReg("CJ 8765")

    const num = await registing.gettingReg();
    assert.deepEqual([], num);

  });

    it("should be able to RESET the reg webApp", async function () {
    var registing = Registering(pool);
    await registing.regId("CA 1234")
    await registing.regId("CY 7654")
    await registing.regId("CJ 8765")
    await registing.reset();
    const num = await registing.gettingReg();
    assert.equal(0, num)
  })

  it("should be able to FILTER all reg from different towns seperately.", async function () {

    var registing = Registering(pool);
    await registing.regId("CA 1234")
    await registing.regId("CY 7654")
    await registing.regId("CJ 8765")
    const regTown = await registing.showFilter("All", [])
    assert.deepEqual([], regTown);

  });




  after(function () {
    pool.end();
  })

})

