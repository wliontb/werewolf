<template>
    <div class="flex flex-col w-full gap-2">
        <NuxtLink to="/setting/role"
            class="bg-orange-500 rounded p-2 w-1/2 text-md mx-auto text-center border-orange-200 border-2 uppercase font-medium hover:bg-orange-800">
            Vai trò - Role
        </NuxtLink>
        <NuxtLink to="/setting/player"
            class="bg-orange-500 rounded p-2 w-1/2 text-md mx-auto text-center border-orange-200 border-2 uppercase font-medium hover:bg-orange-800">
            Người chơi - Player
        </NuxtLink>
        <button @click="resetAll"
            class="bg-red-500 rounded p-2 w-1/2 text-md mx-auto text-center border-orange-200 border-2 uppercase font-medium hover:bg-red-800">
            Reset tất cả cài đặt
        </button>
    </div>
</template>
<script setup>
import { usePlayerStore } from '@/stores/player';
import { useNightStore } from '@/stores/night';
import { useRoleStore } from '@/stores/role';
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore();
const playerStore = usePlayerStore();
const nightStore = useNightStore();
const roleStore = useRoleStore();

const resetAll = () => {
    gameStore.$reset();
    playerStore.$reset();
    nightStore.$reset();
    roleStore.$reset();
}
</script>