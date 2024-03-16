<template>
    <div class="flex items-center h-screen">
        <div class="w-5/6 mx-auto bg-image text-white shadow-sm rounded flex flex-col">
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
            <!-- Footer -->
            <div class="flex gap-2 justify-end text-sm font-semibold italic p-2"> 
                <span @click="$router.back()" class="hover:underline cursor-pointer">Back</span>
                <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
                <a href="#" class="hover:underline">Report Bug</a>
            </div>
        </div>
    </div>
</template>
<script setup>
useHead({
    bodyAttrs: {
        class: 'bg-slate-600'
    }
})
</script>
<style>
.bg-image {
    background: url('/img/flip-bg.png');
    background-size: cover;
}
</style>