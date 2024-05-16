<template>
    <div class="text-white flex flex-col min-h-screen">
        <div class="flex items-center gap-4 p-2 pr-0 justify-between h-20">
            <div class="flex items-center gap-4 p-2">
                <img src="/img/logo.png" class="w-20" alt="">
                <div class="flex-col" title="A Project By Matches.Enolam">
                    <h1 class="text-xl font-bold text-amber-500">The Werewolves of Millers Hollow</h1>
                    <h2 class="italic text-red-500 font-semibold">Moderator Support Tool</h2>
                </div>
            </div>
            <div class="flex items-center gap-4 p-2 pr-0" v-if="['/play/night/one','/play/night/every','/play/day/every'].includes(route.fullPath)">
                <button class="text-white p-2 uppercase" :class="{
                    'bg-red-300': !webStore.displayMenu,
                    'bg-red-500': webStore.displayMenu,
                }" @click="webStore.toggleMenu()">☰ Bảng điểm</button>
            </div>
        </div>
        <div class="container mx-auto flex flex-col md:flex-row flex-1 p-2 justify-center items-center">
            <slot />
        </div>
        <!-- Footer -->
        <div class="flex gap-2 justify-end text-sm font-semibold italic p-2">
            <span @click="$router.back()" class="hover:underline cursor-pointer">Back</span>
            <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
            <a href="#" class="hover:underline">Report Bug</a>
        </div>
    </div>
</template>
<script setup>
import { useWebStore } from '@/stores/web';
const webStore = useWebStore();
const route = useRoute();
useHead({
    bodyAttrs: {
        class: 'bg-image',
    }
})
</script>
<style>
.bg-image {
    background: url('/img/flip-bg.png');
    background-size: cover;
}
</style>