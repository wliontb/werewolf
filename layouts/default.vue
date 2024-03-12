<template>
    <div class="w-1/2 mx-auto p-5 bg-image text-white">
        <div class="flex items-center gap-4">
            <img src="/img/logo.png" class="w-20" alt="">
            <div class="flex-col" title="A Project By Matches.Enolam">
                <h1 class="text-xl font-bold">The Werewolves of Millers Hollow</h1>
                <h2 class="italic">Moderator Support Tool</h2>
            </div>
        </div>
        <div class="flex mt-10">
            <slot />
        </div>
        <div class="flex mt-10 gap-2 justify-end text-sm font-semibold italic">
            <span @click="$router.back()" class="hover:underline cursor-pointer">Back</span>
            <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
            <a href="#" class="hover:underline">Report Bug</a>
        </div>
    </div>
</template>
<style>
    .bg-image {
        background: url('/img/bg.jpg');
    }
    body{
        width: 100vw;
        height: 100vh;
    }
    #__nuxt{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>