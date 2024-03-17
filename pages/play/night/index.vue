<template>
    <div class="flex flex-col w-full gap-2">
        <h1 v-if="playerStore.player.length < 2 ? true : false" class="text-center text-red-500 font-bold text-xl">Chưa đủ số người chơi, vui lòng cài đặt thêm người!!</h1>
        <NuxtLink v-if="playerStore.player.length < 2 ? false : true" to="/play/night/one"
            class="bg-orange-500 rounded p-2 w-1/2 text-md mx-auto text-center border-orange-100 border-2 uppercase font-medium hover:bg-orange-800 hover:text-orange-500">
            Bắt đầu chơi</NuxtLink>
        <NuxtLink to="/setting"
            class="bg-orange-500 rounded p-2 w-1/2 text-md mx-auto text-center border-orange-100 border-2 uppercase font-medium hover:bg-orange-800 hover:text-orange-500">
            Cài đặt</NuxtLink>
        <NuxtLink to="/"
        class="bg-orange-500 rounded p-1.5 w-1/2 text-md mx-auto text-center border-orange-100 border-2 uppercase font-medium hover:bg-orange-800 hover:text-orange-500">
            Trang chủ
        </NuxtLink>
    </div>
</template>
<script setup>
    import {usePlayerStore} from '@/stores/player';
    const playerStore = usePlayerStore();

</script>