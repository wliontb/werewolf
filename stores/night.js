export const useNightStore = defineStore('night', () => {
    const logScript = ref([]);
    const playerDeadArr = ref([]);
    const playerAimID = ref(0);
    const playerProtectedID = ref(0);

    const addPlayerDead = (playerID) => {
        if(!playerDeadArr.value.includes(playerID))
            playerDeadArr.value.push(playerID);
    }

    const removePlayerDead = (playerID) => {
        if(playerDeadArr.value.includes(playerID))
            playerDeadArr.value = playerDeadArr.value.filter(id => id != playerID);
    }

    const changePlayerAim = (playerID) => {
        playerAimID.value = playerID;
    }

    const changePlayerProtect = (playerID) => {
        playerProtectedID.value = playerID;
    }

    const addLog = (text) => {
        logScript.value.push(text);
    }

    return {
        logScript,
        playerDeadArr,
        playerAimID,
        playerProtectedID,
        removePlayerDead, addPlayerDead, changePlayerAim, changePlayerProtect, addLog
    }
})