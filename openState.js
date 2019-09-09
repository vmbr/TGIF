
var metadata = datos;
var datosLegis = datosLeg;


jQuery(function() {

    var options = {
        method: 'GET',
        headers: new Headers({
          "X-API-Key": 'caed6beb-69e3-46af-8182-5878707f230d'
        })
    }
/*
    fetch( "https://openstates.org/api/v1/metadata/", options
    ).then(function(response) {
        if (response.ok) {  
          return response.json(); 
        }
    }).then(function(response) {
        json = response;
        
        states = json.results[0].members;
        app.members = members 

    }); */
});




//VUE
var app = new Vue({  
    el: '#app',  
    data: {    
      members: [],
      states: [],
      legislators: []
      
    },
    methods: {
      getChamberTitle: function(legislator){
      
        var theTitle = "";
        if(legislator.chamber == "lower"){
          theTitle = metadata[0].chambers.lower.title;
        }
        if(legislator.chamber == "upper") {
          theTitle = metadata[0].chambers.upper.title;
        }
        return theTitle;
      }
    }
}); 

app.states = dropdownStates(metadata);
app.legislators = datosLegis;


function dropdownStates(metadata) {
  var states = [];
  for (var i = 0; i < metadata.length; i++) {
      if (states.indexOf(metadata[i].name) == -1) {
        var stateObj = {
          nombre: metadata[i].name,
          id: metadata[i].id
        }
        states.push(stateObj)
      }
      
  }
  return states;
}

app.states.sort(function (a, b) {
  if (a.nombre > b.nombre) {
    return 1;
  }
  if (a.nombre < b.nombre) {
    return -1;
  }
  return 0;
});


//legislators.state = states.abbreviation
console.log(datosLegis)
console.log(metadata)

function filterByState(evt) {  
  console.log(evt.target.dataset.stateid)
  var selected = evt.target.dataset.stateid
  
  app.legislators = datosLegis.filter(paraFiltrar, selected);
}

function paraFiltrar(legislator) {
  return legislator.state == this 
}