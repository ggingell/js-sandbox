<?php

    /**
     *
     * DEMO Purposes ONLY! This script loads JSON from a flat file.
     * Of course it's just one more step to load it from Mongo/mySQL 
     * 
     * 
     **/

    // Set the header to indicate JSON
    header('Content-type: application/json');

    $dewey = file_get_contents('dewey_decimal_classification.min.json', 'r');
    $array_dewey = json_decode($dewey, TRUE);
    
    // The user must specify a class. 
    // In addition there could also be Division and Section, with a switch loop.
    $dewey_class = (isset($_GET['class'])) ? $_GET['class'] : false;

    if($dewey_class) {

      if($dewey_class % 100 == 0) {

        $key = ($dewey_class / 100);
        echo '{"status": "success", "data": ' . json_encode($array_dewey[$key]) . '}';

      }
    }
    else {

       echo '{"status": "error", "message": "Incorrect query. Please use class=X00."}';

    }

    
 

  ?>