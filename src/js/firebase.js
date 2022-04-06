// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "./firebase-initialize";
const db = firebase.database();

//Structural data for leaderboard is only formed once a level has been played once by a user
export function checkIfFirstGameEver(levelId, userId, name, timeResult, formattedScore) {
    db.ref().child("leaderboards/" + levelId).child(userId).get().then((snapshot) => {
        //increment tries property by one
        writeUserScore(levelId, userId, name, formattedScore, timeResult, snapshot);
    }).catch((error) => {
        console.error(error);
    });
}

export function writeUserData(userId, name, tries) {
    db.ref('users/' + userId).set({
        username: name,
        tries: tries + 1
    });
}

export function writeUserScore(levelId, userId, name, score, timeResult, snapshot) {
    const obj = snapshot.exists() && snapshot.val();
    snapshot.exists() ? db.ref(`leaderboards/${levelId}/${userId}`).update({
        username: name,
        attempts: obj.attempts + 1,
        bestTime: timeResult < obj.bestTime ? timeResult : obj.bestTime, //is used to compare best and current score
        bestScore: timeResult < obj.bestTime ? score : obj.bestScore
    }) : db.ref(`leaderboards/${levelId}/${userId}`).set({
        username: name,
        attempts: 1,
        firstTime: timeResult,
        bestTime: timeResult,
        firstScore: score,
        bestScore: score
    });
}

export async function getRankings(levelId, attemptType) {
    let leaderboardsData = []; //data container
    let promises = []; //promises container
    const scoresRef = db.ref(`leaderboards/${levelId}`);
    await scoresRef.once('value', (key) => { 
        key.forEach(t => {
            //puts all load of categorical data into an array of promises
            promises.push(scoresRef.child(t.key).once('value'));
        })
    })

    const leaderboard =  Promise.all(promises)
    .then(snapshots => {
        snapshots.forEach(k => {
            if (k.exists()) {
                let scores = {};
                scores.firstScore = k.val().firstScore;
                scores.bestScore = k.val().bestScore;
                scores.username = k.val().username;
                scores.firstTime = k.val().firstTime;
                scores.bestTime = k.val().bestTime;
                leaderboardsData.push(scores);
            }
        })
        return retrieveDataForLeaderboards(attemptType, leaderboardsData);
    })
    .then(result => {
        return result;
    })
    .catch(err => console.log(err));

    const data = async () => {
        const res = await leaderboard;
        return res;
    };

    return data();
}

function retrieveDataForLeaderboards(attemptType, data) {
    const leaderboards = data;
    const MAX_ELEMENT = 20;
    const sortByProps = (prop) => {
        return leaderboards.sort((a, b) => a[prop] - b[prop])
            .map((data, i) => ({ ...data, index: `${i + 1}.` }))
            .slice(0, MAX_ELEMENT);
    }
    return attemptType === 'first' ? sortByProps('firstTime') : sortByProps('bestTime');
}

export function retrieveDataFromCloudForUserScores(userId) {
    const tempArr = [];
    const scoresRef = db.ref(`leaderboards`);
    scoresRef.on('value', (snap) => {
        snap.forEach(k => {
            const val = k.val();
            let scores = {};
            if (val[userId]) {
                scores.firstScore = val[userId].firstScore;
                scores.bestScore = val[userId].bestScore;
            } else {
                scores.firstScore = 'N/A';
                scores.bestScore = 'N/A';
            }
            tempArr.push(scores);
        });
    });
    return tempArr;
}

//Tracks whether a level id exists within the object storage 
//which denotes whether a level was played at least once
export async function validateLevelPlayed(levelId) {
    const leaderboardsRef = firebase.database().ref('leaderboards/' + levelId);
    const isPlayedOnce = await leaderboardsRef.once('value', (snapshot) => {
        return snapshot;
    })
    return isPlayedOnce.exists();
}

//Check if the user has played at least one to confirm its existence
export function checkIfUserExistsById(userId, name) {
    db.ref().child("users").child(userId).get().then((snapshot) => {
        if (snapshot.exists()) {
            //increment "tries" property and update name just in case user changed it
            writeUserData(userId, name, snapshot.val().tries);
        } else {
            writeUserData(userId, name, 0);
        }
    }).catch((error) => {
        console.error(error);
    });
}