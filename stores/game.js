export const useGameStore = defineStore('game', () => {
    const historyProtect    = ref([]);
    const logGame           = ref([]);
    const totalPlayer       = ref(0);
    const totalRole         = ref(0);
    const totalWolf         = ref(0);
    const totalAlive        = ref(0);
    const totalDead         = ref(0);
    const totalWolfLive     = ref(0);

    return {
        historyProtect,
        logGame,
        totalPlayer,
        totalRole,
        totalWolf,
        totalAlive,
        totalDead,
        totalWolfLive
    }
})