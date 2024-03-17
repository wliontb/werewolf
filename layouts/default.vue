<template>
    <div class="container mx-auto text-white flex flex-col min-h-screen">
        <div class="flex items-center gap-4 p-2">
            <img src="/img/logo.png" class="w-20" alt="">
            <div class="flex-col" title="A Project By Matches.Enolam">
                <h1 class="text-xl font-bold text-amber-500">The Werewolves of Millers Hollow</h1>
                <h2 class="italic text-red-500 font-semibold">Moderator Support Tool</h2>
            </div>
        </div>
        <div class="flex flex-col md:flex-row flex-1 mt-10 p-2">
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