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

    const incrementNight = () => {
        nightNumber.value++;
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
            addPlayerKilledByHunt(aimID.value);
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

    const addPlayerKilledByWitch = (idPlayer) => {
        if(killedByWitch.value.includes(idPlayer)){
            alert('Người chơi này đã bị hạ độc!')
            return;
        }
        if(player.setDead(idPlayer, 'witch')) {
            killedByWitch.value.push(idPlayer);
        }
    }

    const removePlayerKilledByWitch = (idPlayer) => {
        if(killedByWitch.value.includes(idPlayer)){
            killedByWitch.value = killedByWitch.value.filter(item => item != idPlayer);
        }
    }

    const addPlayerKilledByHunt = (idPlayer) => {
        if(killedByHunt.value.includes(idPlayer)){
            alert('Người chơi này đã bị bắn từ trước!')
            return;
        }
        if(player.setDead(idPlayer, 'hunter')) {
            killedByHunt.value.push(idPlayer);
        }
    }

    const removePlayerKilledByHunt = (idPlayer) => {
        if(killedByHunt.value.includes(idPlayer)){
            killedByHunt.value = killedByHunt.value.filter(item => item != idPlayer);
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
        setAimID,
        addPlayerKilledByWitch,
        removePlayerKilledByWitch,
        addPlayerKilledByHunt,
        removePlayerKilledByHunt,
        incrementNight
    }
})