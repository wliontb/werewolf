<template>
    <div class="flex w-full gap-2">
        <div class="w-4/5 flex flex-col">
            <BadgeAmberLeft>
                <h1>Tổng kết game đấu:</h1>
            </BadgeAmberLeft>
            <ul class="mb-4">
                <li class="text-black bg-white border-b border-dashed hover:bg-green-300 p-1.5">
                    <b>Phe chiến thắng:</b> {{ gameStore.totalWolfLive == 0 ? 'Dân làng' : gameStore.totalWolfLive >= (playerStore.getPlayerAlive().length/2) ? 'Sói' : '' }}
                </li>
                <li class="text-black bg-white border-b border-dashed hover:bg-green-300 p-1.5">
                    <b>Các Role còn sống:</b> 

                </li>
            </ul>
            <!-- LogGame -->
            <BadgeAmberLeft>
                <h1>Lịch sử game đấu:</h1>
            </BadgeAmberLeft>
            <ul class="max-h-96 overflow-x-scroll mb-4">
                <li v-for="log in gameStore.logGame" class="text-black bg-white border-b border-dashed hover:bg-green-300 p-1.5">
                    {{ log}}
                </li>
                <li v-if="gameStore.logGame.length == 0">
                    <td colspan="4" class="text-center p-2">Chưa có lịch sử đấu!</td>
                </li>
            </ul>
            <div class="flex justify-center gap-2">
                <NuxtLink to="/" class="bg-amber-500 text-white rounded p-2 hover:bg-amber-800 hover:text-amber-500">Trở về trang chủ</NuxtLink>
                <NuxtLink to="/setting/player" class="bg-cyan-500 text-white rounded p-2 hover:bg-cyan-800 hover:text-cyan-500">Game đấu mới</NuxtLink>
            </div>

        </div>
        <div class="w-1/5 flex flex-col">
            <BadgeAmberRight>
                <h1>Thông số người chơi</h1>
            </BadgeAmberRight>
            <LogBar class="w-full"/>
        </div>
    </div>
</template>
<script setup>
import { useGameStore } from '@/stores/game';
import { usePlayerStore } from '@/stores/player';
import { useRoleStore } from '@/stores/role';
const playerStore = usePlayerStore();
const roleStore = useRoleStore();
const gameStore = useGameStore();
</script>