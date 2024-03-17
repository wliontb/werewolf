import { useGameStore } from '@/stores/game';
import { usePlayerStore } from '@/stores/player';
import { useRoleStore } from '@/stores/role';

export default defineNuxtRouteMiddleware((to, from) => {
    const playerStore = usePlayerStore();
    const roleStore = useRoleStore();
    const gameStore = useGameStore();

    if(from.path == '/play/day/every') {
        if(gameStore.totalWolfLive == 0 || gameStore.totalWolfLive >= (playerStore.getPlayerAlive().length/2)) {
            gameStore.$reset();
            playerStore.setPlayer([...playerStore.player, ...playerStore.playerOut]);
            gameStore.setTotalPlayer(playerStore.player);
            return;
        }
    }
    return;
})