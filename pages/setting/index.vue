<template>
    <div class="flex flex-col w-full gap-3">
        <NuxtLink to="/setting/role"
            class="bg-orange-500 rounded p-1.5 w-full md:w-1/2 text-md mx-auto text-center border-orange-100 border-2 uppercase font-medium hover:bg-orange-700 hover:text-orange-500">
            Vai trò - Role
        </NuxtLink>
        <NuxtLink to="/setting/player"
            class="bg-orange-500 rounded p-1.5 w-full md:w-1/2 text-md mx-auto text-center border-orange-100 border-2 uppercase font-medium hover:bg-orange-700 hover:text-orange-500">
            Người chơi - Player
        </NuxtLink>
        <button @click="resetAll"
            class="bg-red-700 rounded p-1.5 hover:text-red-500 w-full md:w-1/2 text-md mx-auto text-center border-red-500 border-2 uppercase font-medium  flex items-center justify-center gap-2">
            Reset tất cả cài đặt <IconWarning />
        </button>
        <NuxtLink to="/"
            class="bg-orange-500 rounded p-1.5 w-full md:w-1/2 text-md mx-auto text-center border-orange-100 border-2 uppercase font-medium hover:bg-orange-700 hover:text-orange-500">
            Trang chủ
        </NuxtLink>
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