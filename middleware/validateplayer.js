import { useGameStore } from '@/stores/game';
import { usePlayerStore } from '@/stores/player';
import { useRoleStore } from '@/stores/role';

export default defineNuxtRouteMiddleware((to, from) => {
    const playerStore = usePlayerStore();
    const roleStore = useRoleStore();
    const gameStore = useGameStore();

    if(playerStore.player.length < roleStore.totalActive()){
        return abortNavigation();
    } else {
        gameStore.setTotalPlayer(playerStore.player.length);
        gameStore.setTotalAlive(playerStore.player.length);
        return;
    }
    
})