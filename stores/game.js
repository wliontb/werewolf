export const useGameStore = defineStore('game', () => {
    const historyProtect    = ref([]);
    const logGame           = ref([]);
    const totalPlayer       = ref(8);
    const totalRole         = ref(0);
    const totalWolf         = ref(0);
    const totalAlive        = ref(0);
    const totalDead         = ref(0);
    const totalWolfLive     = ref(0);

    function $reset() {
        historyProtect.value = [];
        logGame.value = [];
        totalPlayer.value = 8;
        totalRole.value = 0;
        totalWolf.value = 0;
        totalAlive.value = 0;
        totalDead.value = 0;
        totalWolfLive.value = 0;
    }

    function $resetGame() {
        historyProtect.value = [];
        totalPlayer.value = 8;
        totalRole.value = 0;
        totalWolf.value = 0;
        totalAlive.value = 0;
        totalDead.value = 0;
        totalWolfLive.value = 0;
    }

    const setTotalPlayer = (number) => {
        totalPlayer.value = number;
    }

    const setTotalRole = (number) => {
        totalRole.value = number;
    }

    const setTotalWolf = (number) => {
        totalWolf.value = number;
    }

    const setTotalAlive = (number) => {
        totalAlive.value = number;
    }

    const setTotalDead = (number) => {
        totalDead.value = number;
    }

    const setTotalWolfLive = (number) => {
        totalWolfLive.value = number;
    }

    const addLogGame = (text) => {
        logGame.value.push(text);
    }

    const addProtectHistory = (idPlayer) => {
        if(historyProtect.value.length > 0){
            if(historyProtect.value[historyProtect.value.length - 1] == idPlayer) {
                alert('Không thể bảo vệ cùng 1 người 2 đêm liên tiếp');
                return false;
            } 
        }
        historyProtect.value.push(idPlayer);
        return true;
        
    }

    return {
        $reset,
        $resetGame,
        historyProtect,
        logGame,
        totalPlayer,
        totalRole,
        totalWolf,
        totalAlive,
        totalDead,
        totalWolfLive,
        setTotalPlayer, addProtectHistory,
        setTotalRole, setTotalWolf,
        setTotalAlive, setTotalDead, setTotalWolfLive,
        addLogGame
    }
}, {persist: true})