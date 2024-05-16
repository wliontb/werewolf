import { useGameStore } from '@/stores/game';
import { usePlayerStore } from '@/stores/player';
import { useRoleStore } from '@/stores/role';
import { useNightStore } from '@/stores/night';

export default defineNuxtRouteMiddleware((to, from) => {
    const playerStore = usePlayerStore();
    const roleStore = useRoleStore();
    const gameStore = useGameStore();
    const nightStore = useNightStore();

    if(from.path == '/play/day/every' || from.path == '/play/log') {
        if(gameStore.totalWolfLive == 0 || gameStore.totalWolfLive >= (playerStore.getVillageAlive().length)) {
            gameStore.$resetGame();
            gameStore.$resetLog();
            playerStore.$resetGame();
            roleStore.$resetGame();
            nightStore.$reset();
            return;
        }
    }
    return;
})