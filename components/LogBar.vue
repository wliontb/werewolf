<template>
    <div class="w-1/5 flex-col text-right">
        <ul class="flex-col">
            <li class="bg-slate-400 border-b border border-black p-2" v-for="player in playerStore.player" :id="player.id">
                {{ nightStore.aimID == player.id ? '🔫' : '' }} 
                {{ nightStore.protectID == player.id ? '🛡' : '' }} 
                <span v-if="player.roleID === 4">
                    <template v-if="roleStore.witchHasProtect">💊</template>
                    <template v-if="roleStore.witchHasPoison">🩹</template>
                </span>
                <span class="font-semibold text-black">{{ player.name }}</span>
                [{{ player.roleID == 2 ? '🐺' : roleStore.getByID(player.roleID).name }}]
                {{ player.alive ? '😃' : '👻' }}
            </li>
        </ul>
        <ul class="flex-col mt-3" v-if="nightStore.nightNumber > 1">
            <li class="bg-red-500 border-b border border-black p-2">👻 Người chơi bị loại:</li>
            <li class="bg-slate-400 border-b border border-black p-2 line-through" v-for="player in playerStore.playerOut" :id="player.id">
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
const playerStore = usePlayerStore();
const nightStore = useNightStore();
const roleStore = useRoleStore();


</script>