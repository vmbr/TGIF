//var members = data.results[0].members;

var statistics = {
    "numberDemocrats": [],
    "numberRepublicans": [],
    "numberIndependents": [],
    "averagePctVotesDemocrats": 0,
    "averagePctVotesRepublicans": 0,
    "averagePctVotesIndependents": 0,
    "leastOftenVoted": [],
    "mostOftenVoted": [],
    "leastLoyal": [],
    "mostLoyal": [],
    
}


function fillMembers(members) {
    var democrats = [];
    var republicans = [];
    var independents = [];

    for (var i = 0; i < members.length; i++) {
        if (members[i].party == "D") {
            democrats.push(members[i])
        } else if (members[i].party == "R") {
            republicans.push(members[i])
        } else {
            independents.push(members[i])
        }
    }
    statistics.numberDemocrats = democrats;
    statistics.numberRepublicans = republicans;
    statistics.numberIndependents = independents;
}
//fillMembers(members);

function filterParty(members) {
    return members.party == this 
}


function getAverageVotes(members) {
    var average = 0;

    if(members.length == 0) {
        return average
    }
    
    for (var i = 0; i < members.length; i++) {
        average += members[i].votes_with_party_pct;
    }
    average = average / members.length;
    return average
}


/*
statistics.averagePctVotesDemocrats = getAverageVotes(statistics.numberDemocrats)
statistics.averagePctVotesRepublicans = getAverageVotes(statistics.numberRepublicans)
statistics.averagePctVotesIndependents = getAverageVotes(statistics.numberIndependents)
statistics.mostOftenVoted = findMostOftenAtt(members)
statistics.leastOftenVoted = findLeastOftenAtt(members)
statistics.leastLoyal = findLeastOften(members)
statistics.mostLoyal = findMostOften(members)

console.log(statistics);
*/

//encontrar el value mas bajo para loyalty

function findLower(members, x, key) {
    var lower = members[0][key];

    for (var i = 0; i < members.length; i++) {
        if (members[i][key] < lower && members[i][key] > x) {
            lower = members[i][key];
        }
    }
    return lower;
}

function lowerThanX(members, x, key) {
    var miembrosMenores = [];

    for (var i = 0; i < members.length; i++)
        if (members[i][key] <= x) {
            miembrosMenores.push(members[i]);
        }
    return miembrosMenores;
}

function findHighest(members, xx, key) {
    var highest = 0;

    for (var i = 0; i < members.length; i++) {
        if (members[i][key] > highest && members[i][key] < xx) {
            highest = members[i][key];
        }
    }
    return highest;
}

function higherThanX(members, xx, key) {
    var miembrosMayores = [];

    for (var i = 0; i < members.length; i++)
        if (members[i][key] >= xx) {
            miembrosMayores.push(members[i]);
        }
    return miembrosMayores;
}

function findLeastOften(members) {
    var k = 0.1;
    var x = findLower(members, 0, "votes_with_party_pct");
    var n = members.length;
    var m = lowerThanX(members, x, "votes_with_party_pct");

    while (m.length / n < k) {
        x = findLower(members, x, "votes_with_party_pct");
        m = lowerThanX(members, x, "votes_with_party_pct");
    }
    return m;
}

function findMostOften(members) {
    var k = 0.1;
    var x = findHighest(members, Infinity, "votes_with_party_pct");
    var n = members.length;
    var m = higherThanX(members, x, "votes_with_party_pct");

    while (m.length / n < k) {
        x = findHighest(members, x, "votes_with_party_pct");
        m = higherThanX(members, x, "votes_with_party_pct");
    }
    return m;
}

//encontrar el value mas bajo para attendance


function findMostOftenAtt(members) {
    var k = 0.1;
    var x = findLower(members, 0, "missed_votes_pct");
    var n = members.length;
    var m = lowerThanX(members, x, "missed_votes_pct");

    while (m.length / n < k) {
        x = findLower(members, x, "missed_votes_pct");
        m = lowerThanX(members, x, "missed_votes_pct");
    }
    return m;
}

function findLeastOftenAtt(members) {
    var k = 0.1;
    var x = findHighest(members, Infinity, "missed_votes_pct");
    var n = members.length;
    var m = higherThanX(members, x, "missed_votes_pct");

    while (m.length / n < k) {
        x = findHighest(members, x, "missed_votes_pct");
        m = higherThanX(members, x, "missed_votes_pct");
    }
    return m;
}


function mapStatsTR(statistics) {
    var string = "";

    string += '<tr>';
    string += '<td>' + "Democrat" + '</td>';
    string += '<td>' + statistics.numberDemocrats.length + '</td>';
    string += '<td>' + +(statistics.averagePctVotesDemocrats).toFixed(2) +" "+"%"+ '</td>';
    string += '</tr>';
    string += '<tr>';
    string += '<td>' + "Republican" + '</td>';
    string += '<td>' + statistics.numberRepublicans.length + '</td>';
    string += '<td>' + +(statistics.averagePctVotesRepublicans).toFixed(2) +" "+"%"+ '</td>';
    string += '</tr>';
    string += '<tr>';
    string += '<td>' + "Independent" + '</td>';
    string += '<td>' + statistics.numberIndependents.length + '</td>';
    string += '<td>' + +(statistics.averagePctVotesIndependents).toFixed(2) +" "+"%"+ '</td>';
    string += '</tr>';

    return string;
}

//document.getElementById("statsData").innerHTML = mapStatsTR(statistics);

function ordenarMenorMayor(array, key) {
    array.sort(function(a, b){
        return a[key] - b[key];
    });
}
function ordenarMayorMenor(array, key) {
    array.sort(function(a, b){
        return b[key] - a[key];
    });
}

/*
ordenarMenorMayor(statistics.mostOftenVoted, "missed_votes_pct");
ordenarMayorMenor(statistics.leastOftenVoted, "missed_votes_pct");

ordenarMenorMayor(statistics.leastLoyal, "votes_with_party_pct");
ordenarMayorMenor(statistics.mostLoyal, "votes_with_party_pct");
*/

function mapTheStatsTR(statistics, array, key1, key2) {
    var string = "";

    for (var i = 0; i < array.length; i++) {
    
    string += '<tr>';
    string += '<td><a href='+ array[i].url + '>' + array[i].first_name + " " + (array[i].middle_name || "") + " " + array[i].last_name + '</a></td>';
    string += '<td>' + array[i][key1] + '</td>';
    string += '<td>' + array[i][key2] +" "+"%"+ '</td>';
    string += '</tr>';
    
    }
    return string;
}

/*
if(document.getElementById("statsAttData") != null) {
    document.getElementById("statsAttData").innerHTML = mapTheStatsTR(statistics, statistics.leastOftenVoted, "missed_votes", "missed_votes_pct");
    document.getElementById("statsAtt2Data").innerHTML = mapTheStatsTR(statistics, statistics.mostOftenVoted, "missed_votes", "missed_votes_pct");
}

if(document.getElementById("statsLoyData") != null) {
document.getElementById("statsLoyData").innerHTML = mapTheStatsTR(statistics, statistics.leastLoyal, "total_votes", "votes_with_party_pct");
document.getElementById("statsLoy2Data").innerHTML = mapTheStatsTR(statistics, statistics.mostLoyal, "total_votes" ,"votes_with_party_pct");
}
*/
