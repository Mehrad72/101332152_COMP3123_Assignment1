const database = require('../schemas/data.js');
const empInfo = database.Employees;
const express = require('express');
const route = express.Router();

route.get('/employees', (req, res) => {
    empInfo.find({}, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.status(200).send(data);
        }
    })
});
route.post('/employees', (req, res) => {
    const employee = new empInfo(req.body);
    employee.save().then((employee) => {
        res.status(201).send({employee, message: "employee added successfully."});
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "couldnt add the employee."
        });
    });
});

route.get('/employees/:employeeId', async(req, res) => {
    try
    {
        await empInfo.findById(req.params.employeeId).then((employee) => {
            if(employee)
            {
                res.status(200).send({employee,  message: "employee found successfully."});
            }
            else
            {
                res.status(500).send({
                    message: "couldnt find the employee."
                });
            }
        })
    }
    catch (err)
    {
        res.status(500).send({
            message: "id length must be 24 characters."
        });
    }

});

route.put('/employees/:employeeId', async(req, res) => {
    try
    {
        await empInfo.findByIdAndUpdate(req.params.employeeId, req.body).then((employee) => {
            if(employee)
            {
                res.status(200).send({employee,  message: "employee updated successfully."});
            }
            else
            {
                res.status(500).send({
                    message: "couldnt find the employee."
                });
            }
        })
    }
    catch (err)
    {
        res.status(500).send({
            message: "id length must be 24 characters."
        });
    }
});

route.delete('/employees/:employeeId', async(req, res) => {
    try
    {
        const empId = await empInfo.findByIdAndDelete(req.params.employeeId);
        if(empId)
        {
            res.status(204).send({empId,  message: "employee deleted successfully."});
        }
        else
        {
            res.status(500).send({
                message: "couldnt find the employee."
            });
        }
    }
    catch (err)
    {
        res.status(500).send({
            message: "id length must be 24 characters."
        });
    }
});
module.exports = route;