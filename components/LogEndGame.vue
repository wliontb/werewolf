<template>
    <div class="flex flex-col md:text-right text-sm">
        <ul class="flex flex-col w-full flex-wrap">
            <li class="bg-green-500 border border-green-600 w-full p-1.5">
                😃 Người chơi còn sống:
            </li>
            <li class="border-b border-black text-black bg-white border-dashed hover:bg-green-300 w-full p-1.5" v-for="player in playerStore.getPlayerAlive()"
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

        <ul class="flex flex-col w-full flex-wrap md:mt-3">
            <li class="bg-red-500 border border-red-600 w-full p-1.5">👻 Người chơi bị loại:</li>
            <li class="border-b border-black text-black bg-white border-dashed hover:bg-red-300 w-full p-3.5"
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