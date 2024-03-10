<template>
    <div class="flex flex-col w-full gap-2">
        <h1 v-if="playerStore.totalPlayer() < 2 ? true : false">Chưa đủ số người chơi, vui lòng cài đặt thêm người</h1>
        <NuxtLink v-if="playerStore.totalPlayer() < 2 ? false : true" to="/play/night/one"
            class="bg-orange-500 rounded p-2 w-1/2 text-md mx-auto  text-center border-white border-2 uppercase font-bold hover:bg-red-500">
            Bắt đầu chơi</NuxtLink>
        <NuxtLink to="/setting"
            class="bg-orange-500 rounded p-2 w-1/2 text-md mx-auto  text-center border-white border-2 uppercase font-bold hover:bg-red-500">
            Cài đặt</NuxtLink>
    </div>
</template>
<script setup>
    import {usePlayerStore} from '@/stores/player';
    const playerStore = usePlayerStore();

</script>