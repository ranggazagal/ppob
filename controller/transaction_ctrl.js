const Validator = require('validatorjs');
const db = require("../model");
const Transaction = db.transaction;

exports.create = async (req, res) => {
    try {
        let validation = new Validator({
            phone:req.body.Phone,
            email: req.body.Email
        }, {
            phone:'required|between:9,13',
            email: 'required|min:7|email'
        });
        function passes() {
        // Validation passed
        }
        
        function fails() {
            /**
             * errors: {
                    Phone: [ 'The Phone field must be between 9 and 13 characters.' ],
                    email: [ 'The email format is invalid.' ]
                }
             */
            throw new Error(JSON.stringify(validation.errors));
        }

        validation.checkAsync(passes, fails);
        
        await Transaction.create({
            VehcTypeCode:req.body.Type,
            VehicleCode:req.body.Vehicle,
            Price:req.body.Price,
            BookingDate:req.body.BookingDate,
            WaitingInDays:req.body.WaitingInDays,
            Phone:req.body.Phone,
            Email:req.body.Email,
            Name:req.body.Name,
            PathFile:req.file.path,
        })

        res.json({
            status:200,
            message: "Transaction Data successfully Added.",
            data: null,
          })
    }catch(e) {
        console.log(e)
        res.status(404).json({message:e.message})
    }
};
