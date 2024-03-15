import { useGameStore } from '@/stores/game';
import { usePlayerStore } from '@/stores/player';
import { useRoleStore } from '@/stores/role';
import { useNightStore } from '@/stores/night';

export default defineNuxtRouteMiddleware((to, from) => {
    const playerStore = usePlayerStore();
    const roleStore = useRoleStore();
    const gameStore = useGameStore();
    const nightStore = useNightStore();

    if(gameStore.totalWolfLive == 0 || gameStore.totalWolfLive == (gameStore.totalAlive / 2)){
        return abortNavigation();
    } else {
        nightStore.$reset();
        nightStore.incrementNight();
        gameStore.setTotalAlive(playerStore.player.length);
        playerStore.pushPlayerOut(playerStore.getPlayerDead());
        playerStore.setPlayer(playerStore.getPlayerAlive());
        return;
    }
    
})