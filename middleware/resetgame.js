import { useGameStore } from '@/stores/game';
import { usePlayerStore } from '@/stores/player';
import { useRoleStore } from '@/stores/role';

export default defineNuxtRouteMiddleware((to, from) => {
    const playerStore = usePlayerStore();
    const roleStore = useRoleStore();
    const gameStore = useGameStore();

    if(from.path == '/play/day/every' || from.path == '/play/log') {
        if(gameStore.totalWolfLive == 0 || gameStore.totalWolfLive >= (playerStore.getVillageAlive().length)) {
            gameStore.$reset();
            const playerResetArr = playerStore.player.concat(playerStore.playerOut).forEach(player => {
                player.alive = true;
                player.roleID = 1;
            });
            playerStore.setPlayer([...playerResetArr]);
            gameStore.setTotalPlayer(playerStore.player.length);
            return;
        }
    }
    return;
})