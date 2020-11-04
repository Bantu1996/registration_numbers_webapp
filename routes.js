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
             console.log(regError)
             req.flash('error', regError)
            res.render('index', {
                reg: await register.gettingReg(),
                // regError
            });
        }
    }
    const regFilter = async function (req, res) {
        var town = req.body.placesFilter
        console.log(town)
        if (town === undefined) {
            req.flash('error', 'Please select town')
    
        } else {
         var y =   await register.showFilter(town)
        }
    
        res.render("index", {
            reg: y
            
        })
    }
    const regReset =  async function (req, res) {
        await register.reset(),
            req.flash('info', 'Successfully cleared the registration list')
        res.redirect('/')
    }
    return {
        ind,
        posterReg,
        regFilter,
        regReset
    }
}