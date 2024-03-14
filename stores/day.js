export const useDayStore = defineStore('day', () => {
    const dayNumber         = ref(1);
    const killedByLynch     = ref([]);
    const killedByHunt      = ref([]);

    return {
        dayNumber,
        killedByHunt,
        killedByLynch
    }
})