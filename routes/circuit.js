const express = require('express');
const router = express.Router();
const quantumCircuit = require("quantum-circuit");

var circuit = new quantumCircuit(2);

router.get('/', async (req,res) => { 
    for(var i = 0; i < 8; i++) {
        //
        // add Hadamard gate to the end (-1) of i-th wire
        //
        circuit.addGate("h", -1, i);
 
        //
        // add measurement gate to i-th qubit which will store result 
        // into classical register "c", into i-th classical bit
        //
        circuit.addMeasure(i, "c", i); 
    }
 
    // run circuit
    circuit.run();
 
    // log value of register "c"
    const result = circuit.getCregValue("c");
    console.log(result);
    res.status(200).send(result.toString());
});

router.post('/addGate', async (req,res) => {
    console.log('adding gate');
    try{
        if(req.body.wire != null)
        {
            console.log('wire');
            console.log(req.body.gate + req.body.column + req.body.wire);
            circuit.addGate(req.body.gate, req.body.column, req.body.wire);
        }
        else
        {
            console.log('arrayOfWire');
            circuit.addGate(req.body.gateName, req.body.column, req.body.arrayOfWires);
        }
            res.json('success');
    } catch (err) {
        console.log('goes down here?');
        res.json({message: err});
    }
    

});

router.get('/reset', async (req,res) => {
    console.log('reseting circuit');
    circuit = new quantumCircuit(2);
    res.json('successfully reset');
})

router.get('/run', async (req,res) => {
    console.log('running circuit');
    if(req.body.array){
        circuit.run(req.body.array);
        console.log(circuit.probabilities());

    } else {
        circuit.run();
        console.log(circuit.probabilities());

    }
    res.status(200).send('success');
})

router.post('/probability', async (req,res) => {
    console.log('running circuit');

    if(req.body){
        console.log('states found: ' + req.body);
        circuit.run(req.body);
        console.log(circuit.probabilities());

    } else {
        console.log('no states found');
        circuit.run();
        console.log(circuit.probabilities());

    }
    console.log('Getting probability');
    console.log(circuit.probabilities());
    res.status(200).send(circuit.probabilities());
});

router.get('/measurement', async (req,res) => {
    console.log('Getting measurement');
    console.log(circuit.measureAll());
    res.status(200).send(circuit.measureAll());
});

module.exports = router;