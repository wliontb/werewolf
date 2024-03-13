<template>
    <div class="h-screen flex items-center bg-black">
        <div class="w-2/3 mx-auto bg-image text-white shadow-sm rounded">
            <div class="flex items-center gap-4 p-2">
                <img src="/img/logo.png" class="w-20" alt="">
                <div class="flex-col" title="A Project By Matches.Enolam">
                    <h1 class="text-xl font-bold text-rose-500">The Werewolves of Millers Hollow</h1>
                    <h2 class="italic text-orange-600">Moderator Support Tool</h2>
                </div>
            </div>
            <div class="flex mt-10 p-2">
                <slot />
            </div>
            <div class="flex mt-10 gap-2 justify-end text-sm font-semibold italic p-2">
                <span @click="$router.back()" class="hover:underline cursor-pointer">Back</span>
                <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
                <a href="#" class="hover:underline">Report Bug</a>
            </div>
        </div>
    </div>
</template>
<style>
.bg-image {
    background: url('/img/bg-vector.jpg');
    background-size: cover;
}
</style>