var members = [];

jQuery(function() {

    var options = {
        method: 'GET',
        headers: new Headers({
          "X-API-Key": 'JPOJjVt6KE0p9aKWPoSQGst9FxFLCv1uKLUESgJ6'
        })
    }

    var title = document.getElementById("titulo").innerText;
    var url = 'senate';
    if(title.includes("House"))
        url = 'house';

    fetch( "https://api.propublica.org/congress/v1/113/"+url+"/members.json", options
    ).then(function(response) {
        if (response.ok) {  
          return response.json(); 
        }
    }).then(function(response) {
        json = response
        
        members = json.results[0].members;
        app.members = members 


        if(title.includes("Data")){
            app.states = dropdownStates(members)
        }
        else {

            var democrats = members.filter(filterParty, "D");
            var republicans = members.filter(filterParty, "R");
            var independents = members.filter(filterParty, "I");

            app.partyInfo[0].numberOfMembers = democrats.length;
            app.partyInfo[1].numberOfMembers = republicans.length;
            app.partyInfo[2].numberOfMembers = independents.length;

            app.partyInfo[0].pct = getAverageVotes(democrats).toFixed(2)+" %";
            app.partyInfo[1].pct = getAverageVotes(republicans).toFixed(2)+" %";
            app.partyInfo[2].pct = getAverageVotes(independents).toFixed(2)+" %";

            app.bottomAttendance = findLeastOftenAtt(members);
            ordenarMayorMenor(app.bottomAttendance, "missed_votes_pct");
            app.topAttendance = findMostOftenAtt(members);
            ordenarMenorMayor(app.topAttendance, "missed_votes_pct");
            
            app.bottomLoyal = findLeastOften(members);
            ordenarMenorMayor(app.bottomLoyal, "votes_with_party_pct");
            app.topLoyal = findMostOften(members);
            ordenarMayorMenor(app.topLoyal, "votes_with_party_pct");
        }
        //document.getElementById("membersData").innerHTML = crearTabla(members);
        //document.getElementById("state-filter").innerHTML += crearDropdown(members);
    }
    
    )

})

//VUE
var app = new Vue({  
    el: '#app',  
    data: {    
      members: [],
      states: [],
      partyInfo: [
        {name:"Democrats",
        numberOfMembers: 0,
        pct: 0
        },
        {name:"Republicans",
        numberOfMembers: 0,
        pct: 0
        }, 
        {name:"Independents",  
        numberOfMembers: 0,
        pct: 0
        }],
      topAttendance: [],
      bottomAttendance: [],
      topLoyal: [],
      bottomLoyal: []  

    }
}); 

function filterSelection(members) {
    var filtros = [];
    var checked = Array.from(document.querySelectorAll('input[name=party]:checked')).map(mapValues);
    filtros.push(checked);
    
    var selected = document.getElementById("state-filter").value;
    filtros.push(selected);

    return app.members = members.filter(toFilterMember, filtros);

    //document.getElementById("membersData").innerHTML = crearTabla(filteredMembers);

}

function mapValues(nodo) {
    return nodo.value;
}

function toFilterMember(member) {
    return this[0].indexOf(member.party) >= 0 && (this[1] == member.state || this[1] == "all");
}
/*
function crearTabla(members) {

    return members.map(mapMemberTR).join("");
}
*/
function mapMemberTR(member) {
    var string = "";

    string += '<tr>';
    string += '<td><a href=' + member.url + '>' + member.first_name + " " + (member.middle_name || "") + " " + member.last_name + '</a></td>';
    string += '<td>' + member.party + '</td>';
    string += '<td>' + member.state + '</td>';
    string += '<td>' + member.seniority + '</td>';
    string += '<td>' + member.votes_with_party_pct + "%" + '</td>';
    string += '</tr>';

    return string;
}



function dropdownStates(members) {
    var states = [];
    for (var i = 0; i < members.length; i++) {
        if (states.indexOf(members[i].state) == -1) {
            states.push(members[i].state)
        }
    }
    return states;
}
/*
function crearDropdown(members) {
    var states = dropdownStates(members)
    return states.map(mapStates).sort().join("");
}
*/
function mapStates(state) {
    return "<option>" + state + "</option>";
}


/*
function crearTablaStats(members) {

    return members.map(mapMemberStats).join("");
}

function mapMemberStats(member) {
    var string = "";

    string += '<tr>';
    string += '<td>' + member.party + '</td>';
    string += '<td>' + (nro votos) + '</td>';
    string += '<td>' + member.votes_with_party_pct + "%" + '</td>';
    string += '</tr>';

    return string;
}
*/

/* --ASI FUNCIONA EL .MAP--
function map(array){
    var resultArray = [];
    for(var i = 0; i < array.length; i++){

        var result = mapStates(array[i]):
        resultArray.push(result);
    }
    return resultArray;
}
*/

    /*
fetchJson('https://api.propublica.org/congress/v1/113/senate/members.json', options)
    .then(function(json) {
        members = json.results[0].members;

        document.getElementById("membersData").innerHTML = crearTabla(members);
        document.getElementById("state-filter").innerHTML += crearDropdown(members);
        
      }).catch(function(error) {
          console.log(error);
      });

function fetchJson(url, init) {
    return fetch(url, init).then(function(response) {
        if (response.ok) {
        return response.json(); 
        }
        throw new Error(response.statusText);
    });
}
    
     */