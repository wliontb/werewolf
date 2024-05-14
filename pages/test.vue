<template>
    <nav class="bg-slate-600 h-20 w-full fixed">
        <input type="checkbox" id="check" hidden>
        <label for="check" class="float-right text-white text-3xl leading-[80px] mr-10 lg:hidden">
            Toggle
        </label>
        <label class="text-white md:leading-[80px] leading-[80px] pl-12 md:pl-24 md:text-4xl text-3xl">Navigation</label>
        <ul class="float-right mr-10 lg:flex leading-[80px] space-x-4 text-white uppercase fixed lg:relative h-[100vh] lg:h-0 w-[100%] lg:w-fit top-20 lg:top-0 left-[-100%] lg:left-0 transition-all duration-300 lg:transition-none text-center bg-slate-700">
            <li>
                <a href="#">Home</a>
            </li>
            <li>
                <a href="#">Home</a>
            </li>
            <li>
                <a href="#">Home</a>
            </li>
            <li>
                <a href="#">Home</a>
            </li>
        </ul>
    </nav>
</template>
<script setup>

definePageMeta({
    layout: false
})
</script>
<style scoped>
    ul li a {
        @apply rounded py-[7px] px-[13px] text-[17px] hover:bg-slate-300 transition-all duration-300
    }

    #check:checked ~ ul{
        left:0
    }

    .bg-image {
        background: url('/img/flip-bg.png');
        background-size: cover;
    }
</style>