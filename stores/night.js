export const useNightStore = defineStore('night', () => {
    const nightNumber = ref(1);
    const killedByWolf = ref([]);
    const killedByHunt = ref([]);
    const killedByWitch = ref([]);
    const aimID = ref(0);
    const protectID = ref(0);

    return {
        nightNumber,
        killedByWolf,
        killedByHunt,
        killedByWitch,
        aimID,
        protectID
    }
})