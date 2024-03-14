import { useGameStore } from "./game";
import { usePlayerStore } from "./player";

export const useNightStore = defineStore('night', () => {
    const game = useGameStore();
    const player = usePlayerStore();

    const nightNumber = ref(1);
    const killedByWolf = ref([]);
    const killedByHunt = ref([]);
    const killedByWitch = ref([]);
    const aimID = ref(0);
    const protectID = ref(0);

    function $reset() {
        nightNumber.value = 1;
        killedByWolf.value = [];
        killedByHunt.value = [];
        killedByWitch.value = [];
        aimID.value = 0;
        protectID.value = 0;
    }

    const setProtectID = (idPlayer) => {
        if(game.addProtectHistory(idPlayer)) {
            protectID.value = idPlayer;
        }
    }

    const setAimID = (idPlayer) => {
        aimID.value = idPlayer;
        //nếu thợ săn đã chết từ trước
        if(player.getPlayerRoleHunter().alive == false) {
            player.setDead(aimID.value, 'hunter');
        }
    }

    const addPlayerKilledByWolf = (idPlayer) => {
        if(killedByWolf.value.includes(idPlayer)){
            alert('Người chơi này đã bị sói cắn rồi!')
            return;
        }
        if(player.setDead(idPlayer, 'wolf')) {
            killedByWolf.value.push(idPlayer);
        }
    }

    const removePlayerKilledByWolf = (idPlayer) => {
        if(killedByWolf.value.includes(idPlayer)){
            killedByWolf.value = killedByWolf.value.filter(item => item != idPlayer);
        }
    }

    return {
        $reset,
        nightNumber,
        killedByWolf,
        killedByHunt,
        killedByWitch,
        aimID,
        protectID,
        setProtectID,
        addPlayerKilledByWolf,
        removePlayerKilledByWolf,
        setAimID
    }
})