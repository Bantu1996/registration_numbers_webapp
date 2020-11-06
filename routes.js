module.exports = function routes(register){

    const ind = async function (req, res) {
        res.render('index');
    }
    const posterReg = async function (req, res) {
        var text = req.body.texting;
        // var texts = text[/C[AYJ]\s\d{3,6}-\d{3,6}|C[AYJ]\s\d{3,6}/gi]
        if (text === "") {
            req.flash('error', 'Please enter a registration')
            res.redirect('/')
        }
      
        else {
          var regError =  await register.addReg(text)

          if (regError === true) {
            req.flash('success', "You have successfully entered a valid reg")
          } else {
            req.flash('error', regError)

          }
            //  console.log(regError)
            res.render('index', {
                reg: await register.gettingReg(),
                // regError
            });
        }
    }
    const regFilter = async function (req, res) {
        var town = req.body.placesFilter
        // console.log(town)
        if (town === undefined) {
            req.flash('error', 'Please select town')
    
        } else {
         var regies =   await register.showFilter(town)
        }
    
        res.render("index", {
            reg: regies
            
        })
    }
    const regReset =  async function (req, res) {
        await register.reset(),
            req.flash('success', 'Successfully cleared the registration list')
        res.redirect('/')
    }
    return {
        ind,
        posterReg,
        regFilter,
        regReset
    }
}