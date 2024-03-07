<template>
    <div class="w-1/2 mx-auto p-5 bg-image text-white">
        <h1 class="text-xl font-bold">Ma Sói Millers Tool</h1>
        <div class="flex mt-10">
            <slot />
        </div>
        <div class="flex mt-10 gap-2 justify-end text-sm font-semibold italic">
            <NuxtLink to="/">Trang chủ</NuxtLink>
            <a href="#">Tác giả</a>
            <a href="#">Hướng dẫn</a>
        </div>
    </div>
</template>
<style>
    .bg-image {
        background: url('https://images.beastsofwar.com/2021/12/Werewolves-Image-One.jpg');
    }
</style>