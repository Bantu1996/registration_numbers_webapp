const assert = require('assert');
const Registering = require('../regNumber');
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://bantu:s0ty@t0b@n2@localhost:5432/registration_test';

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
    assert.deepEqual( [
        {
          reg_num: 'CA 1234'
        },
        {
          reg_num: 'CY 7654'
        },
        {
          reg_num: 'CJ 8765'
        }
      ]
      , num);

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
    await registing.addReg("CA 1234")
    await registing.addReg("CY 7654")
    await registing.addReg("CJ 8765")
    const regTown = await registing.showFilter("All");
    const regTowns = regTown
    assert.deepEqual([
      {
        reg_num: 'CA 1234'
      },
      {
        reg_num: 'CY 7654'
      },
      {
        reg_num: 'CJ 8765'
      }
    ], regTowns)

  });

  it("should be able to FILTER all reg from Cape Town.", async function () {

    var registing = Registering(pool);
    await registing.addReg("CA 1234")
   await registing.addReg("CA 7654")
   await registing.addReg("CA 8765")
  await registing.addReg("CY 7654")

   const regTown = await registing.showFilter("CA");
   const regTowns = regTown
   assert.deepEqual([
    {
      reg_num: 'CA 1234'
    },
    {
      reg_num: 'CA 7654'
    },
    {
      reg_num: 'CA 8765'
    }
  ], regTowns);

  });

  it("should be able to FILTER all reg from Bellville.", async function () {

    var registing = Registering(pool);
    await registing.addReg("CY 1234")
    await registing.addReg("CY 7654")
    await registing.addReg("CY 8765")
    await registing.addReg("CA 8765")
    
    const regTown = await registing.showFilter("CY");
    const regTowns = regTown
    assert.deepEqual([
      {
        reg_num: 'CY 1234'
      },
      {
        reg_num: 'CY 7654'
      },
      {
        reg_num: 'CY 8765'
      }
    ], regTowns);

  });

  it("should be able to FILTER all reg from Paarl.", async function () {

    var registing = Registering(pool);
    await registing.addReg("CJ 1234")
    await registing.addReg("CJ 7654")
    await registing.addReg("CA 8765")
    
    const regTown = await registing.showFilter("CJ");
    const regTowns = regTown
    assert.deepEqual([
      {
        reg_num: 'CJ 1234'
      },
      {
        reg_num: 'CJ 7654'
      }
    ], regTowns);

  });

  after(function () {
    pool.end();
  })

})

