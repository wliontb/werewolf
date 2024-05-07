<template>
    <div class="flex flex-col md:text-right text-sm">
        <ul class="flex flex-row md:flex-col w-full flex-wrap mb-3">
            <li class="bg-red-500 border-b border border-black w-1/2 md:w-full">Số lượng 2 phe</li>
            <li class="bg-slate-400 border-b border border-black w-1/2 md:w-full">
                <div class="p-2">
                    🐺 còn sống: {{ gameStore.totalWolfLive }}
                </div>
            </li>
            <li class="bg-slate-400 border-b border border-black w-1/2 md:w-full">
                <div class="p-2">
                    👤 còn sống: {{ playerStore.getVillageAlive().length }}
                </div>
            </li>
        </ul>

        <ul class="flex flex-row md:flex-col w-full flex-wrap">
            <li class="bg-red-500 border-b border border-black w-1/2 md:w-full">
                {{ route.path !== '/play/log' ? 'Thông số người chơi' : '😃 Người chơi còn sống' }}
            </li>
            <li v-if="route.path !== '/play/log'" class="bg-slate-400 border-b border border-black w-1/2 md:w-full" v-for="player in playerStore.player"
                :id="player.id">
                <div class="p-2">
                    {{ nightStore.aimID == player.id ? '🎯' : '' }}
                    {{ nightStore.protectID == player.id ? '🛡' : '' }}
                    <span v-if="player.roleID === 4">
                        <template v-if="roleStore.witchHasProtect">💊</template>
                        <template v-if="roleStore.witchHasPoison">🩹</template>
                    </span>
                    <span class="font-semibold text-black">{{ player.name }}</span>
                    [{{ player.roleID == 2 ? '🐺' : roleStore.getByID(player.roleID).name }}]
                    {{ player.alive ? '😃' : '👻' }}
                </div>
            </li>
            <li v-else class="bg-slate-400 border-b border border-black w-1/2 md:w-full" v-for="player in playerStore.getPlayerAlive()"
                :id="player.id">
                <div class="p-2">
                    {{ nightStore.aimID == player.id ? '🎯' : '' }}
                    {{ nightStore.protectID == player.id ? '🛡' : '' }}
                    <span v-if="player.roleID === 4">
                        <template v-if="roleStore.witchHasProtect">💊</template>
                        <template v-if="roleStore.witchHasPoison">🩹</template>
                    </span>
                    <span class="font-semibold text-black">{{ player.name }}</span>
                    [{{ player.roleID == 2 ? '🐺' : roleStore.getByID(player.roleID).name }}]
                </div>
            </li>
        </ul>

        <ul class="flex flex-row md:flex-col w-full flex-wrap mt-3" v-if="nightStore.nightNumber > 1">
            <li class="bg-red-500 border-b border border-black w-1/2 md:w-full">👻 Người chơi bị loại</li>
            <li class="bg-slate-400 border-b border border-black w-1/2 md:w-full line-through"
                v-for="player in playerStore.playerOut" :id="player.id">
                <span class="font-semibold text-black">{{ player.name }}</span>
                [{{ player.roleID == 2 ? '🐺' : roleStore.getByID(player.roleID).name }}]
            </li>
        </ul>
    </div>


</template>
<script setup>
import { usePlayerStore } from '@/stores/player';
import { useNightStore } from '@/stores/night';
import { useRoleStore } from '@/stores/role';
import { useGameStore } from '@/stores/game';
const playerStore = usePlayerStore();
const nightStore = useNightStore();
const roleStore = useRoleStore();
const gameStore = useGameStore();
const route = useRoute();

</script>