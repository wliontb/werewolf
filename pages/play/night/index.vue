<template>
    <div class="flex flex-col w-full gap-2">
        <h1 v-if="playerStore.player.length < 2 ? true : false" class="text-center text-red-500 font-bold text-xl">Chưa đủ số người chơi, vui lòng cài đặt thêm người!!</h1>
        <NuxtLink v-if="playerStore.player.length < 2 ? false : true" to="/play/night/one"
            class="bg-orange-500 rounded p-2 w-full md:w-1/2 text-md mx-auto text-center border-orange-100 border-2 uppercase font-medium hover:bg-orange-800 hover:text-orange-500">
            Bắt đầu đêm đầu tiên</NuxtLink>
        <NuxtLink v-if="gameStore.logGame.length > 0" to="/play/log"
            class="bg-orange-500 rounded p-2 w-full md:w-1/2 text-md mx-auto text-center border-orange-100 border-2 uppercase font-medium hover:bg-orange-800 hover:text-orange-500">
            Xem log ván đấu gần nhất</NuxtLink>
    </div>
</template>
<script setup>
    import {usePlayerStore} from '@/stores/player';
    import {useGameStore} from '@/stores/game';
    const playerStore = usePlayerStore();
    const gameStore = useGameStore();

</script>